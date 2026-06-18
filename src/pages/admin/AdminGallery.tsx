import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminGallery() {
  const { siteData, updateSection } = useCMS();
  // Ensure default structure
  const initialData = siteData.gallery?.foto ? siteData.gallery : { foto: [], video: [] };
  const [data, setData] = useState<any>(initialData);

  const [editingId, setEditingId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    updateSection('gallery', data);
    alert('Tersimpan!');
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now(), title: '', sub: '', img: '' });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleDelete = (id: any) => {
    if (confirm('Hapus foto ini?')) {
      setData({...data, foto: data.foto.filter((i:any) => i.id !== id)});
    }
  };

  const submitEdit = () => {
    if (editingId === 'new') {
      setData({...data, foto: [...data.foto, formData]});
    } else {
      setData({...data, foto: data.foto.map((i:any) => i.id === editingId ? formData : i)});
    }
    setEditingId(null);
  };

  if (editingId) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Edit Foto</h3>
        <input className="w-full border p-2 rounded" placeholder="Judul Foto" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Poli/Kategori (Sub)" value={formData.sub} onChange={e => setFormData({...formData, sub: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="URL Gambar" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} />
        {formData.img && <img src={formData.img} alt="preview" className="h-40 rounded" />}
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
        <h3 className="font-bold text-lg">Daftar Galeri Foto</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={16}/> Tambah</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.foto.map((item:any, idx:number) => (
          <div key={idx} className="border p-2 rounded bg-slate-50 flex flex-col gap-2 relative group">
            <img src={item.img} alt={item.title} className="w-full aspect-video object-cover rounded" />
            <div className="p-2">
              <div className="font-bold text-sm truncate">{item.title}</div>
              <div className="text-xs text-slate-500 truncate">{item.sub}</div>
            </div>
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(item)} className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 border rounded"><Edit2 size={14}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-white text-red-600 hover:bg-red-50 border rounded"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-6 mt-6">
         <h3 className="font-bold text-lg mb-4">Daftar ID Video (YouTube)</h3>
         <div className="text-sm text-slate-600 mb-2">Masukkan ID Video, pisahkan dengan koma.</div>
         <input 
           className="w-full border p-2 rounded" 
           value={data.video?.join(', ') || ''} 
           onChange={e => setData({...data, video: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} 
         />
      </div>

      <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded mt-8 w-full flex justify-center items-center gap-2">
        <Save size={18}/> Simpan Ke Sistem
      </button>
    </div>
  );
}
