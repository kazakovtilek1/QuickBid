"use client";

import Image from "next/image";
import { Artist } from "@/types/artist";
import Link from "next/link";
import { localizeText } from "@/utils/localize";
import { useLocale } from "next-intl";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/artists/${artist.slug}`}>
      <div className="group cursor-pointer">
        {/* Внешняя рамка с белым отступом */}
        <div className="relative border border-[#E0DFDB] dark:border-[#545453] rounded-[4px] bg-white dark:bg-black/5 p-[6px] overflow-hidden">
          {/* Картинка */}
          <div className="relative w-full aspect-[3/4] rounded-[2px]">
            <Image
              src={artist.image}
              alt={localizeText(artist.name, locale)}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.06] rounded-md"
            />
          </div>

          {/* Шторка */}
          <div className="absolute bottom-0 left-0 right-0 h-[40px] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-white/80 dark:bg-black/80 flex items-center transition-all duration-300 rounded-t-md px-[10px]">
            <p className="text-xs font-normal flex gap-2 items-center">
              <Image
                src="/icons/artistNameIcon.svg"
                alt="Icon"
                width={18}
                height={18}
              />
              {localizeText(artist.name, locale)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
