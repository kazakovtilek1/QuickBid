import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale ?? 'ru';
  return {
    locale: currentLocale,
    messages: (await import(`./locales/${currentLocale}.json`)).default
  };
});
