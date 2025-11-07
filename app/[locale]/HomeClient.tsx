"use client";

import AllArtists from "@/components/artists/allArtistsList/AllArtists";
import Banner from "@/components/banner/Banner";
import FeaturedLotsSlider from "@/components/lotsSlider/LotsSlider";
import AllLots from "@/components/lots/allLotsList/AllLots";
import { useRef } from "react";

interface HomeProps {
  locale: string;
}

export default function Home({ locale }: HomeProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <FeaturedLotsSlider locale={locale} />
      <div id="scroll-target" className="scroll-mt-[70px]" ref={contentRef}>
        <AllArtists locale={locale} />
        <Banner />
        <AllLots locale={locale} />
      </div>
    </div>
  );
}
