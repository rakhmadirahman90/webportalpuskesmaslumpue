import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  HeartPulse,
  Search,
  Phone,
  ChevronDown,
  Home,
  Building,
  Stethoscope,
  Newspaper,
  Image as ImageIcon,
  Share2,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCMS } from "../../context/CMSContext";

export default function Navbar({ activePage }: { activePage?: string }) {
  const { siteData } = useCMS();
  const logoUrl = siteData?.kontak?.logoUrl || "/logo.png?v=2";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubMenuClick = (page: string, tabId: string) => {
    setIsOpen(false);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("changeTab", { detail: { page, tabId } }),
      );
    }, 50);
  };

  const navLinks = [
    {
      name: "Profil",
      href: "#selayang-pandang",
      page: "selayang-pandang",
      icon: Building,
      subLinks: [
        { name: "Selayang Pandang", tabId: "selayang-pandang", href: "#selayang-pandang" },
        { name: "Visi & Misi", tabId: "visi-misi", href: "#visi-misi" },
        { name: "Tujuan", tabId: "tujuan", href: "#tujuan" },
        { name: "Tata Nilai", tabId: "tata-nilai", href: "#tata-nilai" },
        { name: "Motto", tabId: "motto", href: "#motto" },
        { name: "Kebijakan Mutu", tabId: "kebijakan-mutu", href: "#kebijakan-mutu" },
        { name: "Struktur Organisasi", tabId: "struktur", href: "#struktur" },
        { name: "Data Pegawai", tabId: "pegawai", href: "#pegawai" },
      ],
    },
    {
      name: "Layanan & Fasilitas",
      href: "#layanan",
      page: "layanan",
      icon: Stethoscope,
      subLinks: [
        { name: "Layanan Utama", tabId: "layanan", href: "#layanan" },
        { name: "Fasilitas Kami", tabId: "fasilitas", href: "#fasilitas" },
        { name: "Tim Medis", tabId: "tim-medis", href: "#tim-medis" },
        { name: "Jadwal Pelayanan", tabId: "jadwal", href: "#jadwal" },
      ],
    },
    {
      name: "Publikasi",
      href: "#publikasi",
      page: "publikasi",
      icon: Newspaper,
      subLinks: [
        { name: "Berita & Artikel", tabId: "berita", href: "#publikasi" },
        { name: "Pengumuman", tabId: "pengumuman", href: "#publikasi" },
      ],
    },
    {
      name: "Program UKM",
      href: "#program-ukm",
      page: "program-ukm",
      icon: HeartPulse,
      subLinks: [
        { name: "Promkes", tabId: "promkes" },
        { name: "Kesling", tabId: "kesling" },
        { name: "KIA & KB", tabId: "kiakb" },
        { name: "Gizi Masyarakat", tabId: "gizi" },
        { name: "P2P", tabId: "p2p" },
      ],
    },
    {
      name: "Galeri",
      href: "#galeri",
      page: "galeri",
      icon: ImageIcon,
      subLinks: [
        { name: "Galeri Foto", tabId: "foto" },
        { name: "Galeri Video", tabId: "video" },
      ],
    },
    {
      name: "Media Sosial",
      href: "#media-sosial",
      page: "media-sosial",
      icon: Share2,
      subLinks: [
        { name: "Instagram", tabId: "instagram" },
        { name: "Facebook", tabId: "facebook" },
        { name: "YouTube", tabId: "youtube" },
      ],
    },
    {
      name: "FAQ",
      href: "#faq",
      page: "faq",
      icon: HelpCircle,
    },
    {
      name: "Kontak",
      href: "#kontak",
      page: "kontak",
      icon: Phone,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-2"
            : "bg-white/90 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={logoUrl}
                alt="Logo Puskesmas Lumpue"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col justify-center">
                <span className="text-[0.55rem] sm:text-[0.65rem] font-bold text-blue-600 tracking-wider sm:tracking-widest uppercase mb-0.5 leading-none">
                  UPTD Puskesmas
                </span>
                <span className="font-extrabold text-lg sm:text-xl md:text-2xl text-slate-900 tracking-tight leading-none font-display">
                  Lumpue
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <a
                href="#portal"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm shadow-md"
              >
                <Home size={18} /> Portal
              </a>
              {navLinks.map((link) => {
                const isActive =
                  activePage === link.href.substring(1) ||
                  (link.subLinks &&
                    link.subLinks.some(
                      (sub) =>
                        (sub.href && sub.href.substring(1) === activePage) ||
                        sub.tabId === activePage,
                    ));

                if (link.subLinks) {
                  return (
                    <div key={link.name} className="relative group">
                      <a
                        href={link.href}
                        className={`text-sm font-semibold transition-colors flex items-center gap-1 py-4 ${
                          isActive
                            ? "text-blue-600"
                            : "text-slate-600 hover:text-blue-600"
                        }`}
                      >
                        {link.name}{" "}
                        <ChevronDown
                          size={14}
                          className="group-hover:rotate-180 transition-transform duration-300"
                        />
                      </a>
                      <div className="absolute top-12 left-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
                        {link.subLinks.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href ? sub.href : link.href}
                            onClick={() =>
                              handleSubMenuClick(
                                sub.href ? sub.href.substring(1) : link.page,
                                sub.tabId,
                              )
                            }
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
                      isActive
                        ? "text-blue-600"
                        : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
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
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl border-l border-slate-100 overflow-y-auto z-[110] lg:hidden flex flex-col"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 z-20 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <img
                      src={logoUrl}
                      alt="Logo Puskesmas Lumpue"
                      className="w-6 h-6 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-extrabold text-blue-600 tracking-wide uppercase leading-none mb-0.5">
                      Puskesmas
                    </span>
                    <span className="font-bold text-base text-slate-900 tracking-tight leading-none">
                      Lumpue
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50/50 rounded-xl transition-all border border-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 flex-grow overflow-y-auto space-y-2">
                <a
                  href="#portal"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold shadow-md shadow-blue-600/10 mb-3 border border-blue-500"
                >
                  <div className="p-2 bg-white/10 rounded-lg shrink-0 text-white">
                    <Home size={18} />
                  </div>
                  <span className="text-sm">Portal Utama</span>
                </a>

                {navLinks.map((link) => {
                  const isActive =
                    activePage === link.href.substring(1) ||
                    (link.subLinks &&
                      link.subLinks.some(
                        (sub) =>
                          (sub.href && sub.href.substring(1) === activePage) ||
                          sub.tabId === activePage,
                      ));
                  const isExpanded = expandedMenu === link.name;
                  const LinkIcon = link.icon;

                  if (link.subLinks) {
                    return (
                      <div
                        key={link.name}
                        className={`flex flex-col rounded-xl overflow-hidden transition-all border ${
                          isExpanded
                            ? "bg-slate-50/70 border-slate-200/60 shadow-sm"
                            : "bg-transparent border-transparent"
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedMenu(isExpanded ? null : link.name);
                          }}
                          className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-all ${
                            isActive || isExpanded
                              ? "text-blue-700 font-bold"
                              : "text-slate-700 font-semibold hover:text-blue-600 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                              isActive || isExpanded
                                ? "bg-blue-100/80 text-blue-700"
                                : "bg-slate-100 text-slate-500"
                            }`}>
                              <LinkIcon size={18} />
                            </div>
                            <span>{link.name}</span>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-blue-600" : "text-slate-400"
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-white/50"
                            >
                              <div className="pl-13 pr-4 pb-3 pt-1 space-y-1 relative">
                                <div className="absolute left-9 top-0 bottom-4 w-0.5 bg-slate-200 rounded"></div>
                                {link.subLinks.map((sub) => {
                                  return (
                                    <a
                                      key={sub.name}
                                      href={sub.href ? sub.href : link.href}
                                      onClick={(e) => {
                                        handleSubMenuClick(
                                          sub.href
                                            ? sub.href.substring(1)
                                            : link.page,
                                          sub.tabId,
                                        );
                                      }}
                                      className="block px-3.5 py-2 text-xs text-slate-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-lg font-semibold transition-all relative"
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
                      className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all border ${
                        isActive
                          ? "text-blue-700 bg-blue-50/60 border-blue-100 font-bold"
                          : "text-slate-700 hover:text-blue-600 bg-transparent border-transparent hover:bg-slate-50 font-semibold"
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${
                        isActive ? "bg-blue-100/80 text-blue-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        <LinkIcon size={18} />
                      </div>
                      <span className="text-sm">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
