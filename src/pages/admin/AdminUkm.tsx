import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { toast } from 'sonner';

export default function AdminUkm() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any[]>(siteData.programUkm || []);

  const [editingId, setEditingId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    updateSection('programUkm', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan program UKM telah diperbarui.'
    });
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now().toString(), title: '', desc: '', icon: 'Activity', kegiatan: [''], target: '', jadwal: '' });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({...item, kegiatan: item.kegiatan || ['']});
  };

  const handleDelete = (id: any) => {
    if (confirm('Hapus program ini?')) {
      setData(data.filter(i => i.id !== id));
    }
  };

  const submitEdit = () => {
    if (editingId === 'new') {
      setData([...data, formData]);
    } else {
      setData(data.map(i => i.id === editingId ? formData : i));
    }
    setEditingId(null);
  };

  const handleKegiatanChange = (index: number, val: string) => {
    const newKeg = [...formData.kegiatan];
    newKeg[index] = val;
    setFormData({...formData, kegiatan: newKeg});
  };

  if (editingId) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Edit Program UKM</h3>
        <input className="w-full border p-2 rounded" placeholder="Nama Program" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <textarea className="w-full border p-2 rounded" placeholder="Deskripsi Program" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
        
        <div className="grid grid-cols-3 gap-4">
          <input className="w-full border p-2 rounded" placeholder="Icon (lucide)" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Target Sasaran" value={formData.target} onChange={e => setFormData({...formData, target: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Jadwal (cth: Setiap Hari)" value={formData.jadwal} onChange={e => setFormData({...formData, jadwal: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Daftar Kegiatan Utama</label>
          {formData.kegiatan.map((k: string, idx: number) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input className="flex-grow border p-2 rounded" value={k} onChange={e => handleKegiatanChange(idx, e.target.value)} />
              <button 
                onClick={() => setFormData({...formData, kegiatan: formData.kegiatan.filter((_:any, i:number) => i !== idx)})} 
                className="bg-red-100 text-red-600 px-3 rounded"
              ><Trash2 size={16}/></button>
            </div>
          ))}
          <button onClick={() => setFormData({...formData, kegiatan: [...formData.kegiatan, '']})} className="text-sm font-medium text-blue-600 mt-2 px-2 py-1 bg-blue-50 rounded">+ Tambah Kegiatan</button>
        </div>

        <div className="flex gap-2 pt-4">
          <button onClick={submitEdit} className="bg-blue-600 text-white px-4 py-2 rounded">Simpan Item</button>
          <button onClick={() => setEditingId(null)} className="bg-slate-200 px-4 py-2 rounded">Batal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Daftar Program UKM</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={16}/> Tambah</button>
      </div>
      <div className="grid gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="border p-4 rounded bg-slate-50 flex justify-between items-center gap-4">
            <div className="flex-grow">
              <div className="font-bold text-lg">{item.title}</div>
              <div className="text-sm text-slate-600 mb-2">{item.desc}</div>
              <div className="text-xs text-slate-500">Target: {item.target} • Jadwal: {item.jadwal}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded"><Edit2 size={16}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16}/></button>
             </div>
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded mt-6 w-full flex justify-center items-center gap-2">
        <Save size={18}/> Simpan Ke Sistem
      </button>
    </div>
  );
}
