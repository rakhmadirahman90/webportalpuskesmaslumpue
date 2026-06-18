import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminProfile() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any>(siteData.profile || {});

  const handleSave = () => {
    updateSection('profile', data);
    alert('Tersimpan!');
  };

  const handleMisiChange = (idx: number, val: string) => {
    const newMisi = [...(data.misi || [])];
    newMisi[idx] = val;
    setData({...data, misi: newMisi});
  };

  const addMisi = () => setData({...data, misi: [...(data.misi || []), '']});
  const removeMisi = (idx: number) => setData({...data, misi: data.misi.filter((_:any, i:number) => i !== idx)});

  const handleMottoChange = (idx: number, field: string, val: string) => {
    const newMotto = [...(data.motto || [])];
    newMotto[idx] = { ...newMotto[idx], [field]: val };
    setData({...data, motto: newMotto});
  };

  const handleTataNilaiChange = (idx: number, field: string, val: string) => {
    const newTata = [...(data.tataNilai || [])];
    newTata[idx] = { ...newTata[idx], [field]: val };
    setData({...data, tataNilai: newTata});
  };

  const setStruktur = (field: string, val: any) => setData({...data, strukturOrganisasi: {...(data.strukturOrganisasi || {}), [field]: val}});
  const handlePengurusChange = (idx: number, field: string, val: string) => {
    const p = [...(data.strukturOrganisasi?.pengurus || [])];
    p[idx] = { ...p[idx], [field]: val };
    setStruktur('pengurus', p);
  };
  const addPengurus = () => setStruktur('pengurus', [...(data.strukturOrganisasi?.pengurus || []), {name:'', role:'', photo:''}]);
  const removePengurus = (idx: number) => setStruktur('pengurus', data.strukturOrganisasi?.pengurus?.filter((_:any, i:number) => i!==idx));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Selayang Pandang</label>
        <textarea
          rows={6}
          value={data.selayangPandang || ''}
          onChange={(e) => setData({...data, selayangPandang: e.target.value})}
          className="w-full border border-slate-300 rounded-xl p-3.5 text-sm outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Visi</label>
        <input
          value={data.visi || ''}
          onChange={(e) => setData({...data, visi: e.target.value})}
          className="w-full border border-slate-300 rounded-xl p-3.5 text-sm outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Misi</label>
        {(data.misi || []).map((m: string, idx: number) => (
          <div key={idx} className="flex gap-2 mb-2">
            <textarea
              className="flex-grow border border-slate-300 rounded p-2 text-sm"
              value={m}
              onChange={e => handleMisiChange(idx, e.target.value)}
            />
            <button onClick={() => removeMisi(idx)} className="bg-red-50 text-red-600 px-3 rounded"><Trash2 size={16}/></button>
          </div>
        ))}
        <button onClick={addMisi} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">+ Tambah Misi</button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Tujuan</label>
        <textarea
          rows={4}
          value={data.tujuan || ''}
          onChange={(e) => setData({...data, tujuan: e.target.value})}
          className="w-full border border-slate-300 rounded-xl p-3.5 text-sm outline-none"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Kebijakan Mutu</label>
        <textarea
          rows={4}
          value={data.kebijakanMutu || ''}
          onChange={(e) => setData({...data, kebijakanMutu: e.target.value})}
          className="w-full border border-slate-300 rounded-xl p-3.5 text-sm outline-none"
        />
      </div>

      <div className="space-y-2 border-t pt-4">
        <label className="block text-lg font-bold text-slate-800 mb-2">Motto Layananku (C.E.P.A.T)</label>
        {(data.motto || []).map((m: any, idx: number) => (
          <div key={idx} className="flex gap-2 mb-2 items-center">
            <input className="w-12 border border-slate-300 rounded p-2 text-sm text-center font-bold" value={m.letter} onChange={e => handleMottoChange(idx, 'letter', e.target.value)} />
            <input className="flex-grow border border-slate-300 rounded p-2 text-sm" value={m.text} onChange={e => handleMottoChange(idx, 'text', e.target.value)} />
          </div>
        ))}
        {!(data.motto) && <button onClick={() => setData({...data, motto: [{letter:'A', text:''}]})} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">Buat Motto Baru</button>}
      </div>

      <div className="space-y-4 border-t pt-4">
        <label className="block text-lg font-bold text-slate-800">Tata Nilai (S.I.G.A.P)</label>
        {(data.tataNilai || []).map((t: any, idx: number) => (
          <div key={idx} className="bg-slate-50 border p-3 rounded-lg relative">
            <div className="flex gap-2 mb-2">
              <input className="w-12 border p-2 rounded text-center font-bold" value={t.letter} onChange={e => handleTataNilaiChange(idx, 'letter', e.target.value)} />
              <input className="flex-grow border p-2 rounded font-bold" value={t.title} placeholder="Judul" onChange={e => handleTataNilaiChange(idx, 'title', e.target.value)} />
            </div>
            <textarea className="w-full border p-2 rounded text-sm" value={t.desc} placeholder="Deskripsi" onChange={e => handleTataNilaiChange(idx, 'desc', e.target.value)} />
          </div>
        ))}
         {!(data.tataNilai) && <button onClick={() => setData({...data, tataNilai: [{letter:'B', title:'', desc:''}]})} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">Buat Tata Nilai Baru</button>}
      </div>

      <div className="space-y-4 border-t pt-4">
        <label className="block text-lg font-bold text-slate-800">Struktur Organisasi / Pengurus</label>
        
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-2">Kepala Puskesmas</h4>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input className="border p-2 rounded" placeholder="Nama Kepala" value={data.strukturOrganisasi?.kepala?.name || ''} onChange={e => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, name: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Jabatan/Role" value={data.strukturOrganisasi?.kepala?.role || ''} onChange={e => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, role: e.target.value})} />
          </div>
          <input className="w-full border p-2 rounded" placeholder="URL Foto Kepala" value={data.strukturOrganisasi?.kepala?.photo || ''} onChange={e => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, photo: e.target.value})} />
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700">Daftar Pengurus Lainnya</h4>
          {(data.strukturOrganisasi?.pengurus || []).map((p: any, idx: number) => (
            <div key={idx} className="bg-slate-50 border p-3 rounded-lg flex items-center gap-2">
              <img src={p.photo} alt="" className="w-10 h-10 rounded-full object-cover bg-slate-200" />
              <div className="flex-grow grid grid-cols-2 gap-2">
                <input className="border p-2 rounded text-sm" placeholder="Nama" value={p.name} onChange={e => handlePengurusChange(idx, 'name', e.target.value)} />
                <input className="border p-2 rounded text-sm" placeholder="Jabatan" value={p.role} onChange={e => handlePengurusChange(idx, 'role', e.target.value)} />
                <input className="border p-2 rounded text-sm col-span-2" placeholder="URL Foto" value={p.photo} onChange={e => handlePengurusChange(idx, 'photo', e.target.value)} />
              </div>
              <button onClick={() => removePengurus(idx)} className="p-2 text-red-600 bg-red-100 rounded self-start"><Trash2 size={16}/></button>
            </div>
          ))}
          <button onClick={addPengurus} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded mt-2">+ Tambah Pengurus</button>
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <label className="block text-sm font-semibold text-slate-700">Data Pegawai Lengkap (JSON)</label>
        <textarea
          rows={6}
          value={typeof data.pegawaiData === 'object' ? JSON.stringify(data.pegawaiData, null, 2) : ''}
          onChange={(e) => {
            try {
              setData({...data, pegawaiData: JSON.parse(e.target.value)});
            } catch (err) {}
          }}
          className="w-full font-mono border border-slate-300 rounded-xl p-3.5 text-xs bg-slate-50 outline-none"
        />
      </div>

      <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold w-full flex items-center justify-center gap-2">
        <Save size={18} /> Simpan Profil
      </button>
    </div>
  );
}
