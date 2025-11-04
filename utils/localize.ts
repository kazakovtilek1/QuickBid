export interface LocalizedText {
  ru: string;
  en: string;
  ky: string;
}

export interface LocalizedDesc {
  ru: string[];
  en: string[];
  ky: string[];
}

// Функция для обычного текста
export function localizeText(text: LocalizedText, locale: string) {
  if (locale in text) {
    return text[locale as keyof LocalizedText];
  }
  return text.ru;
}

// Функция для массивов строк
export function localizeDesc(desc: LocalizedDesc, locale: string, index: number = 0): string {
  const arr = desc[locale as keyof LocalizedDesc] ?? desc.ru;
  return arr[index] ?? "";
}
