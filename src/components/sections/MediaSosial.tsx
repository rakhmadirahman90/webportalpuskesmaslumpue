import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../../context/CMSContext';

export default function MediaSosial() {
  const [activeTab, setActiveTab] = useState('instagram');
  const { siteData } = useCMS();
  const sosialData = Array.isArray(siteData?.sosialMedia) ? siteData.sosialMedia : [
    { title: "Facebook", username: "Puskesmas Lumpue", url: "https://facebook.com", icon: "Facebook" },
    { title: "Instagram", username: "@puskesmaslumpue", url: "https://instagram.com", icon: "Instagram" },
    { title: "YouTube", username: "PKM Lumpue", url: "https://youtube.com", icon: "Youtube" }
  ];

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail?.page === 'media-sosial' && e.detail?.tabId) setActiveTab(e.detail.tabId);
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const getIconData = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('facebook')) return { icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', id: 'facebook' };
    if (t.includes('youtube')) return { icon: Youtube, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', id: 'youtube' };
    return { icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', id: 'instagram' };
  };

  return (
    <section id="media-sosial" className="min-h-[calc(100vh-80px)] mt-20 py-12 flex flex-col justify-center bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Jejaring Sosial</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Media Sosial Kami</h2>
          <p className="text-slate-600 text-lg">Ikuti kami untuk mendapatkan informasi, berita, dan edukasi kesehatan terbaru dari UPTD Puskesmas Lumpue.</p>
        </div>

        <AnimatePresence mode="wait">
          {sosialData.map((soc: any) => {
            const iconData = getIconData(soc.title);
            if (activeTab !== iconData.id) return null;
            return (
            <motion.div key={iconData.id} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="max-w-xl mx-auto">
              <a href={soc.url} target="_blank" rel="noreferrer" className={`block p-10 bg-white border ${iconData.border} shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all text-center group`}>
                <div className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 ${iconData.bg} ${iconData.color} shadow-inner`}>
                  <iconData.icon size={56} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3 font-display">{soc.title}</h3>
                <p className="text-slate-500 font-medium mb-8 text-lg">{soc.username}</p>
                <div className={`inline-flex items-center gap-2 text-lg font-bold px-8 py-4 rounded-full ${iconData.bg} ${iconData.color}`}>
                  Kunjungi Profil <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </a>
            </motion.div>
          )})}
        </AnimatePresence>
      </div>
    </section>
  );
}
