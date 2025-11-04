"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { lots } from "@/data/lots";
import { localizeText } from "@/utils/localize";


interface FeaturedLotsSliderProps {
  locale: string;
}

export default function FeaturedLotsSlider({ locale }: FeaturedLotsSliderProps) {
  const router = useRouter();

  if (lots.length === 0) return null;

  return (
    <div className="px-2.5 lg:px-0 mx-auto max-w-[1180px]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop
        slidesPerView={1}
      >
        {lots.map((lot) => (
          
          <SwiperSlide key={lot.id}>
            <div
              className="relative w-full mx-auto aspect-[16/9] max-h-[550px] cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => router.push(`/lots/${lot.id}`)}
            >
              <Image
                src={lot.image[0]}
                alt={lot.owner}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-center text-white text-center px-4">
                <h2 className="text-4xl font-bold mb-2">{localizeText(lot.title, locale)}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
