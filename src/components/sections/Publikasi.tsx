import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone } from 'lucide-react';
import News from './News';

export default function Publikasi() {
  const [activeTab, setActiveTab] = useState('berita');

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail?.page === 'publikasi' && e.detail?.tabId) {
        setActiveTab(e.detail.tabId);
      }
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  return (
    <section id="publikasi" className="min-h-[calc(100vh-80px)] mt-20 py-12 flex flex-col justify-center bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Publikasi</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Berita & Pengumuman</h2>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'berita' && (
            <motion.div key="berita" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
              <News hideHeader={true} />
            </motion.div>
          )}
          {activeTab === 'pengumuman' && (
            <motion.div key="pengumuman" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
                <div className="space-y-4 text-left max-h-[60vh] overflow-y-auto pr-2">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 font-display px-2">Daftar Pengumuman</h3>
                  {[
                    { id: 1, title: 'Jadwal Pelayanan Vaksinasi COVID-19 Booster Kedua', date: '15 June 2026', type: 'Penting' },
                    { id: 2, title: 'Kegiatan Posyandu Balita RW 05 Ditunda', date: '12 June 2026', type: 'Jadwal' },
                    { id: 3, title: 'Pembukaan Pendaftaran Antrean Online Melalui WhatsApp', date: '10 June 2026', type: 'Layanan' },
                    { id: 4, title: 'Penyuluhan Kesehatan Lingkungan & Stunting', date: '05 June 2026', type: 'Kegiatan' },
                    { id: 5, title: 'Lowongan Relawan Tenaga Promosi Kesehatan', date: '01 June 2026', type: 'Rekrutmen' }
                  ].map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                      <div className="shrink-0">
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                          {item.type}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-bold text-slate-900 mb-1 leading-snug">{item.title}</h4>
                        <p className="text-sm text-slate-500 font-medium">Diterbitkan pada {item.date}</p>
                      </div>
                      <div className="shrink-0 hidden sm:block">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
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
