"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import Navigation from '@/app/components/Navigation';

function WatchPageSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white animate-pulse">
      <div className="container mx-auto px-4 py-8">

        <div className="aspect-video bg-slate-800 rounded-lg mb-4 shadow-lg"></div>

        <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
          <div className="h-7 w-48 bg-slate-700 rounded mb-3"></div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="h-9 w-28 bg-slate-700 rounded-md"></div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg mb-8">
          <div className="h-8 w-3/4 bg-slate-700 rounded mb-2"></div>
          <div className="flex justify-between items-center">
            <div className="h-5 w-44 bg-slate-700 rounded"></div>
            <div className="flex space-x-2">
              <div className="h-10 w-10 bg-slate-700 rounded-full"></div>
              <div className="h-10 w-10 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg">
          <div className="h-8 w-40 bg-slate-700 border-b-2 border-slate-700 pb-2 mb-4 rounded"></div>
          <div className="mb-4">
            <div className="h-7 w-16 bg-slate-700 rounded mb-2"></div>
            <div className="bg-slate-800 rounded-lg p-3 mb-3">
              <div className="h-5 w-20 bg-slate-700 rounded mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-7 w-24 bg-slate-700 rounded-md"></div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 mb-3">
              <div className="h-5 w-20 bg-slate-700 rounded mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-7 w-24 bg-slate-700 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ErrorDisplay({ message, animeSlug }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Terjadi Kesalahan</h1>
      <p className="text-neutral-400 mb-8">{message}</p>
      {animeSlug ? (
        <Link href={`/anime/${animeSlug}`} className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition">
          Kembali ke Halaman Anime
        </Link>
      ) : (
        <Link href="/" className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition">
          Kembali ke Beranda
        </Link>
      )}
    </div>
  );
}


