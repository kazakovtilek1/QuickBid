import { Metadata } from "next";
import { notFound } from "next/navigation";
import { artists } from "@/data/artists";
import { lots } from "@/data/lots";
import ArtistPageClient from "./ArtistPageClient";

export const revalidate = 60; // ISR

type ArtistPageParams = {
  locale: string;
  slug: string;
};

interface NextPageProps {
  params: Promise<ArtistPageParams>; 
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

type MetadataProps = NextPageProps;


// Генерация метаданных
export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const artist = artists.find(a => a.slug.toLowerCase() === slug.toLowerCase());
  if (!artist) return { title: "Artist not found" };

  const name = artist.name[locale as keyof typeof artist.name] || artist.name.ru;

  return {
    title: `${name} | Auction`,
    description: `Информация о ${name} и его лотах.`,
    openGraph: {
      title: `${name} | Auction`,
      description: `Лоты, представленные артистом ${name}`,
      images: [
        { url: artist.image, width: 800, height: 600, alt: name }
      ],
    },
  };
}

// Серверная страница
export default async function ArtistPage({ params, searchParams }: NextPageProps) {
  const { locale, slug } = await params;
  await searchParams; 

  const artist = artists.find(a => a.slug.toLowerCase() === slug.toLowerCase());
  if (!artist) return notFound();

  const artistLots = lots.filter(l => l.owner === artist.id);

  return <ArtistPageClient artist={artist} artistLots={artistLots} locale={locale} />;
}