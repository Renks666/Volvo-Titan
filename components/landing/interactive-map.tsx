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
  geocode: (query: string, options?: Record<string, unknown>) => Promise<YandexGeocodeResult>;
  ready: (callback: () => void) => void;
};

type YandexGeocodeResult = {
  geoObjects: {
    get: (index: number) => {
      geometry?: {
        getCoordinates: () => [number, number];
      };
    } | null;
  };
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
  options?: {
    set: (name: string, value: unknown) => void;
  };
  getZoom: () => number;
  setZoom: (zoom: number, options?: Record<string, unknown>) => void;
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
const MAP_MARKER_ADDRESS_LINE_1 = "Москва, ул. Измайловского";
const MAP_MARKER_ADDRESS_LINE_2 = "Зверинца 8, подъезд 1А";

const CUSTOM_MARKER_TEMPLATE = `
  <div class="vt-map-marker" role="presentation">
    <div class="vt-map-marker__pill">
      <div class="vt-map-marker__logo-frame">
        <span class="vt-map-marker__logo" aria-hidden="true"></span>
      </div>
      <div class="vt-map-marker__content">
        <span class="vt-map-marker__address">
          <span class="vt-map-marker__address-line">${MAP_MARKER_ADDRESS_LINE_1}</span>
          <span class="vt-map-marker__address-line">${MAP_MARKER_ADDRESS_LINE_2}</span>
        </span>
      </div>
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

  const handleZoom = (direction: "in" | "out") => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const currentZoom = map.getZoom();
    const nextZoom = direction === "in" ? currentZoom + 1 : currentZoom - 1;
    const boundedZoom = Math.min(19, Math.max(12, nextZoom));

    if (boundedZoom === currentZoom) {
      return;
    }

    map.setZoom(boundedZoom, { duration: 180 });
  };

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
      void (async () => {
        if (cancelled || !mapNodeRef.current || mapRef.current) {
          return;
        }

        let resolvedCoordinates = MAP_COORDINATES;

        try {
          const geocodeResult = await ymaps.geocode(CONTACT_INFO.address, {
            results: 1,
          });
          const firstGeoObject = geocodeResult.geoObjects.get(0);
          const geocodedCoordinates = firstGeoObject?.geometry?.getCoordinates();

          if (geocodedCoordinates) {
            resolvedCoordinates = geocodedCoordinates;
          }
        } catch {
          // Keep fallback coordinates if geocoding is temporarily unavailable.
        }

        if (cancelled || !mapNodeRef.current || mapRef.current) {
          return;
        }

        const markerLayout = ymaps.templateLayoutFactory.createClass(CUSTOM_MARKER_TEMPLATE);
        const map = new ymaps.Map(
          mapNodeRef.current,
          {
            center: resolvedCoordinates,
            zoom: CONTACT_INFO.mapZoom,
            controls: [],
          },
          {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          },
        );

        const placemark = new ymaps.Placemark(
          resolvedCoordinates,
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
                [-286, -40],
                [0, 40],
              ],
            },
          },
        );

        map.geoObjects.add(placemark);
        map.options?.set("minZoom", 12);
        map.options?.set("maxZoom", 19);

        const controlsToRemove = [
          "searchControl",
          "trafficControl",
          "typeSelector",
          "fullscreenControl",
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
      })();
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
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,rgba(7,13,24,0.06),rgba(7,13,24,0.12))]">
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

      <div className="absolute left-3 top-1/2 z-[5] flex -translate-y-1/2 flex-col gap-2 md:left-4">
        <button
          type="button"
          aria-label="Приблизить карту"
          onClick={() => handleZoom("in")}
          className="vt-map-zoom-button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="vt-map-zoom-icon">
            <path d="M12 7v10" />
            <path d="M7 12h10" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Отдалить карту"
          onClick={() => handleZoom("out")}
          className="vt-map-zoom-button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="vt-map-zoom-icon">
            <path d="M7 12h10" />
          </svg>
        </button>
      </div>
    </div>
  );
}
