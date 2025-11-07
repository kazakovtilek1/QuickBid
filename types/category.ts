import { LocalizedText } from "@/utils/localize";

// 1. Сводный тип для Артиста, вложенного в категорию
export interface CategoryArtistSummary {
  id: string;
  name: LocalizedText;
  photo: string;
  slug: string;
  description: LocalizedText;
  categoryId: string;
}

// 2. Сводный тип для Лота, вложенного в категорию
export interface CategoryLotSummary {
  id: string;
  name: LocalizedText;
  description: string | null;
  price: number;
  photos: string[];
  artistId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: LocalizedText;
  artists: CategoryArtistSummary[];
  lots: CategoryLotSummary[];
}
