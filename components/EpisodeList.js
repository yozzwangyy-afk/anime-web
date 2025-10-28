// components/EpisodeList.js
export default function EpisodeList({ episodes }) {
  if (!episodes || episodes.length === 0) {
    return (
      <div className="episode-list">
        <h3>Episodes</h3>
        <div className="episode-item">
          No episodes information available
        </div>
      </div>
    )
  }

  return (
    <div className="episode-list">
      <h3>Episodes ({episodes.length})</h3>
      {episodes.slice(0, 15).map((episode) => (
        <div key={episode.mal_id} className="episode-item">
          <strong>Episode {episode.episode || 'N/A'}:</strong> {episode.title || 'No title'}
          {episode.aired && (
            <div style={{ fontSize: '0.9em', color: '#666', marginTop: '0.3rem' }}>
              📅 {new Date(episode.aired).toLocaleDateString()}
            </div>
          )}
        </div>
      ))}
      {episodes.length > 15 && (
        <div className="episode-item" style={{ textAlign: 'center', fontStyle: 'italic' }}>
          ... and {episodes.length - 15} more episodes
        </div>
      )}
    </div>
  )
}
