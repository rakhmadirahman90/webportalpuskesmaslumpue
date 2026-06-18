import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Default initial data for the entire site
const defaultSiteData = {
  hero: {
    title: "Pelayanan Kesehatan",
    titleHighlight: "Sepenuh Hati",
    subtitle: "Sistem Pendaftaran Online Resmi Dibuka",
    description: "Fasilitas Pelayanan Kesehatan Tingkat Pertama (FKTP) bersertifikasi standar Kementerian Kesehatan RI. Cepat, tepat, dan ramah untuk keluarga Anda."
  },
  profile: {
    selayangPandang: "UPTD Puskesmas Lumpue merupakan Fasilitas Kesehatan Tingkat Pertama (FKTP) yang bertanggung jawab menyelenggarakan pembangunan kesehatan di wilayah kerja Kecamatan Bacukiki Barat, Kota Parepare.\n\nKami berkomitmen untuk menyelenggarakan pelayanan kesehatan yang paripurna, merata, bermutu, dan berkeadilan bagi seluruh lapisan masyarakat. Dengan fasilitas yang terus dikembangkan dan tenaga kesehatan yang profesional, kami siap menjadi mitra kesehatan keluarga Anda.",
    visi: "Terwujudnya Masyarakat Sehat yang Mandiri dan Berkeadilan Melalui Pelayanan Kesehatan Primer yang Bermutu.",
    misi: [
      "Meningkatkan pelayanan kesehatan dasar yang merata, terjangkau, dan bermutu.",
      "Mendorong kemandirian masyarakat untuk berperilaku hidup bersih dan sehat (PHBS).",
      "Menggerakkan dan mendorong pembangunan berwawasan kesehatan di wilayah kerja.",
      "Meningkatkan kualitas Sumber Daya Manusia (SDM) kesehatan secara profesional dan akuntabel."
    ],
    tujuan: "Meningkatkan derajat kesehatan masyarakat yang optimal, melalui terciptanya masyarakat, kelompok, dan individu yang memiliki perilaku sehat, memiliki kemampuan untuk menjangkau pelayanan kesehatan yang bermutu, hidup dalam lingkungan rumah yang sehat, dan memiliki derajat kesehatan yang memadai di wilayah kerja UPTD Puskesmas Lumpue.",
    kebijakanMutu: "Kami Pimpinan dan Seluruh Karyawan UPTD Puskesmas Lumpue Berkomitmen Untuk Memberikan Pelayanan Kesehatan Secara Profesional, Sesuai Standar Operasional Prosedur (SOP) Secara Berkesinambungan Guna Memenuhi Kepuasan Pelanggan Serta Melakukan Peningkatan Sistem Manajemen Mutu Secara Terus Menerus.",
    motto: [
      { letter: 'C', text: 'Cekatan dalam bertindak' },
      { letter: 'E', text: 'Empati dalam bersikap' },
      { letter: 'P', text: 'Profesional dalam bekerja' },
      { letter: 'A', text: 'Akurat dalam mendiagnosa' },
      { letter: 'T', text: 'Tuntas dalam pengobatan' },
    ]
  },
  services: {
    dalamGedung: [
      { title: 'Poli Umum', icon: 'stethoscope', count: '100+', label: 'Pasien/hari' },
      { title: 'Poli Gigi', icon: 'tooth', count: '50+', label: 'Tindakan/Bulan' },
      { title: 'KIA/KB', icon: 'baby', count: '24/7', label: 'Siaga Persalinan' },
      { title: 'UGD 24 Jam', icon: 'ambulance', count: 'Fast', label: 'Respon Cepat' }
    ]
  },
  news: [
    { id: 1, title: 'Vaksinasi Massal 2026', date: 'Bulan ini', type: 'Berita' }
  ],
  gallery: [
    { id: 1, title: 'Kegiatan Posyandu', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600' }
  ]
};

export const CMSContext = createContext<any>(null);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [siteData, setSiteData] = useState<any>(defaultSiteData);
  const [loading, setLoading] = useState(true);

  // Fetch from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_settings')
          .select('*')
          .eq('id', 'default');
          
        if (!error && data && data.length > 0) {
          const remoteData = data[0];
          setSiteData({
            hero: remoteData.hero || defaultSiteData.hero,
            profile: remoteData.profile || defaultSiteData.profile,
            services: remoteData.services || defaultSiteData.services,
            news: remoteData.news || defaultSiteData.news,
            gallery: remoteData.gallery || defaultSiteData.gallery,
          });
        }
      } catch (err) {
        console.error('Failed to load site data', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const updateSection = async (section: string, data: any) => {
    // Optimistic update locally
    const newData = { ...siteData, [section]: data };
    setSiteData(newData);
    
    // Remote update
    try {
      const { data: current, error: currentErr } = await supabase
        .from('cms_settings')
        .select('*')
        .eq('id', 'default');
        
      if (currentErr) throw currentErr;
      
      let updatePayload: any = {};
      
      if (!current || current.length === 0) {
        // Initial insert
        updatePayload = { id: 'default', [section]: data };
        const { error: insErr } = await supabase.from('cms_settings').insert([updatePayload]);
        if (insErr) throw insErr;
      } else {
        updatePayload = { [section]: data, updated_at: new Date().toISOString() };
        const { error: upErr } = await supabase
          .from('cms_settings')
          .update(updatePayload)
          .eq('id', 'default');
        if (upErr) throw upErr;
      }
    } catch (err) {
      console.error(err);
      alert('Error koneksi saat menyimpan!');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <CMSContext.Provider value={{ siteData, updateSection }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}
