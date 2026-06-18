import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Film } from 'lucide-react';

export default function Galeri() {
  const [activeTab, setActiveTab] = useState('foto');

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail?.page === 'galeri' && e.detail?.tabId) setActiveTab(e.detail.tabId);
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  return (
    <section id="galeri" className="pt-36 pb-24 min-h-[85vh] bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Dokumentasi</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Galeri Puskesmas</h2>
        </div>

        <div className="flex justify-center mb-10 gap-4">
          <button onClick={() => setActiveTab('foto')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-colors ${activeTab === 'foto' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}><ImageIcon size={18}/> Foto Kegiatan</button>
          <button onClick={() => setActiveTab('video')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-colors ${activeTab === 'video' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}><Film size={18}/> Video Edukasi</button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'foto' && (
            <motion.div key="foto" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 1, title: 'Kegiatan Posyandu', sub: 'Layanan Balita', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600' },
                  { id: 2, title: 'Pemeriksaan Kesehatan Lengkap', sub: 'Layanan Umum', img: 'https://plus.unsplash.com/premium_photo-1661764835694-ee2643a1a364?auto=format&fit=crop&q=80&w=600' },
                  { id: 3, title: 'Edukasi Kesehatan Sekolah', sub: 'Kegiatan UKM', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600' },
                  { id: 4, title: 'Layanan Gigi & Mulut', sub: 'Poli Gigi', img: 'https://images.unsplash.com/photo-1606811841689-1372dfcb1c76?auto=format&fit=crop&q=80&w=600' },
                  { id: 5, title: 'Penyuluhan Stunting', sub: 'Program Gizi', img: 'https://images.unsplash.com/photo-1536640712-4d4c36ef0e52?auto=format&fit=crop&q=80&w=600' },
                  { id: 6, title: 'Fasilitas Puskesmas', sub: 'Ruang Rawat', img: 'https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?auto=format&fit=crop&q=80&w=600' },
                ].map(item => (
                  <div key={item.id} className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 flex items-center justify-center group relative cursor-pointer">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-white font-bold text-lg leading-tight mb-1">{item.title}</span>
                      <span className="text-blue-300 text-sm font-semibold">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'video' && (
            <motion.div key="video" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {[1,2].map(i => (
                  <div key={i} className="aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex items-center justify-center relative group shadow-lg">
                    <Film size={48} className="text-slate-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 cursor-pointer pl-1">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                       <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">Video Edukasi</span>
                    </div>
                  </div>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
