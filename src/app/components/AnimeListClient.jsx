"use client";

import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';

const PAGE_SIZE = 50;

const AnimeListClient = ({ initialData }) => {
    const [displayedAnime, setDisplayedAnime] = useState(
        initialData.slice(0, PAGE_SIZE)
    );
    const [currentDataIndex, setCurrentDataIndex] = useState(PAGE_SIZE);
    const [hasMore, setHasMore] = useState(initialData.length > PAGE_SIZE);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreData = useCallback(() => {
        if (!hasMore || isLoading) return;

        setIsLoading(true);
        
        setTimeout(() => {
            const nextIndex = currentDataIndex + PAGE_SIZE;
            const newItems = initialData.slice(currentDataIndex, nextIndex);
            
            setDisplayedAnime(prev => [...prev, ...newItems]);
            setCurrentDataIndex(nextIndex);
            setIsLoading(false);

            if (nextIndex >= initialData.length) {
                setHasMore(false);
            }
        }, 500);

    }, [hasMore, isLoading, currentDataIndex, initialData]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >= 
                document.documentElement.offsetHeight - 500
            ) {
                loadMoreData();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreData]);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                {displayedAnime.map((anime, index) => (
                    <Link
                        key={anime.href + index}
                        href={anime.href} 
                        className="block p-4 rounded-xl transition-all duration-300 bg-pink-900/20 hover:bg-pink-800/30 border border-pink-500/20 hover:border-pink-400/40 hover-lift group"
                    >
                        <p className="text-sm font-medium text-pink-100 line-clamp-1 group-hover:text-white transition-colors">
                            {anime.title}
                        </p>
                        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                            <span className="text-xs text-pink-300">Klik untuk detail</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Loading Indicator */}
            {(isLoading && hasMore) && (
                <div className="text-center py-8">
                    <div className="inline-flex items-center gap-3 text-pink-300 bg-pink-900/20 px-6 py-3 rounded-full border border-pink-500/30">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-400"></div>
                        <span>Memuat lebih banyak anime...</span>
                    </div>
                </div>
            )}
            
            {/* End of List Indicator */}
            {(!hasMore && initialData.length > 0) && (
                <div className="text-center py-8 border-t border-pink-500/20 mt-6">
                    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-2xl border border-pink-500/20">
                        <div className="text-4xl mb-2">🎉</div>
                        <p className="text-pink-200 font-semibold">Semua anime sudah ditampilkan!</p>
                        <p className="text-pink-300 text-sm mt-1">Total {initialData.length} anime</p>
                    </div>
                </div>
            )}

            {(initialData.length === 0) && (
                 <div className="text-center py-12">
                    <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 max-w-md mx-auto">
                        <div className="text-4xl mb-2">😔</div>
                        <p className="text-red-300 font-semibold">Gagal memuat data anime</p>
                        <p className="text-red-400 text-sm mt-1">Silakan refresh halaman atau coba lagi nanti</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnimeListClient;
