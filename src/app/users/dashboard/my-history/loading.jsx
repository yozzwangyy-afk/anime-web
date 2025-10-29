export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950/50 via-purple-900/50 to-pink-900/50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 w-64 bg-pink-800/30 rounded-xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 w-48 bg-pink-800/30 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="h-1 w-32 bg-pink-800/30 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-effect rounded-2xl p-6 animate-pulse">
              <div className="h-8 w-16 bg-pink-800/30 rounded-lg mx-auto mb-2"></div>
              <div className="h-4 w-24 bg-pink-800/30 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Filter Skeleton */}
        <div className="flex flex-wrap gap-4 justify-center mb-8 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-24 bg-pink-800/30 rounded-full"></div>
          ))}
        </div>

        {/* Watch History Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="group animate-pulse">
              {/* Image Skeleton */}
              <div className="aspect-[2/3] bg-gradient-to-br from-pink-800/30 to-purple-800/30 rounded-xl overflow-hidden mb-3 pink-glow" />
              
              {/* Title Skeleton */}
              <div className="h-4 bg-pink-800/30 rounded mb-2 w-4/5"></div>
              
              {/* Episode Info Skeleton */}
              <div className="h-3 bg-pink-800/30 rounded mb-1 w-1/2"></div>
              
              {/* Watch Date Skeleton */}
              <div className="h-3 bg-pink-800/30 rounded w-3/4"></div>
            </div>
          ))}
        </div>

        {/* Load More Skeleton */}
        <div className="text-center mt-8 animate-pulse">
          <div className="inline-block h-12 w-48 bg-pink-800/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
