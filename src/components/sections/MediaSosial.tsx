import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';

export default function MediaSosial() {
  const [activeTab, setActiveTab] = useState('instagram');

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail?.page === 'media-sosial' && e.detail?.tabId) setActiveTab(e.detail.tabId);
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const socials = [
    { id: 'instagram', title: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', link: '#' },
    { id: 'facebook', title: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', link: '#' },
    { id: 'youtube', title: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', link: '#' },
  ];

  return (
    <section id="media-sosial" className="pt-36 pb-24 min-h-[85vh] bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Jejaring Sosial</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Media Sosial Kami</h2>
          <p className="text-slate-600 text-lg">Ikuti kami untuk mendapatkan informasi, berita, dan edukasi kesehatan terbaru dari UPTD Puskesmas Lumpue.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socials.map(soc => (
            <a key={soc.id} href={soc.link} target="_blank" rel="noreferrer" className={`block p-8 bg-white border ${activeTab === soc.id ? soc.border + ' shadow-md ring-2 ring-offset-2 ring-blue-500' : 'border-slate-100 shadow-sm'} rounded-3xl hover:shadow-xl transition-all text-center group`}>
              <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${soc.bg} ${soc.color} shadow-inner`}>
                <soc.icon size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">{soc.title}</h3>
              <p className="text-slate-500 font-medium mb-6">@puskesmaslumpue</p>
              <span className={`inline-flex items-center gap-2 text-sm font-bold ${soc.color}`}>
                Kunjungi Profil <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
