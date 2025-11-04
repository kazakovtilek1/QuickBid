"use client"

import { navLinksAbout } from "@/data/navLinksFooter";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function About() {

  const t = useTranslations("footer");

  return (
    <div>
      <div>
        <h3 className="text-white text-lg font-bold">{t("aboutTheCompany")}</h3>
        <div className="w-full sm:max-w-[250px] h-[2px] bg-[#FFC32A] mt-[7px] mb-3"></div>
        <nav className="flex flex-col gap-3">
          {navLinksAbout.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:underline text-xs font-bold text-[#D1D5DB]"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
