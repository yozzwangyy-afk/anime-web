"use client"
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navigation = () => {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <button 
            onClick={handleBack} 
            className="text-pink-300 hover:text-pink-200 mb-6 inline-flex items-center gap-2 cursor-pointer transition-all duration-300 hover:gap-3 group bg-pink-900/20 px-4 py-2 rounded-full border border-pink-500/30 hover:bg-pink-800/30"
        >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Kembali</span>
        </button>
    )
}

export default Navigation
