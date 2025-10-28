// components/Layout.js
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <Link href="/" className="logo">
              🎌 AnimePink
            </Link>
            <form onSubmit={handleSearch} className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Cari anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="container">
        {children}
      </main>
    </div>
  )
}
