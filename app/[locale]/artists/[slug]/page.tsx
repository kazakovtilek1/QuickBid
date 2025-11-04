import { Metadata } from "next";
import { notFound } from "next/navigation";
import { artists } from "@/data/artists";
import { lots } from "@/data/lots";
import ArtistPageClient from "./ArtistPageClient";

export const revalidate = 60; // ISR обновление каждые 60 секунд

interface ArtistPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Генерация метаданных (SEO)
export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const artist = artists.find((a) => a.slug.toLowerCase() === slug.toLowerCase());

  if (!artist) return { title: "Artist not found" };

  const name = artist.name[locale as keyof typeof artist.name] || artist.name.en;

  return {
    title: `${name} | Auction`,
    description: `Информация о ${name} и его лотах.`,
    openGraph: {
      title: `${name} | Auction`,
      description: `Лоты, представленные артистом ${name}`,
      images: [
        {
          url: artist.image,
          width: 800,
          height: 600,
          alt: name,
        },
      ],
    },
  };
}

// Серверная страница
export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug, locale } = await params;

  const artist = artists.find((a) => a.slug.toLowerCase() === slug.toLowerCase());
  if (!artist) return notFound();

  const artistLots = lots.filter((l) => l.owner === artist.id);

  return (
    <ArtistPageClient artist={artist} artistLots={artistLots} locale={locale} />
  );
}
