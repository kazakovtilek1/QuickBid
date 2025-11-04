"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import LotCard from "@/components/lots/lotCard/LotCard";
import { localizeText } from "@/utils/localize";
import { useTranslations } from "next-intl";
import { lots } from "@/data/lots";
import { artists } from "@/data/artists";

interface AllLotsProps {
  locale: string;
}

export default function AllLots({ locale }: AllLotsProps) {

  const t = useTranslations("common");
  const rawQuery = useSelector((state: RootState) => state.search.query);
  const query = rawQuery.toLowerCase().trim();

 // Фильтруем лоты
  const filteredLots = lots.filter(
    (lot) =>
      localizeText(lot.title, locale).toLowerCase().includes(query) ||
      lot.owner.toLowerCase().includes(query)
  );

   // Находим артиста по owner (id)
  const lotsWithArtist = filteredLots
    .map((lot) => {
      const artist = artists.find((a) => a.id === lot.owner);
      return artist ? { lot, artist } : null;
    })
    .filter((item): item is { lot: typeof lots[0]; artist: typeof artists[0] } => !!item);
    
  return (
    <div className="px-2.5 xl:px-0 max-w-[1180px] mx-auto">
      <h2 className="text-2xl font-medium mb-4">{t("lots")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {lotsWithArtist.length > 0 ? (
          lotsWithArtist.map(({ lot, artist }) => (
            <LotCard
              key={`${artist?.id ?? "unknown"}-${lot.id}`}
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
