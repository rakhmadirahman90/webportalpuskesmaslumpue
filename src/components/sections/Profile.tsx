import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  Target, 
  Flag, 
  Star, 
  HeartHandshake, 
  ShieldCheck, 
  Network, 
  Users,
  Building
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface ProfileProps {
  activeTab?: string;
}

export default function Profile({ activeTab: propActiveTab }: ProfileProps) {
  const { siteData } = useCMS();
  const profileData = siteData.profile || {};

  const [localActiveTab, setLocalActiveTab] = useState('selayang-pandang');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const activeTab = propActiveTab || localActiveTab;

  useEffect(() => {
    if (propActiveTab) {
      setLocalActiveTab(propActiveTab);
      setSelectedRole(null);
    }
  }, [propActiveTab]);

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail?.page === 'profil' && e.detail?.tabId) {
        setLocalActiveTab(e.detail.tabId);
        setSelectedRole(null); // Reset selected role when changing tabs
      }
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const defaultPegawaiData: Record<string, {name: string, role: string, nip?: string, photo?: string}[]> = {
    'Dokter Umum': [
      { name: 'dr. Andi Suryadi', role: 'Dokter Umum', nip: '198001012010011001', photo: 'https://randomuser.me/api/portraits/men/11.jpg' },
      { name: 'dr. Budi Setiawan', role: 'Dokter Umum', nip: '198502022015021002', photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
      { name: 'dr. Citra Kirana', role: 'Dokter Umum', nip: '199003032018032003', photo: 'https://randomuser.me/api/portraits/women/11.jpg' }
    ],
    'Dokter Gigi': [
      { name: 'drg. Diana Putri', role: 'Dokter Gigi', nip: '198804042014042004', photo: 'https://randomuser.me/api/portraits/women/12.jpg' }
    ],
    'Perawat': Array.from({length: 15}, (_, i) => ({ name: `Perawat Profesional ${i+1}`, role: 'Perawat', photo: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg` })),
    'Bidan': Array.from({length: 12}, (_, i) => ({ name: `Bidan Terampil ${i+1}`, role: 'Bidan', photo: `https://randomuser.me/api/portraits/women/${i + 40}.jpg` })),
    'Tenaga Kesmas': Array.from({length: 3}, (_, i) => ({ name: `Penyuluh Kesmas ${i+1}`, role: 'Tenaga Kesmas', photo: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 50}.jpg` })),
    'Tenaga Kesling': [
      { name: 'Eko Pratama, SKM', role: 'Tenaga Kesling', nip: '199201012020011005', photo: 'https://randomuser.me/api/portraits/men/13.jpg' }
    ],
    'Ahli Lab Medik': Array.from({length: 2}, (_, i) => ({ name: `Analis Kesehatan ${i+1}`, role: 'Ahli Lab Medik', photo: `https://randomuser.me/api/portraits/women/${i + 60}.jpg` })),
    'Tenaga Gizi': Array.from({length: 2}, (_, i) => ({ name: `Nutrisionis ${i+1}`, role: 'Tenaga Gizi', photo: `https://randomuser.me/api/portraits/women/${i + 70}.jpg` })),
    'Tenaga Farmasi': Array.from({length: 2}, (_, i) => ({ name: `Apoteker/Asisten ${i+1}`, role: 'Tenaga Farmasi', photo: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 80}.jpg` })),
    'Tenaga Admin': Array.from({length: 4}, (_, i) => ({ name: `Staf Administrasi ${i+1}`, role: 'Tenaga Admin', photo: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 90}.jpg` })),
  };

  const pegawaiData = profileData.pegawaiData || defaultPegawaiData;

  const profileTabs = [
    { id: 'selayang-pandang', name: 'Selayang Pandang' },
    { id: 'visi-misi', name: 'Visi & Misi' },
    { id: 'tujuan', name: 'Tujuan' },
    { id: 'tata-nilai', name: 'Tata Nilai' },
    { id: 'motto', name: 'Motto' },
    { id: 'kebijakan-mutu', name: 'Kebijakan Mutu' },
    { id: 'struktur', name: 'Struktur Organisasi' },
    { id: 'pegawai', name: 'Data Pegawai' },
  ];

  return (
    <section id={activeTab} className="min-h-screen mt-20 flex flex-col justify-center bg-slate-50 relative border-t border-slate-100 py-12 lg:py-20 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'selayang-pandang' && (
            <motion.div
              key="selayang-pandang"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <div className="relative group overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-blue-900/5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10 transition-transform group-hover:scale-110 duration-500"></div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                    <Building size={28} className="stroke-[2.5]" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-2 font-display">Puskesmas Lumpue</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Menyediakan pelayanan kesehatan dasar bermutu, merata, dan terjangkau dalam rangka mewujudkan masyarakat sehat mandiri.
                  </p>
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">Kode Puskesmas</span>
                    <span className="text-xs font-bold font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">P7372020202</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-wider uppercase">
                  <Info size={14} className="stroke-[3]" /> Selayang Pandang
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">Profil Singkat UPTD Puskesmas Lumpue</h3>
                <div className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-sans">
                  {profileData.selayangPandang}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'visi-misi' && (
            <motion.div
              key="visi-misi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-wider uppercase mx-auto">
                  <Target size={14} className="stroke-[3]" /> Visi & Misi
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">Arah & Komitmen Strategis</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Panduan operasional dan nilai luhur yang mengarahkan langkah kami guna memberikan pelayanan kesehatan terbaik untuk seluruh warga.
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
                {/* Visi Left */}
                <div className="lg:col-span-12 xl:col-span-5 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-600/15 relative overflow-hidden flex flex-col justify-between min-h-[250px]">
                  <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/5 rounded-full -z-10"></div>
                  <div className="absolute top-6 right-6 opacity-20">
                    <Target size={120} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-100 bg-blue-500/30 px-3 py-1 rounded-full w-fit">Visi Kami</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight mt-6 whitespace-pre-line italic">
                    "{profileData.visi}"
                  </h4>
                  <div className="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-blue-200">
                    UPTD Puskesmas Lumpue
                  </div>
                </div>

                {/* Misi Right */}
                <div className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5 flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-6 block">Misi Kami</span>
                  <ul className="space-y-5">
                    {profileData.misi?.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-start group">
                        <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-extrabold text-sm border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 duration-300">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tujuan' && (
            <motion.div
              key="tujuan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-wider uppercase mx-auto">
                  <Flag size={14} className="stroke-[3]" /> Tujuan Kami
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">Tujuan Organisasi</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Sasaran utama yang ingin dicapai melalui sinergi program pelayanan kesehatan yang berfokus pada kesejahteraan masyarakat.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="relative bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-900/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-8">
                    <Flag size={24} className="stroke-[2.5]" />
                  </div>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold whitespace-pre-wrap font-sans">
                    {profileData.tujuan}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tata-nilai' && (
            <motion.div
              key="tata-nilai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-10"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-wider uppercase mx-auto">
                  <Star size={14} className="stroke-[3]" /> Norma & Budaya
                </div>
                {(() => {
                  const acronym = (profileData.tataNilai || []).map((t: any) => t.letter || '').filter(Boolean).join('.').toUpperCase();
                  return (
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                      Tata Nilai {acronym || "S.I.G.A.P"}
                    </h3>
                  );
                })()}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Prinsip-prinsip luhur yang menjadi pedoman perilaku setiap insan medis dan administrasi kami dalam berinteraksi dengan pasien dan masyarakat.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {(profileData.tataNilai || []).map((item: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg shadow-slate-950/5 flex flex-col gap-5 items-start relative group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl duration-300">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-2xl shrink-0 font-display shadow-md shadow-blue-600/20">
                      {item.letter}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2 font-display">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'motto' && (
            <motion.div
              key="motto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-10"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-wider uppercase mx-auto">
                  <HeartHandshake size={14} className="stroke-[3]" /> Motto Utama
                </div>
                {(() => {
                  const acronym = (profileData.motto || []).map((m: any) => m.letter || '').filter(Boolean).join('.').toUpperCase();
                  return (
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                      Motto Layananku {acronym || "C.E.P.A.T"}
                    </h3>
                  );
                })()}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Kami senantiasa berpedoman pada komitmen respon dini, kesigapan, keramahan, dan kepuasan penerima manfaat.
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6 pt-4 relative before:absolute before:inset-y-6 before:left-6 sm:before:left-8 before:w-0.5 before:bg-blue-100 before:-z-10">
                {profileData.motto?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-5 sm:gap-6 relative group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg sm:text-xl shrink-0 shadow-md shadow-blue-600/10 border-4 border-white transition-transform duration-300 group-hover:scale-105 z-10">
                      {item.letter}
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex-grow text-slate-700 font-extrabold text-base sm:text-lg tracking-tight font-display hover:shadow-md transition-shadow duration-300">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'kebijakan-mutu' && (
            <motion.div
              key="kebijakan-mutu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-wider uppercase mx-auto">
                  <ShieldCheck size={14} className="stroke-[3]" /> Mutu & Standardisasi
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">Kebijakan Mutu</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Komitmen tertulis standardisasi mutu kami demi memberikan pelayanan terbaik secara berkesinambungan bagi warga Kota Parepare.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl shadow-blue-600/15 overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 sm:p-12 md:p-16 opacity-10">
                    <ShieldCheck size={180} className="stroke-[1.5]" />
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold relative z-10 font-display whitespace-pre-wrap italic text-center text-blue-50">
                    "{profileData.kebijakanMutu}"
                  </p>
                  <div className="mt-8 flex justify-center">
                    <span className="h-1.5 w-16 bg-blue-400 rounded-full"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'struktur' && (
            <motion.div
              key="struktur"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-wider uppercase mx-auto">
                  <Network size={14} className="stroke-[3]" /> Koordinasi & Manajemen
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">Struktur Organisasi</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Tata kelola kepemimpinan dan penanggung jawab program teknis keperawatan, administrasi, dan unit pelayanan.
                </p>
              </div>

              <div className="max-w-5xl mx-auto space-y-12">
                {/* Kepala Puskesmas */}
                {profileData.strukturOrganisasi?.kepala && (
                  <div className="flex justify-center">
                    <div className="bg-white border-2 border-blue-500 shadow-xl shadow-blue-50 p-8 rounded-3xl flex flex-col items-center text-center max-w-sm w-full relative overflow-hidden group">
                      <div className="absolute top-0 w-full h-24 bg-blue-50 left-0 -z-10 transition-colors group-hover:bg-blue-100/50"></div>
                      <img 
                        src={profileData.strukturOrganisasi.kepala.photo || 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400'} 
                        alt={profileData.strukturOrganisasi.kepala.name} 
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-4 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400' }}
                      />
                      <span className="text-xs font-black text-blue-700 mb-1.5 uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full">{profileData.strukturOrganisasi.kepala.role}</span>
                      <span className="text-xl font-extrabold text-slate-900 font-display mt-2">{profileData.strukturOrganisasi.kepala.name}</span>
                    </div>
                  </div>
                )}

                {/* Pengurus Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {(profileData.strukturOrganisasi?.pengurus || []).map((p: any, idx: number) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
                      <img 
                        src={p.photo || 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400'} 
                        alt={p.name} 
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400' }} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-50 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black text-blue-600 mb-1 inline-block uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full w-fit max-w-full truncate">{p.role}</span>
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight block mt-0.5 truncate font-display">{p.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'pegawai' && (
            <motion.div
              key="pegawai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-10"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-wider uppercase mx-auto">
                  <Users size={14} className="stroke-[3]" /> Direktori Kepegawaian
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">Data Kepegawaian & SDM</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Sinergi dan keahlian seluruh tenaga medis, paramedis, sanitarian, nutrisionis, dan tata usaha profesional kami.
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 font-display mb-1 font-sans">
                      {selectedRole ? `Tenaga ${selectedRole}` : 'Distribusi Berdasarkan Klasifikasi Jabatan'}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {selectedRole ? `Detail personil kepegawaian untuk kategori ${selectedRole}.` : 'Pilihlah salah satu klasifikasi untuk melihat detail daftar pegawai.'}
                    </p>
                  </div>
                  {!selectedRole ? (
                    <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0 shadow-md shadow-blue-500/10">
                      <div className="text-3xl font-black font-display tracking-tighter">
                        {Object.values(pegawaiData || {}).reduce((acc: any, curr: any) => acc + curr.length, 0)}
                      </div>
                      <div className="text-xs font-semibold leading-tight opacity-90">Total Seluruh<br/>Insan Pegawai</div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setSelectedRole(null)}
                      className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-extrabold hover:bg-slate-200 transition-colors shrink-0 text-sm"
                    >
                      Kembali Ke Seluruh Jabatan
                    </button>
                  )}
                </div>

                {!selectedRole ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(pegawaiData || {}).map((role, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedRole(role)}
                        className="flex justify-between items-center p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all text-left group"
                      >
                        <span className="font-bold text-slate-800 text-sm group-hover:text-blue-700 font-display">{role}</span>
                        <span className="bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-full text-blue-600 font-extrabold text-xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                          {pegawaiData[role].length}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pegawaiData[selectedRole] ? pegawaiData[selectedRole].map((p, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-5 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
                        <img 
                          src={p.photo || 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400'} 
                          alt={p.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-slate-50 shadow-inner shrink-0"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400' }}
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-slate-950 font-display leading-tight break-words text-sm sm:text-base">{p.name}</h4>
                          <span className="text-xs font-semibold text-blue-600 block mt-0.5 break-words uppercase tracking-wider">{p.role}</span>
                          {p.nip && <span className="text-xs text-slate-500 block mt-1 break-all font-mono text-[10px]/normal lg:text-xs">NIP. {p.nip}</span>}
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 border border-slate-100 rounded-3xl">
                        Data {selectedRole} belum tersedia.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

