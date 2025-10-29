import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./components/NextAuthProvider";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AnimeID - Streaming Anime Sub Indo",
  description: "Nikmati streaming anime terbaik dengan subtitle Indonesia. Koleksi lengkap anime ongoing dan completed.",
  keywords: "anime, streaming, sub indo, anime terbaru, anime completed",
  openGraph: {
    title: "AnimeID - Streaming Anime Sub Indo",
    description: "Nikmati streaming anime terbaik dengan subtitle Indonesia",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen`}>
        <NextAuthProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
