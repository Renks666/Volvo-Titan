import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { BackgroundScene } from "@/components/background-scene";
import { SITE_URL } from "@/lib/constants";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Volvo Titan | Ремонт Volvo в Москве с 1995 года",
    description:
      "Специализированный сервис Volvo в Москве. Честная диагностика, гарантия и минимальная очередь.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/volvo-titan-logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${plusJakartaSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <BackgroundScene />
        {children}
        {process.env.NEXT_PUBLIC_YM_ID && (
          <>
            <Script
              id="ym-counter"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${process.env.NEXT_PUBLIC_YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`,
              }}
            />
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YM_ID}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
