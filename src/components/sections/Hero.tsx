import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CalendarHeart, Stethoscope, Users, Pill, ShieldCheck } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Hero() {
  const { siteData } = useCMS();
  const heroData = siteData.hero;

  const sliderImages = [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Dokter Spesialis & Umum', value: '15+', icon: Stethoscope },
    { label: 'Pasien Dilayani /Bulan', value: '4.5k', icon: Users },
    { label: 'Layanan Terpadu', value: '10+', icon: Pill },
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden items-center flex min-h-screen">
      {/* Full Background Slider */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentImageIndex}
            src={sliderImages[currentImageIndex]}
            alt={`Background Fasilitas ${currentImageIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-white/90 lg:bg-transparent lg:bg-gradient-to-r lg:from-white/95 lg:via-white/80 lg:to-transparent z-10 transition-all duration-300"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 backdrop-blur-sm text-blue-800 text-sm font-semibold mb-6 border border-blue-200/50 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              {heroData.subtitle}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 drop-shadow-sm font-display tracking-tight whitespace-pre-wrap">
              {heroData.title}
              <span className="block text-blue-600 mt-2 filter drop-shadow-sm">{heroData.titleHighlight}</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-700 font-medium mb-8 leading-relaxed max-w-lg drop-shadow-sm">
              {heroData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#jadwal" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5">
                <CalendarHeart size={20} />
                Daftar Antrean Online
              </a>
              <a href="#layanan" className="bg-white/90 backdrop-blur-sm hover:bg-white text-blue-800 px-8 py-4 rounded-xl font-bold border-2 border-blue-100 flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Lihat Layanan
                <ArrowRight size={20} />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-300/50 relative">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon size={20} className="text-blue-600 hidden sm:block drop-shadow-sm" />
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 drop-shadow-sm">{stat.value}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 drop-shadow-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Floating Badge & Controls */}
          <div className="hidden lg:flex flex-col justify-end items-end h-[600px] w-full">
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex items-center gap-5 mb-16 border border-white/50"
            >
              <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-lg">Akreditasi Paripurna</h4>
                <p className="text-sm font-medium text-slate-600">Terstandarisasi Kemenkes RI</p>
              </div>
            </motion.div>

            {/* Desktop Slider Controls */}
            <div className="flex gap-3 bg-black/20 backdrop-blur-sm p-3 rounded-full border border-white/10">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                    idx === currentImageIndex 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/80 w-2.5'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 lg:hidden z-20">
         {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                idx === currentImageIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-blue-600/30 w-2.5'
              }`}
            />
          ))}
      </div>
    </section>
  );
}
