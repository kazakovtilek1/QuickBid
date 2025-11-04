import { Lot } from "./lot";

interface LocalizedName {
  ru: string;
  en: string;
  ky: string;
}

interface LocalizedDesc {
  ru: string[];
  en: string[];
  ky: string[];
}

export interface Artist {
  id: string;
  slug: string;
  name: LocalizedName;
  category: string;
  description: LocalizedDesc;
  image: string;
  lot: Lot[];
}
