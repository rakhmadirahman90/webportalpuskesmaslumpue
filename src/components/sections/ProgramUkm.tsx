import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ShieldCheck, Baby, Apple, Biohazard } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const iconMapping: any = {
  Activity, ShieldCheck, Baby, Apple, Biohazard
};

export default function ProgramUkm() {
  const { siteData } = useCMS();
  const [activeTab, setActiveTab] = useState('promkes');


  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail?.page === 'program-ukm' && e.detail?.tabId) {
        setActiveTab(e.detail.tabId);
      }
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const programs = [
    { 
      id: 'promkes', 
      title: 'Promosi Kesehatan (Promkes)', 
      icon: Activity, 
      desc: 'Edukasi dan penyuluhan kesehatan masyarakat untuk memberdayakan masyarakat agar mau dan mampu memelihara dan meningkatkan kesehatannya.',
      kegiatan: ['Penyuluhan Keliling', 'Pembinaan Desa Siaga', 'Pemberdayaan Masyarakat di POSBINDU', 'Pengembangan PHBS di Rumah Tangga'],
      target: 'Seluruh lapisan masyarakat',
      jadwal: 'Senin, Rabu, Jumat'
    },
    { 
      id: 'kesling', 
      title: 'Kesehatan Lingkungan (Kesling)', 
      icon: ShieldCheck, 
      desc: 'Pengawasan sanitasi lingkungan, tempat-tempat umum, industri, dan kualitas air minum.',
      kegiatan: ['Inspeksi Sanitasi Tempat Umum (TTU)', 'Pembinaan Tempat Pengelolaan Makanan (TPM)', 'Surveilans Kualitas Air Minum', 'Pemicuan STBM (Sanitasi Total Berbasis Masyarakat)'],
      target: 'Lingkungan komersil dan wilayah perumahan',
      jadwal: 'Selasa dan Kamis'
    },
    { 
      id: 'kiakb', 
      title: 'KIA & KB', 
      icon: Baby, 
      desc: 'Pemeriksaan ibu hamil, pelayanan posyandu balita, dan layanan serta edukasi keluarga berencana.',
      kegiatan: ['Kelas Ibu Hamil', 'Pelayanan ANC, INC, dan PNC', 'Pemasangan & Pencabutan Implan/IUD', 'Imunisasi Dasar Lengkap'],
      target: 'Ibu, Bayi, Balita, WUS, dan PUS',
      jadwal: 'Setiap Hari Kerja'
    },
    { 
      id: 'gizi', 
      title: 'Gizi Masyarakat', 
      icon: Apple, 
      desc: 'Pemantauan status gizi balita, penanganan stunting, edukasi gizi seimbang, dan pemberian makanan tambahan.',
      kegiatan: ['Bulan Timbang Posyandu', 'Pemberian Makanan Tambahan (PMT) Pemulihan', 'Konseling Gizi Balita & Ibu Hamil KEK', 'Pemantauan Garam Beryodium'],
      target: 'Anak Balita, Ibu Hamil',
      jadwal: 'Sesuai Jadwal Posyandu'
    },
    { 
      id: 'p2p', 
      title: 'P2P', 
      icon: Biohazard, 
      desc: 'Pelayanan imunisasi, surveilans epidemiologi, dan pengendalian penyakit menular seperti demam berdarah dan tuberkulosis.',
      kegiatan: ['Pelacakan Kasus (Tracing)', 'Fogging Focus DBD', 'Kunjungan Rumah Pasien TB/Kusta', 'Vaksinasi Massal (BIAS)'],
      target: 'Masyarakat Umum dan Suspek',
      jadwal: 'Situasional & Rutin Harian'
    }
  ];

  const programData = Array.isArray(siteData?.programUkm) ? siteData.programUkm : programs;

  return (
    <section id="program-ukm" className="min-h-[calc(100vh-80px)] mt-20 py-12 flex flex-col justify-center bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Program UKM</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Upaya Kesehatan Masyarakat</h2>
        </div>

        <div className="flex flex-col gap-8 justify-center">
           <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-3xl shadow-sm max-w-4xl mx-auto w-full max-h-[60vh] overflow-y-auto custom-scrollbar">
             <AnimatePresence mode="wait">
               {programData.map((prog: any) => {
                 const IconComp = iconMapping[prog.icon] || Activity;
                 return activeTab === prog.id && (
                 <motion.div key={prog.id} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} className="space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                      <IconComp size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 font-display">{prog.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium pb-4 border-b border-slate-100">{prog.desc}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 pt-2">
                       <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Kegiatan Utama</h4>
                          <ul className="space-y-2">
                             {prog.kegiatan?.map((keg, i) => (
                               <li key={i} className="flex items-start gap-2 text-slate-600 text-sm font-medium">
                                 <span className="text-indigo-400 mt-0.5">•</span> {keg}
                               </li>
                             ))}
                          </ul>
                       </div>
                       <div className="space-y-4">
                         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                           <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg shrink-0">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                           </div>
                           <div>
                              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Sasaran Program</div>
                              <div className="text-slate-700 font-semibold text-sm">{prog.target}</div>
                           </div>
                         </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                           <div className="bg-orange-50 text-orange-600 p-2 rounded-lg shrink-0">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                           </div>
                           <div>
                              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Jadwal Pelayanan</div>
                              <div className="text-slate-700 font-semibold text-sm">{prog.jadwal}</div>
                           </div>
                         </div>
                       </div>
                    </div>
                  </motion.div>
                 )
               })}
             </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
}
