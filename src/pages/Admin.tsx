import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { LogOut, Home, User as UserIcon, Layout, Calendar, Newspaper, Image, HeartPulse, Share2, Phone, CheckCircle2, Save, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const navigate = useNavigate();
  const { siteData, updateSection } = useCMS();
  const [activeTab, setActiveTab] = useState('hero');
  const [toastMessage, setToastMessage] = useState('');

  // Form states mapping to contexts
  const [formHero, setFormHero] = useState(siteData.hero || {});
  const [formProfile, setFormProfile] = useState(siteData.profile || {});
  const [formServices, setFormServices] = useState(siteData.services || { dalamGedung: [] });
  const [formNews, setFormNews] = useState(siteData.news || []);
  const [formGallery, setFormGallery] = useState(siteData.gallery || []);
  
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (siteData.hero) setFormHero(siteData.hero);
    if (siteData.profile) setFormProfile(siteData.profile);
    if (siteData.services) setFormServices(siteData.services);
    if (siteData.news) setFormNews(siteData.news);
    if (siteData.gallery) setFormGallery(siteData.gallery);
  }, [siteData]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleHeroSave = () => {
    updateSection('hero', formHero);
    showToast('Pengaturan Beranda (Hero) berhasil disimpan!');
  };

  const handleProfileSave = () => {
    updateSection('profile', formProfile);
    showToast('Pengaturan Profil berhasil disimpan!');
  };

  const genericSave = (section: string, data: any) => {
    updateSection(section, data);
    const tabName = tabs.find(t => t.id === section)?.name || section;
    showToast(`Pengaturan ${tabName} berhasil disimpan!`);
  };

  const tabs = [
    { id: 'hero', name: 'Beranda (Hero)', icon: Home },
    { id: 'profile', name: 'Profil', icon: UserIcon },
    { id: 'services', name: 'Layanan', icon: HeartPulse },
    { id: 'schedule', name: 'Jadwal', icon: Calendar },
    { id: 'news', name: 'Publikasi', icon: Newspaper },
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
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleHeroSave}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 w-full sm:w-auto shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Simpan Perubahan
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Selayang Pandang</label>
                  <textarea
                    rows={6}
                    value={formProfile.selayangPandang || ''}
                    onChange={(e) => setFormProfile({...formProfile, selayangPandang: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    placeholder="Sambutan Kepala Puskesmas / Profil Utama"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Visi</label>
                  <input
                    type="text"
                    value={formProfile.visi || ''}
                    onChange={(e) => setFormProfile({...formProfile, visi: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    placeholder="Contoh: Terwujudnya Pelayanan Kesehatan Paripurna..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Misi / Tujuan</label>
                    <textarea
                      rows={5}
                      value={formProfile.tujuan || ''}
                      onChange={(e) => setFormProfile({...formProfile, tujuan: e.target.value})}
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="Masukkan daftar misi..."
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Kebijakan Mutu / Motto</label>
                    <textarea
                      rows={5}
                      value={formProfile.kebijakanMutu || ''}
                      onChange={(e) => setFormProfile({...formProfile, kebijakanMutu: e.target.value})}
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="Motto layanan atau kebijakan mutu..."
                    ></textarea>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleProfileSave}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 w-full sm:w-auto shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {['services', 'news', 'gallery'].includes(activeTab) && (
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600 mt-1">
                       <Layout size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Mode Lanjutan (Editor JSON)</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Anda dapat secara bebas mengubah data terstruktur untuk modul ini. Format array diperlukan untuk mendukung fleksibilitas tanpa batas untuk konten-konten dinamis. Pastikan format syntax (tanda kurung kurawal & spasi) tidak salah sebelum menyimpan.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Struktur Data Koleksi</label>
                  <textarea
                    rows={16}
                    className="w-full font-mono text-sm leading-relaxed border border-slate-300 rounded-xl p-4 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 shadow-inner"
                    value={
                      activeTab === 'services' ? JSON.stringify(formServices, null, 2) :
                      activeTab === 'news' ? JSON.stringify(formNews, null, 2) :
                      JSON.stringify(formGallery, null, 2)
                    }
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (activeTab === 'services') setFormServices(parsed);
                        if (activeTab === 'news') setFormNews(parsed);
                        if (activeTab === 'gallery') setFormGallery(parsed);
                      } catch (err) {
                        // ignore invalid json while typing
                      }
                    }}
                  />
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => {
                      if (activeTab === 'services') genericSave('services', formServices);
                      if (activeTab === 'news') genericSave('news', formNews);
                      if (activeTab === 'gallery') genericSave('gallery', formGallery);
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 w-full sm:w-auto shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Simpan Struktur Data
                  </button>
                </div>
              </div>
            )}

            {activeTab !== 'hero' && activeTab !== 'profile' && !['services', 'news', 'gallery'].includes(activeTab) && (
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

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 font-medium text-sm"
          >
            <CheckCircle2 className="text-green-400" size={20} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

