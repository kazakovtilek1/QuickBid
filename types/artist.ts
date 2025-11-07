import { Lot } from "./lot";
import { LocalizedDesc, LocalizedText } from "@/utils/localize";


export interface Artist {
  id: string;
  slug: string;
  name: LocalizedText | null;
  category: string;
  description: LocalizedDesc | null;
  photo: string;
  lot: Lot[];
}