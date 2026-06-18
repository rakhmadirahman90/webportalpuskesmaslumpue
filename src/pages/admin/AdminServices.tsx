import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { toast } from 'sonner';

export default function AdminServices() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any[]>(siteData.services || []);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    updateSection('services', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan layanan telah diperbarui.'
    });
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now().toString(), title: '', desc: '', icon: 'Activity', popular: false });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus layanan ini?')) {
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
        <h3 className="text-lg font-bold">Edut Layanan</h3>
        <input className="w-full border p-2 rounded" placeholder="Judul" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <textarea className="w-full border p-2 rounded" placeholder="Deskripsi" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Icon (lucide-react name)" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={formData.popular} onChange={e => setFormData({...formData, popular: e.target.checked})} />
          Tandai sebagai populer
        </label>
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
        <h3 className="font-bold text-lg">Daftar Layanan</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={16}/> Tambah</button>
      </div>
      <div className="grid gap-4">
        {data.map(item => (
          <div key={item.id} className="border p-4 rounded bg-slate-50 flex justify-between items-center">
            <div>
              <div className="font-bold">{item.title}</div>
              <div className="text-sm text-slate-600">{item.desc}</div>
            </div>
            <div className="flex gap-2">
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
