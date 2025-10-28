// pages/search.js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import AnimeCard from '../components/AnimeCard'
import axios from 'axios'

export default function Search() {
  const router = useRouter()
  const { q } = router.query
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (q) {
      performSearch()
    }
  }, [q])

  const performSearch = async () => {
    try {
      setLoading(true)
      setError(null)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jikan.moe/v4'
      const response = await axios.get(`${apiUrl}/anime?q=${encodeURIComponent(q)}&limit=20`)
      setAnimeList(response.data.data)
    } catch (error) {
      console.error('Error searching anime:', error)
      setError('Failed to search anime. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="search-results">
        <button onClick={() => router.back()} className="back-btn">
          ↩️ Back
        </button>

        <h1 style={{ color: 'white', marginBottom: '1rem' }}>
          🔍 Search Results for: "{q}"
        </h1>

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            Searching Anime...
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
            <button 
              onClick={performSearch}
              className="trailer-btn"
              style={{ marginTop: '1rem' }}
            >
              🔄 Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="results-count">
              Found {animeList.length} results
            </div>
            <div className="anime-grid">
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
            {animeList.length === 0 && (
              <div className="error" style={{ textAlign: 'center' }}>
                <h3>😞 No anime found</h3>
                <p>Try searching with different keywords</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
