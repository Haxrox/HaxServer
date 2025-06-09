// Next
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';

// Fluent UI

// Src
import FluentUIProvider from "@/components/FluentProvider";
import { routing } from '@/i18n/routing';
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomeLayout({
  children,
  params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
  }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <FluentUIProvider>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </FluentUIProvider>
      </body>
    </html>
  );
}