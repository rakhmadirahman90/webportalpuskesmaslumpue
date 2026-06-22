import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<'umum' | 'kia' | 'posyandu' | 'loket'>('umum');
  const { siteData } = useCMS();

  const schedules = {
    umum: [],
    spesialis: [],
    kia: [],
    posyandu: [],
    loket: [],
    ...(siteData?.jadwal || {})
  };

  return (
    <section id="jadwal" className="min-h-[calc(100vh-80px)] mt-20 py-12 flex flex-col justify-center bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Header & Info */}
          <div className="lg:w-1/3">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Informasi Praktik</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Jadwal<br/>Pelayanan & Dokter</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Jadwal dapat berubah sewaktu-waktu. Untuk kepastian, Anda dapat melakukan pemesanan antrean secara online satu hari sebelum kunjungan.
            </p>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-amber-900">Perhatian</h4>
                  <p className="text-amber-800 text-sm mt-1 leading-relaxed">Pendaftaran ditutup 30 menit sebelum jam operasional berakhir. Kuota harian dibatasi sesuai kapasitas puskesmas.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Tables */}
          <div className="lg:w-2/3">
            
            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 mb-6 gap-2 hide-scrollbar">
              {[
                { id: 'umum', label: 'Poliklinik Umum & Gigi' },
                { id: 'kia', label: 'KIA & KB' },
                { id: 'posyandu', label: 'Posyandu' },
                { id: 'loket', label: 'Pelayanan Loket' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'umum' | 'kia' | 'posyandu' | 'loket')}
                  className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Table Content - Desktop and Tablet */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-sm">
                      <th className="p-4 pl-6">Dokter / Tenaga Medis</th>
                      <th className="p-4">Poliklinik</th>
                      <th className="p-4">Hari Praktik</th>
                      <th className="p-4 pr-6">Jam Praktik</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schedules[activeTab].map((item, idx) => (
                      <motion.tr 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        key={idx} 
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <User size={18} />
                            </div>
                            <span className="font-bold text-slate-900">{item.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 font-medium">{item.poly}</td>
                        <td className="p-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-slate-400" />
                            {item.days}
                          </div>
                        </td>
                        <td className="p-4 pr-6">
                          <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700">
                            <Clock size={14} className="text-slate-500" />
                            {item.hours}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Empty state fallback if none */}
              {schedules[activeTab].length === 0 && (
                <div className="p-12 text-center text-slate-500">
                  Tidak ada jadwal tersedia untuk kategori ini.
                </div>
              )}
            </div>

            {/* Card Content - Mobile Screen Viewports */}
            <div className="block md:hidden space-y-4">
              {schedules[activeTab].map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={idx} 
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <User size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-slate-950 leading-snug break-words">{item.name}</h4>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-1">{item.poly}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Hari Praktik</span>
                      <div className="flex items-center gap-1.5 text-slate-750 font-bold">
                        <Calendar size={13} className="text-slate-400 shrink-0" />
                        <span className="break-words leading-none">{item.days}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Jam Praktik</span>
                      <div className="flex items-center gap-1.5 text-slate-750 font-bold">
                        <Clock size={13} className="text-slate-400 shrink-0" />
                        <span className="break-words leading-none">{item.hours}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {schedules[activeTab].length === 0 && (
                <div className="p-8 text-center text-slate-500 bg-slate-50 border border-slate-150 rounded-2xl">
                  Tidak ada jadwal tersedia untuk kategori ini.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
