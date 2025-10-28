// pages/index.js
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import AnimeCard from '../components/AnimeCard'
import axios from 'axios'

export default function Home() {
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnimeList()
  }, [])

  const fetchAnimeList = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime')
      setAnimeList(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching anime list:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="anime-grid">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </Layout>
  )
}
