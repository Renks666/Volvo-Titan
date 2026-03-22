import type { Metadata } from "next";
import { Manrope, Orbitron } from "next/font/google";

import { BackgroundScene } from "@/components/background-scene";
import { SITE_URL } from "@/lib/constants";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Volvo Titan | Сервис Volvo в Москве",
    template: "%s | Volvo Titan",
  },
  description:
    "Volvo Titan: ремонт Volvo в Москве с 1995 года. Диагностика, ТО, ремонт агрегатов и CRM для обработки заявок.",
  keywords: [
    "ремонт volvo москва",
    "автосервис volvo",
    "диагностика volvo",
    "сто volvo москва",
    "volvo titan",
  ],
  openGraph: {
    title: "Volvo Titan | Ремонт Volvo в Москве с 1995 года",
    description:
      "Премиальный автосервис Volvo в Москве: диагностика, ТО, электрика, ходовая, агрегаты и кузовной ремонт.",
    url: SITE_URL,
    siteName: "Volvo Titan",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/brand/volvo-titan-logo.jpg",
        width: 768,
        height: 768,
        alt: "Логотип Volvo Titan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volvo Titan | Ремонт Volvo в Москве с 1995 года",
    description:
      "Специализированный сервис Volvo в Москве. Честная диагностика, гарантия и минимальная очередь.",
    images: ["/brand/volvo-titan-logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/volvo-titan-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${orbitron.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <BackgroundScene />
        {children}
      </body>
    </html>
  );
}
