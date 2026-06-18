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
  Users 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Profile() {
  const { siteData } = useCMS();
  const profileData = siteData.profile || {};

  const [activeTab, setActiveTab] = useState('selayang-pandang');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail?.page === 'profil' && e.detail?.tabId) {
        setActiveTab(e.detail.tabId);
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

  return (
    <section id="profil" className="min-h-[calc(100vh-80px)] xl:h-[calc(100vh-80px)] mt-20 flex flex-col justify-center bg-slate-50 relative border-t border-slate-100 py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Profil Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Mengenal Lebih Dekat</h2>
          <p className="text-slate-600 text-lg">
            Informasi lengkap mengenai profil, visi misi, hingga struktur organisasi UPTD Puskesmas Lumpue.
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 min-h-[400px] max-h-[60vh] overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'selayang-pandang' && (
              <motion.div
                key="selayang-pandang"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-2">
                  <Info size={18} /> Selayang Pandang
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">UPTD Puskesmas Lumpue</h3>
                <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {profileData.selayangPandang}
                </div>
              </motion.div>
            )}

            {activeTab === 'visi-misi' && (
              <motion.div
                key="visi-misi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-4">
                    <Target size={18} /> Visi
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug font-display">
                    "{profileData.visi}"
                  </h3>
                </div>
                
                <div className="border-t border-slate-100 pt-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-6">
                    <Target size={18} /> Misi
                  </div>
                  <ul className="space-y-4">
                    {profileData.misi?.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'tujuan' && (
              <motion.div
                key="tujuan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-2">
                  <Flag size={18} /> Tujuan
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Tujuan Organisasi</h3>
                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                  <p className="text-lg text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                    {profileData.tujuan}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'tata-nilai' && (
              <motion.div
                key="tata-nilai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-2">
                  <Star size={18} /> Tata Nilai
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display">S.I.G.A.P</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(profileData.tataNilai || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shrink-0 font-display">
                        {item.letter}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-600 line-clamp-2">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'motto' && (
              <motion.div
                key="motto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-2">
                  <HeartHandshake size={18} /> Motto Layananku
                </div>
                <h3 className="text-3xl font-extrabold text-blue-600 tracking-widest font-display">C.E.P.A.T</h3>
                <div className="space-y-4 pt-4 relative before:absolute before:inset-y-4 before:left-4 before:w-0.5 before:bg-blue-100">
                  {profileData.motto?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-6 relative">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md relative z-10">
                        {item.letter}
                      </div>
                      <div className="bg-slate-50 px-6 py-3 rounded-xl border border-slate-100 flex-grow text-slate-700 font-medium text-lg">
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-2">
                  <ShieldCheck size={18} /> Kebijakan Mutu
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Komitmen Kualitas Pelayanan</h3>
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck size={120} />
                  </div>
                  <p className="text-xl md:text-2xl leading-relaxed font-medium relative z-10 font-display whitespace-pre-wrap">
                    "{profileData.kebijakanMutu}"
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'struktur' && (
              <motion.div
                key="struktur"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-2">
                  <Network size={18} /> Struktur Organisasi
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Jajaran Pengurus & Penanggung Jawab</h3>
                
                <div className="grid gap-6 mt-8">
                  {/* Kepala Puskesmas */}
                  {profileData.strukturOrganisasi?.kepala && (
                  <div className="flex justify-center">
                    <div className="bg-white border border-blue-100 shadow-lg shadow-blue-50 px-8 py-6 rounded-3xl flex flex-col items-center text-center max-w-sm w-full relative overflow-hidden">
                      <div className="absolute top-0 w-full h-24 bg-blue-50 left-0 -z-10"></div>
                      <img 
                        src={profileData.strukturOrganisasi.kepala.photo} 
                        alt={profileData.strukturOrganisasi.kepala.name} 
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                      />
                      <span className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">{profileData.strukturOrganisasi.kepala.role}</span>
                      <span className="text-xl font-bold text-slate-900 mt-2">{profileData.strukturOrganisasi.kepala.name}</span>
                    </div>
                  </div>
                  )}
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(profileData.strukturOrganisasi?.pengurus || []).map((p: any, idx: number) => (
                     <div key={idx} className={`bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow ${idx === (profileData.strukturOrganisasi.pengurus.length - 1) && profileData.strukturOrganisasi.pengurus.length % 2 !== 0 ? 'sm:col-span-2 lg:col-span-2 max-w-xl mx-auto w-full' : ''}`}>
                      <img src={p.photo} alt={p.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-50 shadow-inner shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-blue-600 mb-1 block uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full w-max">{p.role}</span>
                        <span className="text-base font-bold text-slate-900 leading-tight">{p.name}</span>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-2">
                  <Users size={18} /> Data Pegawai
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display mb-1">
                      {selectedRole ? `Data ${selectedRole}` : 'Distribusi Tenaga Medis & Non-Medis'}
                    </h3>
                    <p className="text-slate-600 text-sm">
                       {selectedRole ? `Detail informasi kepegawaian untuk role ${selectedRole}.` : 'Didukung oleh tenaga profesional di bidangnya.'}
                    </p>
                  </div>
                  {!selectedRole ? (
                    <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0">
                      <div className="text-3xl font-black font-display tracking-tighter">
                        {Object.values(pegawaiData || {}).reduce((acc: any, curr: any) => acc + curr.length, 0)}
                      </div>
                      <div className="text-sm font-medium leading-tight opacity-90">Total<br/>Pegawai</div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setSelectedRole(null)}
                      className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors shrink-0"
                    >
                      Kembali ke Statistik
                    </button>
                  )}
                </div>

                {!selectedRole ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(pegawaiData || {}).map((role, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedRole(role)}
                        className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all text-left group"
                      >
                        <span className="font-semibold text-slate-700 text-sm group-hover:text-blue-700">{role}</span>
                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-blue-600 font-bold text-sm group-hover:bg-blue-50 group-hover:border-blue-200">
                          {pegawaiData[role].length}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pegawaiData[selectedRole] ? pegawaiData[selectedRole].map((p, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                        <img 
                          src={p.photo} 
                          alt={p.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-slate-50 shadow-inner"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 leading-tight">{p.name}</h4>
                          <span className="text-sm font-medium text-blue-600 block mt-0.5">{p.role}</span>
                          {p.nip && <span className="text-xs text-slate-500 block mt-1">NIP. {p.nip}</span>}
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-8 text-center text-slate-500">
                        Data {selectedRole} belum tersedia.
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

