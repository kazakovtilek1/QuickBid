import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import "swiper/css";
import "swiper/css/autoplay";
import { AppProviders } from "@/app/AppProviders";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

import ru from "@/locales/ru.json";
import en from "@/locales/en.json";
import ky from "@/locales/ky.json";

type Locale = "ru" | "en" | "ky";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = await params;

  const siteUrl = "https://quickbid.kg";
  const titles: Record<Locale, string> = {
    ru: "QuickBid — Онлайн-аукцион",
    en: "QuickBid — Online Auction",
    ky: "QuickBid — Онлайн аукцион",
  };

  const descriptions: Record<Locale, string> = {
    ru: "Покупайте и продавайте товары на онлайн-аукционе QuickBid.",
    en: "Buy and sell products on QuickBid online auction.",
    ky: "QuickBid онлайн аукционунда товарларды сатып алыңыз жана сатыңыз.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        ru: `${siteUrl}/ru`,
        ky: `${siteUrl}/ky`,
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${siteUrl}/${locale}`,
      siteName: "QuickBid",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "QuickBid preview image",
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: [`${siteUrl}/og-image.jpg`],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await Promise.resolve(params);
  const messages = { ru, en, ky }[locale] || ru;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="transition-colors duration-300"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
