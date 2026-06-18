import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // Fetch from the server on mount
  useEffect(() => {
    fetch('/api/site-data')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setSiteData({
            hero: data.hero || defaultSiteData.hero,
            profile: data.profile || defaultSiteData.profile,
            services: data.services || defaultSiteData.services,
            news: data.news || defaultSiteData.news,
            gallery: data.gallery || defaultSiteData.gallery,
          });
        }
      })
      .catch((err) => console.error('Failed to load site data', err))
      .finally(() => setLoading(false));
  }, []);

  const updateSection = async (section: string, data: any) => {
    // Optimistic update locally
    const newData = { ...siteData, [section]: data };
    setSiteData(newData);
    
    // Remote update
    const token = localStorage.getItem('auth_token');
    try {
      const response = await fetch('/api/site-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ section, data })
      });
      if (!response.ok) {
        console.error('Failed to save to database');
        alert('Gagal menyimpan ke database. Anda mungkin belum login dengan benar.');
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
