import type { Metadata } from "next";
import "./globals.css";
import FluentUIProvider from "../components/FluentProvider";

export const metadata: Metadata = {
  title: "HaxServer",
  description: "Pointer to all web applications created by HaxTech",
  icons: {
    icon: "/Shark.png",
    shortcut: "/Shark.png",
    apple: "/Shark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FluentUIProvider>{children}</FluentUIProvider>
      </body>
    </html>
  );
}
