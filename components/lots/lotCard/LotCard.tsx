"use client";

import Image from "next/image";
import { Lot } from "@/types/lot";
import { IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { Artist } from "@/types/artist";
import { useTranslations } from "next-intl";
import { localizeText } from "@/utils/localize";
import { useLocale } from "next-intl";

interface LotCardProps {
  lot: Lot;
  artist: Artist;
  locale: string;
}

export default function LotCard({ lot, artist }: LotCardProps) {
  const locale = useLocale();
  const localizedTitle = localizeText(lot.name, locale);
  const t = useTranslations("common");

  return (
    <Link href={`/${locale}/lots/${artist.slug}/${lot.id}`}>
      <div className="group cursor-pointer">
        {/* Внешняя рамка с белым отступом */}
        <div className="relative border border-[#E0DFDB] dark:border-[#545453] rounded-[4px] bg-white dark:bg-black/5 p-[6px] overflow-hidden">
          {/* Картинка */}
          <div className="relative w-full aspect-[3/4] rounded-[2px]">
            <Image
              src={lot.photos[0]}
              alt={localizedTitle}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.06] rounded-md"
            />
          </div>

          {/* Шторка */}
          <div className="absolute bottom-0 left-0 right-0 h-[130px] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-white/80 dark:bg-black/80 flex items-center transition-all duration-300 rounded-t-md px-[10px]">
            <div className="w-full flex flex-col gap-2 justify-between">
              <p className="text-sm font-normal flex gap-2 items-center">
                <IoPersonCircleOutline className="w-[20px] h-[20px] text-[#FBBF23]" />
                {localizeText(artist.name, locale)}
              </p>
              <p className="text-sm font-normal flex gap-2 items-center">
                <Image
                  src="/icons/artistNameIcon.svg"
                  alt="ArtistNameIcon"
                  width={18}
                  height={18}
                />
                {localizedTitle}
              </p>
              <p className="text-sm font-normal flex gap-2 items-center">
                <Image
                  src="/icons/moneyIcon.svg"
                  alt="MoneyIcon"
                  width={18}
                  height={18}
                />
                {`${lot.price} KGS`}
              </p>
              <button className="w-full flex justify-center gap-2.5 rounded-[4px] py-0.5 cursor-pointer bg-[#29A383] hover:bg-[#1c775e] transition text-white">
                <Image
                  src="/icons/buyBtnIcon.svg"
                  alt="BuyIcon"
                  width={20}
                  height={20}
                />
                {t("buy")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
