import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CalendarDays, Tag, Eye, ThumbsUp, Share2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import DetailModal from '../DetailModal';
import { toast } from 'sonner';

export default function News({ hideHeader }: { hideHeader?: boolean }) {
  const { siteData, updateSection } = useCMS();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const articles = [
    {
      id: 1,
      category: "Edukasi",
      date: "12 Okt 2026",
      title: "Waspada Demam Berdarah Dengue (DBD) di Musim Hujan",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop",
      excerpt: "Mari lakukan 3M Plus untuk mencegah perkembangbiakan nyamuk Aedes aegypti di lingkungan sekitar kita.",
      views: 120,
      likes: 45,
      shares: 12
    },
    {
      id: 2,
      category: "Program KIA",
      date: "08 Okt 2026",
      title: "Pekan Imunisasi Nasional (PIN) Polio Telah Dimulai",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      excerpt: "Lindungi buah hati dari ancaman virus Polio. Bawalah anak balita Anda ke Posyandu atau Puskesmas terdekat.",
      views: 95,
      likes: 38,
      shares: 15
    },
    {
      id: 3,
      category: "Gizi Masyarakat",
      date: "01 Okt 2026",
      title: "Pentingnya Isi Piringku untuk Cegah Stunting Sejak Dini",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      excerpt: "Memahami konsep gizi seimbang melalui pedoman Isi Piringku dari Kementerian Kesehatan.",
      views: 150,
      likes: 62,
      shares: 20
    }
  ];

  const newsData = Array.isArray(siteData?.news) ? siteData.news : articles;

  const handleArticleClick = (article: any) => {
    const updatedNews = newsData.map((item: any) => {
      if (item.id === article.id) {
        const newViews = (item.views || 0) + 1;
        setSelectedItem({ ...item, views: newViews });
        return { ...item, views: newViews };
      }
      return item;
    });
    updateSection('news', updatedNews);
  };

  const handleLike = (articleId: any) => {
    const updatedNews = newsData.map((item: any) => {
      if (item.id === articleId) {
        const newLikes = (item.likes || 0) + 1;
        setSelectedItem((prev: any) => prev ? { ...prev, likes: newLikes } : null);
        return { ...item, likes: newLikes };
      }
      return item;
    });
    updateSection('news', updatedNews);
    toast.success('Artikel disukai!', {
      description: 'Terima kasih atas tanggapan Anda.'
    });
  };

  const handleShare = (articleId: any) => {
    const shareUrl = `${window.location.origin}/#informasi`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      const updatedNews = newsData.map((item: any) => {
        if (item.id === articleId) {
          const newShares = (item.shares || 0) + 1;
          setSelectedItem((prev: any) => prev ? { ...prev, shares: newShares } : null);
          return { ...item, shares: newShares };
        }
        return item;
      });
      updateSection('news', updatedNews);
      toast.success('Tautan disalin!', {
        description: 'Tautan berita disalin ke clipboard.'
      });
    });
  };

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
          {newsData.map((article: any, idx: number) => (
            <motion.article 
              key={article.id}
              onClick={() => handleArticleClick(article)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={article.image || 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=800'} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=800' }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 flex items-center gap-1.5">
                  <Tag size={12} />
                  {article.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} />
                    {article.date}
                  </div>
                  
                  {/* Minified counters on card */}
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="flex items-center gap-0.5" title="Suka">
                      <ThumbsUp size={12} />
                      {article.likes || 0}
                    </span>
                    <span className="flex items-center gap-0.5" title="Dilihat">
                      <Eye size={12} />
                      {article.views || 0}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    Baca Selengkapnya
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                  
                  {article.shares > 0 && (
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                      <Share2 size={10} />
                      {article.shares} share
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
  );

  return (
    <>
      {hideHeader ? content : (
        <section id="informasi" className="min-h-[calc(100vh-80px)] mt-20 py-12 flex flex-col justify-center bg-slate-50 relative">
          {content}
        </section>
      )}
      <DetailModal 
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title}
        date={selectedItem?.date}
        category={selectedItem?.category}
        image={selectedItem?.image}
        content={selectedItem?.content || selectedItem?.excerpt}
        views={selectedItem?.views}
        likes={selectedItem?.likes}
        shares={selectedItem?.shares}
        onLike={() => handleLike(selectedItem?.id)}
        onShare={() => handleShare(selectedItem?.id)}
      />
    </>
  );
}
