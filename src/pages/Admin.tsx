import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import {
  LogOut,
  Home,
  User as UserIcon,
  Layout,
  Calendar,
  Newspaper,
  Image,
  HeartPulse,
  Share2,
  Phone,
  CheckCircle2,
  Save,
  Activity,
  Trash2,
  Plus,
  HelpCircle,
  Menu,
  X,
  Palette,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import ImageUpload from "../components/ImageUpload";
import AdminNews from "./admin/AdminNews";
import AdminPengumuman from "./admin/AdminPengumuman";
import AdminFasilitas from "./admin/AdminFasilitas";
import AdminServices from "./admin/AdminServices";
import AdminTimMedis from "./admin/AdminTimMedis";
import AdminFaq from "./admin/AdminFaq";
import AdminJadwal from "./admin/AdminJadwal";
import AdminUkm from "./admin/AdminUkm";
import AdminGallery from "./admin/AdminGallery";
import AdminContact from "./admin/AdminContact";
import AdminSocials from "./admin/AdminSocials";
import AdminProfile from "./admin/AdminProfile";
import AdminUsers from "./admin/AdminUsers";
import AdminBranding from "./admin/AdminBranding";

export default function Admin() {
  const navigate = useNavigate();
  const { siteData, updateSection } = useCMS();
  const [activeTab, setActiveTab] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form states mapping to contexts
  const [formHero, setFormHero] = useState(siteData.hero || {});

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (siteData.hero) setFormHero(siteData.hero);
  }, [siteData]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  const handleHeroSave = () => {
    updateSection("hero", formHero);
    toast.success("Pengaturan Beranda (Hero) berhasil disimpan!");
  };

  const tabs = [
    { id: "hero", name: "Beranda (Hero)", icon: Home },
    { id: "branding", name: "Tema & Logo Header", icon: Palette },
    { id: "profile", name: "Profil", icon: UserIcon },
    { id: "services", name: "Layanan Utama", icon: HeartPulse },
    { id: "fasilitas", name: "Fasilitas", icon: HeartPulse },
    { id: "tim-medis", name: "Tenaga Medis", icon: Activity },
    { id: "jadwal", name: "Jadwal Pelayanan", icon: Calendar },
    { id: "news", name: "Berita & Artikel", icon: Newspaper },
    { id: "pengumuman", name: "Pengumuman", icon: Newspaper },
    { id: "ukm", name: "Program UKM", icon: Layout },
    { id: "gallery", name: "Galeri", icon: Image },
    { id: "socials", name: "Media Sosial", icon: Share2 },
    { id: "faq", name: "FAQ", icon: HelpCircle },
    { id: "contact", name: "Kontak", icon: Phone },
    { id: "users", name: "Manajemen User", icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden md:flex z-20 shadow-sm relative">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="shrink-0 w-11 h-11 bg-blue-50/50 p-1.5 rounded-xl shadow-inner flex items-center justify-center">
            <img
              src={siteData?.kontak?.logoUrl || "/logo.png?v=2"}
              alt="Logo Header Admin"
              className="w-8 h-8 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight font-display leading-none mb-1">
              Portal Admin
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
              Puskesmas Lumpue
            </p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3 mt-2">
            Modules
          </div>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <tab.icon
                  size={18}
                  className={isActive ? "text-blue-600" : "text-slate-400"}
                />
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

      {/* Sidebar Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] md:hidden"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-xs bg-white shadow-2xl border-r border-slate-100 overflow-y-auto z-[110] md:hidden flex flex-col"
            >
              {/* Header Drawer */}
              <div className="sticky top-0 bg-white border-b border-slate-100 z-20 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="shrink-0 w-8 h-8 bg-blue-50/50 p-1 rounded-lg flex items-center justify-center">
                    <img
                      src={siteData?.kontak?.logoUrl || "/logo.png?v=2"}
                      alt="Logo Header Admin"
                      className="w-6 h-6 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-blue-600 tracking-wide uppercase leading-none mb-0.5">
                      Portal Admin
                    </span>
                    <span className="font-bold text-sm text-slate-900 tracking-tight leading-none">
                      Puskesmas Lumpue
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50/50 rounded-xl transition-all border border-slate-100"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-3">
                  Modules
                </div>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/30"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <tab.icon
                        size={16}
                        className={isActive ? "text-blue-600" : "text-slate-400"}
                      />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Footer Drawer */}
              <div className="p-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all font-semibold text-xs border border-red-100"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full relative h-screen">
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 sm:px-6 md:px-8 md:py-5 flex items-center justify-between sticky top-0 z-30 w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-1 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <span className="hidden md:flex text-blue-600">
                <Activity size={24} />
              </span>
              {tabs.find((t) => t.id === activeTab)?.name}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Header Logo Management Quick Menu */}
            <button
              onClick={() => setActiveTab("branding")}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 hover:bg-slate-100 hover:border-slate-300 p-1.5 pr-3 rounded-xl transition-all cursor-pointer text-left focus:ring-2 focus:ring-blue-500/20 outline-none shrink-0"
              title="Kelola Logo & Tema pada Header Admin secara lengkap"
            >
              <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-slate-100">
                <img
                  src={siteData?.kontak?.logoUrl || "/logo.png?v=2"}
                  alt="Header Logo"
                  className="w-6 h-6 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider leading-none">Logo & Tema</span>
                <span className="text-[10px] font-semibold text-slate-500 leading-none mt-0.5">Kelola Branding</span>
              </div>
            </button>

            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Administrator Staff</span>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              A
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto w-full pb-24">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Manajemen {tabs.find((t) => t.id === activeTab)?.name}
            </h2>
            <p className="text-slate-500 mt-1 sm:mt-2 text-xs sm:text-sm max-w-2xl">
              Perbarui konten modul melalui form di bawah ini agar perubahan
              dapat langsung terlihat di halaman publikasi utama.
            </p>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 w-full"
          >
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Judul Utama
                    </label>
                    <input
                      type="text"
                      value={formHero.title || ""}
                      onChange={(e) =>
                        setFormHero({ ...formHero, title: e.target.value })
                      }
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="Masukkan judul utama..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Teks Sorotan (Warna Biru)
                    </label>
                    <input
                      type="text"
                      value={formHero.titleHighlight || ""}
                      onChange={(e) =>
                        setFormHero({
                          ...formHero,
                          titleHighlight: e.target.value,
                        })
                      }
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="Bagian teks yang dihias biru..."
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Sub-Judul (Badge Kecil di Atas)
                    </label>
                    <input
                      type="text"
                      value={formHero.subtitle || ""}
                      onChange={(e) =>
                        setFormHero({ ...formHero, subtitle: e.target.value })
                      }
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="Contoh: Selamat datang di Portal Resmi..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Interval Transisi Gambar (Detik)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formHero.interval || 5}
                      onChange={(e) =>
                        setFormHero({
                          ...formHero,
                          interval: Math.max(1, parseInt(e.target.value) || 5),
                        })
                      }
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="Masukkan dalam detik, contoh: 5"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    rows={4}
                    value={formHero.description || ""}
                    onChange={(e) =>
                      setFormHero({ ...formHero, description: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-y"
                    placeholder="Tulis deskripsi atau sambutan di sini..."
                  ></textarea>
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-bold text-lg">Slider Gambar (Hero)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {(formHero.sliderImages || []).map(
                      (imgUrl: string, idx: number) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border p-4 rounded-xl flex flex-col gap-3"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-slate-700">
                              Gambar {idx + 1}
                            </span>
                            <button
                              onClick={() =>
                                setFormHero({
                                  ...formHero,
                                  sliderImages: formHero.sliderImages.filter(
                                    (_: string, i: number) => i !== idx,
                                  ),
                                })
                              }
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
                              setFormHero({
                                ...formHero,
                                sliderImages: newSlider,
                              });
                            }}
                          />
                        </div>
                      ),
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setFormHero({
                        ...formHero,
                        sliderImages: [...(formHero.sliderImages || []), ""],
                      })
                    }
                    className="flex justify-center items-center gap-2 w-full mt-4 bg-slate-100 text-slate-700 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-200"
                  >
                    <Plus size={18} /> Tambah Gambar Slider
                  </button>
                </div>

                {/* Dynamic Stats Customizations */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="font-bold text-lg">Parameter Statistik (Hero)</h3>
                  <p className="text-xs text-slate-500 mb-2">Sesuaikan data statistik yang relevan bagi stakeholder pada halaman utama.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {([0, 1, 2, 3]).map((idx) => {
                      const defaultStats = [
                        { label: "Tenaga Medis & Staff", value: "45+", icon: "Stethoscope" },
                        { label: "Kunjungan /Bulan", value: "4.5k", icon: "Users" },
                        { label: "Desa/Kel. Binaan", value: "4", icon: "ShieldCheck" },
                        { label: "Posyandu Aktif", value: "24", icon: "Pill" },
                      ];
                      const statsArray = formHero.stats && formHero.stats.length === 4 ? formHero.stats : defaultStats;
                      const currentStat = statsArray[idx] || defaultStats[idx];
                      
                      return (
                        <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                          <span className="text-xs font-bold text-slate-500 block">Statistik {idx + 1}</span>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wide text-slate-500 font-bold block">Label</label>
                            <input
                              type="text"
                              value={currentStat.label}
                              onChange={(e) => {
                                const newStats = [...statsArray];
                                newStats[idx] = { ...currentStat, label: e.target.value };
                                setFormHero({ ...formHero, stats: newStats });
                              }}
                              className="w-full border border-slate-300 rounded-lg p-2 text-xs text-slate-900 outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wide text-slate-500 font-bold block">Nilai (Value)</label>
                            <input
                              type="text"
                              value={currentStat.value}
                              onChange={(e) => {
                                const newStats = [...statsArray];
                                newStats[idx] = { ...currentStat, value: e.target.value };
                                setFormHero({ ...formHero, stats: newStats });
                              }}
                              className="w-full border border-slate-300 rounded-lg p-2 text-xs text-slate-900 outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
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

            {activeTab === "branding" && <AdminBranding />}
            {activeTab === "profile" && <AdminProfile />}
            {activeTab === "services" && <AdminServices />}
            {activeTab === "fasilitas" && <AdminFasilitas />}
            {activeTab === "tim-medis" && <AdminTimMedis />}
            {activeTab === "jadwal" && <AdminJadwal />}
            {activeTab === "news" && <AdminNews />}
            {activeTab === "pengumuman" && <AdminPengumuman />}
            {activeTab === "ukm" && <AdminUkm />}
            {activeTab === "gallery" && <AdminGallery />}
            {activeTab === "socials" && <AdminSocials />}
            {activeTab === "faq" && <AdminFaq />}
            {activeTab === "contact" && <AdminContact />}
            {activeTab === "users" && <AdminUsers />}

            {[
              "hero",
              "branding",
              "profile",
              "services",
              "fasilitas",
              "tim-medis",
              "jadwal",
              "news",
              "pengumuman",
              "faq",
              "gallery",
              "ukm",
              "contact",
              "socials",
              "users",
            ].indexOf(activeTab) === -1 && (
              <div className="py-16 text-center">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  {React.createElement(
                    tabs.find((t) => t.id === activeTab)?.icon || Layout,
                    { size: 40, className: "text-slate-400" },
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Modul {tabs.find((t) => t.id === activeTab)?.name}
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                  Fitur untuk modul ini sedang dirancang dan akan segera hadir
                  mengikuti struktur skema yang lebih komprehensif pada
                  pembaruan arsitektur selanjutnya.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
