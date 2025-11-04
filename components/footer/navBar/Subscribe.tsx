"use client"

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Subscribe() {
  const t = useTranslations("footer");

  return (
    <div>
      <div>
        <h3 className="text-white text-lg font-bold">{t("subscribeToUs")}</h3>
        <div className="w-full sm:max-w-[250px] h-[2px] bg-[#FFC32A] mt-[7px] mb-3"></div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com/kassir.kg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/instagramIcon.svg"
                alt="Instagram"
                width={25}
                height={25}
              />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/telegramIcon.svg"
                alt="Telegram"
                width={25}
                height={25}
              />
            </a>
          </div>
          <div className="flex flex-col gap-3">
            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.kassirKg.clientapp&hl=ru"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/googlePlayIcon.svg"
                alt="Google Play"
                width={120}
                height={35}
              />
            </a>

            {/* App Store */}
            <a
              href="https://apps.apple.com/kg/app/kassir-kg/id6478946817"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/appStoreIcon.svg"
                alt="App Store"
                width={120}
                height={35}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
