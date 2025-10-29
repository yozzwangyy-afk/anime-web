import React from 'react'
import AnimeCard from './AnimeCard'

const AnimeOngoing = ({ api }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 px-4 md:px-8">
      {api.map((anime) => (
        <AnimeCard
          key={anime.slug}
          title={anime.title}
          image={anime.poster}
          slug={anime.slug}
          currentEpisode={anime.current_episode}
          views={anime.release_day}
          type="ongoing"
        />
      ))}
    </div>
  )
}

export default AnimeOngoing
