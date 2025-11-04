import Link from "next/link";
import { navLinksHeader } from "@/data/navLinksHeader";
import { useTranslations } from "next-intl";

interface NavLinksProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({
  mobile = false,
  onLinkClick,
}: NavLinksProps) {
  
  const t = useTranslations("header");

  return (
    <nav
      className={`flex ${mobile ? "flex-col gap-4" : "gap-5 items-center px-1"}`}
    >
      {navLinksHeader.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={`font-normal border-b-2 border-transparent hover:border-[#FFC32A] transition ${
            link.label === "Главная"
              ? "text-lg lg:text-xl"
              : "text-md lg:text-lg"
          }`}
        >
          {t(link.label)}
        </Link>
      ))}
    </nav>
  );
}
