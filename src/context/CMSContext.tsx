import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

// Default initial data for the entire site
const defaultSiteData = {
  hero: {
    title: "Pelayanan Kesehatan\nSepenuh Hati",
    titleHighlight: "",
    subtitle: "Web Portal Informasi Puskesmas Lumpue Resmi Dibuka",
    description:
      "Fasilitas Pelayanan Kesehatan Tingkat Pertama (FKTP) bersertifikasi standar Kementerian Kesehatan RI. Cepat, tepat, dan ramah untuk keluarga Anda.",
    sliderImages: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  profile: {
    selayangPandang:
      "UPTD Puskesmas Lumpue merupakan Fasilitas Kesehatan Tingkat Pertama (FKTP) yang bertanggung jawab menyelenggarakan pembangunan kesehatan di wilayah kerja Kecamatan Bacukiki Barat, Kota Parepare.\n\nKami berkomitmen untuk menyelenggarakan pelayanan kesehatan yang paripurna, merata, bermutu, dan berkeadilan bagi seluruh lapisan masyarakat. Dengan fasilitas yang terus dikembangkan dan tenaga kesehatan yang profesional, kami siap menjadi mitra kesehatan keluarga Anda.",
    visi: "Terwujudnya Masyarakat Sehat yang Mandiri dan Berkeadilan Melalui Pelayanan Kesehatan Primer yang Bermutu.",
    misi: [
      "Meningkatkan pelayanan kesehatan dasar yang merata, terjangkau, dan bermutu.",
      "Mendorong kemandirian masyarakat untuk berperilaku hidup bersih dan sehat (PHBS).",
      "Menggerakkan dan mendorong pembangunan berwawasan kesehatan di wilayah kerja.",
      "Meningkatkan kualitas Sumber Daya Manusia (SDM) kesehatan secara profesional dan akuntabel.",
    ],
    tujuan:
      "Meningkatkan derajat kesehatan masyarakat yang optimal, melalui terciptanya masyarakat, kelompok, dan individu yang memiliki perilaku sehat, memiliki kemampuan untuk menjangkau pelayanan kesehatan yang bermutu, hidup dalam lingkungan rumah yang sehat, dan memiliki derajat kesehatan yang memadai di wilayah kerja UPTD Puskesmas Lumpue.",
    kebijakanMutu:
      "Kami Pimpinan dan Seluruh Karyawan UPTD Puskesmas Lumpue Berkomitmen Untuk Memberikan Pelayanan Kesehatan Secara Profesional, Sesuai Standar Operasional Prosedur (SOP) Secara Berkesinambungan Guna Memenuhi Kepuasan Pelanggan Serta Melakukan Peningkatan Sistem Manajemen Mutu Secara Terus Menerus.",
    tataNilai: [
      {
        letter: "S",
        title: "Senyum, Sapa, Salam",
        desc: "Dalam memberikan setiap pelayanan kepada masyarakat.",
      },
      {
        letter: "I",
        title: "Inovatif",
        desc: "Terus mengembangkan program kesehatan yang efektif.",
      },
      {
        letter: "G",
        title: "Gotong Royong",
        desc: "Melibatkan peran serta seluruh elemen masyarakat.",
      },
      {
        letter: "A",
        title: "Akuntabel",
        desc: "Bertanggung jawab dalam setiap pelaksanaan kegiatan.",
      },
      {
        letter: "P",
        title: "Profesional",
        desc: "Dalam melaksanakan asuhan dan tindakan medis.",
      },
    ],
    motto: [
      { letter: "C", text: "Cekatan dalam bertindak" },
      { letter: "E", text: "Empati dalam bersikap" },
      { letter: "P", text: "Profesional dalam bekerja" },
      { letter: "A", text: "Akurat dalam mendiagnosa" },
      { letter: "T", text: "Tuntas dalam pengobatan" },
    ],
    strukturOrganisasi: {
      kepala: {
        name: "Andi Irwan R, SKM., M.Kes",
        role: "Kepala UPTD Puskesmas",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      pengurus: [
        {
          name: "Hj. Salmah, S.ST",
          role: "Kasubag Tata Usaha",
          photo: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "dr. M. Adnan",
          role: "PJ Mutu",
          photo: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        {
          name: "Siti Nurhaliza, SKM",
          role: "PJ UKM",
          photo: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          name: "drg. Fatihah Rizki",
          role: "PJ UKP",
          photo: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
          name: "Bidan Rahmawati, Amd.Keb",
          role: "PJ Jaringan & Jejaring Fasyankes",
          photo: "https://randomuser.me/api/portraits/women/89.jpg",
        },
      ],
    },
    pegawaiData: {
      "Dokter Umum": [
        {
          name: "dr. Andi Suryadi",
          role: "Dokter Umum",
          nip: "198001012010011001",
          photo: "https://randomuser.me/api/portraits/men/11.jpg",
        },
        {
          name: "dr. Budi Setiawan",
          role: "Dokter Umum",
          nip: "198502022015021002",
          photo: "https://randomuser.me/api/portraits/men/12.jpg",
        },
        {
          name: "dr. Citra Kirana",
          role: "Dokter Umum",
          nip: "199003032018032003",
          photo: "https://randomuser.me/api/portraits/women/11.jpg",
        },
      ],
      "Dokter Gigi": [
        {
          name: "drg. Diana Putri",
          role: "Dokter Gigi",
          nip: "198804042014042004",
          photo: "https://randomuser.me/api/portraits/women/12.jpg",
        },
      ],
    },
  },
  kontak: {
    alamat:
      "Jl. Bau Massepe No. 12\nKelurahan Lumpue, Kecamatan Bacukiki Barat\nKota Parepare, Sulawesi Selatan 91122",
    telepon: "119 / (0421) 21119",
    email: "puskesmas.lumpue@pareparekota.go.id",
    gambarGedung:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    embedMap:
      "https://maps.google.com/maps?q=Puskesmas+Lumpue+Parepare&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  sosialMedia: [
    {
      title: "Facebook",
      username: "Puskesmas Lumpue",
      url: "https://facebook.com",
      icon: "Facebook",
    },
    {
      title: "Instagram",
      username: "@puskesmaslumpue",
      url: "https://instagram.com",
      icon: "Instagram",
    },
    {
      title: "YouTube",
      username: "PKM Lumpue",
      url: "https://youtube.com",
      icon: "Youtube",
    },
  ],
  services: [
    {
      id: "umum",
      title: "Poliklinik Umum",
      desc: "Layanan pemeriksaan kesehatan umum, konsultasi medis, dan pengobatan penyakit dasar oleh dokter umum berpengalaman dengan pendekatan holistik.",
      icon: "Stethoscope",
      popular: true,
    },
    {
      id: "gigi",
      title: "Poliklinik Gigi & Mulut",
      desc: "Perawatan kesehatan gigi meliputi cabut, tambal, pembersihan karang gigi (scaling), dan pelayanan darurat sakit gigi untuk semua usia.",
      icon: "Activity",
      popular: true,
    },
    {
      id: "kia",
      title: "KIA & KB",
      desc: "Kesehatan Ibu dan Anak, melayani pemeriksaan kehamilan (ANC terpadu), persalinan, nifas, serta layanan berbagai metode Keluarga Berencana.",
      icon: "Baby",
      popular: true,
    },
    {
      id: "ugd",
      title: "UGD 24 Jam",
      desc: "Unit Gawat Darurat yang siaga 24/7 beserta layanan ambulan cepat tanggap untuk penanganan kondisi kritis medis, kecelakaan, dan rujukan bidan.",
      icon: "Syringe",
      popular: true,
    },
    {
      id: "lab",
      title: "Laboratorium Terpadu",
      desc: "Fasilitas lab memadai untuk tes darah lengkap, urine, kolesterol, asam urat, gula darah, tes kehamilan, dan pemeriksaan rutin penyakit endemik.",
      icon: "Microscope",
      popular: false,
    },
    {
      id: "farmasi",
      title: "Apotek & Farmasi",
      desc: "Penyediaan obat-obatan esensial yang rasional dan terjamin mutunya sesuai resep dokter, dilengkapi dengan konsultasi informasi obat (PIO).",
      icon: "Tablets",
      popular: false,
    },
    {
      id: "lansia",
      title: "Poliklinik Lansia",
      desc: "Layanan khusus untuk pasien lanjut usia dengan fasilitas ramah lansia, bebas antrean berdiri, dan pemeriksaan berkala penyakit degeneratif.",
      icon: "HeartPulse",
      popular: false,
    },
    {
      id: "gizi",
      title: "Klinik Konsultasi Gizi",
      desc: "Layanan konseling ahli gizi untuk anak beresiko stunting, penderita diabetes melitus, hipertensi, obesitas, ibu hamil KEK, dan remaja.",
      icon: "Apple",
      popular: false,
    },
  ],
  programUkm: [
    {
      id: "promkes",
      title: "Promosi Kesehatan (Promkes)",
      icon: "Activity",
      desc: "Edukasi dan penyuluhan kesehatan masyarakat untuk memberdayakan masyarakat agar mau dan mampu memelihara dan meningkatkan kesehatannya.",
      kegiatan: [
        "Penyuluhan Keliling",
        "Pembinaan Desa Siaga",
        "Pemberdayaan Masyarakat di POSBINDU",
        "Pengembangan PHBS di Rumah Tangga",
      ],
      target: "Seluruh lapisan masyarakat",
      jadwal: "Senin, Rabu, Jumat",
    },
    {
      id: "kesling",
      title: "Kesehatan Lingkungan (Kesling)",
      icon: "ShieldCheck",
      desc: "Pengawasan sanitasi lingkungan, tempat-tempat umum, industri, dan kualitas air minum.",
      kegiatan: [
        "Inspeksi Sanitasi Tempat Umum (TTU)",
        "Pembinaan Tempat Pengelolaan Makanan (TPM)",
        "Surveilans Kualitas Air Minum",
        "Pemicuan STBM (Sanitasi Total Berbasis Masyarakat)",
      ],
      target: "Lingkungan komersil dan wilayah perumahan",
      jadwal: "Selasa dan Kamis",
    },
    {
      id: "kiakb",
      title: "KIA & KB",
      icon: "Baby",
      desc: "Pemeriksaan ibu hamil, pelayanan posyandu balita, dan layanan serta edukasi keluarga berencana.",
      kegiatan: [
        "Kelas Ibu Hamil",
        "Pelayanan ANC, INC, dan PNC",
        "Pemasangan & Pencabutan Implan/IUD",
        "Imunisasi Dasar Lengkap",
      ],
      target: "Ibu, Bayi, Balita, WUS, dan PUS",
      jadwal: "Setiap Hari Kerja",
    },
    {
      id: "gizi",
      title: "Gizi Masyarakat",
      icon: "Apple",
      desc: "Pemantauan status gizi balita, penanganan stunting, edukasi gizi seimbang, dan pemberian makanan tambahan.",
      kegiatan: [
        "Bulan Timbang Posyandu",
        "Pemberian Makanan Tambahan (PMT) Pemulihan",
        "Konseling Gizi Balita & Ibu Hamil KEK",
        "Pemantauan Garam Beryodium",
      ],
      target: "Anak Balita, Ibu Hamil",
      jadwal: "Sesuai Jadwal Posyandu",
    },
    {
      id: "p2p",
      title: "P2P",
      icon: "Biohazard",
      desc: "Pelayanan imunisasi, surveilans epidemiologi, dan pengendalian penyakit menular seperti demam berdarah dan tuberkulosis.",
      kegiatan: [
        "Pelacakan Kasus (Tracing)",
        "Fogging Focus DBD",
        "Kunjungan Rumah Pasien TB/Kusta",
        "Vaksinasi Massal (BIAS)",
      ],
      target: "Masyarakat Umum dan Suspek",
      jadwal: "Situasional & Rutin Harian",
    },
  ],
  news: [
    {
      id: 1,
      category: "Edukasi",
      date: "12 Okt 2026",
      title: "Waspada Demam Berdarah Dengue (DBD) di Musim Hujan",
      image:
        "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop",
      excerpt:
        "Mari lakukan 3M Plus untuk mencegah perkembangbiakan nyamuk Aedes aegypti di lingkungan sekitar kita.",
    },
    {
      id: 2,
      category: "Program KIA",
      date: "08 Okt 2026",
      title: "Pekan Imunisasi Nasional (PIN) Polio Telah Dimulai",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      excerpt:
        "Lindungi buah hati dari ancaman virus Polio. Bawalah anak balita Anda ke Posyandu atau Puskesmas terdekat.",
    },
    {
      id: 3,
      category: "Gizi Masyarakat",
      date: "01 Okt 2026",
      title: "Pentingnya Isi Piringku untuk Cegah Stunting Sejak Dini",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      excerpt:
        "Memahami konsep gizi seimbang melalui pedoman Isi Piringku dari Kementerian Kesehatan.",
    },
  ],
  pengumuman: [
    {
      id: 1,
      title: "Jadwal Pelayanan Vaksinasi COVID-19 Booster Kedua",
      date: "15 June 2026",
      type: "Penting",
      content: "Vaksinasi akan diselenggarakan di lapangan utama.",
    },
    {
      id: 2,
      title: "Kegiatan Posyandu Balita RW 05 Ditunda",
      date: "12 June 2026",
      type: "Jadwal",
      content: "Diundur sampai minggu depan.",
    },
    {
      id: 3,
      title: "Pembukaan Pendaftaran Antrean Online Melalui WhatsApp",
      date: "10 June 2026",
      type: "Layanan",
      content: "Silahkan kirim pesan WA ke nomor kami.",
    },
    {
      id: 4,
      title: "Penyuluhan Kesehatan Lingkungan & Stunting",
      date: "05 June 2026",
      type: "Kegiatan",
      content: "Acara gratis untuk warga.",
    },
    {
      id: 5,
      title: "Lowongan Relawan Tenaga Promosi Kesehatan",
      date: "01 June 2026",
      type: "Rekrutmen",
      content: "Silahkan daftar di bagian administrasi.",
    },
  ],
  gallery: {
    foto: [
      {
        id: 1,
        title: "Kegiatan Posyandu",
        sub: "Layanan Balita",
        img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
        content:
          "Kegiatan rutin posyandu untuk memantau tumbuh kembang balita di wilayah kerja.",
      },
      {
        id: 2,
        title: "Pemeriksaan Kesehatan Lengkap",
        sub: "Layanan Umum",
        img: "https://plus.unsplash.com/premium_photo-1661764835694-ee2643a1a364?auto=format&fit=crop&q=80&w=600",
        content:
          "Pemeriksaan kesehatan secara komprehensif untuk mendeteksi dini penyakit.",
      },
      {
        id: 3,
        title: "Edukasi Kesehatan Sekolah",
        sub: "Kegiatan UKM",
        img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600",
        content:
          "Penyuluhan kebersihan lingkungan dan makanan sehat dilakukan di sekolah-sekolah dasar.",
      },
      {
        id: 4,
        title: "Layanan Gigi & Mulut",
        sub: "Poli Gigi",
        img: "https://images.unsplash.com/photo-1606811841689-1372dfcb1c76?auto=format&fit=crop&q=80&w=600",
        content:
          "Pemeriksaan berkala yang dilakukan untuk menjaga kesehatan gigi anak dan dewasa.",
      },
      {
        id: 5,
        title: "Penyuluhan Stunting",
        sub: "Program Gizi",
        img: "https://images.unsplash.com/photo-1536640712-4d4c36ef0e52?auto=format&fit=crop&q=80&w=600",
        content:
          "Sosialisasi pemenuhan gizi untuk ibu hamil dan balita untuk mencegah resiko stunting.",
      },
      {
        id: 6,
        title: "Fasilitas Puskesmas",
        sub: "Ruang Rawat",
        img: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?auto=format&fit=crop&q=80&w=600",
        content:
          "Perkenalan fasilitas kesehatan kami yang lengkap dengan standard operasional terbaru.",
      },
    ],
    video: [
      {
        id: 1,
        title: "Edukasi Pencegahan Demam Berdarah",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content:
          "Video informatif tentang cara mencegah penyakit yang disebarkan oleh nyamuk Aedes aegypti di lingkungan rumah dan sekolah.",
      },
      {
        id: 2,
        title: "Cara Tepat Mencuci Tangan",
        url: "https://www.youtube.com/watch?v=kYxR1S_bVGE",
        content:
          "Langkah demi langkah mencuci tangan dengan sabun yang benar menurut panduan Kementerian Kesehatan RI.",
      },
    ],
  },
  fasilitas: [
    {
      id: 1,
      title: "Ruang UGD 24 Jam",
      desc: "Pelayanan gawat darurat yang siaga penuh selama 24 jam dengan tim medis tanggap darurat dan peralatan medis lengkap standar kementerian kesehatan.",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Ruang Rawat Inap",
      desc: "Fasilitas rawat inap yang dirancang senyaman mungkin untuk mempercepat masa pemulihan pasien, dilengkapi dengan pendingin ruangan dan pemantauan dokter 24 jam.",
      img: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "Laboratorium Klinik",
      desc: "Laboratorium untuk pengecekan sampel darah lengkap, urine, dahak, kolesterol, dan gula darah dengan mesin diagnosa terkini.",
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      title: "Apotek & Farmasi Terpadu",
      desc: "Penyediaan obat-obatan esensial maupun generik yang cukup, dilayani oleh apoteker berlisensi untuk menjamin ketepatan dosis dan edukasi pasien.",
      img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5,
      title: "Ruang Tumbuh Kembang Anak (KIA)",
      desc: "Ruangan khusus untuk memantau tumbuh kembang balita dan balita, dilengkapi dengan fasilitas bermain yang aman dan edukatif.",
      img: "https://images.unsplash.com/photo-1519494332028-21d9fc6d6ff0?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6,
      title: "Pusat Vaksinasi",
      desc: "Fasilitas terpisah khusus bagi pendaftaran dan pemberian imunisasi rutin maupun vaksin darurat dalam skala populasi besar.",
      img: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800",
    },
  ],
  timMedis: [
    {
      id: 1,
      name: "dr. Andi Suryadi, Sp.PD",
      role: "Dokter Spesialis Penyakit Dalam",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "drg. Diana Putri",
      role: "Dokter Gigi Spesialis Ortodonsia",
      img: "https://images.unsplash.com/photo-1594824432258-fcc73177894a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "dr. Budi Setiawan",
      role: "Dokter Umum Kepala UGD",
      img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      name: "dr. Citra Kirana, Sp.A",
      role: "Dokter Spesialis Anak",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 5,
      name: "Bdn. Rina Mulyati, S.ST., M.Keb",
      role: "Bidan Koordinator KIA",
      img: "https://images.unsplash.com/photo-1584043720379-b56cd9199c94?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 6,
      name: "Ns. Fitriani, S.Kep",
      role: "Perawat Penanggung Jawab Rawat Inap",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 7,
      name: "Apt. Muhammad Ihsan, S.Farm",
      role: "Apoteker Penanggung Jawab",
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 8,
      name: "Dra. Yulianti, M.Gizi",
      role: "Ahli Gizi Klinis",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
    },
  ],
  faqs: [
    {
      id: 1,
      question: "Kapan jam operasional Puskesmas?",
      answer:
        "Pelayanan rawat jalan (Poliklinik Umum, Gigi, KIA, Spesialis) buka setiap hari Senin-Kamis mulai pukul 08:00 - 14:00 WITA, Jumat pukul 08:00 - 11:30 WITA, dan Sabtu pukul 08:00 - 13:00 WITA. IGD, Rawat Inap, dan Ruang Bersalin tetap beroperasi 24 Jam setiap hari tanpa libur.",
    },
    {
      id: 2,
      question:
        "Apakah bisa mendaftar menggunakan BPJS Kesehatan dan apakah gratis?",
      answer:
        "Ya, kami melayani pasien BPJS Kesehatan secara gratis asalkan berobat sesuai prosedur. Pastikan Faskes Tingkat Pertama (FKTP) Anda terdaftar di Puskesmas kami. Jangan lupa untuk membawa Kartu BPJS/KIS asli atau digital melalui aplikasi Mobile JKN serta KTP/KK saat berobat.",
    },
    {
      id: 3,
      question: "Bagaimana cara mendapat rujukan ke Rumah Sakit?",
      answer:
        "Surat rujukan ke Rumah Sakit hanya dapat diberikan atas indikasi medis dari dokter pemeriksa di Puskesmas, bukan atas permintaan sendiri (kecuali gawat darurat). Rujukan ditujukan pada fasilitas kesehatan tingkat lanjut sesuai dengan sistem rujukan berjenjang BPJS.",
    },
    {
      id: 4,
      question:
        "Apakah Puskesmas melayani tes laboratorium dan tes golongan darah?",
      answer:
        "Tentu. Layanan Laboratorium kami menyediakan fasilitas pengecekan lengkap termasuk sel darah rutin, tes golongan darah, tes asam urat, kolesterol, gula darah puasa, tes widal (tifus), tes urine, hingga pemeriksaan dahak TB Paru.",
    },
    {
      id: 5,
      question:
        "Apakah bisa mendaftar BPJS baru atau pindah Faskes di Puskesmas?",
      answer:
        "Tidak bisa. Pendaftaran anggota BPJS baru maupun perpindahan Fasilitas Kesehatan Tingkat Pertama (FKTP) hanya bisa dilakukan di Kantor BPJS Kesehatan setempat atau secara mandiri melalui aplikasi Mobile JKN.",
    },
    {
      id: 6,
      question:
        "Bagaimana cara mendapatkan layanan Home Care (Kunjungan Rumah)?",
      answer:
        "Layanan Home Care 'Perkesmas' dikhususkan bagi pasien lansia bedridden (terbaring di tempat tidur), penyakit kronis, dan balita gizi buruk. Keluarga dapat melapor ke Perawat Wilayah masing-masing kelurahan atau melalui nomor Hotline Puskesmas.",
    },
  ],
  jadwal: {
    umum: [
      {
        id: 1,
        name: "dr. Arief Rahman",
        poly: "Poli Umum 1",
        days: "Senin - Kamis",
        hours: "08:00 - 14:00",
      },
      {
        id: 2,
        name: "dr. Arief Rahman",
        poly: "Poli Umum 1",
        days: "Jumat",
        hours: "08:00 - 11:30",
      },
      {
        id: 3,
        name: "dr. Siti Aminah",
        poly: "Poli Umum 2",
        days: "Senin - Sabtu",
        hours: "08:00 - 13:00",
      },
      {
        id: 4,
        name: "dr. Budi Setiawan",
        poly: "Poli Lansia",
        days: "Senin, Rabu, Jumat",
        hours: "08:00 - 12:00",
      },
      {
        id: 5,
        name: "drg. Diana Putri",
        poly: "Poli Gigi",
        days: "Senin - Kamis",
        hours: "08:00 - 13:30",
      },
      {
        id: 6,
        name: "drg. Fatihah Rizki",
        poly: "Poli Gigi Anak",
        days: "Jumat & Sabtu",
        hours: "08:00 - 11:30",
      },
    ],
    spesialis: [
      {
        id: 7,
        name: "dr. Maya Indah, Sp.A",
        poly: "Poli Anak Spesialistik",
        days: "Selasa & Kamis",
        hours: "09:00 - 12:00",
      },
      {
        id: 8,
        name: "dr. Hendra, Sp.PD",
        poly: "Poli Penyakit Dalam Khusus Kronis",
        days: "Senin & Rabu",
        hours: "10:00 - 13:00",
      },
      {
        id: 9,
        name: "dr. Ratna, Sp.OG",
        poly: "Poli Kandungan Khusus",
        days: "Jumat",
        hours: "08:30 - 11:00",
      },
    ],
    kia: [
      {
        id: 10,
        name: "Bdn. Rina Mulyati, M.Keb",
        poly: "Poli KIA (Ibu Hamil/ANC)",
        days: "Senin - Sabtu",
        hours: "08:00 - 13:00",
      },
      {
        id: 11,
        name: "Bidan Ningsih, S.ST",
        poly: "Klinik KB & Konsultasi Reproduksi",
        days: "Selasa & Kamis",
        hours: "08:00 - 12:00",
      },
      {
        id: 12,
        name: "Bidan Sinta, Amd.Keb",
        poly: "Klinik Imunisasi Balita Dasar",
        days: "Rabu",
        hours: "08:00 - 12:00",
      },
      {
        id: 13,
        name: "Dra. Yulianti, M.Gizi",
        poly: "Klinik Konsultasi Gizi / Stunting",
        days: "Senin, Rabu, Jumat",
        hours: "09:00 - 12:00",
      },
    ],
  },
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
          .from("cms_settings")
          .select("*")
          .eq("id", "default");

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
            pengumuman: remoteData.pengumuman || defaultSiteData.pengumuman,
            gallery: remoteData.gallery || defaultSiteData.gallery,
            fasilitas: remoteData.fasilitas || defaultSiteData.fasilitas,
            timMedis: remoteData.timMedis || defaultSiteData.timMedis,
            faqs: remoteData.faqs || defaultSiteData.faqs,
            jadwal: remoteData.jadwal || defaultSiteData.jadwal,
          });
        }
      } catch (err) {
        console.error("Failed to load site data", err);
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
        .from("cms_settings")
        .select("*")
        .eq("id", "default");

      if (currentErr) throw currentErr;

      let updatePayload: any = {};

      if (!current || current.length === 0) {
        // Initial insert
        updatePayload = { id: "default", [section]: data };
        const { error: insErr } = await supabase
          .from("cms_settings")
          .insert([updatePayload]);
        if (insErr) throw insErr;
      } else {
        updatePayload = {
          [section]: data,
          updated_at: new Date().toISOString(),
        };
        const { error: upErr } = await supabase
          .from("cms_settings")
          .update(updatePayload)
          .eq("id", "default");
        if (upErr) throw upErr;
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal Menyimpan Data!", {
        description: "Terjadi masalah pada koneksi database.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
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