export default function WatchPage({ params }) {
  // params may be a Promise when passed into a client component. Unwrap it with
  // React.use(params) (Next.js recommends this) before accessing its properties.
  const resolvedParams = React.use ? React.use(params) : params;
  // episodeSlug is a catch-all segment [...episodeSlug] so it's an array — take the last element
  const episodeSlugArray = resolvedParams?.episodeSlug;
  const episodeSlug = Array.isArray(episodeSlugArray) ? episodeSlugArray[episodeSlugArray.length - 1] : episodeSlugArray || null;

  const { data: session, status: sessionStatus } = useSession();

  const [episodeData, setEpisodeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStreamUrl, setCurrentStreamUrl] = useState(null);
  const [activeIdentifier, setActiveIdentifier] = useState('default-server');

  useEffect(() => {
    async function fetchEpisodeData() {
      setIsLoading(true);
      setError(null);
      setCurrentStreamUrl(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/episode/${episodeSlug}`);
        if (!response.ok) {
          throw new Error(`Gagal mengambil data. Status: ${response.status}`);
        }
        const result = await response.json();
        setEpisodeData(result.data);

        setCurrentStreamUrl(result.data.stream_url);
        setActiveIdentifier('default-server');

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEpisodeData();
  }, [episodeSlug]);

  // Save viewing history for authenticated users when episode data is available
  // DENGAN VERSI BARU INI:

// Save viewing history for authenticated users when episode data is available
// GANTI LAGI SELURUH BLOK useEffect INI

// Save viewing history for authenticated users when episode data is available
useEffect(() => {
  // Pastikan semua data yang dibutuhkan ada
  if (episodeData && sessionStatus === 'authenticated' && episodeSlug) {
    
    // 1. Ambil SLUG URL dari data episode
    // Ini adalah URL LENGKAP, cth: "https://otakudesu.best/anime/mushoku-eiyuu-sub-indo/"
    const animeSlugFromApi = episodeData.anime?.slug;
    const episodeTitle = episodeData.episode; // Judul episode, mis: "One Piece Episode 1"

    if (!animeSlugFromApi) {
      console.warn('Data anime slug (dari API) tidak ada, riwayat tidak disimpan.');
      return;
    }

    // 2. EKSTRAK slug bersih dari URL
    let cleanSlug = null;
    try {
      const url = new URL(animeSlugFromApi);
      const pathname = url.pathname; // Hasil: /anime/mushoku-eiyuu-sub-indo/
      // Pisahkan berdasarkan '/' dan hapus string kosong (dari / pertama dan terakhir)
      const parts = pathname.split('/').filter(Boolean); // Hasil: ['anime', 'mushoku-eiyuu-sub-indo']
      
      if (parts.length >= 2 && parts[0] === 'anime') {
        cleanSlug = parts[1]; // Hasil: 'mushoku-eiyuu-sub-indo'
      }
    } catch (e) {
      console.error("Gagal parse URL, mencoba fallback:", animeSlugFromApi, e);
      // Fallback jika datanya bukan URL lengkap
      const fallbackParts = animeSlugFromApi.split('/');
      cleanSlug = fallbackParts.pop() || fallbackParts.pop(); // ambil bagian terakhir yang tidak kosong
    }

    if (!cleanSlug) {
        console.warn('Tidak bisa mengekstrak slug bersih dari:', animeSlugFromApi);
        return;
    }
    
    // 3. Definisikan fungsi saveHistory (sekarang menggunakan cleanSlug)
    const saveHistory = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        let animeImage = null;
        let animeTitle = episodeTitle; // Fallback

        // 4. Fetch detail anime (menggunakan cleanSlug)
        try {
          // INI PERBAIKANNYA: fetch menggunakan cleanSlug
          const animeResponse = await fetch(`${apiUrl}/anime/${cleanSlug}`); 
          
          if (animeResponse.ok) {
            const animeResult = await animeResponse.json();
            animeImage = animeResult.data?.poster || null;
            animeTitle = animeResult.data?.title || episodeTitle;
            console.log("Berhasil fetch detail anime untuk gambar.");
          } else {
             console.warn(`Gagal fetch detail anime (${animeResponse.status}), riwayat akan disimpan tanpa gambar.`);
          }
        } catch (err) {
          console.error('Gagal mengambil detail anime untuk poster:', err);
        }

        // 5. Simpan ke database (menggunakan cleanSlug)
        await fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            animeId: cleanSlug, // INI PERBAIKANNYA: simpan slug bersih
            episodeId: episodeSlug,
            title: animeTitle, 
            image: animeImage,
          }),
        });
        
        // Log yang lebih akurat
        if (animeImage) {
            console.log('Riwayat tontonan disimpan (dengan gambar)!', { animeId: cleanSlug });
        } else {
            console.log('Riwayat tontonan disimpan (tanpa gambar).', { animeId: cleanSlug });
        }
        
      } catch (err) {
        console.error('Gagal menyimpan riwayat', err);
      }
    };

    // 6. Jalankan fungsi
    saveHistory();
  }
}, [episodeData, sessionStatus, episodeSlug]); // Dependencies tetap sama

  if (isLoading) {
    return <WatchPageSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} animeSlug={episodeData?.anime?.slug} />;
  }

  if (!episodeData) {
    return <ErrorDisplay message="Data episode tidak ditemukan." />;
  }

  // --- PERUBAHAN DIMULAI DI SINI ---
  // Kita siapkan list server sebelum me-render
  const serverButtons = [];

  // 1. Tambahkan tombol Default (jika ada)
  if (episodeData.stream_url) {
    serverButtons.push({
      key: 'default-server',
      displayText: 'Default (Auto)',
      url: episodeData.stream_url,
      identifier: 'default-server',
    });
  }

  let hdCounter = 1;
  let fhdCounter = 1;

  if (episodeData.download_urls) {
    Object.keys(episodeData.download_urls).forEach((format) => {
      episodeData.download_urls[format].forEach((quality) => {

        if (quality.resolution === '720p' || quality.resolution === '1080p') {
          quality.urls.forEach((providerUrl) => {

            let displayText = '';

            if (quality.resolution === '720p') {
              displayText = `HD ${hdCounter}`;
              hdCounter++;
            } else if (quality.resolution === '1080p') {
              displayText = `FHD ${fhdCounter}`;
              fhdCounter++;
            }

            const identifier = `${format}-${quality.resolution}-${providerUrl.provider}`;

            serverButtons.push({
              key: identifier,
              displayText: displayText,
              url: providerUrl.url,
              identifier: identifier,
            });
          });
        }
      });
    });
  }


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Navigation/>
        <div className="aspect-video bg-neutral-800 rounded-lg overflow-hidden mb-4 shadow-lg">
          {currentStreamUrl ? (
            <iframe
              src={currentStreamUrl}
              allowFullScreen
              scrolling="no"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              key={currentStreamUrl}
            ></iframe>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-4 bg-neutral-900">
              <PlayCircleIcon className="h-16 w-16 text-pink-500 mb-4" />
              <h2 className="text-xl font-bold">Server Tidak Tersedia</h2>
              <p className="text-neutral-400">Silakan pilih server lain di bawah.</p>
            </div>
          )}
        </div>

        <div className="bg-neutral-900 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-3">Pilih Server</h2>
          <div className='w-full h-full p-4 bg-neutral-800 rounded-lg shadow-xl'>
            <div className='mb-4 p-3 bg-neutral-700 rounded-md border border-yellow-500/50 flex items-start'>
              <p className='text-sm text-neutral-200 font-medium'>
                Server error? Coba beralih ke server lain di bawah ini. Jika masalah masih terjadi pada semua server yang tersedia, Anda disarankan untuk menggunakan opsi download.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 p-2 border-t border-neutral-700 pt-4">
              {serverButtons.map((button) => (
                <button
                  key={button.key}
                  type="button"
                  onClick={() => {
                    setCurrentStreamUrl(button.url);
                    setActiveIdentifier(button.identifier);
                  }}
                  className={`
                    px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out
                    flex items-center justify-center
                    ${activeIdentifier === button.identifier
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 ring-2 ring-pink-400'
                      : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-white'
                    }
                `}
                >
                  {button.identifier === 'download' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )}
                  {button.displayText}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-neutral-900 p-4 rounded-lg mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 truncate">{episodeData.episode}</h1>
          <div className="flex justify-between items-center">
            {episodeData.anime && episodeData.anime.slug && (
              <Link href={`/anime/${episodeData.anime.slug}`} className="text-sm text-pink-400 hover:underline">
                Kembali ke detail anime
              </Link>
            )}
            <div className="flex space-x-2">
              {episodeData.has_previous_episode && episodeData.previous_episode && (
                <Link href={`/watch/${episodeData.previous_episode.slug}`} className="bg-neutral-700 p-2 rounded-full hover:bg-pink-600 transition">
                  <ChevronLeftIcon className="h-6 w-6" />
                </Link>
              )}
              {episodeData.has_next_episode && episodeData.next_episode && (
                <Link href={`/watch/${episodeData.next_episode.slug}`} className="bg-neutral-700 p-2 rounded-full hover:bg-pink-600 transition">
                  <ChevronRightIcon className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-pink-500 border-b-2 border-neutral-700 pb-2 mb-4">
            Download Links
          </h2>
          {episodeData.download_urls && Object.keys(episodeData.download_urls).length > 0 ? (
            Object.keys(episodeData.download_urls).map((format) => (
              <div key={format} className="mb-4">
                <h3 className="font-bold text-lg uppercase text-neutral-300 mb-2">{format}</h3>
                {episodeData.download_urls[format].map((download, downloadIndex) => (
                  <div key={downloadIndex} className="bg-neutral-800 rounded-lg p-3 mb-3">
                    <p className="font-semibold text-white mb-2">{download.resolution}</p>
                    <div className="flex flex-wrap gap-2">
                      {download.urls.map((link) => (
                        <a
                          key={link.provider}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition"
                        >
                          {link.provider}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-neutral-500">Tidak ada link download tersedia.</p>
          )}
        </div>
      </div>
    </div>
  );
}