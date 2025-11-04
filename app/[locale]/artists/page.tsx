import { Metadata } from "next";
import AllArtists from "@/components/artists/allArtistsList/AllArtists";

// ISR — обновление раз в 60 секунд
export const revalidate = 60;

interface ArtistsPageProps {
  params: {
    locale: string;
  };
}

// Генерация метаданных динамически
export async function generateMetadata({ params }: ArtistsPageProps): Promise<Metadata> {
  const { locale } = params;

  const titles = {
    ru: "Артисты | Аукцион",
    en: "Artists | Auction",
    ky: "Артисттер | Аукцион",
  };

  const descriptions = {
    ru: "Список артистов, участвующих в нашем аукционе.",
    en: "List of artists participating in our auction.",
    ky: "Биздин аукционго катышкан артисттердин тизмеси.",
  };

  return {
    title: titles[locale as keyof typeof titles] || "Artists",
    description: descriptions[locale as keyof typeof descriptions] || "Artists list",
  };
}

// Основная страница
export default async function ArtistsPage({ params }: ArtistsPageProps) {
  const { locale } = params;

  return (
    <div>
      <AllArtists locale={locale} />
    </div>
  );
}
