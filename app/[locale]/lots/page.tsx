import AllLots from "@/components/lots/allLotsList/AllLots"
import type { Metadata } from "next"

// ISR — обновление раз в 60 секунд
export const revalidate = 60

interface LotsPageProps {
  params: {
    locale: string
  }
}

// Генерация метаданных динамически
export async function generateMetadata({ params }: LotsPageProps): Promise<Metadata> {
  const { locale } = params

  return {
    metadataBase: new URL("https://yourdomain.com"), // необходимо вставить свой домен
    title:
      locale === "ru"
        ? "Лоты — Онлайн-маркет знаменитостей"
        : locale === "en"
        ? "Lots — Celebrity market"
        : "Лоттор — Жылдыздардын маркети",
    description:
      locale === "ru"
        ? "Откройте все доступные лоты от известных артистов и публичных личностей."
        : locale === "en"
        ? "Discover all available lots from famous artists and public figures."
        : "Белгилүү артисттер жана коомдук инсандардын бардык лотторун көрүңүз.",
    openGraph: {
      title:
        locale === "ru"
          ? "Лоты — Онлайн-маркет знаменитостей"
          : locale === "en"
          ? "Lots — Celebrity market"
          : "Лоттор — Жылдыздардын маркети",
      description:
        locale === "ru"
          ? "Все доступные лоты с уникальной историей. Присоединяйтесь к покупкам!"
          : locale === "en"
          ? "All available lots with a unique story. Join the shopping!"
          : "Уникалдуу тарыхы бар бардык лоттор. Сатып алууга кошулуңуз!",
      images: [
        {
          url: "/images/og/lots-og.jpg", // нужно добавить свой баннер
          width: 1200,
          height: 630,
          alt: "Lots Page",
        },
      ],
    },
  }
}

// Основная страница
export default function LotsPage({ params }: LotsPageProps) {
  const { locale } = params

  return (
    <div className="max-w-[1180px] p-2.5 xl:p-0 mx-auto">
      <AllLots locale={locale} />
    </div>
  )
}
