import React from 'react'
import AnimeCard from './AnimeCard'

const AnimeCompleted = ({ api }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 px-4 md:px-8">
      {api.map((anime) => (
        <AnimeCard
          key={anime.slug}
          title={anime.title}
          image={anime.poster}
          slug={anime.slug}
          episodeCount={anime.episode_count}
          rating={anime.rating} 
          views={anime.last_release_date}
          type="completed"
        />
      ))}
    </div>
  )
}

export default AnimeCompleted
