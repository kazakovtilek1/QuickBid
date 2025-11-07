import { LocalizedText, LocalizedDesc } from "@/utils/localize";

// 1. Сводный тип для Артиста, вложенного в Лот
export interface LotArtistSummary {
  id: string;
  name: LocalizedText;
  photo: string;
  slug: string;
  description: LocalizedText; 
  categoryId: string;
}

// 2. Сводный тип для Категории, вложенной в Лот
export interface LotCategorySummary {
  id: string;
  name: LocalizedText;
}

// 3. Главный тип Лота
export interface Lot {
  id: string;
  name: LocalizedText | null; 
  description: LocalizedDesc | null; 
  price: number;
  photos: string[]; 
  artistId: string;
  createdAt: string;
  updatedAt: string;
  artist: LotArtistSummary;
  categories: LotCategorySummary[];
}