import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Default initial data for the entire site
const defaultSiteData = {
  hero: {
    title: "Pelayanan Kesehatan\nSepenuh Hati",
    titleHighlight: "",
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
    tataNilai: [
      { letter: 'S', title: 'Senyum, Sapa, Salam', desc: 'Dalam memberikan setiap pelayanan kepada masyarakat.' },
      { letter: 'I', title: 'Inovatif', desc: 'Terus mengembangkan program kesehatan yang efektif.' },
      { letter: 'G', title: 'Gotong Royong', desc: 'Melibatkan peran serta seluruh elemen masyarakat.' },
      { letter: 'A', title: 'Akuntabel', desc: 'Bertanggung jawab dalam setiap pelaksanaan kegiatan.' },
      { letter: 'P', title: 'Profesional', desc: 'Dalam melaksanakan asuhan dan tindakan medis.' }
    ],
    motto: [
      { letter: 'C', text: 'Cekatan dalam bertindak' },
      { letter: 'E', text: 'Empati dalam bersikap' },
      { letter: 'P', text: 'Profesional dalam bekerja' },
      { letter: 'A', text: 'Akurat dalam mendiagnosa' },
      { letter: 'T', text: 'Tuntas dalam pengobatan' },
    ],
    strukturOrganisasi: {
      kepala: { name: 'Andi Irwan R, SKM., M.Kes', role: 'Kepala UPTD Puskesmas', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
      pengurus: [
        { name: 'Hj. Salmah, S.ST', role: 'Kasubag Tata Usaha', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'dr. M. Adnan', role: 'PJ Mutu', photo: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { name: 'Siti Nurhaliza, SKM', role: 'PJ UKM', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { name: 'drg. Fatihah Rizki', role: 'PJ UKP', photo: 'https://randomuser.me/api/portraits/women/65.jpg' },
        { name: 'Bidan Rahmawati, Amd.Keb', role: 'PJ Jaringan & Jejaring Fasyankes', photo: 'https://randomuser.me/api/portraits/women/89.jpg' }
      ]
    },
    pegawaiData: {
      'Dokter Umum': [
        { name: 'dr. Andi Suryadi', role: 'Dokter Umum', nip: '198001012010011001', photo: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'dr. Budi Setiawan', role: 'Dokter Umum', nip: '198502022015021002', photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
        { name: 'dr. Citra Kirana', role: 'Dokter Umum', nip: '199003032018032003', photo: 'https://randomuser.me/api/portraits/women/11.jpg' }
      ],
      'Dokter Gigi': [
        { name: 'drg. Diana Putri', role: 'Dokter Gigi', nip: '198804042014042004', photo: 'https://randomuser.me/api/portraits/women/12.jpg' }
      ]
    }
  },
  kontak: {
    alamat: "Jl. Bau Massepe No. 12\nKelurahan Lumpue, Kecamatan Bacukiki Barat\nKota Parepare, Sulawesi Selatan 91122",
    telepon: "119 / (0421) 21119",
    email: "puskesmas.lumpue@pareparekota.go.id",
    gambarGedung: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    embedMap: "https://maps.google.com/maps?q=Puskesmas+Lumpue+Parepare&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  sosialMedia: [
    { title: "Facebook", username: "Puskesmas Lumpue", url: "https://facebook.com", icon: "Facebook" },
    { title: "Instagram", username: "@puskesmaslumpue", url: "https://instagram.com", icon: "Instagram" },
    { title: "YouTube", username: "PKM Lumpue", url: "https://youtube.com", icon: "Youtube" }
  ],
  services: [
    {
      id: "umum",
      title: "Poli Umum",
      desc: "Layanan pemeriksaan kesehatan umum, konsultasi medis, dan pengobatan penyakit dasar langsung oleh dokter umum.",
      icon: "Stethoscope",
      popular: true
    },
    {
      id: "gigi",
      title: "Poli Gigi & Mulut",
      desc: "Perawatan kesehatan gigi, cabut/tambal gigi dasar, dan edukasi kesehatan mulut untuk semua usia.",
      icon: "Activity",
      popular: false
    },
    {
      id: "kia",
      title: "KIA & KB",
      desc: "Kesehatan Ibu dan Anak, pemeriksaan kehamilan (ANC), imunisasi, serta layanan Keluarga Berencana.",
      icon: "Baby",
      popular: true
    },
    {
      id: "ugd",
      title: "UGD 24 Jam",
      desc: "Unit Gawat Darurat yang siaga 24/7 beserta layanan ambulan untuk penanganan kondisi kritis medis.",
      icon: "Syringe",
      popular: true
    },
    {
      id: "lab",
      title: "Laboratorium",
      desc: "Fasilitas lab dasar untuk tes darah lengkap, urine, kolesterol, gula darah, dan pemeriksaan rutin lainnya.",
      icon: "Microscope",
      popular: false
    },
    {
      id: "farmasi",
      title: "Apotek/Farmasi",
      desc: "Penyediaan obat-obatan esensial yang rasional dan terjamin mutunya sesuai resep dokter.",
      icon: "Tablets",
      popular: false
    }
  ],
  programUkm: [
    { 
      id: 'promkes', 
      title: 'Promosi Kesehatan (Promkes)', 
      icon: "Activity", 
      desc: 'Edukasi dan penyuluhan kesehatan masyarakat untuk memberdayakan masyarakat agar mau dan mampu memelihara dan meningkatkan kesehatannya.',
      kegiatan: ['Penyuluhan Keliling', 'Pembinaan Desa Siaga', 'Pemberdayaan Masyarakat di POSBINDU', 'Pengembangan PHBS di Rumah Tangga'],
      target: 'Seluruh lapisan masyarakat',
      jadwal: 'Senin, Rabu, Jumat'
    },
    { 
      id: 'kesling', 
      title: 'Kesehatan Lingkungan (Kesling)', 
      icon: "ShieldCheck", 
      desc: 'Pengawasan sanitasi lingkungan, tempat-tempat umum, industri, dan kualitas air minum.',
      kegiatan: ['Inspeksi Sanitasi Tempat Umum (TTU)', 'Pembinaan Tempat Pengelolaan Makanan (TPM)', 'Surveilans Kualitas Air Minum', 'Pemicuan STBM (Sanitasi Total Berbasis Masyarakat)'],
      target: 'Lingkungan komersil dan wilayah perumahan',
      jadwal: 'Selasa dan Kamis'
    },
    { 
      id: 'kiakb', 
      title: 'KIA & KB', 
      icon: "Baby", 
      desc: 'Pemeriksaan ibu hamil, pelayanan posyandu balita, dan layanan serta edukasi keluarga berencana.',
      kegiatan: ['Kelas Ibu Hamil', 'Pelayanan ANC, INC, dan PNC', 'Pemasangan & Pencabutan Implan/IUD', 'Imunisasi Dasar Lengkap'],
      target: 'Ibu, Bayi, Balita, WUS, dan PUS',
      jadwal: 'Setiap Hari Kerja'
    },
    { 
      id: 'gizi', 
      title: 'Gizi Masyarakat', 
      icon: "Apple", 
      desc: 'Pemantauan status gizi balita, penanganan stunting, edukasi gizi seimbang, dan pemberian makanan tambahan.',
      kegiatan: ['Bulan Timbang Posyandu', 'Pemberian Makanan Tambahan (PMT) Pemulihan', 'Konseling Gizi Balita & Ibu Hamil KEK', 'Pemantauan Garam Beryodium'],
      target: 'Anak Balita, Ibu Hamil',
      jadwal: 'Sesuai Jadwal Posyandu'
    },
    { 
      id: 'p2p', 
      title: 'P2P', 
      icon: "Biohazard", 
      desc: 'Pelayanan imunisasi, surveilans epidemiologi, dan pengendalian penyakit menular seperti demam berdarah dan tuberkulosis.',
      kegiatan: ['Pelacakan Kasus (Tracing)', 'Fogging Focus DBD', 'Kunjungan Rumah Pasien TB/Kusta', 'Vaksinasi Massal (BIAS)'],
      target: 'Masyarakat Umum dan Suspek',
      jadwal: 'Situasional & Rutin Harian'
    }
  ],
  news: [
    {
      id: 1,
      category: "Edukasi",
      date: "12 Okt 2026",
      title: "Waspada Demam Berdarah Dengue (DBD) di Musim Hujan",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop",
      excerpt: "Mari lakukan 3M Plus untuk mencegah perkembangbiakan nyamuk Aedes aegypti di lingkungan sekitar kita."
    },
    {
      id: 2,
      category: "Program KIA",
      date: "08 Okt 2026",
      title: "Pekan Imunisasi Nasional (PIN) Polio Telah Dimulai",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      excerpt: "Lindungi buah hati dari ancaman virus Polio. Bawalah anak balita Anda ke Posyandu atau Puskesmas terdekat."
    },
    {
      id: 3,
      category: "Gizi Masyarakat",
      date: "01 Okt 2026",
      title: "Pentingnya Isi Piringku untuk Cegah Stunting Sejak Dini",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      excerpt: "Memahami konsep gizi seimbang melalui pedoman Isi Piringku dari Kementerian Kesehatan."
    }
  ],
  gallery: {
    foto: [
      { id: 1, title: 'Kegiatan Posyandu', sub: 'Layanan Balita', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600' },
      { id: 2, title: 'Pemeriksaan Kesehatan Lengkap', sub: 'Layanan Umum', img: 'https://plus.unsplash.com/premium_photo-1661764835694-ee2643a1a364?auto=format&fit=crop&q=80&w=600' },
      { id: 3, title: 'Edukasi Kesehatan Sekolah', sub: 'Kegiatan UKM', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600' },
      { id: 4, title: 'Layanan Gigi & Mulut', sub: 'Poli Gigi', img: 'https://images.unsplash.com/photo-1606811841689-1372dfcb1c76?auto=format&fit=crop&q=80&w=600' },
      { id: 5, title: 'Penyuluhan Stunting', sub: 'Program Gizi', img: 'https://images.unsplash.com/photo-1536640712-4d4c36ef0e52?auto=format&fit=crop&q=80&w=600' },
      { id: 6, title: 'Fasilitas Puskesmas', sub: 'Ruang Rawat', img: 'https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?auto=format&fit=crop&q=80&w=600' },
    ],
    video: [1, 2]
  }
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
            kontak: remoteData.kontak || defaultSiteData.kontak,
            sosialMedia: remoteData.sosialMedia || defaultSiteData.sosialMedia,
            services: remoteData.services || defaultSiteData.services,
            programUkm: remoteData.programUkm || defaultSiteData.programUkm,
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
