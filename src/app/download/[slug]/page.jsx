import Navigation from '@/app/components/Navigation';
import Link from 'next/link';

async function getBatchData(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fullUrl = `${apiUrl}/batch/${slug}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Gagal mengambil data download batch. Status: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
}

export default async function DownloadPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { slug } = params;

  try {
    const batchData = await getBatchData(slug);

    if (!batchData || !batchData.downloadUrl || !batchData.downloadUrl.formats) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-950/50 to-purple-900/50 text-white flex flex-col justify-center items-center px-4">
          <div className="glass-effect rounded-2xl p-8 text-center pink-glow max-w-md">
            <h1 className="text-2xl font-bold text-pink-300 mb-4">Link Download Tidak Ditemukan</h1>
            <p className="text-pink-200 mb-6">Data ditemukan, tetapi tidak ada link download yang tersedia.</p>
            <Navigation />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950/50 to-purple-900/50 text-white py-8">
        <div className="container mx-auto px-4">
          <Navigation />
          
          {/* Header */}
          <div className="text-center mb-8 glass-effect rounded-2xl p-6 pink-glow">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{batchData.title}</h1>
            <p className="text-pink-200 text-lg">Download Batch Links</p>
          </div>

          {/* Download Sections */}
          {batchData.downloadUrl.formats.map((format, formatIndex) => (
            <div key={formatIndex} className="mb-8">
              <h2 className="text-2xl font-semibold text-pink-300 border-b-2 border-pink-500/30 pb-3 mb-6">
                {format.title}
              </h2>
              
              {format.qualities.map((quality, qualityIndex) => (
                <div key={qualityIndex} className="glass-effect rounded-xl p-6 mb-6 pink-glow hover-lift transition-all duration-300">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{quality.title}</h3>
                      <p className="text-pink-200 text-sm">
                        <span className="font-semibold">Size:</span> {quality.size}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {quality.urls.map((url, urlIndex) => (
                        <a
                          key={urlIndex}
                          href={url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-5 py-3 rounded-lg font-semibold transition-all duration-300 hover-lift text-sm min-w-[100px] text-center"
                        >
                          {url.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );

  } catch (error) {
    console.error("Error di halaman download:", error);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950/50 to-purple-900/50 text-white flex flex-col justify-center items-center px-4">
        <div className="glass-effect rounded-2xl p-8 text-center pink-glow max-w-md">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Terjadi Kesalahan</h1>
          <p className="text-pink-200 mb-6">Gagal memuat data download. Silakan coba lagi nanti.</p>
          <Link 
            href="/" 
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover-lift inline-block"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }
}
