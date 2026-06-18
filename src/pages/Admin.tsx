import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { LogOut, Home, User as UserIcon, Layout, Calendar, Newspaper, Image, HeartPulse, Share2, Phone } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const { siteData, updateSection } = useCMS();
  const [activeTab, setActiveTab] = useState('hero');

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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const handleHeroSave = () => {
    updateSection('hero', formHero);
    alert('Hero saved!');
  };

  const handleProfileSave = () => {
    updateSection('profile', formProfile);
    alert('Profile saved!');
  };

  const genericSave = (section: string, data: any) => {
    updateSection(section, data);
    alert(`${section} saved!`);
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
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-blue-600 font-display">Admin Portal</h1>
          <p className="text-xs text-slate-500 mt-1">CMS Puskesmas Lumpue</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between sticky top-0 z-10 w-full md:hidden">
          <h2 className="text-xl font-bold text-slate-800">Admin</h2>
        </header>
        
        <div className="p-8 max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 font-display">
            {tabs.find(t => t.id === activeTab)?.name} Management
          </h2>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formHero.title || ''}
                    onChange={(e) => setFormHero({...formHero, title: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title Highlight</label>
                  <input
                    type="text"
                    value={formHero.titleHighlight || ''}
                    onChange={(e) => setFormHero({...formHero, titleHighlight: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle (Badge)</label>
                  <input
                    type="text"
                    value={formHero.subtitle || ''}
                    onChange={(e) => setFormHero({...formHero, subtitle: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={formHero.description || ''}
                    onChange={(e) => setFormHero({...formHero, description: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  onClick={handleHeroSave}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 w-full sm:w-auto"
                >
                  Save Changes
                </button>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Selayang Pandang</label>
                  <textarea
                    rows={6}
                    value={formProfile.selayangPandang || ''}
                    onChange={(e) => setFormProfile({...formProfile, selayangPandang: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Visi</label>
                  <input
                    type="text"
                    value={formProfile.visi || ''}
                    onChange={(e) => setFormProfile({...formProfile, visi: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tujuan</label>
                  <textarea
                    rows={4}
                    value={formProfile.tujuan || ''}
                    onChange={(e) => setFormProfile({...formProfile, tujuan: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Kebijakan Mutu</label>
                  <textarea
                    rows={4}
                    value={formProfile.kebijakanMutu || ''}
                    onChange={(e) => setFormProfile({...formProfile, kebijakanMutu: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  onClick={handleProfileSave}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 w-full sm:w-auto"
                >
                  Save Changes
                </button>
              </div>
            )}

            {['services', 'news', 'gallery'].includes(activeTab) && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Editor Data (JSON Format)</label>
                  <p className="text-xs text-slate-500 mb-4">Modul ini menggunakan mode Advanced JSON sehingga seluruh record (array) dapat diedit tanpa ada data yang tertinggal.</p>
                  <textarea
                    rows={15}
                    className="w-full font-mono text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 bg-slate-50"
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
                <button
                  onClick={() => {
                    if (activeTab === 'services') genericSave('services', formServices);
                    if (activeTab === 'news') genericSave('news', formNews);
                    if (activeTab === 'gallery') genericSave('gallery', formGallery);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 w-full sm:w-auto"
                >
                  Save Full Data
                </button>
              </div>
            )}

            {activeTab !== 'hero' && activeTab !== 'profile' && !['services', 'news', 'gallery'].includes(activeTab) && (
              <div className="py-12 text-center text-slate-500">
                Fitur CRUD untuk {tabs.find(t => t.id === activeTab)?.name} ini adalah module komprehensif yang dirancang untuk mendukung manajemen operasional data sesuai kebutuhan.  Penyelarasan field dan tabel akan terhubung secara terstruktur.
                <br /><br />
                *(Dalam lingkungan prototype, modul form editor dapat dikembangkan lengkap sesuai skema backend yang dituju)*
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
