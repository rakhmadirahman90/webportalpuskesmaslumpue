import React, { useState, useEffect } from 'react';
import { Menu, X, HeartPulse, Search, Phone, ChevronDown, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar({ activePage }: { activePage?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubMenuClick = (page: string, tabId: string) => {
    setIsOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('changeTab', { detail: { page, tabId } }));
    }, 50);
  };

  const navLinks = [
    { 
      name: 'Profil', 
      href: '#profil',
      page: 'profil',
      subLinks: [
        { name: 'Selayang Pandang', tabId: 'selayang-pandang' },
        { name: 'Visi & Misi', tabId: 'visi-misi' },
        { name: 'Tujuan', tabId: 'tujuan' },
        { name: 'Tata Nilai', tabId: 'tata-nilai' },
        { name: 'Motto', tabId: 'motto' },
        { name: 'Kebijakan Mutu', tabId: 'kebijakan-mutu' },
        { name: 'Struktur Organisasi', tabId: 'struktur' },
        { name: 'Data Pegawai', tabId: 'pegawai' }
      ]
    },
    {
      name: 'Layanan & Fasilitas',
      href: '#layanan',
      page: 'layanan',
      subLinks: [
        { name: 'Layanan Utama', tabId: 'layanan', href: '#layanan' },
        { name: 'Fasilitas Kami', tabId: 'fasilitas', href: '#fasilitas' },
        { name: 'Tim Medis', tabId: 'tim-medis', href: '#tim-medis' },
        { name: 'Jadwal Pelayanan', tabId: 'jadwal', href: '#jadwal' }
      ]
    },
    { 
      name: 'Publikasi', 
      href: '#publikasi',
      page: 'publikasi',
      subLinks: [
        { name: 'Berita & Artikel', tabId: 'berita', href: '#publikasi' },
        { name: 'Pengumuman', tabId: 'pengumuman', href: '#publikasi' }
      ]
    },
    { 
      name: 'Program UKM', 
      href: '#program-ukm',
      page: 'program-ukm',
      subLinks: [
        { name: 'Promkes', tabId: 'promkes' },
        { name: 'Kesling', tabId: 'kesling' },
        { name: 'KIA & KB', tabId: 'kiakb' },
        { name: 'Gizi Masyarakat', tabId: 'gizi' },
        { name: 'P2P', tabId: 'p2p' }
      ]
    },
    { 
      name: 'Galeri', 
      href: '#galeri',
      page: 'galeri',
      subLinks: [
        { name: 'Galeri Foto', tabId: 'foto' },
        { name: 'Galeri Video', tabId: 'video' }
      ]
    },
    { 
      name: 'FAQ', 
      href: '#faq',
      page: 'faq'
    },
    { 
      name: 'Media Sosial', 
      href: '#media-sosial',
      page: 'media-sosial',
      subLinks: [
        { name: 'Instagram', tabId: 'instagram' },
        { name: 'Facebook', tabId: 'facebook' },
        { name: 'YouTube', tabId: 'youtube' }
      ]
    },
    { 
      name: 'Kontak', 
      href: '#kontak',
      page: 'kontak'
    }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/logo.png?v=2" alt="Logo Puskesmas Lumpue" className="w-12 h-12 object-contain" />
              <div className="flex flex-col justify-center">
                <span className="text-[0.65rem] font-bold text-blue-600 tracking-widest uppercase mb-0.5 leading-none">UPTD Puskesmas</span>
                <span className="font-extrabold text-xl md:text-2xl text-slate-900 tracking-tight leading-none font-display">Lumpue</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <a href="#portal" className="flex items-center gap-2 bg-[#0061A0] hover:bg-blue-800 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm shadow-md">
                <Home size={18} /> Portal
              </a>
              {navLinks.map((link) => {
                const isActive = activePage === link.href.substring(1);
                
                if (link.subLinks) {
                  return (
                    <div key={link.name} className="relative group">
                      <a 
                        href={link.href}
                        className={`text-sm font-semibold transition-colors flex items-center gap-1 py-4 ${
                          isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                        }`}
                      >
                        {link.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                      </a>
                      <div className="absolute top-12 left-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
                        {link.subLinks.map(sub => (
                           <a 
                             key={sub.name} 
                             href={sub.href ? sub.href : link.href} 
                             onClick={() => handleSubMenuClick(sub.href ? sub.href.substring(1) : link.page, sub.tabId)} 
                             className="px-5 py-3.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 font-semibold border-b border-slate-50 last:border-0 transition-colors"
                           >
                             {sub.name}
                           </a>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-semibold transition-colors py-4 ${
                    isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </a>
              )})}
            </nav>

            {/* Actions & Menu */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button className="text-slate-500 hover:text-blue-600 transition-colors p-1 sm:p-2">
                <Search size={20} className="w-5 h-5" />
              </button>
              <button 
                className="lg:hidden flex items-center justify-center text-slate-700 border border-slate-200/60 bg-white hover:bg-slate-50 p-1.5 sm:p-2 rounded-xl transition-colors shadow-sm ml-1"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={22} className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl border-l border-slate-100 overflow-y-auto z-[60] lg:hidden flex flex-col"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/logo.png?v=2" alt="Logo Puskesmas Lumpue" className="w-8 h-8 object-contain" />
                  <span className="font-bold text-lg text-slate-800">Puskesmas Lumpue</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-slate-500 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex-grow flex flex-col space-y-2">
                <a 
                  href="#portal" 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-[#0061A0] text-white px-5 py-3.5 rounded-xl font-bold shadow-md shadow-blue-600/20 mb-4"
                >
                  <Home size={20} /> Portal Utama
                </a>

                {navLinks.map((link) => {
                  const isActive = activePage === link.href.substring(1);
                  const isExpanded = expandedMenu === link.name;
                  
                  if (link.subLinks) {
                    return (
                      <div key={link.name} className="flex flex-col border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedMenu(isExpanded ? null : link.name);
                          }}
                          className={`flex items-center justify-between px-5 py-4 text-base font-bold transition-colors ${
                            isActive || isExpanded
                              ? 'text-blue-700 bg-blue-50/50' 
                              : 'text-slate-700 hover:text-blue-600'
                          }`}
                        >
                          {link.name}
                          <ChevronDown 
                            size={18} 
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180 text-blue-600" : "text-slate-400"}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 pb-3 space-y-1">
                                {link.subLinks.map(sub => {
                                  return (
                                     <a 
                                       key={sub.name} 
                                       href={sub.href ? sub.href : link.href} 
                                       onClick={(e) => {
                                         handleSubMenuClick(sub.href ? sub.href.substring(1) : link.page, sub.tabId);
                                       }} 
                                       className="block px-4 py-3 text-sm text-slate-600 hover:text-blue-700 hover:bg-white bg-transparent rounded-xl font-semibold transition-all border border-transparent hover:border-blue-100 hover:shadow-sm"
                                     >
                                       {sub.name}
                                     </a>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-4 text-base font-bold rounded-2xl border ${
                      isActive 
                        ? 'text-blue-700 bg-blue-50 border-blue-100' 
                        : 'text-slate-700 hover:text-blue-600 bg-slate-50/50 border-slate-100 hover:border-blue-100 hover:bg-white'
                    }`}
                  >
                    {link.name}
                  </a>
                )})}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
