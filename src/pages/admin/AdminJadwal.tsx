import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { toast } from 'sonner';

export default function AdminJadwal() {
  const { siteData, updateSection } = useCMS();
  // schedules is an object with { umum: [], spesialis: [], kia: [] }
  const [data, setData] = useState<any>(siteData?.jadwal || {
    umum: [], spesialis: [], kia: []
  });

  const [activeTab, setActiveTab] = useState<'umum' | 'kia'>('umum');
  const [editingId, setEditingId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const tabLabels: Record<'umum' | 'kia', string> = {
    umum: 'Poliklinik Umum & Gigi',
    kia: 'KIA & KB'
  };

  const handleSave = () => {
    updateSection('jadwal', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan jadwal pelayanan telah diperbarui.'
    });
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now(), name: '', poly: '', days: '', hours: '' });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleDelete = (id: any) => {
    if (confirm('Hapus jadwal ini?')) {
      const newData = { ...data };
      newData[activeTab] = newData[activeTab].filter((i: any) => i.id !== id);
      setData(newData);
    }
  };

  const submitEdit = () => {
    const newData = { ...data };
    if (editingId === 'new') {
      newData[activeTab] = [...newData[activeTab], formData];
    } else {
      newData[activeTab] = newData[activeTab].map((i: any) => i.id === editingId ? formData : i);
    }
    setData(newData);
    setEditingId(null);
  };

  if (editingId) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Edit Jadwal ({activeTab.toUpperCase()})</h3>
        <input 
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Nama Dokter / Tenaga Medis" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Poliklinik (Cth: Poli Anak)" 
          value={formData.poly} 
          onChange={e => setFormData({...formData, poly: e.target.value})} 
        />
        <input 
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Hari Praktik (Cth: Senin - Kamis)" 
          value={formData.days} 
          onChange={e => setFormData({...formData, days: e.target.value})} 
        />
        <input 
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Jam Praktik (Cth: 08:00 - 12:00)" 
          value={formData.hours} 
          onChange={e => setFormData({...formData, hours: e.target.value})} 
        />
        <div className="flex gap-2">
          <button onClick={submitEdit} className="bg-blue-600 text-white px-4 py-2 rounded">Simpan Item</button>
          <button onClick={() => setEditingId(null)} className="bg-slate-200 px-4 py-2 rounded">Batal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Daftar Jadwal Praktik</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16}/> Tambah ke {activeTab}
        </button>
      </div>
      
      <div className="flex gap-2 mb-4 border-b pb-2">
        {(['umum', 'kia'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t font-semibold ${activeTab === tab ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {data[activeTab]?.map((item: any, idx: number) => (
          <div key={idx} className="border border-slate-200/80 p-4 rounded-xl bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
            <div className="min-w-0 flex-1">
              <div className="font-bold text-slate-800 text-base sm:text-lg mb-1 break-words leading-snug">{item.name}</div>
              <div className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">{item.poly}</div>
              <div className="flex gap-2.5 text-xs text-slate-605 flex-wrap">
                <div className="bg-white border border-slate-200/60 px-2.5 py-1 rounded-lg">🗓 {item.days}</div>
                <div className="bg-white border border-slate-200/60 px-2.5 py-1 rounded-lg">⏰ {item.hours}</div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-slate-200 flex items-center gap-1 text-xs font-bold cursor-pointer transition px-3"><Edit2 size={13}/> Edit</button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 bg-white hover:bg-red-50 hover:text-red-700 rounded-lg border border-slate-200 flex items-center gap-1 text-xs font-bold cursor-pointer transition px-3"><Trash2 size={13}/> Hapus</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded mt-6 w-full flex justify-center items-center gap-2 font-semibold">
        <Save size={18}/> Simpan Ke Sistem
      </button>
    </div>
  );
}
