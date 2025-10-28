// components/EpisodeList.js
export default function EpisodeList({ episodes }) {
  if (!episodes || episodes.length === 0) {
    return <div>No episodes available</div>
  }

  return (
    <div className="episode-list">
      <h3>Episodes</h3>
      {episodes.slice(0, 10).map((episode) => (
        <div key={episode.mal_id} className="episode-item">
          <strong>Episode {episode.episode}:</strong> {episode.title}
        </div>
      ))}
    </div>
  )
}
