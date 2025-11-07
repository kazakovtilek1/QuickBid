"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import LotCard from "@/components/lots/lotCard/LotCard";
import { localizeText } from "@/utils/localize";
import { useTranslations } from "next-intl";
import { useGetLotsQuery } from "@/src/store/services/lotsApi";
import { useGetArtistsQuery } from "@/src/store/services/artistsApi";
import type { Lot } from "@/types/lot";
import type { Artist } from "@/types/artist";

interface AllLotsProps {
  locale: string;
}

export default function AllLots({ locale }: AllLotsProps) {
  const t = useTranslations("common");
  const rawQuery = useSelector((state: RootState) => state.search.query);
  const query = rawQuery.toLowerCase().trim();

  // 1. ПОЛУЧЕНИЕ ДАННЫХ ЧЕРЕЗ RTK QUERY
  const { 
    data: fetchedLots, 
    isLoading: isLotsLoading, 
    isError: isLotsError 
  } = useGetLotsQuery(locale);
  
  const { 
    data: fetchedArtists, 
    isLoading: isArtistsLoading, 
    isError: isArtistsError 
  } = useGetArtistsQuery(locale);

  const isLoading = isLotsLoading || isArtistsLoading;
  const isError = isLotsError || isArtistsError;

  const artistsSource: Artist[] = fetchedArtists || [];
  const lotsSource: Lot[] = fetchedLots || [];
  
  // 2. ОБРАБОТКА СОСТОЯНИЙ
  if (isError) {
    return (
      <div className="px-2.5 xl:px-0 max-w-[1180px] mx-auto mt-6 text-center p-8 border border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20">
        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
          {t("errorLoadingData")}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t("tryAgainLater")}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-2.5 xl:px-0 max-w-[1180px] mx-auto mt-6 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-300">{t("loading")}...</p>
      </div>
    );
  }

  // 3. ФИЛЬТРАЦИЯ ЛОТОВ
  const filteredLots = lotsSource.filter((lot) => {
    // A) Фильтрация по названию лота (lot.name, а не lot.title)
    const matchesLotName = localizeText(lot.name, locale)
      .toLowerCase()
      .includes(query);

    // B) Фильтрация по имени артиста, связанного с лотом (lot.artistId, а не lot.owner)
    const lotArtist = artistsSource.find(a => a.id === lot.artistId);
    
    const matchesArtistName = lotArtist
      ? localizeText(lotArtist.name, locale).toLowerCase().includes(query)
      : false;
      
    // Учитываем также вложенный объект artist в лоте (если он есть)
    const matchesNestedArtistName = lot.artist
        ? localizeText(lot.artist.name, locale).toLowerCase().includes(query)
        : false;

    return matchesLotName || matchesArtistName || matchesNestedArtistName;
  });

  // 4. ДОБАВЛЕНИЕ ДАННЫХ АРТИСТА (Для LotCard требуется полный объект Artist)
  const lotsWithArtist = filteredLots
    .map((lot) => {
      // Ищем полную информацию об артисте
      const artist = artistsSource.find((a) => a.id === lot.artistId);
      
      // Возвращаем лот только если найден соответствующий артист
      return artist ? { lot, artist } : null;
    })
    // Отфильтровываем лоты, для которых не удалось найти артиста
    .filter((item): item is { lot: Lot; artist: Artist } => !!item);
    
  // 5. РЕНДЕРИНГ
  return (
    <div className="px-2.5 xl:px-0 max-w-[1180px] mx-auto">
      <h2 className="text-2xl font-medium mb-4">{t("lots")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {lotsWithArtist.length > 0 ? (
          lotsWithArtist.map(({ lot, artist }) => (
            <LotCard
              key={`${artist.id}-${lot.id}`}
              lot={lot}
              artist={artist}
              locale={locale}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            {t("notFoundLots")}
          </p>
        )}
      </div>
    </div>
  );
}