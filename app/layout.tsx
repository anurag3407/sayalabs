import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAYA LABS — Digital Craft Studio",
  description:
    "A premium web agency forging extraordinary digital experiences. We blend timeless design philosophy with cutting-edge technology to create websites and brands that command attention.",
  keywords: "web agency, design studio, web development, branding, UI/UX, digital experiences",
  openGraph: {
    title: "SAYA LABS — Digital Craft Studio",
    description: "Forging extraordinary digital experiences with precision and artistry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
