"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLocale = pathname.split("/")[1];
  const [locale, setLocale] = useState(currentLocale.toUpperCase());

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value.toLowerCase();
    setLocale(selected.toUpperCase());

    const segments = pathname.split("/");
    segments[1] = selected;
    const newPath = segments.join("/") || "/";

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      disabled={isPending}
      className="px-2 py-1 text-base focus:outline-none hover:bg-[#ffe8ad] rounded-lg dark:hover:bg-[#FBBF23]"
    >
      <option value="RU">RU</option>
      <option value="EN">EN</option>
      <option value="KY">KY</option>
    </select>
  );
}
