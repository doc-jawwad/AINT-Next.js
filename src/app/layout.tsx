import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Playfair_Display } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SiteEffects from "../components/SiteEffects";
import "./globals.css";
import "../styles/aint.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AINT Foundation – Community Interest Company",
    template: "%s | AINT Foundation CIC",
  },
  description:
    "Trauma-informed therapeutic support, community wellbeing training, and practical emotional tools. Without judgment. Without shame. Without fear.",
  metadataBase: new URL("https://aintfoundationcic.co.uk"),
  openGraph: {
    title: "AINT Foundation CIC",
    description:
      "Communities heal from the inside out — trauma-informed support and training.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${outfit.variable} ${cormorant.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://aintfoundationcic.co.uk" />
        <link
          rel="preload"
          as="image"
          href="/media/2026/05/Flowers-for-Hero-Section-of-AINT-Foundation-CIC-scaled.webp"
        />
      </head>
      <body>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
