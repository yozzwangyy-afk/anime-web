// pages/index.js
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import AnimeCard from '../components/AnimeCard'
import axios from 'axios'

export default function Home() {
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAnimeList()
  }, [])

  const fetchAnimeList = async () => {
    try {
      setError(null)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jikan.moe/v4'
      const response = await axios.get(`${apiUrl}/top/anime`)
      setAnimeList(response.data.data)
    } catch (error) {
      console.error('Error fetching anime list:', error)
      setError('Failed to load anime list. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading Anime...
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="error">
          <h3>😔 Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={fetchAnimeList}
            className="trailer-btn"
            style={{ marginTop: '1rem' }}
          >
            🔄 Try Again
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          🎌 Top Anime
        </h1>
        <p style={{ color: 'white', fontSize: '1.2rem' }}>
          Discover the most popular anime series
        </p>
      </div>
      
      <div className="anime-grid">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </Layout>
  )
}
