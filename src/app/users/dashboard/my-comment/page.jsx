import Navigation from '@/app/components/Dashboard/Navigation'
import React from 'react'
import Link from 'next/link'
import { FaQuoteLeft, FaClock, FaVideo, FaHeart, FaComment } from 'react-icons/fa';

// Data bohongan untuk daftar komentar
const myCommentsData = [
    {
        id: 1,
        animeTitle: 'Frieren: Beyond Journey\'s End',
        episodeInfo: 'Episode 5: "The Phantom of the Dead"',
        commentText: 'Episode ini sinematografinya keren banget, flow ceritanya juga dapet. Salah satu yang terbaik sejauh ini.',
        postedDate: '2025-10-21',
        likes: 12,
        replies: 3
    },
    {
        id: 2,
        animeTitle: 'Jujutsu Kaisen',
        episodeInfo: 'S2, Episode 10: "Pandemonium"',
        commentText: 'Gila, pertarungan Sukuna vs Jogo epik! Animasinya gokil abis.',
        postedDate: '2025-10-24',
        likes: 45,
        replies: 8
    },
    {
        id: 3,
        animeTitle: 'One Piece',
        episodeInfo: 'Episode 1080: "A Legendary Battle!"',
        commentText: 'Akhirnya liat Garp beraksi lagi. Keren banget kakek satu ini.',
        postedDate: '2025-10-22',
        likes: 23,
        replies: 5
    },
];

const Page = () => {
    return (
        <section className='relative px-6 py-4 min-h-screen bg-gradient-to-br from-pink-950/50 via-purple-900/50 to-pink-900/50 text-white'>
            {/* Komponen navigasi */}
            <Navigation />

            {/* Header Section */}
            <div className='text-center mb-8 mt-4'>
                <h1 className='text-4xl font-bold gradient-text mb-3'>My Comments</h1>
                <p className='text-pink-200 text-lg'>Lihat dan kelola semua komentar Anda</p>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Stats Overview */}
            <div className='max-w-4xl mx-auto mb-8'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-effect rounded-2xl p-4 text-center pink-glow">
                        <div className="text-2xl font-bold gradient-text">{myCommentsData.length}</div>
                        <div className="text-pink-200 text-sm">Total Komentar</div>
                    </div>
                    <div className="glass-effect rounded-2xl p-4 text-center pink-glow">
                        <div className="text-2xl font-bold gradient-text">
                            {myCommentsData.reduce((acc, comment) => acc + comment.likes, 0)}
                        </div>
                        <div className="text-pink-200 text-sm">Total Likes</div>
                    </div>
                    <div className="glass-effect rounded-2xl p-4 text-center pink-glow">
                        <div className="text-2xl font-bold gradient-text">
                            {myCommentsData.reduce((acc, comment) => acc + comment.replies, 0)}
                        </div>
                        <div className="text-pink-200 text-sm">Total Replies</div>
                    </div>
                </div>
            </div>

            {/* Comments Container */}
            <div className='max-w-4xl mx-auto pb-8'>
                {/* Comments List */}
                <div className='flex flex-col gap-6'>
                    {myCommentsData.length > 0 && myCommentsData.map((comment) => (
                        <div
                            key={comment.id}
                            className='glass-effect rounded-2xl p-6 pink-glow hover-lift transition-all duration-300 border border-pink-500/20 hover:border-pink-400/40'
                        >
                            {/* Anime/Episode Info */}
                            <Link
                                href="#"
                                className='group block mb-4'
                            >
                                <div className='flex items-center gap-3 text-pink-200 group-hover:text-pink-100 transition-colors'>
                                    <div className="bg-pink-500/20 p-2 rounded-lg border border-pink-500/30">
                                        <FaVideo className="text-pink-400" />
                                    </div>
                                    <div>
                                        <div className='font-semibold text-white group-hover:text-pink-300 transition-colors'>
                                            {comment.animeTitle}
                                        </div>
                                        <div className='text-sm text-pink-300'>
                                            {comment.episodeInfo}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Comment Content */}
                            <div className='flex gap-4 mb-4'>
                                <div className="flex-shrink-0">
                                    <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-3 rounded-xl">
                                        <FaQuoteLeft className='text-white text-lg' />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className='text-pink-100 text-base leading-relaxed'>
                                        "{comment.commentText}"
                                    </p>
                                </div>
                            </div>

                            {/* Comment Stats and Date */}
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-pink-500/20'>
                                {/* Stats */}
                                <div className='flex items-center gap-4 text-sm'>
                                    <div className='flex items-center gap-2 text-pink-300'>
                                        <FaHeart className="text-red-400" />
                                        <span>{comment.likes} likes</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-pink-300'>
                                        <FaComment className="text-blue-400" />
                                        <span>{comment.replies} replies</span>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className='flex items-center gap-2 text-xs text-pink-400 bg-pink-900/20 px-3 py-2 rounded-full border border-pink-500/20'>
                                    <FaClock />
                                    <span>
                                        {new Date(comment.postedDate).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-2 mt-4 pt-4 border-t border-pink-500/20'>
                                <button className='flex-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 px-4 py-2 rounded-lg text-sm transition-all duration-300 border border-pink-500/30 hover:border-pink-400/40'>
                                    ✏️ Edit
                                </button>
                                <button className='flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg text-sm transition-all duration-300 border border-red-500/30 hover:border-red-400/40'>
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {myCommentsData.length === 0 && (
                        <div className='glass-effect rounded-2xl p-12 text-center pink-glow'>
                            <div className="text-6xl mb-4">💬</div>
                            <h3 className='text-2xl font-bold text-pink-300 mb-3'>Belum Ada Komentar</h3>
                            <p className='text-pink-200 mb-6'>
                                Anda belum memposting komentar apapun. Mulai berdiskusi tentang anime favorit Anda!
                            </p>
                            <Link
                                href="/"
                                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover-lift inline-block"
                            >
                                Jelajahi Anime
                            </Link>
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {myCommentsData.length > 0 && (
                    <div className="text-center mt-8">
                        <button className="glass-effect text-pink-300 hover:text-pink-200 px-6 py-3 rounded-full border border-pink-500/30 hover:border-pink-400/40 transition-all duration-300 hover-lift">
                            📥 Load More Comments
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Page;
