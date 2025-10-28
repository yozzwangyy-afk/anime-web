// pages/_app.js
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AnimeID - Website Anime Terlengkap</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="AnimeID - Website streaming anime terlengkap dengan kualitas HD. Tonton anime subtitle Indonesia gratis!" />
        <meta name="keywords" content="anime, streaming anime, anime subtitle indonesia, anime terbaru, animeid" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AnimeID - Website Anime Terlengkap" />
        <meta property="og:description" content="Streaming anime terlengkap dengan kualitas HD. Tonton anime subtitle Indonesia gratis!" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
