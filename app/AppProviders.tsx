"use client"

import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/src/store/store';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

interface AppProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, Record<string, string>>;
}

export function AppProviders({ children, locale, messages }: AppProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
         <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </ReduxProvider>
  );
}
