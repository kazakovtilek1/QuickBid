"use client";

import Image from "next/image";
import LotCard from "@/components/lots/lotCard/LotCard";
import { useTranslations } from "next-intl";
import { localizeText, localizeDesc } from "@/utils/localize";
import { Artist } from "@/types/artist";
import { Lot } from "@/types/lot";

interface ArtistPageClientProps {
  artist: Artist;
  artistLots: Lot[];
  locale: string;
}

export default function ArtistPageClient({ artist, artistLots, locale }: ArtistPageClientProps) {
  const t = useTranslations("common");

  return (
    <div className="max-w-[1180px] p-2.5 xl:p-0 mx-auto flex flex-col gap-10 sm:gap-15 md:gap-20 lg:gap-30">
      {/* Информация об артисте */}
      <div className="flex flex-col text-center md:text-start md:flex-row gap-2 md:gap-5 lg:gap-15">
        <div className="relative w-full self-center md:self-auto aspect-[3/4] 
          max-w-none
          sm:max-w-[260px]
          lg:max-w-[290px]">
          <Image
            src={artist.image}
            alt={localizeText(artist.name, locale)}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 290px"
          />
        </div>

        <div className="flex flex-col gap-10">
          <p className="text-xl font-bold">
            {localizeText(artist.name, locale)}
          </p>
          <p className="text-md font-semibold">
            {localizeDesc(artist.description, locale, 0)}
          </p>
          <p className="text-md font-normal">
            {localizeDesc(artist.description, locale, 1)}
          </p>
        </div>
      </div>

      {/* Секция лотов */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("lotsOfCelebrity")}</h2>

        {artistLots.length === 0 ? (
          <p className="text-gray-500">{t("thisCelebrityHasNoLots")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artistLots.map((lot) => (
              <LotCard
                key={`${artist.id}-${lot.id}`}
                lot={lot}
                artist={artist}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}