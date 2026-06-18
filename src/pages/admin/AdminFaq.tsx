import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { toast } from 'sonner';

export default function AdminFaq() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any[]>(siteData.faqs || []);

  const [editingId, setEditingId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = () => {
    updateSection('faqs', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan FAQ telah diperbarui.'
    });
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({ id: Date.now(), question: '', answer: '' });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleDelete = (id: any) => {
    if (confirm('Hapus FAQ ini?')) {
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
        <h3 className="text-lg font-bold">Edit FAQ</h3>
        <input 
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Pertanyaan" 
          value={formData.question} 
          onChange={e => setFormData({...formData, question: e.target.value})} 
        />
        <textarea 
          rows={6} 
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Jawaban Penuh" 
          value={formData.answer} 
          onChange={e => setFormData({...formData, answer: e.target.value})} 
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
        <h3 className="font-bold text-lg">Daftar Tanya Jawab (FAQ)</h3>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16}/> Tambah
        </button>
      </div>
      <div className="grid gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="border p-4 rounded bg-slate-50 relative group">
            <div className="pr-16">
              <div className="font-bold text-slate-800 mb-2">Q: {item.question}</div>
              <div className="text-sm text-slate-600 border-l-2 border-blue-400 pl-3">A: {item.answer}</div>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 bg-white hover:bg-blue-50 rounded border"><Edit2 size={14}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 bg-white hover:bg-red-50 rounded border"><Trash2 size={14}/></button>
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
