// app/signin/page.jsx
"use client";

import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Icons
import { FaGithub, FaGoogle, FaArrowLeft, FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

export default function SignInPage() {
  const [providers, setProviders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleSignIn = async (providerId) => {
    try {
      setIsLoading(true);
      setActiveProvider(providerId);
      
      await signIn(providerId, { 
        callbackUrl: '/' // Redirect ke home setelah login
      });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
      setActiveProvider(null);
    }
  };

  if (!providers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950/50 via-purple-900/50 to-pink-900/50 flex items-center justify-center">
        <div className="glass-effect rounded-2xl p-8 pink-glow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-pink-200">Memuat...</p>
        </div>
      </div>
    );
  }

  const providerConfigs = {
    google: {
      name: "Google",
      icon: <FaGoogle className="w-5 h-5" />,
      bgColor: "bg-white hover:bg-gray-50",
      textColor: "text-gray-700",
      borderColor: "border-gray-300",
      iconColor: "text-red-500"
    },
    github: {
      name: "GitHub",
      icon: <FaGithub className="w-5 h-5" />,
      bgColor: "bg-gray-800 hover:bg-gray-700",
      textColor: "text-white",
      borderColor: "border-gray-600",
      iconColor: "text-white"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950/50 via-purple-900/50 to-pink-900/50 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-pink-200 hover:text-white transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center pink-glow">
                  <FaHeart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <FaStar className="w-3 h-3 text-yellow-800" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold gradient-text mb-3">
              Welcome Back!
            </h1>
            <p className="text-pink-200 text-lg">
              Masuk untuk melanjutkan petualangan anime-mu
            </p>
          </div>

          {/* Login Card */}
          <div className="glass-effect rounded-2xl p-8 pink-glow">
            {/* Features List */}
            <div className="space-y-3 mb-8">
              {[
                "📚 Simpan riwayat tontonan",
                "❤️ Tambah ke favorit", 
                "🎯 Rekomendasi personal",
                "⚡ Sync across devices"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-pink-100">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-4">
              {Object.values(providers).map((provider) => {
                const config = providerConfigs[provider.id];
                return (
                  <button
                    key={provider.name}
                    onClick={() => handleSignIn(provider.id)}
                    disabled={isLoading}
                    className={`
                      w-full flex items-center justify-center gap-3 px-6 py-4 
                      rounded-xl font-semibold transition-all duration-300 
                      border-2 hover-lift disabled:opacity-50 disabled:cursor-not-allowed
                      ${config.bgColor} ${config.textColor} ${config.borderColor}
                      ${activeProvider === provider.id ? 'scale-95' : ''}
                    `}
                  >
                    {isLoading && activeProvider === provider.id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                    ) : (
                      <>
                        <span className={config.iconColor}>
                          {config.icon}
                        </span>
                        <span>
                          {isLoading && activeProvider === provider.id 
                            ? "Memproses..." 
                            : `Lanjutkan dengan ${config.name}`
                          }
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-pink-500/30"></div>
              <span className="px-3 text-pink-200 text-sm">atau</span>
              <div className="flex-1 border-t border-pink-500/30"></div>
            </div>

            {/* Guest Access */}
            <div className="text-center">
              <button
                onClick={() => router.push("/")}
                className="text-pink-300 hover:text-pink-200 transition-colors underline text-sm"
              >
                Lanjutkan sebagai tamu
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-pink-300">
              Dengan masuk, Anda menyetujui{" "}
              <Link href="/terms" className="underline hover:text-pink-200">
                Syarat Layanan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy" className="underline hover:text-pink-200">
                Kebijakan Privasi
              </Link>
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 mt-4 text-xs text-pink-400">
              <div className="text-center">
                <div className="font-bold text-pink-300">10K+</div>
                <div>Pengguna</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-pink-300">5K+</div>
                <div>Anime</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-pink-300">24/7</div>
                <div>Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 text-pink-950/50"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="currentColor"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="currentColor"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}
