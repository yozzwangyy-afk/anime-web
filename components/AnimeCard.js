// components/AnimeCard.js
import Link from 'next/link'

export default function AnimeCard({ anime }) {
  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <div className="anime-card">
        <img 
          src={anime.images?.jpg?.image_url} 
          alt={anime.title}
          className="anime-image"
        />
        <div className="anime-info">
          <h3 className="anime-title">{anime.title}</h3>
          <div className="anime-details">
            <p>Score: {anime.score || 'N/A'}</p>
            <p>Episodes: {anime.episodes || 'N/A'}</p>
            <p>Status: {anime.status}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
