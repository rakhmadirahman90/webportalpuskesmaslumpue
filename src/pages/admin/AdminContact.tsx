import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import ImageUpload from '../../components/ImageUpload';
import { toast } from 'sonner';

export default function AdminContact() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any>(siteData.kontak || {});

  const handleSave = () => {
    updateSection('kontak', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan kontak telah diperbarui.'
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg mb-4">Informasi Kontak & Lokasi</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Alamat Lengkap</label>
          <textarea 
            className="w-full border p-2 rounded" 
            rows={3} 
            value={data.alamat || ''} 
            onChange={e => setData({...data, alamat: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Telepon / WhatsApp</label>
          <input 
            className="w-full border p-2 rounded" 
            value={data.telepon || ''} 
            onChange={e => setData({...data, telepon: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input 
            className="w-full border p-2 rounded" 
            value={data.email || ''} 
            onChange={e => setData({...data, email: e.target.value})} 
          />
        </div>
        <div>
          <ImageUpload 
             label="Foto Gedung Puskesmas" 
             value={data.gambarGedung || ''} 
             onChange={val => setData({...data, gambarGedung: val})} 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">URL Embed Google Maps (Src dari Iframe)</label>
          <input 
            className="w-full border p-2 rounded" 
            value={data.embedMap || ''} 
            onChange={e => setData({...data, embedMap: e.target.value})} 
          />
        </div>
      </div>

      <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded mt-8 w-full flex justify-center items-center gap-2">
        <Save size={18}/> Simpan Ke Sistem
      </button>
    </div>
  );
}
