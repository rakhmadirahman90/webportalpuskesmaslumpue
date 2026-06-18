import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Baby, CrossIcon, Heart, Microscope, Stethoscope, Syringe, Tablets } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import DetailModal from '../DetailModal';

const iconMapping: any = {
  Stethoscope, Activity, Baby, Syringe, Microscope, Tablets
};

export default function Services() {
  const { siteData } = useCMS();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const services = [
    {
      id: "umum",
      title: "Poli Umum",
      desc: "Layanan pemeriksaan kesehatan umum, konsultasi medis, dan pengobatan penyakit dasar langsung oleh dokter umum.",
      icon: Stethoscope,
      popular: true
    },
    {
      id: "gigi",
      title: "Poli Gigi & Mulut",
      desc: "Perawatan kesehatan gigi, cabut/tambal gigi dasar, dan edukasi kesehatan mulut untuk semua usia.",
      icon: Activity,
      popular: false
    },
    {
      id: "kia",
      title: "KIA & KB",
      desc: "Kesehatan Ibu dan Anak, pemeriksaan kehamilan (ANC), imunisasi, serta layanan Keluarga Berencana.",
      icon: Baby,
      popular: true
    },
    {
      id: "ugd",
      title: "UGD 24 Jam",
      desc: "Unit Gawat Darurat yang siaga 24/7 beserta layanan ambulan untuk penanganan kondisi kritis medis.",
      icon: Syringe,
      popular: true
    },
    {
      id: "lab",
      title: "Laboratorium",
      desc: "Fasilitas lab dasar untuk tes darah lengkap, urine, kolesterol, gula darah, dan pemeriksaan rutin lainnya.",
      icon: Microscope,
      popular: false
    },
    {
      id: "farmasi",
      title: "Apotek/Farmasi",
      desc: "Penyediaan obat-obatan esensial yang rasional dan terjamin mutunya sesuai resep dokter.",
      icon: Tablets,
      popular: false
    }
  ];

    const servicesData = Array.isArray(siteData?.services) ? siteData.services : services;

    return (
        <section id="layanan" className="min-h-[calc(100vh-80px)] mt-20 py-12 flex flex-col justify-center bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Cakupan Layanan</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Layanan Kesehatan Utama</h2>
              <p className="text-slate-600 text-lg">
                Kami menghadirkan fasilitas kesehatan dasar berkualitas tinggi bagi masyarakat, didukung oleh tenaga medis yang profesional dan alat standar.
              </p>
            </div>
    
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service: any, index: number) => {
                const IconComp = iconMapping[service.icon] || Activity;
                return (
                <motion.div
                  key={service.id || index}
                  onClick={() => setSelectedItem(service)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-100 hover:border-blue-200 transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <IconComp size={28} />
                    </div>
                    {service.popular && (
                      <span className="bg-amber-100 space-x-1 flex items-center text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                        <Heart size={12} className="fill-amber-500 text-amber-500" />
                        <span>Banyak Diakses</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedItem(service); }} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Pelajari Lebih Lanjut
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </motion.div>
                )}
              )}
            </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-2xl max-w-3xl">
            <div className="bg-white p-2 rounded-full text-blue-600 shrink-0 shadow-sm">
              <CrossIcon size={20} />
            </div>
            <p className="font-medium text-sm sm:text-base text-left">
              Puskesmas melayani pendaftaran BPJS Kesehatan (JKN-KIS) dan melayani pasien dengan asuransi swasta tertentu maupun pendaftaran mandiri (umum/tunai).
            </p>
          </div>
        </div>
      </div>
      
      <DetailModal 
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title}
        category="Layanan"
        content={selectedItem?.content || selectedItem?.desc}
      />
    </section>
  );
}
