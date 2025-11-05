import Home from "@/app/[locale]/HomeClient";

// Тип синхронных параметров
type RootPageParams = {
  locale: string;
};

interface PageProps {
  params: Promise<RootPageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>; 
}


export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const selectedLocale = locale || "ru"; 
  
  return <Home locale={selectedLocale} />;
}
