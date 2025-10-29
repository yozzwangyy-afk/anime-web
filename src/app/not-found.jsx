import React from 'react';
import Navigation from './components/Navigation';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-950 to-purple-900 text-white p-4">
      <div className="text-center glass-effect p-8 rounded-2xl pink-glow max-w-md">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-200">
          Halaman Tidak Ditemukan!
        </h2>
        <p className="text-lg text-pink-100 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan.
        </p>

        <img
          src="./images/rem.gif"
          alt="Page Not Found GIF"
          className="max-w-xs rounded-lg shadow-lg mx-auto mb-6"
        />
        <Navigation />
      </div>
    </div>
  );
}

export default NotFound;
