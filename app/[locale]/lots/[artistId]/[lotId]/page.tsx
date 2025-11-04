import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LotPageClient from "./LotPageClient";
import { artists } from "@/data/artists";
import { lots } from "@/data/lots";
import type { Artist } from "@/types/artist";
import type { Lot } from "@/types/lot";

// ISR — обновление раз в 60 секунд
export const revalidate = 60;

interface LotPageProps {
  params: {
    locale: string;
    artistId: string;
    lotId: string;
  };
}

// Задаём допустимые локали
const validLocales = ["ru", "en", "ky"] as const;
type Locale = (typeof validLocales)[number];

// Генерация метаданных
export async function generateMetadata({ params }: LotPageProps): Promise<Metadata> {
  const { locale, artistId, lotId } = params;

  if (!validLocales.includes(locale as Locale)) return { title: "Not Found" };

  const artist: Artist | undefined = artists.find(
    a => a.slug.toLowerCase() === artistId.toLowerCase()
  );

  const lot: Lot | undefined = lots.find(
    l => l.id.toLowerCase() === lotId.toLowerCase() && l.owner === artist?.id
  );

  if (!artist || !lot) return { title: "Not Found" };

  const localizedTitle = lot.title[locale as keyof typeof lot.title] ?? lot.title.ru;
  const localizedDesc = lot.description[locale as keyof typeof lot.description]?.[0] ?? "";

  return {
    metadataBase: new URL("https://yourdomain.com"), // заменить на свой домен
    title: `${localizedTitle} — ${artist.name[locale as keyof typeof artist.name]}`,
    description: localizedDesc,
    openGraph: {
      title: `${localizedTitle} — ${artist.name[locale as keyof typeof artist.name]}`,
      description: localizedDesc,
      images: [
        {
          url: lot.image[0],
          width: 1200,
          height: 630,
          alt: localizedTitle,
        },
      ],
    },
  };
}

// Основная страница
export default function LotPage({ params }: LotPageProps) {
  const { locale, artistId, lotId } = params;

  // Проверка валидного локал
  if (!validLocales.includes(locale as Locale)) return notFound();

  // Находим артиста
  const artist: Artist | undefined = artists.find(
    a => a.slug.toLowerCase() === artistId.toLowerCase()
  );
  if (!artist) return notFound();

  // Находим лот
  const lot: Lot | undefined = lots.find(
    l => l.id.toLowerCase() === lotId.toLowerCase() && l.owner === artist.id
  );
  if (!lot) return notFound();

  return (
    <LotPageClient
      artist={artist}
      lot={lot}
      locale={locale as Locale}
    />
  );
}
