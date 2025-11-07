"use client";

import { LocalizedText } from "@/utils/localize";
import LotGallery from "@/components/imageGallery/LotGallery";
import { localizeText, localizeDesc } from "@/utils/localize";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { openModal } from "@/src/store/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import PurchaseModal from "@/components/purchaseModal/PurchaseModal";
import type { Artist } from "@/types/artist";
import type { Lot } from "@/types/lot";

const IMAGE_BASE_URL = "https://auction-backend-mlzq.onrender.com";

interface LotPageClientProps {
  artist: Artist;
  lot: Lot;
  locale: keyof LocalizedText;
}

export default function LotPageClient({
  artist,
  lot,
  locale,
}: LotPageClientProps) {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.purchaseModal.open);
  const t = useTranslations("common");

  // Локализация текстов
  const localizedLotName = localizeText(lot.name, locale);
  const localizedArtistName = localizeText(artist.name, locale);
  const localizedDescription = localizeDesc(lot.description, locale);

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Формируем полный URL для модального окна
    const fullImageUrl = lot.photos && lot.photos.length > 0 
      ? `${IMAGE_BASE_URL}${lot.photos[0]}`
      : "/placeholder.svg";

    dispatch(
      openModal({
        lotId: lot.id,
        artistId: artist.id,
        lotTitle: localizedLotName,
        lotImage: fullImageUrl,
        lotPrice: lot.price,
      })
    );
  };

  return (
    <div className="max-w-[1180px] mx-auto px-2.5 lg:px-0">
      <div className="flex flex-col gap-10 md:flex-row">
        <LotGallery images={lot.photos} /> 

        <div className="flex flex-col gap-3 justify-between">
          <div className="flex flex-col gap-5 flex-1">
            
            {/* Имя Артиста */}
            <h3 className="text-2xl font-medium">
              {localizedArtistName}
            </h3>

            {/* Название Лота (Добавлено) */}
            <p className="text-xl font-normal text-gray-700 dark:text-gray-300">
              {localizedLotName}
            </p>

            {/* Владелец */}
            <p className="text-base font-normal text-[#080800A1] dark:text-[#545453]">
              {t("owner")}: {localizedArtistName}
            </p>

            {/* Цена */}
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
                  {lot.price} KGS
                </p>
              </div>
            </div>

            {/* Описание (Используем полное локализованное описание) */}
            <div className="text-base font-normal whitespace-pre-line">
              {localizedDescription}
            </div>
            
          </div>

          {/* Кнопка Покупки */}
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