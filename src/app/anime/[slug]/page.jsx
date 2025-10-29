import Navigation from '@/app/components/Navigation';
import Image from 'next/image';
import Link from 'next/link';

async function getHighQualityImage(japaneseTitle) {
  if (japaneseTitle) {
    try {
      const jikanResponse = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(japaneseTitle)}&limit=1`);
      if (jikanResponse.ok) {
        const jikanResult = await jikanResponse.json();
        const imageUrl = jikanResult.data?.[0]?.images?.jpg?.large_image_url;
        if (imageUrl) return imageUrl;
      }
    } catch (error) {
      console.error("Jikan API error (japanese_title):", error);
    }
  }
  return null;
}

async function getDetailAnime(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/anime/${slug}`);
    if (!response.ok) {
      throw new Error('Gagal mengambil data anime utama');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Gagal mengambil detail anime:", error);
    return null;
  }
}

export default async function DetailAnimePage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { slug } = params;

  const animeData = await getDetailAnime(slug);

  if (!animeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950 to-purple-900 text-white flex flex-col justify-center items-center text-center">
        <div className="glass-effect p-8 rounded-2xl pink-glow max-w-md">
          <h1 className="text-2xl font-bold text-pink-300">Anime Tidak Ditemukan</h1>
          <p className="text-pink-100 mt-2">Data untuk anime ini tidak dapat dimuat.</p>
          <Navigation />
        </div>
      </div>
    );
  }

  const highQualityImage = await getHighQualityImage(animeData.japanese_title);

  const anime = {
    ...animeData,
    poster: highQualityImage || animeData.poster,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-950/50 to-purple-900/50 text-white">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-20"
        style={{ backgroundImage: `url(${anime.poster})` }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Navigation /> 
        
        {/* Main Content */}
        <div className="md:flex mt-8 glass-effect rounded-2xl p-6 pink-glow"> 
          {/* Poster */}
          <div className="md:w-1/3 justify-center flex mb-6 md:mb-0 md:pr-8 flex-shrink-0">
            <Image
              src={anime.poster}
              alt={anime.title}
              className="object-cover rounded-lg shadow-2xl hover-lift"
              width={400}
              height={600}
              priority
            />
          </div>
          
          {/* Details */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4 gradient-text">{anime.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-pink-200 bg-pink-900/30 px-3 py-1 rounded-full text-sm">
                TV • {anime.duration || '24m'}
              </span>
              {anime.rating && (
                <span className="text-yellow-300 bg-yellow-900/30 px-3 py-1 rounded-full text-sm">
                  ⭐ {anime.rating}
                </span>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Link
                href={`/watch/${anime.episode_lists?.[0]?.slug || ''}`}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 hover-lift pink-glow font-semibold"
              >
                <span>🎬 Watch Now</span>
              </Link>
              {anime.batch && anime.batch.slug && (
                <Link
                  href={`/download/${anime.batch.slug}`}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 hover-lift font-semibold"
                >
                  <span>📥 Download Batch</span>
                </Link>
              )}
            </div>
            
            {/* Synopsis */}
            <div className='mb-6'>
              <h3 className="text-xl font-semibold text-pink-200 mb-2">Sinopsis</h3>
              <p className="text-pink-100 leading-relaxed">
                {anime.synopsis || 'Tidak ada sinopsis tersedia.'}
              </p>
            </div>
            
            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6">
              <div className="bg-pink-900/20 rounded-lg p-3">
                <span className="font-semibold text-pink-300 block">Japanese</span>
                <span className="text-pink-100">{anime.japanese_title || 'N/A'}</span>
              </div>
              <div className="bg-pink-900/20 rounded-lg p-3">
                <span className="font-semibold text-pink-300 block">Producer</span>
                <span className="text-pink-100">{anime.produser || 'N/A'}</span>
              </div>
              <div className="bg-pink-900/20 rounded-lg p-3">
                <span className="font-semibold text-pink-300 block">Rating</span>
                <span className="text-pink-100">{anime.rating || 'N/A'}</span>
              </div>
              <div className="bg-pink-900/20 rounded-lg p-3">
                <span className="font-semibold text-pink-300 block">Release Date</span>
                <span className="text-pink-100">{anime.release_date || 'N/A'}</span>
              </div>
              <div className="bg-pink-900/20 rounded-lg p-3">
                <span className="font-semibold text-pink-300 block">Studio</span>
                <span className="text-pink-100">{anime.studio || 'N/A'}</span>
              </div>
              <div className="bg-pink-900/20 rounded-lg p-3">
                <span className="font-semibold text-pink-300 block">Status</span>
                <span className="text-pink-100">{anime.status || 'N/A'}</span>
              </div>
            </div>
            
            {/* Genres */}
            <div className="mt-4">
              <h3 className="font-semibold text-pink-300 block mb-3 text-lg">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres?.map((genre) => (
                  <span 
                    key={genre.slug} 
                    className="bg-pink-500/20 text-pink-100 px-4 py-2 rounded-full text-sm hover:bg-pink-500/30 transition-colors cursor-pointer border border-pink-500/30"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div> 
      </div> 

      {/* Episodes Section */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-8">
        <div className="glass-effect rounded-2xl p-6 pink-glow">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {anime.episode_lists && anime.episode_lists.length > 0 ? (
              anime.episode_lists.map((episode) => (
                <Link
                  key={episode.slug}
                  href={`/watch/${episode.slug}`}
                  className="bg-pink-900/20 rounded-xl p-4 flex items-center space-x-4 hover:bg-pink-800/30 transition-all duration-300 hover-lift border border-pink-500/20 group"
                >
                  <div className="w-16 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm">
                      {episode.episode_lists ? episode.episode.split(' ')[1] : `EP ${episode.episode_number}`}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-pink-200 transition-colors">
                      {episode.episode || `Episode ${episode.episode_number}`}
                    </h3>
                    <p className="text-xs text-pink-200">
                      {anime.duration || 'Unknown duration'}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-pink-200 py-8">
                Belum ada episode yang tersedia untuk anime ini.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
 }
