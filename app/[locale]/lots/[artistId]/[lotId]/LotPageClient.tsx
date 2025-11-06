"use client";

import LotGallery from "@/components/imageGallery/LotGallery";
import { localizeText, localizeDesc } from "@/utils/localize";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { openModal } from "@/src/store/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import PurchaseModal from "@/components/purchaseModal/PurchaseModal";
import { Artist } from "@/types/artist";
import { Lot } from "@/types/lot";

interface LotPageClientProps {
  artist: Artist;
  lot: Lot;
  locale: keyof Artist["name"];
}

export default function LotPageClient({
  artist,
  lot,
  locale,
}: LotPageClientProps) {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.purchaseModal.open);
  const t = useTranslations("common");

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      openModal({
        lotId: lot.id,
        artistId: artist.id,
        lotTitle: localizeText(lot.title, locale),
        lotImage: lot.image[0],
        lotPrice: lot.price,
        lotCurrency: lot.currency,
      })
    );
  };

  return (
    <div className="max-w-[1180px] mx-auto px-2.5 lg:px-0">
      <div className="flex flex-col gap-10 md:flex-row">
        <LotGallery images={lot.image} />

        <div className="flex flex-col gap-3 justify-between">
          <div className="flex flex-col gap-5 flex-1">
            <h3 className="text-2xl font-medium">
              {localizeText(artist.name, locale)}
            </h3>
            <p className="text-base font-normal text-[#080800A1] dark:text-[#545453]">
              {t("owner")}: {localizeText(artist.name, locale)}
            </p>

            <div className="flex gap-3 border-b border-b-[#E2E1DE] py-2">
              <Image
                src="/icons/priceIcon.svg"
                alt={t("price")}
                width={40}
                height={40}
                className="dark:invert"
              />
              <div>
                <p className="text-xs font-normal text-[#080800A1]/63 dark:text-[#545453]">
                  {t("price")}
                </p>
                <p className="text-base font-normal">
                  {lot.price} {lot.currency}
                </p>
              </div>
            </div>

            <p>{localizeDesc(lot.description, locale, 0)}</p>
            <p>{localizeDesc(lot.description, locale, 1)}</p>
          </div>

          <button
            onClick={handleBuyClick}
            className="fixed bottom-0 left-0 w-full z-50 bg-[#29A383] hover:bg-[#1c775e] text-white text-base font-medium py-3 cursor-pointer rounded-lg md:static md:w-auto md:max-w-[300px] md:rounded-[6px] transition"
          >
            {t("buy")}
          </button>
        </div>
      </div>

      {isModalOpen && <PurchaseModal />}
    </div>
  );
}
