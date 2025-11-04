import Image from "next/image";
import { useTranslations } from "next-intl";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobile?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  mobile = false,
}: SearchInputProps) {

  const t = useTranslations("header");

  const handleFocus = () => {
    const contentBlock = document.querySelector("#scroll-target");
    if (contentBlock) {
      contentBlock.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`${mobile ? "flex" : "hidden md:flex"} gap-6`}>
      {!mobile && (
        <p className="hidden lg:flex items-center gap-0.5">
          <Image
            src="/icons/phoneIcon.svg"
            alt="PhoneIcon"
            width={16}
            height={16}
            className="dark:invert"
          />
          +996 702 144 155
        </p>
      )}
      <div className="relative max-w-[300px]">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          placeholder={t("search")}
          className="pl-8 pr-4 py-1 border border-gray-300 dark:border-[#545453] rounded-[4px] focus:outline-orange-500 w-full"
        />
        <Image
          src="/icons/searchIcon.svg"
          alt="Search"
          width={14}
          height={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 dark:invert"
        />
      </div>
    </div>
  );
}
