import type { YandexOrgRating } from "@/lib/types";

function getStaticFallback(): YandexOrgRating | null {
  const value = process.env.YM_RATING_VALUE;
  const count = process.env.YM_RATING_COUNT;
  if (!value) return null;
  return { value: Number(value), count: Number(count ?? 0) };
}

export async function fetchYandexOrgRating(): Promise<YandexOrgRating | null> {
  const apiKey = process.env.YM_GEOSEARCH_API_KEY;
  const orgId = process.env.YM_ORG_ID;

  if (!apiKey || !orgId) return getStaticFallback();

  try {
    const url = new URL("https://search-maps.yandex.ru/v1/");
    url.searchParams.set("uri", `ymapsbm1://org?oid=${orgId}`);
    url.searchParams.set("lang", "ru_RU");
    url.searchParams.set("apikey", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return getStaticFallback();

    const data = await res.json();
    const meta = data?.features?.[0]?.properties?.CompanyMetaData;
    const rating = meta?.rating;

    if (!rating?.value) return getStaticFallback();

    return {
      value: Number(rating.value),
      count: Number(rating.count ?? 0),
    };
  } catch {
    return getStaticFallback();
  }
}
