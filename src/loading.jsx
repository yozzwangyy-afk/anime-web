// Komponen untuk satu kartu skeleton (reusable)
function SkeletonCard() {
  return (
    <div className="bg-pink-900/20 rounded-xl overflow-hidden animate-pulse pink-glow">
      {/* Placeholder untuk Gambar */}
      <div className="aspect-[2/3] bg-pink-800/30"></div>
      <div className="p-4">
        {/* Placeholder untuk Judul */}
        <div className="h-5 bg-pink-800/30 rounded w-3/4 mb-2"></div>
        {/* Placeholder untuk Info Tambahan */}
        <div className="h-4 bg-pink-800/30 rounded w-1/2"></div>
      </div>
    </div>
  );
}

// Komponen utama untuk halaman loading
export default function Loading() {
  return (
    <>
      {/* Placeholder untuk HeroSection */}
      <div className="w-full h-[60vh] bg-pink-900/20 animate-pulse flex items-center justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col md:flex-row items-center glass-effect p-8 rounded-lg">
           <div className="w-full md:w-1/2 space-y-4">
              <div className="h-10 bg-pink-800/30 rounded w-3/4"></div>
              <div className="h-4 bg-pink-800/30 rounded w-full"></div>
              <div className="h-4 bg-pink-800/30 rounded w-5/6"></div>
              <div className="h-12 bg-pink-800/30 rounded-full w-full mt-4"></div>
           </div>
           <div className="w-full md:w-1/2 h-48 md:h-64 bg-pink-800/30 rounded-lg mt-4 md:mt-0 md:ml-8"></div>
        </div>
      </div>

      {/* Placeholder untuk Judul "Anime OnGoing" */}
      <div className="text-center my-8">
        <div className="h-8 w-48 bg-pink-800/30 rounded mx-auto mb-2"></div>
        <div className="w-24 h-1 bg-pink-800/30 mx-auto rounded-full"></div>
      </div>

      {/* Placeholder untuk Grid Anime OnGoing */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-12 mx-4 md:mx-24 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

      {/* Placeholder untuk Judul "Anime Complete" */}
      <div className="text-center my-8">
        <div className="h-8 w-48 bg-pink-800/30 rounded mx-auto mb-2"></div>
        <div className="w-24 h-1 bg-pink-800/30 mx-auto rounded-full"></div>
      </div>

      {/* Placeholder untuk Grid Anime Complete */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-12 mx-4 md:mx-24 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </>
  );
}
