export interface LocalizedText {
  ru: string;
  en: string;
  ky: string;
  [key: string]: string;
}

export interface LocalizedDesc {
  ru: string[];
  en: string[];
  ky: string[];
  [key: string]: string[]; 
}

// Уточненный тип для локали
export type LocaleKey = keyof LocalizedText;

export function localizeText(
  text: LocalizedText | string | null | undefined, 
  locale: LocaleKey
): string {
  if (!text) {
    return "";
  }
  
  // 1. Сначала обрабатываем случай, когда text является простой строкой
  if (typeof text === 'string') {
    return text;
  }
  
  // 2. Теперь TypeScript знает, что text — это LocalizedText | null | undefined.
  
  if (locale in text) {
    return text[locale]; 
  }
  
  // 3. Fallback
  return text.ru;
}

export function localizeDesc(
  desc: LocalizedDesc | null | undefined, 
  locale: keyof LocalizedDesc, 
  index: number = 0
): string {
  if (!desc) {
    return "";
  }
  
  const arr = desc[locale] ?? desc.ru;
  
  return arr[index] ?? "";
}