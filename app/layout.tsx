import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./style.css";
import { QuizProvider } from "./tes/QuizContext";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700"],
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://tes-kepribadianmu.vercel.app"),

  title: {
    default: "Tes Kepribadian Kamu",
    template: "%s | Tes Kepribadian",
  },

  description:
    "Tes kepribadian online gratis untuk mengetahui kecenderungan sifat maskulin dan feminin dalam dirimu. Dibuat untuk hiburan dan refleksi diri.",

  keywords: [
    "tes kepribadian",
    "tes kepribadian online",
    "tes maskulin feminin",
    "kepribadian maskulin",
    "kepribadian feminin",
    "personality test",
    "tes psikologi hiburan",
  ],

  authors: [
    {
      name: "Naufal AY",
      url: "https://naufaladityayahya.me",
    },
  ],

  creator: "Naufal AY",
  publisher: "Naufal AY",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/apple-icon-tes-kepribadian.png",
  },

  openGraph: {
  url: "/",
  images: [
    { 
      url: "/images/og-tes-kepribadian.jpg", 
      width: 1200, 
      height: 630, 
      alt: "Tes Kepribadian Kamu" 
    }
  ]
},

  twitter: {
    card: "summary_large_image",
    title: "Tes Kepribadian Kamu",
    description:
      "Tes kepribadian online gratis untuk mengetahui kecenderungan sifat maskulin dan feminin dalam dirimu. Dibuat untuk hiburan dan refleksi diri.",
    images: ["/images/og-tes-kepribadian.jpg"],
  },

  alternates: {
    canonical: "https://tes-kepribadianmu.vercel.app",
  },

  category: "entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased`}>
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}
