// components/AnimeCard.js
import Link from 'next/link'

export default function AnimeCard({ anime }) {
  const fallbackImage = '/placeholder-image.jpg'
  
  return (
    <Link href={`/anime/${anime.mal_id}`} style={{ textDecoration: 'none' }}>
      <div className="anime-card">
        <img 
          src={anime.images?.jpg?.large_image_url || fallbackImage} 
          alt={anime.title}
          className="anime-image"
          onError={(e) => {
            e.target.src = fallbackImage
          }}
        />
        <div className="anime-info">
          <h3 className="anime-title">{anime.title}</h3>
          <div className="anime-details">
            {anime.score && (
              <div className="anime-score">
                ⭐ {anime.score}
              </div>
            )}
            <div>📺 Episodes: {anime.episodes || 'N/A'}</div>
            <div>📅 Status: {anime.status || 'N/A'}</div>
            <div>🎬 Type: {anime.type || 'N/A'}</div>
            {anime.genres && (
              <div>🏷️ {anime.genres.slice(0, 2).map(g => g.name).join(', ')}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
