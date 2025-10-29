import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./components/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

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
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-pink-950/50 via-purple-900/50 to-pink-900/50 min-h-screen`}>
        <NextAuthProvider session={session}>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
