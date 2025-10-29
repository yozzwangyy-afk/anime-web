export default function Loading() {
  // Komponen untuk satu baris grup download
  const DownloadRowSkeleton = () => (
    <div className="bg-pink-900/20 rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border border-pink-500/20">
      <div className="mb-4 md:mb-0">
        <div className="h-7 w-32 bg-pink-800/30 rounded mb-2"></div>
        <div className="h-5 w-24 bg-pink-800/30 rounded"></div>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-10 w-28 bg-pink-800/30 rounded-lg"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950/50 to-purple-900/50 text-white animate-pulse">
      <div className="container mx-auto px-4 py-8">
        {/* Placeholder untuk Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="h-10 w-3/4 md:w-1/2 bg-pink-800/30 rounded-xl mx-auto mb-3"></div>
          <div className="h-6 w-1/3 md:w-1/4 bg-pink-800/30 rounded-xl mx-auto"></div>
        </div>

        {/* Placeholder untuk Judul Batch */}
        <div className="mb-8">
          <div className="h-8 w-1/2 bg-pink-800/30 rounded-xl"></div>
        </div>

        {/* Placeholder untuk daftar link download */}
        <div className="flex flex-col">
          <DownloadRowSkeleton />
          <DownloadRowSkeleton />
          <DownloadRowSkeleton />
        </div>
      </div>
    </div>
  );
}
