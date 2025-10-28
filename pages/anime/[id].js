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

  useEffect(() => {
    if (id) {
      fetchAnimeDetail()
      fetchEpisodes()
    }
  }, [id])

  const fetchAnimeDetail = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
      setAnime(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching anime detail:', error)
      setLoading(false)
    }
  }

  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/episodes`)
      setEpisodes(response.data.data || [])
    } catch (error) {
      console.error('Error fetching episodes:', error)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading...</div>
      </Layout>
    )
  }

  if (!anime) {
    return (
      <Layout>
        <div className="loading">Anime not found</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="anime-detail">
        <div className="detail-header">
          <img 
            src={anime.images?.jpg?.large_image_url} 
            alt={anime.title}
            className="detail-poster"
          />
          <div className="detail-info">
            <h1>{anime.title}</h1>
            <p className="synopsis">{anime.synopsis}</p>
            
            <div className="info-grid">
              <div className="info-item">
                <strong>Score:</strong> {anime.score || 'N/A'}
              </div>
              <div className="info-item">
                <strong>Rank:</strong> {anime.rank || 'N/A'}
              </div>
              <div className="info-item">
                <strong>Popularity:</strong> {anime.popularity || 'N/A'}
              </div>
              <div className="info-item">
                <strong>Episodes:</strong> {anime.episodes || 'N/A'}
              </div>
              <div className="info-item">
                <strong>Status:</strong> {anime.status}
              </div>
              <div className="info-item">
                <strong>Aired:</strong> {anime.aired?.string || 'N/A'}
              </div>
              <div className="info-item">
                <strong>Rating:</strong> {anime.rating || 'N/A'}
              </div>
              <div className="info-item">
                <strong>Duration:</strong> {anime.duration || 'N/A'}
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <strong>Genres:</strong> {anime.genres?.map(g => g.name).join(', ')}
              </div>
              <div className="info-item">
                <strong>Studios:</strong> {anime.studios?.map(s => s.name).join(', ')}
              </div>
            </div>

            {anime.trailer?.embed_url && (
              <button 
                className="trailer-btn"
                onClick={() => setShowTrailer(true)}
              >
                Watch Trailer
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
