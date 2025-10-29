"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from "react-icons/io";

const Navigation = () => {
    const router = useRouter()

    const handleNavigate = (e) => {
        e.preventDefault()
        router.back()
    }

    return (
        <button 
            className='
                text-pink-300 hover:text-pink-200 
                flex justify-center items-center gap-2 
                cursor-pointer transition-all duration-300
                bg-pink-900/20 hover:bg-pink-800/30
                px-4 py-2 rounded-full border border-pink-500/30
                hover:border-pink-400/40 hover:gap-3 group
            ' 
            onClick={handleNavigate}
        >
            <IoMdArrowRoundBack size={24} className="group-hover:-translate-x-1 transition-transform"/>
            <span className="font-medium">Kembali</span>
        </button>
    )
}

export default Navigation
