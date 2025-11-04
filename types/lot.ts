
interface LocalizedTitle {
  ru: string;
  en: string;
  ky: string;
}

interface LocalizedDesc {
  ru: string[];
  en: string[];
  ky: string[];
}

export interface Lot {
  id: string;
  title: LocalizedTitle;
  owner: string;
  price: number;
  currency: string;
  description: LocalizedDesc;
  image: string[];
}
