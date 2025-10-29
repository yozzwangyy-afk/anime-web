import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar, FaPlayCircle } from 'react-icons/fa'

const AnimeCard = ({ title, image, slug, currentEpisode, rating, views, episodeCount, type }) => {
  let episodeText = null;
  if (currentEpisode) {
    episodeText = currentEpisode.replace('Eps:', 'Eps ');
  } else if (episodeCount) {
    episodeText = `Eps ${episodeCount}`;
  }

  return (
    <Link
      href={`/anime/${slug}`}
      className="group block"
    >
      <div className="flex flex-col h-full">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-pink-900/20 to-purple-900/20">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-pink-500/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <FaPlayCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Badge Rating */}
          {rating && (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-yellow-400 backdrop-blur-sm border border-yellow-500/30">
              <FaStar className="w-3 h-3" />
              <span>{rating}</span>
            </div>
          )}

          {/* Badge Episode */}
          {episodeText && (
            <div className={`absolute bottom-3 left-3 z-10 rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm border ${
              type === 'ongoing' 
                ? 'bg-green-500/80 border-green-400/30' 
                : 'bg-blue-500/80 border-blue-400/30'
            }`}>
              {episodeText}
            </div>
          )}

          {/* Type Badge */}
          <div className={`absolute top-3 left-3 z-10 rounded-full px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm border ${
            type === 'ongoing' 
              ? 'bg-pink-500/80 border-pink-400/30' 
              : 'bg-purple-500/80 border-purple-400/30'
          }`}>
            {type === 'ongoing' ? '🟢 Ongoing' : '🟣 Complete'}
          </div>
        </div>

        <div className="mt-3 px-1">
          <h3 className="font-semibold text-sm text-white line-clamp-2 group-hover:text-pink-300 transition-colors duration-300 leading-tight">
            {title}
          </h3>
          
          {/* Additional Info */}
          {views && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-pink-200/80">
              <span>{type === 'ongoing' ? `📅 ${views}` : `🎯 ${views}`}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default AnimeCard
