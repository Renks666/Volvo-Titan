import { CONTACT_INFO, SITE_URL } from "@/lib/constants";

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: CONTACT_INFO.companyName,
    image: `${SITE_URL}/brand/volvo-titan-logo.jpg`,
    telephone: CONTACT_INFO.phoneDisplay,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_INFO.address,
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT_INFO.coordinates.latitude,
      longitude: CONTACT_INFO.coordinates.longitude,
    },
    sameAs: [CONTACT_INFO.whatsappUrl, CONTACT_INFO.telegramUrl],
    priceRange: "₽₽",
    areaServed: "Москва",
  };
}
