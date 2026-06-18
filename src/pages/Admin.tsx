import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { LogOut, Home, User as UserIcon, Layout, Calendar, Newspaper, Image, HeartPulse, Share2, Phone, CheckCircle2, Save, Activity, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import ImageUpload from '../components/ImageUpload';
import AdminNews from './admin/AdminNews';
import AdminPengumuman from './admin/AdminPengumuman';
import AdminFasilitas from './admin/AdminFasilitas';
import AdminTimMedis from './admin/AdminTimMedis';
import AdminUkm from './admin/AdminUkm';
import AdminGallery from './admin/AdminGallery';
import AdminContact from './admin/AdminContact';
import AdminSocials from './admin/AdminSocials';
import AdminProfile from './admin/AdminProfile';

export default function Admin() {
  const navigate = useNavigate();
  const { siteData, updateSection } = useCMS();
  const [activeTab, setActiveTab] = useState('hero');

  // Form states mapping to contexts
  const [formHero, setFormHero] = useState(siteData.hero || {});
  
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (siteData.hero) setFormHero(siteData.hero);
  }, [siteData]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const handleHeroSave = () => {
    updateSection('hero', formHero);
    toast.success('Pengaturan Beranda (Hero) berhasil disimpan!');
  };

  const tabs = [
    { id: 'hero', name: 'Beranda (Hero)', icon: Home },
    { id: 'profile', name: 'Profil', icon: UserIcon },
    { id: 'fasilitas', name: 'Fasilitas', icon: HeartPulse },
    { id: 'tim-medis', name: 'Tenaga Medis', icon: Activity },
    { id: 'news', name: 'Berita & Artikel', icon: Newspaper },
    { id: 'pengumuman', name: 'Pengumuman', icon: Newspaper },
    { id: 'ukm', name: 'Program UKM', icon: Layout },
    { id: 'gallery', name: 'Galeri', icon: Image },
    { id: 'socials', name: 'Media Sosial', icon: Share2 },
    { id: 'contact', name: 'Kontak', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden md:flex z-20 shadow-sm relative">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-600/20">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-display">Portal Admin</h1>
            <p className="text-xs font-medium text-slate-500">Puskesmas Lumpue</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3 mt-2">Modules</div>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <tab.icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                {tab.name}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors font-medium text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full relative h-screen">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10 w-full">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span className="md:hidden text-blue-600 mr-2"><Activity size={24} /></span>
            {tabs.find(t => t.id === activeTab)?.name}
          </h2>
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                A
             </div>
          </div>
        </header>
        
        <div className="p-6 md:p-10 max-w-5xl mx-auto w-full pb-24">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Manajemen {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <p className="text-slate-500 mt-2 text-sm max-w-2xl">Perbarui konten modul melalui form di bawah ini agar perubahan dapat langsung terlihat di halaman publikasi utama.</p>
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full"
          >
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Judul Utama</label>
                    <input
                      type="text"
                      value={formHero.title || ''}
                      onChange={(e) => setFormHero({...formHero, title: e.target.value})}
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="Masukkan judul utama..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Teks Sorotan (Warna Biru)</label>
                    <input
                      type="text"
                      value={formHero.titleHighlight || ''}
                      onChange={(e) => setFormHero({...formHero, titleHighlight: e.target.value})}
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="Bagian teks yang dihias biru..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Sub-Judul (Badge Kecil di Atas)</label>
                  <input
                    type="text"
                    value={formHero.subtitle || ''}
                    onChange={(e) => setFormHero({...formHero, subtitle: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    placeholder="Contoh: Selamat datang di Portal Resmi..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Deskripsi Singkat</label>
                  <textarea
                    rows={4}
                    value={formHero.description || ''}
                    onChange={(e) => setFormHero({...formHero, description: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-y"
                    placeholder="Tulis deskripsi atau sambutan di sini..."
                  ></textarea>
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-bold text-lg">Slider Gambar (Hero)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {(formHero.sliderImages || []).map((imgUrl: string, idx: number) => (
                       <div key={idx} className="bg-slate-50 border p-4 rounded-xl flex flex-col gap-3">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-slate-700">Gambar {idx + 1}</span>
                            <button 
                               onClick={() => setFormHero({...formHero, sliderImages: formHero.sliderImages.filter((_: string, i: number) => i !== idx)})} 
                               className="text-red-500 hover:bg-red-100 p-1.5 rounded"
                            >
                               <Trash2 size={16} />
                            </button>
                         </div>
                         <ImageUpload
                            value={imgUrl}
                            onChange={(val) => {
                               const newSlider = [...formHero.sliderImages];
                               newSlider[idx] = val;
                               setFormHero({...formHero, sliderImages: newSlider});
                            }}
                         />
                       </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setFormHero({...formHero, sliderImages: [...(formHero.sliderImages || []), '']})}
                    className="flex justify-center items-center gap-2 w-full mt-4 bg-slate-100 text-slate-700 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-200"
                  >
                    <Plus size={18} /> Tambah Gambar Slider
                  </button>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-end mt-6">
                  <button
                    onClick={handleHeroSave}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 w-full sm:w-auto shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Simpan Perubahan
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && <AdminProfile />}
            {activeTab === 'fasilitas' && <AdminFasilitas />}
            {activeTab === 'tim-medis' && <AdminTimMedis />}
            {activeTab === 'news' && <AdminNews />}
            {activeTab === 'pengumuman' && <AdminPengumuman />}
            {activeTab === 'ukm' && <AdminUkm />}
            {activeTab === 'gallery' && <AdminGallery />}
            {activeTab === 'contact' && <AdminContact />}
            {activeTab === 'socials' && <AdminSocials />}

            {['hero', 'profile', 'fasilitas', 'tim-medis', 'news', 'pengumuman', 'gallery', 'ukm', 'contact', 'socials'].indexOf(activeTab) === -1 && (
              <div className="py-16 text-center">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  {React.createElement(tabs.find(t => t.id === activeTab)?.icon || Layout, { size: 40, className: "text-slate-400" })}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Modul {tabs.find(t => t.id === activeTab)?.name}</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                  Fitur untuk modul ini sedang dirancang dan akan segera hadir mengikuti struktur skema yang lebih komprehensif pada pembaruan arsitektur selanjutnya.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

