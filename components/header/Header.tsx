"use client";

import { useState, useEffect, useRef } from "react";
import SearchInput from "./navBar/SearchInput";
import { setSearchQuery } from "@/src/store/slices/searchSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import NavLinks from "./navBar/NavLinks";
import LanguageSwitcher from "./navBar/LanguageSwitcher";
import { FiMenu, FiX } from "react-icons/fi";
import { useDebounce } from "@/src/hooks/useDebounce";
import Link from "next/link";
import { ThemeSwitcher } from "./navBar/ThemeSwitcher";
import { usePathname } from "next/navigation";

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(searchValue, 400);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Сбрасываем поиск при смене страницы
  useEffect(() => {
    setSearchValue("");
    dispatch(setSearchQuery(""));
  }, [pathname, dispatch]);

  // Отправка значения поиска в Redux
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  // Закрытие меню при клике вне его
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 transition duration-300 p-2.5 xl:px-0 mb-5 bg-white border-b border-b-[#F0EFED] dark:bg-black dark:border-b-[#545453]">
      <div className="max-w-[1180px] mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo.svg" alt="LOGO" width={120} height={35} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <NavLinks />
        </div>

        {/* Burger Icon */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-white dark:bg-black shadow-md p-6 z-50 md:hidden"
          >
            <NavLinks mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
            <div className="mt-4">
              <SearchInput
                mobile
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Search */}
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <div className="flex gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
