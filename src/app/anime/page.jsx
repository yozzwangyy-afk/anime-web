import React from 'react';
import AnimeListClient from '../components/AnimeListClient';
import Navigation from '../components/Navigation';

// Tambahkan ini untuk force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
    async function getAllAnime() {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/unlimited`, { 
                // HAPUS no-store, ganti dengan revalidate
                next: { revalidate: 3600 } // Cache 1 jam
            }); 
            
            if (!response.ok) {
                throw new Error(`Gagal mengambil data: ${response.status}`);
            }
            
            const result = await response.json();
            return result.data.list; 
            
        } catch (error) {
            console.error("Gagal mengambil data anime:", error);
            return [];
        }
    }
    
    const allAnimeData = await getAllAnime(); 
    
    const flattenedAnimeList = allAnimeData.flatMap(group => 
        group.animeList.map(anime => ({
            title: anime.title,
            href: anime.href
        }))
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-950/50 via-purple-900/50 to-pink-900/50 text-white p-4 md:p-8">
            <Navigation />
            
            <div className="text-center mb-12 mt-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                    Daftar Semua Anime
                </h1>
                <p className="text-lg text-pink-200 max-w-2xl mx-auto">
                    Jelajahi koleksi lengkap anime dari A sampai Z. Temukan anime favorit Anda dalam daftar kami yang terus diperbarui.
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="glass-effect rounded-2xl p-6 text-center pink-glow">
                    <div className="text-3xl font-bold text-pink-300 mb-2">
                        {flattenedAnimeList.length.toLocaleString()}
                    </div>
                    <div className="text-pink-100">Total Anime</div>
                </div>
                <div className="glass-effect rounded-2xl p-6 text-center pink-glow">
                    <div className="text-3xl font-bold text-purple-300 mb-2">
                        A - Z
                    </div>
                    <div className="text-pink-100">Kategori Lengkap</div>
                </div>
                <div className="glass-effect rounded-2xl p-6 text-center pink-glow">
                    <div className="text-3xl font-bold text-pink-300 mb-2">
                        📺
                    </div>
                    <div className="text-pink-100">Terus Diupdate</div>
                </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 pink-glow max-w-6xl mx-auto">
                <AnimeListClient initialData={flattenedAnimeList} />
            </div>

            <div className="text-center mt-12 text-pink-200">
                <p className="text-sm">
                    ❤️ Nikmati streaming anime berkualitas dengan subtitle Indonesia
                </p>
            </div>
        </div>
    );
}

export default Page;
