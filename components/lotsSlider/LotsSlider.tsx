"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetSliderQuery } from "@/src/store/services/sliderApi";
import type { Slider } from "@/types/slider";

export default function Slider() {
  const t = useTranslations("common");
  const { data: sliders, isLoading, isError } = useGetSliderQuery();

  // 1. Обработка ошибки
  if (isError) {
    return (
      <p className="font-semibold text-red-600 dark:text-red-400 text-center py-4">
        {t("errorLoadingSlider") || t("errorLoadingData")}
      </p>
    );
  }

  // 2. Обработка загрузки
  if (isLoading) {
    return (
      <div className="bg-gray-200 dark:bg-[#2A2A2A] animate-pulse h-[400px] rounded-2xl max-w-[1180px] mx-auto" />
    );
  }

  // 3. Проверяем, что есть изображения
  const validSliders = sliders?.filter((s: Slider) => s.image) || [];
  if (validSliders.length === 0) return null;

  // 4. Основной рендеринг с Swiper
  return (
    <div className="px-2.5 lg:px-0 mx-auto max-w-[1180px] cursor-pointer overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {validSliders
          .map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full mx-auto aspect-[16/9] max-h-[550px] cursor-pointer rounded-2xl overflow-hidden">
                  <Image
                    src={`https://auction-backend-mlzq.onrender.com${slide.image}`}
                    alt="slider"
                    fill
                    priority
                    className="object-cover"
                  />
                  {slide.link && (
                    <Link
                      href={slide.link}
                      target="_blank"
                      className="absolute inset-0 z-10 block"
                      aria-label="navigateToLink"
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
