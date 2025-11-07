import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LotPageClient from "./LotPageClient";
import type { Artist } from "@/types/artist";
import type { Lot } from "@/types/lot";

import { store } from "@/src/store/store";
import { artistsApi } from "@/src/store/services/artistsApi";
import { lotsApi } from "@/src/store/services/lotsApi";
import type { LocalizedText, LocalizedDesc } from "@/utils/localize";

export const revalidate = 60; 
const IMAGE_BASE_URL = "https://auction-backend-mlzq.onrender.com"; 
const validLocales = ["ru", "en", "ky"] as const;
type Locale = (typeof validLocales)[number];


type LotPageParams = {
  locale: Locale;
  artistId: string;
  lotId: string;
};

interface LotPageProps {
  params: LotPageParams;
  searchParams: Record<string, string | string[] | undefined>;
}

type MetadataProps = { params: LotPageParams };


async function getLotAndArtist(params: LotPageParams): Promise<{ lot: Lot; artist: Artist } | null> {
  const { locale, artistId: artistSlug, lotId } = params;

  try {
    // 1. Получаем все лоты и всех артистов параллельно
    const [
      { data: lotsSource }, 
      { data: artistsSource }
    ] = await Promise.all([
      store.dispatch(lotsApi.endpoints.getLots.initiate(locale)),
      store.dispatch(artistsApi.endpoints.getArtists.initiate(locale)),
    ]);

    if (!lotsSource || !artistsSource) return null;

    // 2. Находим артиста по SLUG
    const artist = artistsSource.find(a => a.slug.toLowerCase() === artistSlug.toLowerCase());
    if (!artist) return null;

    // 3. Находим лот по ID и ownerId
    const lot = lotsSource.find(
      l => l.id.toLowerCase() === lotId.toLowerCase() && l.artistId === artist.id
    );

    if (!lot) return null;

    return { lot, artist };

  } catch (error) {
    console.error("Error fetching lot/artist", error);
    return null;
  }
}


export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = params;
  
  // Получаем лот и артиста
  const data = await getLotAndArtist(params);
  if (!data) return { title: "Not Found" };
  
  const { lot, artist } = data;

  const safeLocale = locale as keyof LocalizedText;
  
  const localizedTitle = (lot.name as LocalizedText)?.[safeLocale] ?? (lot.name as LocalizedText)?.ru ?? 'Лот';
  
  const localizedDesc = (lot.description as LocalizedDesc)?.[safeLocale]?.[0] ?? (lot.description as LocalizedDesc)?.ru?.[0] ?? "";
  
  const localizedArtistName = (artist.name as LocalizedText)?.[safeLocale] ?? (artist.name as LocalizedText)?.ru ?? 'Артист';
  
  const fullImageUrl = lot.photos && lot.photos.length > 0
    ? `${IMAGE_BASE_URL}${lot.photos[0]}`
    : "/placeholder.svg";


  return {
    metadataBase: new URL("https://yourdomain.com"), 
    title: `${localizedTitle} — ${localizedArtistName}`,
    description: localizedDesc,
    openGraph: {
      title: `${localizedTitle} — ${localizedArtistName}`,
      description: localizedDesc,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: localizedTitle,
        },
      ],
    },
  };
}

// Основная страница
export default async function LotPage({ params }: LotPageProps) {
  const { locale } = params;

  if (!validLocales.includes(locale)) return notFound();

  // Получаем лот и артиста
  const data = await getLotAndArtist(params);
  if (!data) return notFound();

  const { lot, artist } = data;

  return (
    <LotPageClient
      artist={artist}
      lot={lot}
      locale={locale}
    />
  );
}