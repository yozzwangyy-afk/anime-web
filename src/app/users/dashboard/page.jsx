// app/users/dashboard/page.jsx
import Image from "next/image";
import { AuthUserSession } from "@/app/libs/auth-libs";
import { redirect } from "next/navigation";
import Link from "next/link";

async function DashboardPage() {
  const session = await AuthUserSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  // Ambil data user dari sesi
  const { name, email, image } = session;

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-950/50 via-purple-900/50 to-pink-900/50 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <Link 
          href={"/"} 
          className="text-pink-300 hover:text-pink-200 transition-colors bg-pink-900/20 p-2 rounded-full border border-pink-500/30 hover:bg-pink-800/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <Link
          href="/api/auth/signout"
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover-lift pink-glow"
        >
          🚪 Logout
        </Link>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center px-6 pt-4">
        <div className="relative">
          <Image
            src={image}
            alt="Foto Profil"
            width={120}
            height={120}
            className="rounded-full border-4 border-pink-500/30 pink-glow"
            priority
          />
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 pink-glow">
            <span className="text-white text-xs font-bold">⭐</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold gradient-text mt-6">
          {name}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <span className="bg-pink-500/20 text-pink-100 text-sm font-medium px-4 py-2 rounded-full border border-pink-500/30">
            🎌 Wibu Biasa
          </span>
          <span className="bg-purple-500/20 text-purple-100 text-sm font-medium px-4 py-2 rounded-full border border-purple-500/30">
            🆙 Lvl. 1
          </span>
          <span className="bg-pink-900/30 text-pink-200 text-sm font-medium px-4 py-2 rounded-full border border-pink-500/20 break-all max-w-xs">
            📧 {email}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="w-full max-w-2xl mx-auto mt-8 px-6 pt-8 border-t border-pink-500/20">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center glass-effect rounded-2xl p-4 pink-glow">
            <p className="text-3xl font-bold gradient-text">0</p>
            <p className="text-sm text-pink-200 mt-1">⏱️ Menit Menonton</p>
          </div>
          <div className="text-center glass-effect rounded-2xl p-4 pink-glow">
            <p className="text-3xl font-bold gradient-text">0</p>
            <p className="text-sm text-pink-200 mt-1">💬 Jumlah Komentar</p>
          </div>
          <div className="text-center glass-effect rounded-2xl p-4 pink-glow">
            <p className="text-3xl font-bold gradient-text">0</p>
            <p className="text-sm text-pink-200 mt-1">🎉 Bulan Bergabung</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-2xl mx-auto mt-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/users/dashboard/my-history"
            className="group glass-effect rounded-2xl p-6 text-center transition-all duration-300 hover-lift pink-glow border border-pink-500/20 hover:border-pink-400/40"
          >
            <div className="text-4xl mb-3">📺</div>
            <h3 className="text-xl font-bold text-white mb-2">Riwayat Tontonan</h3>
            <p className="text-pink-200 text-sm">Lihat anime yang sudah ditonton</p>
            <div className="mt-3 text-pink-300 group-hover:text-pink-200 transition-colors">
              → Jelajahi
            </div>
          </Link>

          <Link
            href="/users/dashboard/my-comment"
            className="group glass-effect rounded-2xl p-6 text-center transition-all duration-300 hover-lift border border-purple-500/20 hover:border-purple-400/40"
          >
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">Riwayat Komentar</h3>
            <p className="text-purple-200 text-sm">Lihat komentar yang sudah dibuat</p>
            <div className="mt-3 text-purple-300 group-hover:text-purple-200 transition-colors">
              → Lihat
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="w-full max-w-2xl mx-auto mt-8 px-6 pb-8">
        <div className="glass-effect rounded-2xl p-6 pink-glow">
          <h3 className="text-lg font-bold text-pink-200 mb-4">🎯 Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/anime"
              className="bg-pink-500/20 hover:bg-pink-500/30 text-pink-100 px-4 py-3 rounded-xl text-center transition-all duration-300 border border-pink-500/30 hover:border-pink-400/40"
            >
              🔍 Cari Anime
            </Link>
            <Link
              href="/"
              className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-100 px-4 py-3 rounded-xl text-center transition-all duration-300 border border-purple-500/30 hover:border-purple-400/40"
            >
              🏠 Beranda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
