import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./style.css";
import { QuizProvider } from "./tes/QuizContext";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tes Kepribadian Kamu",
  description:
    "Tes kepribadian kamu, untuk mengetahui apakah kamu seberapa banyak kamu memiliki sifat maskulin dan feminim. Tes ini hanya untuk hiburan.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://tes-kepribadian.vercel.app"),
  authors: [{ name: "Naufal AY", url: "https://naufaladityayahya.me" }],
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
