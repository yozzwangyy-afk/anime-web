import AnimeCompleted from "@/app/components/AnimeCompleted";
import AnimeOngoing from "@/app/components/AnimeOngoing";
import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";

const Home = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    const response = await fetch(`${apiUrl}/home`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    const animeOngoing = result.data?.ongoing_anime || [];
    const animeComplete = result.data?.complete_anime || [];

    return (
      <div className="min-h-screen">
        <HeroSection />
        
        {/* Anime Ongoing Section */}
        <section className="py-12">
          <Header 
            title="Anime Sedang Tayang" 
            subtitle="Series anime yang masih berlanjut"
            showViewAll={true}
          />
          <AnimeOngoing api={animeOngoing}/>
        </section>

        {/* Anime Completed Section */}
        <section className="py-12 bg-pink-950/20">
          <Header 
            title="Anime Selesai" 
            subtitle="Series anime yang sudah lengkap"
            showViewAll={true}
          />
          <AnimeCompleted api={animeComplete}/>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-effect p-8 rounded-2xl pink-glow">
          <h2 className="text-2xl font-bold text-pink-300 mb-4">
            Gagal Memuat Data
          </h2>
          <p className="text-pink-100 mb-4">
            Terjadi kesalahan saat mengambil data anime.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
