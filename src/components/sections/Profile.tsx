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

export default function Profile() {
  const [activeTab, setActiveTab] = useState('selayang-pandang');

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('changeProfileTab', handleTabChange);
    return () => window.removeEventListener('changeProfileTab', handleTabChange);
  }, []);

  const tabs = [
    { id: 'selayang-pandang', label: 'Selayang Pandang', icon: Info },
    { id: 'visi-misi', label: 'Visi & Misi', icon: Target },
    { id: 'tujuan', label: 'Tujuan', icon: Flag },
    { id: 'tata-nilai', label: 'Tata Nilai', icon: Star },
    { id: 'motto', label: 'Motto', icon: HeartHandshake },
    { id: 'kebijakan-mutu', label: 'Kebijakan Mutu', icon: ShieldCheck },
    { id: 'struktur', label: 'Struktur Organisasi', icon: Network },
    { id: 'pegawai', label: 'Data Pegawai', icon: Users },
  ];

  return (
    <section id="profil" className="pt-36 pb-24 min-h-[85vh] bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Profil Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Mengenal Lebih Dekat</h2>
          <p className="text-slate-600 text-lg">
            Informasi lengkap mengenai profil, visi misi, hingga struktur organisasi UPTD Puskesmas Lumpue.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          
          {/* Sidebar Tabs */}
          <div className="lg:w-1/3 shrink-0">
            <div className="flex overflow-x-auto lg:flex-col gap-2 pb-4 lg:pb-0 hide-scrollbar sticky top-28">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold transition-all whitespace-nowrap lg:whitespace-normal text-left ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                        : 'bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <tab.icon size={20} className={isActive ? 'text-blue-100' : 'text-slate-400'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3 min-h-[400px]">
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
                  <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
                    <p>
                      UPTD Puskesmas Lumpue merupakan Fasilitas Kesehatan Tingkat Pertama (FKTP) yang bertanggung jawab menyelenggarakan pembangunan kesehatan di wilayah kerja Kecamatan Bacukiki Barat, Kota Parepare.
                    </p>
                    <p>
                      Kami berkomitmen untuk menyelenggarakan pelayanan kesehatan yang paripurna, merata, bermutu, dan berkeadilan bagi seluruh lapisan masyarakat. Dengan fasilitas yang terus dikembangkan dan tenaga kesehatan yang profesional, kami siap menjadi mitra kesehatan keluarga Anda.
                    </p>
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
                      "Terwujudnya Masyarakat Sehat yang Mandiri dan Berkeadilan Melalui Pelayanan Kesehatan Primer yang Bermutu."
                    </h3>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold mb-6">
                      <Target size={18} /> Misi
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Meningkatkan pelayanan kesehatan dasar yang merata, terjangkau, dan bermutu.",
                        "Mendorong kemandirian masyarakat untuk berperilaku hidup bersih dan sehat (PHBS).",
                        "Menggerakkan dan mendorong pembangunan berwawasan kesehatan di wilayah kerja.",
                        "Meningkatkan kualitas Sumber Daya Manusia (SDM) kesehatan secara profesional dan akuntabel."
                      ].map((item, idx) => (
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
                    <p className="text-lg text-slate-700 leading-relaxed font-medium">
                      Meningkatkan derajat kesehatan masyarakat yang optimal, melalui terciptanya masyarakat, kelompok, dan individu yang memiliki perilaku sehat, memiliki kemampuan untuk menjangkau pelayanan kesehatan yang bermutu, hidup dalam lingkungan rumah yang sehat, dan memiliki derajat kesehatan yang memadai di wilayah kerja UPTD Puskesmas Lumpue.
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
                    {[
                      { letter: 'S', title: 'Senyum, Sapa, Salam', desc: 'Dalam memberikan setiap pelayanan kepada masyarakat.' },
                      { letter: 'I', title: 'Inovatif', desc: 'Terus mengembangkan program kesehatan yang efektif.' },
                      { letter: 'G', title: 'Gotong Royong', desc: 'Melibatkan peran serta seluruh elemen masyarakat.' },
                      { letter: 'A', title: 'Akuntabel', desc: 'Bertanggung jawab dalam setiap pelaksanaan kegiatan.' },
                      { letter: 'P', title: 'Profesional', desc: 'Dalam melaksanakan asuhan dan tindakan medis.' },
                    ].map((item, idx) => (
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
                    {[
                      { letter: 'C', text: 'Cekatan dalam bertindak' },
                      { letter: 'E', text: 'Empati dalam bersikap' },
                      { letter: 'P', text: 'Profesional dalam bekerja' },
                      { letter: 'A', text: 'Akurat dalam mendiagnosa' },
                      { letter: 'T', text: 'Tuntas dalam pengobatan' },
                    ].map((item, idx) => (
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
                    <p className="text-xl md:text-2xl leading-relaxed font-medium relative z-10 font-display">
                      "Kami Pimpinan dan Seluruh Karyawan UPTD Puskesmas Lumpue Berkomitmen Untuk Memberikan Pelayanan Kesehatan Secara Profesional, Sesuai Standar Operasional Prosedur (SOP) Secara Berkesinambungan Guna Memenuhi Kepuasan Pelanggan Serta Melakukan Peningkatan Sistem Manajemen Mutu Secara Terus Menerus."
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
                  
                  <div className="grid gap-4 mt-6">
                    <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex flex-col items-center text-center">
                      <span className="text-sm font-semibold text-blue-600 mb-1 uppercase tracking-wider">Kepala UPTD Puskesmas</span>
                      <span className="text-lg font-bold text-slate-900">Andi Irwan R, SKM., M.Kes</span>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                       <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-xs font-semibold text-slate-500 mb-1 block uppercase tracking-wider">Kasubag Tata Usaha</span>
                        <span className="text-base font-bold text-slate-900">Hj. Salmah, S.ST</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-xs font-semibold text-slate-500 mb-1 block uppercase tracking-wider">Penanggung Jawab Mutu</span>
                        <span className="text-base font-bold text-slate-900">dr. M. Adnan</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-xs font-semibold text-slate-500 mb-1 block uppercase tracking-wider">Penanggung Jawab UKM</span>
                        <span className="text-base font-bold text-slate-900">Siti Nurhaliza, SKM</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-xs font-semibold text-slate-500 mb-1 block uppercase tracking-wider">Penanggung Jawab UKP</span>
                        <span className="text-base font-bold text-slate-900">drg. Fatihah Rizki</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl sm:col-span-2">
                        <span className="text-xs font-semibold text-slate-500 mb-1 block uppercase tracking-wider text-center">Penanggung Jawab Jaringan & Jejaring Fasyankes</span>
                        <span className="text-base font-bold text-slate-900 block text-center">Bidan Rahmawati, Amd.Keb</span>
                      </div>
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
                      <h3 className="text-2xl font-bold text-slate-900 font-display mb-1">Distribusi Tenaga Medis & Non-Medis</h3>
                      <p className="text-slate-600 text-sm">Didukung oleh tenaga profesional di bidangnya.</p>
                    </div>
                    <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0">
                      <div className="text-3xl font-black font-display tracking-tighter">45</div>
                      <div className="text-sm font-medium leading-tight opacity-90">Total<br/>Pegawai</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { role: 'Dokter Umum', count: 3 },
                      { role: 'Dokter Gigi', count: 1 },
                      { role: 'Perawat', count: 15 },
                      { role: 'Bidan', count: 12 },
                      { role: 'Tenaga Kesmas', count: 3 },
                      { role: 'Tenaga Kesling', count: 1 },
                      { role: 'Ahli Lab Medik', count: 2 },
                      { role: 'Tenaga Gizi', count: 2 },
                      { role: 'Tenaga Farmasi', count: 2 },
                      { role: 'Tenaga Admin', count: 4 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                        <span className="font-semibold text-slate-700 text-sm">{item.role}</span>
                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-blue-600 font-bold text-sm">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
