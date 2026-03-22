"use client";

import { useEffect, useId, useRef, useState } from "react";
import Script from "next/script";

import { CONTACT_INFO } from "@/lib/constants";

declare global {
  interface Window {
    ymaps?: YandexMapsNamespace;
  }
}

type YandexMapsNamespace = {
  Map: new (
    element: HTMLElement,
    state: {
      center: [number, number];
      zoom: number;
      controls?: string[];
    },
    options?: Record<string, unknown>,
  ) => YandexMapInstance;
  Placemark: new (
    coordinates: [number, number],
    properties?: Record<string, unknown>,
    options?: Record<string, unknown>,
  ) => YandexPlacemark;
  templateLayoutFactory: {
    createClass: (template: string) => unknown;
  };
  ready: (callback: () => void) => void;
};

type YandexMapInstance = {
  geoObjects: {
    add: (geoObject: YandexPlacemark) => void;
  };
  controls: {
    remove: (controlName: string) => void;
  };
  behaviors: {
    disable: (behaviorName: string) => void;
  };
  destroy: () => void;
  container: {
    fitToViewport: () => void;
  };
};

type YandexPlacemark = {
  events?: {
    add: (eventName: string, handler: () => void) => void;
  };
};

const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
const MAP_COORDINATES: [number, number] = [
  CONTACT_INFO.coordinates.latitude,
  CONTACT_INFO.coordinates.longitude,
];

const CUSTOM_MARKER_TEMPLATE = `
  <div class="vt-map-marker" role="presentation">
    <div class="vt-map-marker__core">
      <span class="vt-map-marker__ring"></span>
      <span class="vt-map-marker__logo">VT</span>
    </div>
    <div class="vt-map-marker__shadow"></div>
  </div>
`;

function MapSkeleton() {
  return (
    <div className="vt-map-skeleton flex h-full w-full items-center justify-center">
      <div className="vt-map-skeleton__glow" />
      <div className="vt-map-skeleton__panel">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--steel)]">
          Загружаем карту
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Подготавливаем интерактивную карту и точку сервиса Volvo Titan.
        </p>
      </div>
    </div>
  );
}

function MapFallback({ reason }: { reason: "missing-key" | "load-error" }) {
  const title =
    reason === "missing-key" ? "Нужен API-ключ Yandex Maps" : "Не удалось загрузить карту";
  const description =
    reason === "missing-key"
      ? "Добавьте NEXT_PUBLIC_YANDEX_MAPS_API_KEY, и здесь появится интерактивная карта."
      : "Сейчас можно открыть точку сервиса напрямую в Яндекс Картах.";

  return (
    <div className="vt-map-fallback flex h-full w-full items-center justify-center p-6 md:p-8">
      <div className="vt-map-fallback__card max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--steel)]">Карта</p>
        <h3 className="mt-4 text-2xl font-heading text-white">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
        <p className="mt-4 text-sm leading-7 text-slate-400">{CONTACT_INFO.address}</p>
        <a
          className="cta-shimmer mt-6 inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/8 px-6 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/12"
          data-tone="dark"
          href={CONTACT_INFO.mapOpenUrl}
          rel="noreferrer"
          target="_blank"
        >
          Открыть в Яндекс Картах
        </a>
      </div>
    </div>
  );
}

export function InteractiveMap() {
  const mapRootId = useId().replace(/:/g, "");
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<YandexMapInstance | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [hasScriptError, setHasScriptError] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!API_KEY || !scriptReady || hasScriptError || !mapNodeRef.current) {
      return;
    }

    const ymaps = window.ymaps;
    if (!ymaps) {
      return;
    }

    let cancelled = false;

    ymaps.ready(() => {
      if (cancelled || !mapNodeRef.current || mapRef.current) {
        return;
      }

      const markerLayout = ymaps.templateLayoutFactory.createClass(CUSTOM_MARKER_TEMPLATE);
      const map = new ymaps.Map(
        mapNodeRef.current,
        {
          center: MAP_COORDINATES,
          zoom: CONTACT_INFO.mapZoom,
          controls: [],
        },
        {
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        },
      );

      const placemark = new ymaps.Placemark(
        MAP_COORDINATES,
        {
          balloonContentHeader: CONTACT_INFO.companyName,
          balloonContentBody: CONTACT_INFO.address,
          hintContent: CONTACT_INFO.mapHint,
        },
        {
          iconLayout: markerLayout,
          iconShape: {
            type: "Rectangle",
            coordinates: [
              [-28, -70],
              [28, 0],
            ],
          },
        },
      );

      map.geoObjects.add(placemark);
      map.behaviors.disable("scrollZoom");

      const controlsToRemove = [
        "searchControl",
        "trafficControl",
        "typeSelector",
        "fullscreenControl",
        "zoomControl",
        "rulerControl",
        "geolocationControl",
      ];

      controlsToRemove.forEach((controlName) => {
        try {
          map.controls.remove(controlName);
        } catch {
          // The control might be absent depending on provider defaults.
        }
      });

      placemark.events?.add("click", () => {
        window.open(CONTACT_INFO.mapOpenUrl, "_blank", "noopener,noreferrer");
      });

      map.container.fitToViewport();
      mapRef.current = map;
      setIsMapReady(true);
    });

    return () => {
      cancelled = true;
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [hasScriptError, scriptReady]);

  if (!API_KEY) {
    return <MapFallback reason="missing-key" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(126,164,255,0.18),transparent_30%),linear-gradient(180deg,rgba(5,12,22,0.92),rgba(6,10,17,0.98))]">
      <Script
        id="yandex-maps-api"
        src={`https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`}
        strategy="afterInteractive"
        onLoad={() => {
          if (window.ymaps) {
            setScriptReady(true);
            return;
          }

          setHasScriptError(true);
        }}
        onError={() => {
          setHasScriptError(true);
        }}
      />

      {!isMapReady && !hasScriptError ? <MapSkeleton /> : null}
      {hasScriptError ? <MapFallback reason="load-error" /> : null}

      <div
        id={mapRootId}
        ref={mapNodeRef}
        aria-label={CONTACT_INFO.mapTitle}
        className={
          isMapReady && !hasScriptError
            ? "h-full w-full"
            : "pointer-events-none h-full w-full opacity-0"
        }
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(3,7,13,0),rgba(3,7,13,0.82))]" />
      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-[rgba(6,13,23,0.78)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[var(--steel)] backdrop-blur-md md:left-6 md:top-6">
        Volvo Titan
      </div>
    </div>
  );
}
