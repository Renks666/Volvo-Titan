import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Volvo Titan — Специализированный сервис Volvo в Москве";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #060d1a 0%, #0a1628 50%, #0d1f38 100%)",
          padding: "56px 64px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.35)",
              borderRadius: 8,
              padding: "6px 14px",
              color: "#93c5fd",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            С 1995 года · Москва
          </div>
        </div>

        {/* Heading */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          Volvo Titan
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            lineHeight: 1.4,
            marginBottom: 40,
            maxWidth: 700,
          }}
        >
          Специализированный сервис Volvo в Москве — диагностика, ТО, ремонт агрегатов
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#e2e8f0",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            +7 910 454 14 19
          </div>
          <div style={{ color: "#475569", fontSize: 16 }}>
            volvo-titan.ru
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
