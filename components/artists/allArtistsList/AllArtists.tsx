"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import ArtistCard from "@/components/artists/artistCard/ArtistCard";
import { useGetArtistsQuery } from "@/src/store/services/artistsApi";
import { useGetCategoriesQuery } from "@/src/store/services/categoriesApi";
import { Artist } from "@/types/artist";
import { Category } from "@/types/category";
import { localizeText } from "@/utils/localize";
import { useTranslations } from "next-intl";

interface AllArtistsProps {
  locale: string;
}

export default function AllArtists({ locale }: AllArtistsProps) {
  const t = useTranslations("common");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const rawQuery = useSelector((state: RootState) => state.search.query);
  const query = rawQuery.toLowerCase().trim();

  // 1. ПОЛУЧЕНИЕ ДАННЫХ ЧЕРЕЗ RTK QUERY
  const { 
    data: fetchedArtists, 
    isLoading: isArtistsLoading, 
    isError: isArtistsError 
  } = useGetArtistsQuery(locale);
  
  const { 
    data: fetchedCategories, 
    isLoading: isCategoriesLoading, 
    isError: isCategoriesError 
  } = useGetCategoriesQuery(locale);
  
  const isLoading = isArtistsLoading || isCategoriesLoading;
  const isError = isArtistsError || isCategoriesError;

  // Исходный массив для фильтрации (используем пустой массив, если данные еще не пришли)
  const artistsSource: Artist[] = fetchedArtists || [];
  const categoriesSource: Category[] = fetchedCategories || [];


  // 2. ФИЛЬТРАЦИЯ
  const filteredArtists = artistsSource.filter((artist) => {
    const matchesCategory = selectedCategory
      ? artist.category === selectedCategory
      : true;
      
    const matchesQuery = localizeText(artist.name, locale)
      .toLowerCase()
      .includes(query);
      
    return matchesCategory && matchesQuery;
  });

  // 3. ОБРАБОТКА СОСТОЯНИЯ ОШИБКИ
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
  
  // 4. ОБРАБОТКА СОСТОЯНИЯ ЗАГРУЗКИ
  if (isLoading) {
    return (
      <div className="px-2.5 xl:px-0 max-w-[1180px] mx-auto mt-6 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-300">{t("loading")}...</p>
      </div>
    );
  }

  // 5. ОСНОВНОЙ РЕНДЕРИНГ
  return (
    <div className="px-2.5 xl:px-0 max-w-[1180px] mx-auto mt-6">
      <h2 className="text-2xl font-medium">{t("artists")}</h2>

      {/* Кнопки фильтра */}
      <div className="flex gap-4 my-4 overflow-x-auto no-scrollbar py-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-3 py-1 rounded-md border border-[#E0DFDB] dark:border-[#545453] text-[#646463] transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === null
              ? "bg-[#FBBF23] text-black hover:bg-[#ecb427]"
              : "hover:bg-[#f5f5f5] dark:hover:bg-[#f5f5f5]/5 dark:text-gray-300"
          }`}
        >
          {t("all")}
        </button>

        {categoriesSource.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setSelectedCategory((prev) => (prev === cat.id ? null : cat.id))
            }
            className={`flex-shrink-0 px-3 py-1 rounded-md border border-[#E0DFDB] dark:border-[#545453] text-[#646463] transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-[#FBBF23] text-black hover:bg-[#ecb427]"
                : "hover:bg-[#f5f5f5] dark:hover:bg-[#f5f5f5]/5 dark:text-gray-300"
            }`}
          >
            {localizeText(cat.name, locale)}
          </button>
        ))}
      </div>

      {/* Сетка карточек артистов */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            {t("notFoundArtists")}
          </p>
        )}
      </div>
    </div>
  );
}