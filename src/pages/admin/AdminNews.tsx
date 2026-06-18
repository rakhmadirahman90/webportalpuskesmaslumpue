import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminNews() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any[]>(siteData.news || []);

  const [editingId, setEditingId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    updateSection('news', data);
    alert('Tersimpan!');
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now(), title: '', category: '', date: '', image: '', excerpt: '' });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleDelete = (id: any) => {
    if (confirm('Hapus berita ini?')) {
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
        <h3 className="text-lg font-bold">Edit Publikasi</h3>
        <input className="w-full border p-2 rounded" placeholder="Judul Berita" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <div className="grid grid-cols-2 gap-4">
          <input className="w-full border p-2 rounded" placeholder="Kategori" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Tanggal (cth: 12 Okt 2026)" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        </div>
        <input className="w-full border p-2 rounded" placeholder="URL Gambar" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
        <textarea className="w-full border p-2 rounded" placeholder="Kutipan (Excerpt)" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
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
        <h3 className="font-bold text-lg">Daftar Publikasi Berita</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={16}/> Tambah</button>
      </div>
      <div className="grid gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="border p-4 rounded bg-slate-50 flex justify-between items-center gap-4">
            {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />}
            <div className="flex-grow">
              <div className="font-bold">{item.title}</div>
              <div className="text-sm text-slate-500">{item.category} • {item.date}</div>
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
