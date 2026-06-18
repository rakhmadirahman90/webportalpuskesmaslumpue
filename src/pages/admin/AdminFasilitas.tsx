import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { toast } from 'sonner';
import ImageUpload from '../../components/ImageUpload';

export default function AdminFasilitas() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any[]>(siteData.fasilitas || []);

  const [editingId, setEditingId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    updateSection('fasilitas', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan fasilitas telah diperbarui.'
    });
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now(), title: '', desc: '', img: '' });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleDelete = (id: any) => {
    if (confirm('Hapus fasilitas ini?')) {
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

  if (editingId) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Edit Fasilitas</h3>
        <input className="w-full border p-2 rounded" placeholder="Nama Fasilitas" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <textarea rows={4} className="w-full border p-2 rounded" placeholder="Deskripsi Singkat" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
        <ImageUpload 
          label="Foto Fasilitas" 
          value={formData.img || ''} 
          onChange={val => setFormData({...formData, img: val})} 
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
        <h3 className="font-bold text-lg">Daftar Fasilitas</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={16}/> Tambah</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((item, idx) => (
          <div key={idx} className="border p-4 rounded bg-slate-50 flex gap-4">
            <div className="w-24 h-24 shrink-0 rounded overflow-hidden bg-slate-200">
              <img src={item.img} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
            <div className="flex-grow">
              <div className="font-bold">{item.title}</div>
              <div className="text-sm text-slate-500 line-clamp-2">{item.desc}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded border"><Edit2 size={14}/></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-100 rounded border"><Trash2 size={14}/></button>
              </div>
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
