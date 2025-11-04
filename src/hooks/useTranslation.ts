"use client";

import { useParams } from "next/navigation";
import { translations } from "@/src/locales/translations";

export function useTranslation() {
  const params = useParams();

  const localeParam = Array.isArray(params.locale) ? params.locale[0] : params.locale;

  const lang = localeParam && Object.keys(translations).includes(localeParam) ? localeParam : "ru";

  function t(key: string) {
    const dictionary = translations[lang as keyof typeof translations];
    return dictionary[key as keyof typeof dictionary] || key;
  }

  return { t, lang };
}
