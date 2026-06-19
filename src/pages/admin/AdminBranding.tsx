import React, { useState, useEffect } from "react";
import { Save, Check, Palette, Upload } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import ImageUpload from "../../components/ImageUpload";
import { toast } from "sonner";

export default function AdminBranding() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any>(siteData.kontak || {});

  useEffect(() => {
    if (siteData.kontak) {
      setData(siteData.kontak);
    }
  }, [siteData.kontak]);

  const themes = [
    {
      id: "blue",
      name: "Biru Samudra (Default)",
      desc: "Tema biru klinis resmi profesional & sejuk.",
      primaryColor: "bg-[#0061A0]",
      hoverColor: "bg-[#005185]",
      lightColor: "bg-[#eff6ff]",
    },
    {
      id: "teal",
      name: "Hijau Toska Medis",
      desc: "Warna toska hangat yang ramah, bersih & organik.",
      primaryColor: "bg-[#0d9488]",
      hoverColor: "bg-[#0f766e]",
      lightColor: "bg-[#f0fdfa]",
    },
    {
      id: "emerald",
      name: "Emerald Sehat",
      desc: "Warna hijau asri untuk keteduhan dan penyembuahan alami.",
      primaryColor: "bg-[#059669]",
      hoverColor: "bg-[#047857]",
      lightColor: "bg-[#ecfdf5]",
    },
    {
      id: "violet",
      name: "Violet Modern",
      desc: "Warna ungu elegan yang modern, steril & futuristik.",
      primaryColor: "bg-[#7c3aed]",
      hoverColor: "bg-[#6d28d9]",
      lightColor: "bg-[#faf5ff]",
    },
    {
      id: "indigo",
      name: "Indigo Kreatif",
      desc: "Warna indigo mewah bernuansa integritas & kedalaman.",
      primaryColor: "bg-[#4f46e5]",
      hoverColor: "bg-[#4338ca]",
      lightColor: "bg-[#eef2ff]",
    },
    {
      id: "orange",
      name: "Coral Sehat",
      desc: "Pilihan oranye cerah bernuansa energi, vitalitas & hidup aktif.",
      primaryColor: "bg-[#ea580c]",
      hoverColor: "bg-[#c2410c]",
      lightColor: "bg-[#fff7ed]",
    },
  ];

  const handleThemeSelect = (themeId: string) => {
    const updated = { ...data, theme: themeId };
    setData(updated);
    // Apply theme changes instantly to local view for awesome live feedback!
    const root = document.documentElement;
    const colors: { [key: string]: any } = {
      blue: {
        "--primary-50": "#eff6ff",
        "--primary-100": "#dbeafe",
        "--primary-600": "#0061A0",
        "--primary-700": "#005185",
        "--primary-800": "#00416a",
      },
      teal: {
        "--primary-50": "#f0fdfa",
        "--primary-100": "#ccfbf1",
        "--primary-600": "#0d9488",
        "--primary-700": "#0f766e",
        "--primary-800": "#115e59",
      },
      emerald: {
        "--primary-50": "#ecfdf5",
        "--primary-100": "#d1fae5",
        "--primary-600": "#059669",
        "--primary-700": "#047857",
        "--primary-800": "#065f46",
      },
      violet: {
        "--primary-50": "#faf5ff",
        "--primary-100": "#f3e8ff",
        "--primary-600": "#7c3aed",
        "--primary-700": "#6d28d9",
        "--primary-800": "#5b21b6",
      },
      indigo: {
        "--primary-50": "#eef2ff",
        "--primary-100": "#e0e7ff",
        "--primary-600": "#4f46e5",
        "--primary-700": "#4338ca",
        "--primary-800": "#3730a3",
      },
      orange: {
        "--primary-50": "#fff7ed",
        "--primary-100": "#ffedd5",
        "--primary-600": "#ea580c",
        "--primary-700": "#c2410c",
        "--primary-800": "#9a3412",
      },
    };
    const selectedTheme = colors[themeId] || colors.blue;
    Object.keys(selectedTheme).forEach((key) => {
      root.style.setProperty(key, selectedTheme[key]);
    });
  };

  const handleSave = () => {
    updateSection("kontak", data);
    toast.success("Pengaturan Branding & Tema Berhasil Disimpan!", {
      description: "Logo header dan tema warna situs utama kini sinkron.",
    });
  };

  const currentThemeId = data.theme || "blue";

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold text-xl text-slate-800 mb-1 flex items-center gap-2">
          <Palette className="text-blue-600" size={22} />
          Pengaturan Branding & Tema Situs
        </h3>
        <p className="text-slate-500 text-xs">
          Sesuaikan logo utama yang tampil di header dan ubah tema warna visual portal publikasi Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo Section */}
        <div className="md:col-span-1 bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-4">
          <span className="font-bold text-sm text-slate-700 block">Logo Header Puskesmas</span>
          <p className="text-xs text-slate-500 leading-relaxed mb-2">
            Unggah logo instansi dalam format persegi (JPG, PNG, atau SVG) untuk dipasang pada bagian header menu navigasi utama dan header menu navigasi admin.
          </p>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner flex flex-col justify-center items-center h-48 relative">
            {data.logoUrl ? (
              <img
                src={data.logoUrl}
                alt="Logo Preview"
                className="max-h-32 max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto text-slate-300 mb-2" size={32} />
                <span className="text-xs text-slate-400">Belum ada logo</span>
              </div>
            )}
          </div>
          <div>
            <ImageUpload
              label="Unggah File Logo"
              value={data.logoUrl || ""}
              onChange={(val) => setData({ ...data, logoUrl: val })}
            />
          </div>
        </div>

        {/* Theme Selection */}
        <div className="md:col-span-2 space-y-4">
          <span className="font-bold text-sm text-slate-700 block">Pilihan Tema Warna Visual Portal</span>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Pilih palet warna yang mewakili karakter instansi Anda. Setelah dipilih, seluruh tombol, badge, ikon, link, dan elemen sorot di website utama akan berubah warna seketika.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themes.map((theme) => {
              const isSelected = currentThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`flex flex-col text-left p-4 rounded-2xl border transition-all relative outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/20 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  {/* Select Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1 shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-2.5">
                    {/* Circle Color Samples */}
                    <div className="flex -space-x-1 shrink-0">
                      <div className={`w-4 h-4 rounded-full ${theme.primaryColor} border border-white`} />
                      <div className={`w-4 h-4 rounded-full ${theme.hoverColor} border border-white`} />
                      <div className={`w-4 h-4 rounded-full ${theme.lightColor} border border-slate-100`} />
                    </div>
                    <span className="font-bold text-sm text-slate-800">{theme.name}</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {theme.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-750 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/15 transition-all text-sm w-full md:w-auto"
        >
          <Save size={18} /> Simpan Perubahan Branding
        </button>
      </div>
    </div>
  );
}
