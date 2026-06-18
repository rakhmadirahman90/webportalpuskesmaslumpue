import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2, Eye, ThumbsUp, Share2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import ImageUpload from '../../components/ImageUpload';
import { toast } from 'sonner';

export default function AdminGallery() {
  const { siteData, updateSection } = useCMS();
  // Ensure default structure
  const initialData = siteData.gallery?.foto ? siteData.gallery : { foto: [], video: [] };
  const [data, setData] = useState<any>(initialData);

  const [editingId, setEditingId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    updateSection('gallery', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan galeri telah diperbarui.'
    });
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now(), title: '', sub: '', img: '', content: '', views: 0, likes: 0, shares: 0 });
  };

  const handleAddVideo = () => {
    setEditingId('new_vid');
    setFormData({ id: Date.now(), title: '', url: '', content: '', views: 0, likes: 0, shares: 0 });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleEditVideo = (item: any) => {
    setEditingId(`vid_${item.id}`);
    setFormData(item);
  };

  const handleDelete = (id: any) => {
    if (confirm('Hapus foto ini?')) {
      setData({...data, foto: data.foto.filter((i:any) => i.id !== id)});
    }
  };

  const handleDeleteVideo = (id: any) => {
    if (confirm('Hapus video ini?')) {
      setData({...data, video: data.video.filter((i:any) => i.id !== id)});
    }
  };

  const submitEdit = () => {
    if (editingId === 'new') {
      setData({...data, foto: [...data.foto, formData]});
    } else if (editingId === 'new_vid') {
      setData({...data, video: [...(data.video || []), formData]});
    } else if (typeof editingId === 'string' && editingId.startsWith('vid_')) {
      const realId = editingId.replace('vid_', '');
      setData({...data, video: data.video.map((i:any) => i.id.toString() === realId ? formData : i)});
    } else {
      setData({...data, foto: data.foto.map((i:any) => i.id === editingId ? formData : i)});
    }
    setEditingId(null);
  };

  if (editingId) {
    if (typeof editingId === 'string' && editingId.startsWith('vid_') || editingId === 'new_vid') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Edit Video</h3>
          <input className="w-full border p-2 rounded" placeholder="Judul Video" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="URL YouTube (https://www.youtube.com/watch?v=...)" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
          
          {/* Video Engagement Override Controls */}
          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 border rounded-xl">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Dilihat (Views)</label>
              <input type="number" min="0" className="w-full border p-2 rounded bg-white text-xs font-bold" value={formData.views || 0} onChange={e => setFormData({...formData, views: Math.max(0, parseInt(e.target.value) || 0)})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Suka (Likes)</label>
              <input type="number" min="0" className="w-full border p-2 rounded bg-white text-xs font-bold" value={formData.likes || 0} onChange={e => setFormData({...formData, likes: Math.max(0, parseInt(e.target.value) || 0)})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Dibagikan (Shares)</label>
              <input type="number" min="0" className="w-full border p-2 rounded bg-white text-xs font-bold" value={formData.shares || 0} onChange={e => setFormData({...formData, shares: Math.max(0, parseInt(e.target.value) || 0)})} />
            </div>
          </div>

          <textarea rows={4} className="w-full border p-2 rounded" placeholder="Deskripsi Video" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
          <div className="flex gap-2">
            <button onClick={submitEdit} className="bg-blue-600 text-white px-4 py-2 rounded">Simpan Item</button>
            <button onClick={() => setEditingId(null)} className="bg-slate-200 px-4 py-2 rounded">Batal</button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Edit Foto</h3>
        <input className="w-full border p-2 rounded" placeholder="Judul Foto" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Poli/Kategori (Sub)" value={formData.sub} onChange={e => setFormData({...formData, sub: e.target.value})} />
        
        {/* Photo Engagement Override Controls */}
        <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 border rounded-xl">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Dilihat (Views)</label>
            <input type="number" min="0" className="w-full border p-2 rounded bg-white text-xs font-bold" value={formData.views || 0} onChange={e => setFormData({...formData, views: Math.max(0, parseInt(e.target.value) || 0)})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Suka (Likes)</label>
            <input type="number" min="0" className="w-full border p-2 rounded bg-white text-xs font-bold" value={formData.likes || 0} onChange={e => setFormData({...formData, likes: Math.max(0, parseInt(e.target.value) || 0)})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Dibagikan (Shares)</label>
            <input type="number" min="0" className="w-full border p-2 rounded bg-white text-xs font-bold" value={formData.shares || 0} onChange={e => setFormData({...formData, shares: Math.max(0, parseInt(e.target.value) || 0)})} />
          </div>
        </div>

        <textarea rows={4} className="w-full border p-2 rounded" placeholder="Deskripsi Foto" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
        <ImageUpload 
          label="Foto / Gambar" 
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
        <h3 className="font-bold text-lg">Daftar Galeri Foto</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={16}/> Tambah</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.foto.map((item:any, idx:number) => (
          <div key={idx} className="border p-2 rounded bg-slate-50 flex flex-col gap-2 relative group">
            <img src={item.img} alt={item.title} className="w-full aspect-video object-cover rounded" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400' }} />
            <div className="p-2">
              <div className="font-bold text-sm truncate">{item.title}</div>
              <div className="text-xs text-slate-500 truncate">{item.sub}</div>
              {/* Counter Display inside card list */}
              <div className="text-[10px] text-slate-400 mt-1 flex flex-wrap items-center gap-x-2">
                <span className="flex items-center gap-0.5"><Eye size={10} /> {item.views || 0}</span>
                <span className="flex items-center gap-0.5"><ThumbsUp size={10} /> {item.likes || 0}</span>
                <span className="flex items-center gap-0.5"><Share2 size={10} /> {item.shares || 0}</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(item)} className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 border rounded"><Edit2 size={14}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-white text-red-600 hover:bg-red-50 border rounded"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-6 mt-6">
         <div className="flex justify-between items-center mb-4">
           <h3 className="font-bold text-lg">Daftar Link Video (YouTube)</h3>
           <button onClick={handleAddVideo} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={16}/> Tambah Video</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {(data.video || []).map((vid: any, idx: number) => {
             const vidObj = typeof vid === 'object' ? vid : { id: vid, title: 'Video Edukasi' };
             return (
               <div key={idx} className="border p-4 rounded bg-slate-50 flex flex-col gap-2 relative group">
                 <div className="font-bold text-md truncate">{vidObj.title || 'Video Tanpa Judul'}</div>
                 <div className="text-sm text-blue-600 truncate">{vidObj.url}</div>
                 <div className="text-sm text-slate-600 line-clamp-2 mt-1">{vidObj.content}</div>
                 {/* Counter Display inside card list */}
                 <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap items-center gap-x-3">
                   <span className="flex items-center gap-1"><Eye size={11} /> {vidObj.views || 0} views</span>
                   <span className="flex items-center gap-1"><ThumbsUp size={11} /> {vidObj.likes || 0} likes</span>
                   <span className="flex items-center gap-1"><Share2 size={11} /> {vidObj.shares || 0} shares</span>
                 </div>
                 <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleEditVideo(vidObj)} className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 border rounded"><Edit2 size={14}/></button>
                   <button onClick={() => handleDeleteVideo(vidObj.id)} className="p-1.5 bg-white text-red-600 hover:bg-red-50 border rounded"><Trash2 size={14}/></button>
                 </div>
               </div>
             );
           })}
         </div>
      </div>

      <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded mt-8 w-full flex justify-center items-center gap-2">
        <Save size={18}/> Simpan Ke Sistem
      </button>
    </div>
  );
}
