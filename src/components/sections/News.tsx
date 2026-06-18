import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CalendarDays, Tag } from 'lucide-react';

export default function News({ hideHeader }: { hideHeader?: boolean }) {
  const articles = [
    {
      id: 1,
      category: "Edukasi",
      date: "12 Okt 2026",
      title: "Waspada Demam Berdarah Dengue (DBD) di Musim Hujan",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop",
      excerpt: "Mari lakukan 3M Plus untuk mencegah perkembangbiakan nyamuk Aedes aegypti di lingkungan sekitar kita."
    },
    {
      id: 2,
      category: "Program KIA",
      date: "08 Okt 2026",
      title: "Pekan Imunisasi Nasional (PIN) Polio Telah Dimulai",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      excerpt: "Lindungi buah hati dari ancaman virus Polio. Bawalah anak balita Anda ke Posyandu atau Puskesmas terdekat."
    },
    {
      id: 3,
      category: "Gizi Masyarakat",
      date: "01 Okt 2026",
      title: "Pentingnya Isi Piringku untuk Cegah Stunting Sejak Dini",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      excerpt: "Memahami konsep gizi seimbang melalui pedoman Isi Piringku dari Kementerian Kesehatan."
    }
  ];

  const content = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {!hideHeader && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Pusat Informasi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Berita & Edukasi Kesehatan</h2>
            <p className="text-slate-600 text-lg">
              Dapatkan informasi terbaru seputar program Puskesmas, jadwal kegiatan posyandu, dan artikel edukasi kesehatan terkini.
            </p>
          </div>
          <a href="#publikasi" className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 transition-colors shrink-0">
            Lihat Semua Artikel
            <ArrowRight size={20} />
          </a>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 flex items-center gap-1.5">
                  <Tag size={12} />
                  {article.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-3">
                  <CalendarDays size={14} />
                  {article.date}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2 text-blue-600 font-semibold text-sm">
                  Baca Selengkapnya
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
  );

  return hideHeader ? content : (
    <section id="informasi" className="min-h-[calc(100vh-80px)] mt-20 py-12 flex flex-col justify-center bg-slate-50 relative">
      {content}
    </section>
  );
}
