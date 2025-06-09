// Next
import { Locale, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
// import { notFound } from 'next/navigation';

// Src
import { routing } from '@/i18n/routing';
import "./globals.css";
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout({
  children,
  params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
  }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    // notFound();
  }

    // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}