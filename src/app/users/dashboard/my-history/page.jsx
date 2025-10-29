// File: src/app/dashboard/history/page.js

import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navigation from "@/app/components/Navigation";

/**
 * Mengubah slug episode menjadi format yang mudah dibaca.
 * contoh: "sxf-s3-episode-1-sub-indo" akan menjadi "Episode 1"
 */
function formatEpisodeId(slug) {
  if (!slug) return "";

  const match = slug.match(/episode-(\d+)/);
  if (match && match[1]) {
    const episodeNumber = match[1];
    return `Episode ${episodeNumber}`;
  }

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format tanggal menjadi format Indonesia
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

async function getWatchHistory(userId) {
  const history = await prisma.watchHistory.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      watchedAt: 'desc',
    },
    take: 50,
  });
  return history;
}

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    redirect("/signin");
  }

  const history = await getWatchHistory(currentUser.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950/50 via-purple-900/50 to-pink-900/50 text-white">
      <div className="container mx-auto p-6">
        <Navigation/>
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-3">Riwayat Menonton</h1>
          <p className="text-pink-200 text-lg">Lanjutkan tontonan dari tempat terakhir</p>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full pink-glow"></div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-4 text-center pink-glow">
            <div className="text-2xl font-bold gradient-text">{history.length}</div>
            <div className="text-pink-200 text-sm">Total Ditonton</div>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center pink-glow">
            <div className="text-2xl font-bold gradient-text">
              {new Set(history.map(item => item.animeId)).size}
            </div>
            <div className="text-pink-200 text-sm">Series Berbeda</div>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center pink-glow">
            <div className="text-2xl font-bold gradient-text">
              {history.length > 0 ? formatDate(history[0].watchedAt) : '-'}
            </div>
            <div className="text-pink-200 text-sm">Terakhir Nonton</div>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center pink-glow">
            <div className="text-2xl font-bold gradient-text">
              {history.filter(item => new Date(item.watchedAt).toDateString() === new Date().toDateString()).length}
            </div>
            <div className="text-pink-200 text-sm">Hari Ini</div>
          </div>
        </div>

        {history.length === 0 ? (
          /* Empty State */
          <div className="glass-effect rounded-2xl p-12 text-center pink-glow max-w-2xl mx-auto">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-bold text-pink-300 mb-4">Belum Ada Riwayat Tontonan</h2>
            <p className="text-pink-200 mb-6">
              Mulai jelajahi anime favorit Anda dan riwayat tontonan akan tercatat di sini!
            </p>
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover-lift inline-block"
            >
              Jelajahi Anime
            </Link>
          </div>
        ) : (
          /* History Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {history.map((item) => (
              <Link 
                href={`/watch/${item.episodeId}`} 
                key={item.id} 
                className="group block"
              >
                <div className="glass-effect rounded-xl p-3 pink-glow hover-lift transition-all duration-300 border border-pink-500/20 hover:border-pink-400/40">
                  {/* Image Container */}
                  <div className="aspect-[2/3] relative overflow-hidden rounded-lg mb-3 bg-gradient-to-br from-pink-900/20 to-purple-900/20">
                    <Image
                      src={item.image || '/images/placeholder-anime.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-pink-500/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <span className="text-white font-bold text-sm">▶️</span>
                      </div>
                    </div>

                    {/* Watched Badge */}
                    <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      ✓ Ditonton
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-pink-300 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-pink-300 font-medium capitalize">
                        {formatEpisodeId(item.episodeId)}
                      </p>
                      
                      <p className="text-xs text-pink-200/70">
                        {formatDate(item.watchedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More (if needed) */}
        {history.length >= 50 && (
          <div className="text-center mt-8">
            <button className="glass-effect text-pink-300 hover:text-pink-200 px-6 py-3 rounded-full border border-pink-500/30 hover:border-pink-400/40 transition-all duration-300 hover-lift">
              📥 Load More History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
