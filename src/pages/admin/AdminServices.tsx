import React, { useState, useEffect } from "react";
import { Save, Plus, Trash2, Edit2, RotateCcw, AlertTriangle } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { toast } from "sonner";

const defaultServices = [
  {
    id: "umum",
    title: "Poliklinik Umum",
    desc: "Layanan pemeriksaan kesehatan umum, konsultasi medis, dan pengobatan penyakit dasar oleh dokter umum berpengalaman dengan pendekatan holistik.",
    icon: "Stethoscope",
    popular: true,
    content: "Poliklinik Umum merupakan pilar utama layanan kuratif dan preventif di UPTD Puskesmas Lumpue. Layanan ini mencakup pertolongan medis pertama, diagnosa penyakit akut dan kronis dasar, pengobatan rawat jalan, tindakan medis minor, rujukan kasus spesialis ke Rumah Sakit, serta pemberian edukasi kesehatan dasar untuk memulihkan vitalitas pasien secara menyeluruh."
  },
  {
    id: "gigi",
    title: "Poliklinik Gigi & Mulut",
    desc: "Perawatan kesehatan gigi meliputi cabut, tambal, pembersihan karang gigi (scaling), dan pelayanan darurat sakit gigi untuk semua usia.",
    icon: "Activity",
    popular: true,
    content: "Poliklinik Gigi & Mulut menyediakan penanganan terpadu untuk keluhan kesehatan dental dan oral. Mulai dari penambalan estetis, pencabutan gigi sulung dan permanen, scaling (pembersihan karang gigi), perawatan saluran akar gigi, hingga konseling kebiasaan hidup bersih terkait rongga mulut siswa sekolah maupun masyarakat umum."
  },
  {
    id: "kia",
    title: "KIA & KB",
    desc: "Kesehatan Ibu dan Anak, melayani pemeriksaan kehamilan (ANC terpadu), persalinan, nifas, serta layanan berbagai metode Keluarga Berencana.",
    icon: "Baby",
    popular: true,
    content: "Layanan Kesehatan Ibu, Anak, dan Keluarga Berencana (KIA-KB) didedikasikan untuk menurunkan angka kematian ibu dan bayi. Kami memfasilitasi pemeriksaan kehamilan standar (ANC Terpadu), pemantauan pasca persalinan, imunisasi wajib bayi dan balita, pemasangan kontrasepsi (IUD, Implan, Suntik, Pil), serta bimbingan pra-nikah."
  },
  {
    id: "ugd",
    title: "UGD 24 Jam",
    desc: "Unit Gawat Darurat yang siaga 24/7 beserta layanan ambulan cepat tanggap untuk penanganan kondisi kritis medis, kecelakaan, dan rujukan bidan.",
    icon: "Syringe",
    popular: true,
    content: "Unit Gawat Darurat (UGD) kami beroperasi non-stop dan siap siaga kapan pun dibutuhkan. Layanan didukung oleh tim dokter dan perawat tersertifikasi PPGD/ATLS/BTCLS dengan fasilitas triase darurat, resusitasi dasar, penjahitan luka, stabilisasi fraktur, serta mobil ambulan siaga rujukan rumah sakit tipe rujukan."
  },
  {
    id: "lab",
    title: "Laboratorium Terpadu",
    desc: "Fasilitas lab memadai untuk tes darah lengkap, urine, kolesterol, asam urat, gula darah, tes kehamilan, dan pemeriksaan rutin penyakit endemik.",
    icon: "Microscope",
    popular: false,
    content: "Layanan laboratorium kami menghadirkan sensitivitas deteksi dini melalui uji klinis dasar. Berbagai pengujian presisi tersedia seperti tes hemoglobin (Hb), hematologi lengkap, kimia darah dasar (glukosa, asam urat, kolesterol), tes fungsi hati/ginjal kualitatif, pemeriksaan dahak TB-Paru, urine rutin, dan tes diagnostik cepat infeksi menular."
  },
  {
    id: "farmasi",
    title: "Apotek & Farmasi",
    desc: "Penyediaan obat-obatan esensial yang rasional dan terjamin mutunya sesuai resep dokter, dilengkapi dengan konsultasi informasi obat (PIO).",
    icon: "Tablets",
    popular: false,
    content: "Apotek UPTD Puskesmas Lumpue menjamin ketersediaan obat esensial bermutu bagi pasien rawat jalan. Apoteker kami melakukan verifikasi resep klinis yang ketat, meracik obat secara steril, serta menyelenggarakan Pelayanan Informasi Obat (PIO) guna mendisiplinkan kepatuhan konsumsi obat kronis maupun antibiotik."
  },
  {
    id: "lansia",
    title: "Poliklinik Lansia",
    desc: "Layanan khusus untuk pasien lanjut usia dengan fasilitas ramah lansia, bebas antrean berdiri, dan pemeriksaan berkala penyakit degeneratif.",
    icon: "HeartPulse",
    popular: false,
    content: "Poliklinik khusus Lansia (Geriatri) dirancang untuk memudahkan pasien usia lanjut mendapatkan pelayanan kesehatan terpadu ramah disabilitas. Kami menyediakan jalur antrean ringkas, pemeriksaan penyakit degeneratif berkala (hipertensi, osteoporosis, kepikunan), senam kebugaran lansia, dan konseling gaya hidup masa tua produktif."
  },
  {
    id: "gizi",
    title: "Klinik Konsultasi Gizi",
    desc: "Layanan konseling ahli gizi untuk anak beresiko stunting, penderita diabetes melitus, hipertensi, obesitas, ibu hamil KEK, dan remaja.",
    icon: "Apple",
    popular: false,
    content: "Layanan asuhan gizi klinis diberikan langsung oleh nutrisionis tersertifikasi. Kami melayani pengukuran antropometri, penyusunan menu diet personal bagi pasien diabetes, hipertensi, stroke, program penanganan integratif anak stunting/kurang gizi, serta pemantauan asupan gizi ibu hamil beresiko tinggi."
  }
];

