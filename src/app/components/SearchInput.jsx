'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchInput() {
  const router = useRouter();
  const searchRef = useRef()
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true)

    const keyword = searchRef.current.value

    if (keyword == "") {
      alert("Silakan ketik judul anime terlebih dahulu! 🎬")
    } else if (keyword.trim() == "") {
      alert("Jangan hanya mengetik spasi! ✨")
    } else {
      router.push(`/search/${keyword}`);
    }
    
    setTimeout(() => setIsSearching(false), 1000)
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md my-6">
      <div className="relative">
        <input
          type="text"
          ref={searchRef}
          placeholder="Cari judul anime favoritmu..."
          className="w-full bg-pink-900/20 border-2 border-pink-500/30 text-white rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-pink-400 focus:bg-pink-800/30 transition-all duration-300 placeholder-pink-200/50 glass-effect"
          disabled={isSearching}
        />
        <button
          type="submit"
          disabled={isSearching}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed pink-glow"
          aria-label="Cari Anime"
        >
          {isSearching ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
}
