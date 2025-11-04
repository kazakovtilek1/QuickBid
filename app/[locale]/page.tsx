import Home from "@/app/[locale]/HomeClient";

interface PageProps {
  params: { locale: string };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await Promise.resolve(params);
  const selectedLocale = locale || "ru";
  return <Home locale={selectedLocale} />;
}
