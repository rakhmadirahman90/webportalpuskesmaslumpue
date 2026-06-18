import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { toast } from 'sonner';

export default function AdminSocials() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any[]>(siteData.sosialMedia || []);

  const [editingId, setEditingId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    updateSection('sosialMedia', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan media sosial telah diperbarui.'
    });
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now().toString(), title: 'Instagram', username: '', url: '' });
  };

  const handleEdit = (item: any) => {
    if(!item.id) item.id = Date.now().toString(); // safe fallback
    setEditingId(item.id);
    setFormData(item);
  };

  const handleDelete = (id: any) => {
    if (confirm('Hapus media sosial ini?')) {
      setData(data.filter(i => (i.id ? i.id !== id : i.title !== id)));
    }
  };

  const submitEdit = () => {
    if (editingId === 'new') {
      setData([...data, formData]);
    } else {
      setData(data.map(i => (i.id ? i.id === editingId : i.title === editingId) ? formData : i));
    }
    setEditingId(null);
  };

  if (editingId) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Edit Media Sosial</h3>
        <div>
          <label className="block text-sm font-semibold mb-1">Platform (Instagram/Facebook/YouTube)</label>
          <select className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}>
             <option value="Instagram">Instagram</option>
             <option value="Facebook">Facebook</option>
             <option value="YouTube">YouTube</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Username / Teks Tombol</label>
          <input className="w-full border p-2 rounded" placeholder="@puskesmaslumpue" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">URL / Link Profil</label>
          <input className="w-full border p-2 rounded" placeholder="https://instagram.com/..." value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
        </div>
        
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
        <h3 className="font-bold text-lg">Daftar Media Sosial</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={16}/> Tambah</button>
      </div>
      <div className="grid gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="border p-4 rounded bg-slate-50 flex justify-between items-center gap-4">
            <div className="flex-grow">
              <div className="font-bold">{item.title}</div>
              <div className="text-sm text-slate-600">{item.username}</div>
              <div className="text-xs text-blue-600 mt-1">{item.url}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded"><Edit2 size={16}/></button>
              <button onClick={() => handleDelete(item.id || item.title)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16}/></button>
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
