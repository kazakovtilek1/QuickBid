"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import ArtistCard from "@/components/artists/artistCard/ArtistCard";
import { artists } from "@/data/artists";
import { categories } from "@/data/categories";
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

  const filteredArtists = artists.filter((artist) => {
    const matchesCategory = selectedCategory
      ? artist.category === selectedCategory
      : true;
    const matchesQuery = localizeText(artist.name, locale)
      .toLowerCase()
      .includes(query);
    return matchesCategory && matchesQuery;
  });
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
              : "hover:bg-[#f5f5f5] dark:hover:bg-[#f5f5f5]/5"
          }`}
        >
          {t("all")}
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setSelectedCategory((prev) => (prev === cat.id ? null : cat.id))
            }
            className={`flex-shrink-0 px-3 py-1 rounded-md border border-[#E0DFDB] dark:border-[#545453] text-[#646463] transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-[#FBBF23] text-black hover:bg-[#ecb427]"
                : "hover:bg-[#f5f5f5] dark:hover:bg-[#f5f5f5]/5"
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
