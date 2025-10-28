// pages/anime/[id].js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import EpisodeList from '../../components/EpisodeList'
import TrailerModal from '../../components/TrailerModal'
import axios from 'axios'

export default function AnimeDetail() {
  const router = useRouter()
  const { id } = router.query
  const [anime, setAnime] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTrailer, setShowTrailer] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchAnimeData()
    }
  }, [id])

  const fetchAnimeData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jikan.moe/v4'
      
      const [detailResponse, episodesResponse] = await Promise.all([
        axios.get(`${apiUrl}/anime/${id}/full`),
        axios.get(`${apiUrl}/anime/${id}/episodes`)
      ])
      
      setAnime(detailResponse.data.data)
      setEpisodes(episodesResponse.data.data || [])
    } catch (error) {
      console.error('Error fetching anime data:', error)
      setError('Failed to load anime data. The anime might not exist or there was a network error.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading Anime Details...
        </div>
      </Layout>
    )
  }

  if (error || !anime) {
    return (
      <Layout>
        <div className="error">
          <h3>😔 Anime Not Found</h3>
          <p>{error || 'The anime you are looking for does not exist.'}</p>
          <button onClick={handleBack} className="trailer-btn" style={{ marginTop: '1rem' }}>
            ↩️ Go Back
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <button onClick={handleBack} className="back-btn">
        ↩️ Back
      </button>

      <div className="anime-detail">
        <div className="detail-header">
          <img 
            src={anime.images?.jpg?.large_image_url} 
            alt={anime.title}
            className="detail-poster"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg'
            }}
          />
          <div className="detail-info">
            <h1>{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <h2 style={{ color: '#666', marginBottom: '1rem', fontSize: '1.5rem' }}>
                {anime.title_english}
              </h2>
            )}
            
            <p className="synopsis">{anime.synopsis || 'No synopsis available.'}</p>
            
            <div className="info-grid">
              <div className="info-item">
                <strong>⭐ Score:</strong> {anime.score || 'N/A'} {anime.scored_by && `(${anime.scored_by.toLocaleString()} votes)`}
              </div>
              <div className="info-item">
                <strong>🏆 Rank:</strong> {anime.rank ? `#${anime.rank}` : 'N/A'}
              </div>
              <div className="info-item">
                <strong>📊 Popularity:</strong> {anime.popularity ? `#${anime.popularity}` : 'N/A'}
              </div>
              <div className="info-item">
                <strong>📺 Episodes:</strong> {anime.episodes || 'N/A'}
              </div>
              <div className="info-item">
                <strong>📅 Status:</strong> {anime.status || 'N/A'}
              </div>
              <div className="info-item">
                <strong>🎬 Type:</strong> {anime.type || 'N/A'}
              </div>
              <div className="info-item">
                <strong>📆 Aired:</strong> {anime.aired?.string || 'N/A'}
              </div>
              <div className="info-item">
                <strong>🔞 Rating:</strong> {anime.rating || 'N/A'}
              </div>
              <div className="info-item">
                <strong>⏱️ Duration:</strong> {anime.duration || 'N/A'}
              </div>
              <div className="info-item">
                <strong>🎞️ Source:</strong> {anime.source || 'N/A'}
              </div>
              <div className="info-item">
                <strong>📈 Season:</strong> {anime.season || 'N/A'} {anime.year || ''}
              </div>
              <div className="info-item">
                <strong>📺 Broadcast:</strong> {anime.broadcast?.string || 'N/A'}
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <strong>🏷️ Genres:</strong> {anime.genres?.map(g => g.name).join(', ') || 'N/A'}
              </div>
              <div className="info-item">
                <strong>🎬 Studios:</strong> {anime.studios?.map(s => s.name).join(', ') || 'N/A'}
              </div>
              <div className="info-item">
                <strong>👥 Producers:</strong> {anime.producers?.map(p => p.name).join(', ') || 'N/A'}
              </div>
              <div className="info-item">
                <strong>✍️ Authors:</strong> {anime.authors?.map(a => a.name).join(', ') || 'N/A'}
              </div>
            </div>

            {anime.trailer?.embed_url && (
              <button 
                className="trailer-btn"
                onClick={() => setShowTrailer(true)}
              >
                🎥 Watch Trailer
              </button>
            )}
          </div>
        </div>

        <EpisodeList episodes={episodes} />
      </div>

      {showTrailer && (
        <TrailerModal 
          trailer={anime.trailer}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </Layout>
  )
}
