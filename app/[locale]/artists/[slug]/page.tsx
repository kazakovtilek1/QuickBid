import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtistPageClient from "./ArtistPageClient";
import { artistsApi } from "@/src/store/services/artistsApi";
import { lotsApi } from "@/src/store/services/lotsApi";
import { store } from "@/src/store/store";
import type { Artist } from "@/types/artist";
import type { Lot } from "@/types/lot";

export const revalidate = 60; 
const IMAGE_BASE_URL = "https://auction-backend-mlzq.onrender.com";

type ArtistPageParams = {
  locale: string;
  slug: string;
};

interface NextPageProps {
  params: ArtistPageParams; 
  searchParams: Record<string, string | string[] | undefined>;
}

type MetadataProps = { params: ArtistPageParams };


//  Получает данные артиста по SLUG, используя RTK Query
async function getArtistBySlugSSDF(slug: string, locale: string): Promise<Artist | undefined> {
  try {
    // Выполняем запрос RTK Query на сервере
    const { data: artists } = await store.dispatch(
      artistsApi.endpoints.getArtists.initiate(locale)
    );

    if (!artists) return undefined;
    
    // Фильтруем полученный список по slug
    return artists.find(a => a.slug.toLowerCase() === slug.toLowerCase());

  } catch (error) {
    console.error("Error fetching artist", error);
    return undefined;
  }
}

// Получает лоты по ID артиста, используя RTK Query
async function getLotsByArtistIdSSDF(artistId: string, locale: string): Promise<Lot[]> {
  try {
    const { data: allLots } = await store.dispatch(
      lotsApi.endpoints.getLots.initiate(locale)
    );

    if (!allLots) return [];
    
    // Фильтруем лоты по artistId
    return allLots.filter(l => l.artistId === artistId); 

  } catch (error) {
    console.error("Error fetching lots", error);
    return [];
  }
}


export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale, slug } = params;

  // Используем SSDF-функцию
  const artist = await getArtistBySlugSSDF(slug, locale);
  if (!artist) return { title: "Artist not found" };

  const name = artist.name[locale as keyof typeof artist.name] || artist.name.ru || 'Артист';
  const fullImageUrl = `${IMAGE_BASE_URL}${artist.photo}`;

  return {
    title: `${name} | Auction`,
    description: `Информация о ${name} и его лотах.`,
    openGraph: {
      title: `${name} | Auction`,
      description: `Лоты, представленные артистом ${name}`,
      images: [
        { url: fullImageUrl, width: 800, height: 600, alt: name } 
      ],
    },
  };
}


export default async function ArtistPage({ params }: NextPageProps) {
  const { locale, slug } = params;

  // 1. Получаем артиста по SLUG
  const artist = await getArtistBySlugSSDF(slug, locale);
  if (!artist) return notFound();

  // 2. Получаем лоты по ID артиста
  const artistLots = await getLotsByArtistIdSSDF(artist.id, locale);

  return (
    <ArtistPageClient 
      artist={artist} 
      artistLots={artistLots} 
      locale={locale} 
    />
  );
}