export default function AdminServices() {
  const { siteData, updateSection } = useCMS();
  
  // Resilient state initializer (checks if siteData.services is a valid array)
  const getInitialData = () => {
    if (siteData?.services && Array.isArray(siteData.services)) {
      return siteData.services;
    }
    return defaultServices;
  };

  const [data, setData] = useState<any[]>(getInitialData());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isDbFormatMismatch, setIsDbFormatMismatch] = useState(false);

  // Sync state whenever siteData.services changes
  useEffect(() => {
    if (siteData?.services) {
      if (Array.isArray(siteData.services)) {
        setData(siteData.services);
        setIsDbFormatMismatch(false);
      } else {
        // DB format is an object or invalid format, we fallback to defaultServices array
        setData(defaultServices);
        setIsDbFormatMismatch(true);
      }
    }
  }, [siteData?.services]);

  const handleSave = () => {
    updateSection("services", data);
    setIsDbFormatMismatch(false);
    toast.success("Data Berhasil Disimpan!", {
      description: "Pengaturan layanan utama telah diperbarui dan dialokasikan ke database utama secara aman."
    });
  };

  const handleResetToDefault = () => {
    if (confirm("Apakah Anda yakin ingin mengembalikan daftar layanan ke pengaturan bawaan puskesmas? Tindakan ini akan menghapus semua kustomisasi layanan Anda.")) {
      setData(defaultServices);
      toast.info("Daftar layanan dikembalikan ke default. Klik 'Simpan Ke Sistem' di bawah untuk menerapkannya.");
    }
  };

  const handleAdd = () => {
    setEditingId("new");
    setFormData({
      id: "service_" + Date.now().toString(),
      title: "",
      desc: "",
      content: "",
      icon: "Activity",
      popular: false
    });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      id: item.id,
      title: item.title || "",
      desc: item.desc || "",
      content: item.content || "",
      icon: item.icon || "Activity",
      popular: !!item.popular
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus layanan ini dari daftar kesehatan?")) {
      setData(data.filter((i) => i.id !== id));
      toast.success("Item siap dihapus. Jangan lupa klik 'Simpan Ke Sistem' untuk menerapkan perubahan.");
    }
  };

  const submitEdit = () => {
    if (!formData.title.trim()) {
      toast.error("Judul layanan tidak boleh kosong!");
      return;
    }
    if (!formData.desc.trim()) {
      toast.error("Deskripsi singkat tidak boleh kosong!");
      return;
    }

    if (editingId === "new") {
      setData([...data, formData]);
    } else {
      setData(data.map((i) => (i.id === editingId ? formData : i)));
    }
    setEditingId(null);
    toast.success("Berhasil mengubah item secara lokal. Silakan klik tombol simpan untuk mengunggah.");
  };

  if (editingId) {
    return (
      <div className="space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {editingId === "new" ? "Tambah Layanan Baru" : "Edit Parameter Layanan"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Lengkapi form di bawah ini secara teliti untuk merilis layanan kesehatan bermutu tinggi.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Nama Layanan / Poliklinik</label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              placeholder="Contoh: Poliklinik Gigi & Mulut..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Icon Pendukung (Lucide Icon)</label>
              <select
                className="w-full border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              >
                <option value="Stethoscope">Stethoscope (Stetoskop)</option>
                <option value="Activity">Activity (Detak Jantung)</option>
                <option value="Baby">Baby (Bayi/KIA)</option>
                <option value="Syringe">Syringe (Suntikan/UGD)</option>
                <option value="Microscope">Microscope (Laboratorium)</option>
                <option value="Tablets">Tablets (Apotek/Obat)</option>
                <option value="HeartPulse">HeartPulse (Kesehatan Lansia)</option>
                <option value="Apple">Apple (Klinik Gizi)</option>
                <option value="Heart">Heart (Pasien)</option>
              </select>
            </div>

            <div className="space-y-2 flex flex-col justify-end pb-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500/30 h-5 w-5 border-slate-300"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                />
                <span className="text-sm font-semibold text-slate-800">Tampilkan Badge "Banyak Diakses"</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Deskripsi Singkat (Ringkasan Depan)</label>
            <textarea
              rows={2}
              className="w-full border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-y"
              placeholder="Berikan ringkasan 1-2 kalimat untuk kartu depan..."
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Isi Informasi Detail Layanan (Muncul Di Pop-up Modal)</label>
            <textarea
              rows={5}
              className="w-full border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-y"
              placeholder="Jelaskan cakupan tindakan, tenaga penanggung jawab, persyaratan adm, dll secara menyeluruh..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 justify-end">
          <button
            onClick={() => setEditingId(null)}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all text-center"
          >
            Batal
          </button>
          <button
            onClick={submitEdit}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/10 text-center"
          >
            Simpan Perubahan Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isDbFormatMismatch && (
        <div className="flex gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs sm:text-sm">
          <AlertTriangle size={18} className="shrink-0 text-amber-600 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Mendeteksi Format Data Lawas</p>
            <p className="text-amber-700">
              Sistem mendeteksi struktur data lama di database Anda. Kami telah menyelaraskannya ke model tata letak baru secara aman.
              Silakan periksa daftar di bawah ini dan klik <strong className="font-extrabold text-blue-800">"Simpan Ke Sistem"</strong> di bagian bawah halaman untuk membersihkan data database secara permanen.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-800">Daftar Layanan</h3>
          <p className="text-xs text-slate-500">Mencantumkan seluruh program pelayanan kesehatan aktif di Puskesmas Lumpue.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleResetToDefault}
            className="px-3.5 py-2 text-xs font-bold border border-slate-200 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
            title="Kembalikan ke Default"
          >
            <RotateCcw size={14} /> Berbawaan
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-green-600/10"
          >
            <Plus size={15} /> Tambah Layanan
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <p className="text-sm text-slate-500">Belum ada layanan yang ditambahkan.</p>
          <button
            onClick={handleAdd}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <Plus size={14} /> Klik di sini untuk membuat layanan pertama
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {data.map((item, idx) => (
            <div
              key={item.id || idx}
              className="border border-slate-100 bg-slate-50/60 p-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    {item.title || "Layanan Tanpa Judul"}
                  </span>
                  {item.popular && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                      Populer
                    </span>
                  )}
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                    {item.icon}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.desc || "Tidak ada deskripsi singkat."}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-200/50 pt-2 sm:pt-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-blue-600 hover:bg-blue-100 bg-white sm:bg-transparent rounded-xl border sm:border-0 border-slate-200 flex-1 sm:flex-initial flex justify-center items-center gap-1 sm:gap-0 font-semibold text-xs transition-all"
                  title="Edit Layanan"
                >
                  <Edit2 size={15} />
                  <span className="sm:hidden ml-1">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-100 hover:text-red-700 bg-white sm:bg-transparent rounded-xl border sm:border-0 border-slate-200 flex-1 sm:flex-initial flex justify-center items-center gap-1 sm:gap-0 font-semibold text-xs transition-all"
                  title="Hapus Layanan"
                >
                  <Trash2 size={15} />
                  <span className="sm:hidden ml-1">Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-blue-700 w-full flex justify-center items-center gap-2 shadow-md shadow-blue-600/15 transition-all"
        >
          <Save size={18} /> Simpan Seluruh Layanan Ke Sistem
        </button>
      </div>
    </div>
  );
}
