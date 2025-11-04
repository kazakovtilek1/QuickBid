"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface LotGalleryProps {
  images: string[];
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default function LotGallery({ images }: LotGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const isMobile = useIsMobile();

  return (
    <div
      className="flex flex-col md:flex-row gap-4 w-full max-w-[500px] max-h-[532px] md:h-auto mx-auto"
    >
      {/* Миниатюры */}
      <div className="w-full md:w-[60px] h-[80px] md:h-full order-2 md:order-1">
        <Swiper
          direction={isMobile ? "horizontal" : "vertical"}
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={5}
          className="h-full md:h-auto"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="!w-[60px] !h-[80px]">
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                className="relative w-[60px] h-[80px] overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`thumb-${i}`}
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Главное изображение */}
      <div
        onClick={() => setOpen(true)}
        className="relative w-full md:w-[430px] h-[300px] md:h-[532px] rounded-md overflow-hidden cursor-zoom-in order-1 md:order-2"
      >
        <Image
          src={images[index]}
          alt={`main-${index}`}
          fill
          sizes="(max-width: 768px) 100vw, 430px"
          className="object-contain"
          priority
        />
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
        plugins={isMobile ? [] : [Thumbnails]}
        thumbnails={isMobile ? undefined : { position: "start" }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
          },
        }}
      />
    </div>
  );
}
