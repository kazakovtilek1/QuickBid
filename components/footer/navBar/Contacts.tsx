"use client"

import { navLinksContacts } from "@/data/navLinksFooter";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Contacts() {

  const t = useTranslations("footer");

  return (
    <div>
      <h3 className="text-white text-lg font-bold">{t("contacts")}</h3>
      <div className="w-full sm:max-w-[250px] h-[2px] bg-[#FFC32A] mt-[7px] mb-3"></div>
      <div className="flex flex-col gap-2">
        {navLinksContacts.map((link, index) => {
          const isPhone = link.label.replace(/\s/g, "").startsWith("+996");
          const isClickable = link.icon || isPhone;

          if (isClickable) {
            return (
              <Link
                key={index}
                href={
                  isPhone ? `tel:${link.label.replace(/\s/g, "")}` : link.href
                }
                className="flex items-center gap-2 text-sm font-bold text-white hover:underline transition"
              >
                {link.icon && (
                  <Image
                    src={link.icon}
                    alt={`${link.label} icon`}
                    width={18}
                    height={18}
                  />
                )}
                <span>{link.label}</span>
              </Link>
            );
          }

          return (
            <div
              key={index}
              className="max-w-[250px] text-white text-sm font-bold flex items-center gap-2"
            >
              <span>{link.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
