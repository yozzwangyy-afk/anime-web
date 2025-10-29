import React from 'react'
import SearchInput from './SearchInput'
import Link from 'next/link'
import Image from 'next/image'
import UserActionButton from './UserActionButton'

const HeroSection = async () => {
  return (
    <div className="flex items-center justify-center pt-16 px-4 py-8">
      <div className="w-full max-w-6xl glass-effect lg:h-[500px] rounded-2xl overflow-hidden 
    grid grid-cols-1 lg:grid-cols-2 pink-glow
    shadow-2xl shadow-pink-500/10 border border-pink-500/20">

        {/* Konten Teks */}
        <div className="p-6 lg:p-12 flex flex-col justify-center relative 
      bg-gradient-to-br from-pink-900/20 to-purple-900/20 
      order-2 lg:order-1">

          <h1 className="text-3xl lg:text-5xl font-bold gradient-text mb-4 lg:mb-6 relative z-20">
            AnimeID 🎀
          </h1>
          <p className="text-pink-200 mb-6 lg:mb-8 text-lg lg:text-xl relative z-20 leading-relaxed">
            Temukan dunia anime terbaik dengan kualitas HD dan subtitle Indonesia. Streaming gratis tanpa iklan!
          </p>
          
          <SearchInput />
          
          <div className="text-sm text-pink-300 mb-6 lg:mb-8 relative z-20 line-clamp-2 lg:line-clamp-none bg-pink-900/20 p-4 rounded-xl border border-pink-500/20">
            <span className="font-semibold text-pink-200">Trending Search:</span> Demon Slayer, One Piece, Jujutsu Kaisen, Spy × Family, Attack on Titan, My Hero Academia
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 mb-6 relative z-20">
            <Link
              href="/anime"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full flex items-center justify-center font-semibold transition-all duration-300 hover-lift pink-glow text-center"
            >
              📚 Jelajahi Database Anime A-Z
            </Link>

            <Link 
              href={'https://sociabuzz.com/kaell22'} 
              target='_blank' 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-center font-semibold transition-all duration-300 hover-lift"
            >
              💝 Support AnimeID
            </Link>
          </div>
          
          <UserActionButton />
        </div>

        {/* Gambar */}
        <div className="relative h-[300px] lg:h-auto order-1 lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent z-10"></div>
          <Image
            width={600}
            height={600}
            src="/images/goku.gif"
            alt="Anime Character"
            className="absolute inset-0 w-full h-full object-cover"
            priority={true}
          />
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 z-20 bg-pink-500/20 backdrop-blur-sm rounded-full p-3 border border-pink-500/30">
            <span className="text-white text-sm">🔥 Trending</span>
          </div>
          <div className="absolute bottom-4 left-4 z-20 bg-purple-500/20 backdrop-blur-sm rounded-full p-3 border border-purple-500/30">
            <span className="text-white text-sm">⭐ Popular</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
