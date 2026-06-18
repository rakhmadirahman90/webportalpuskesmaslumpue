import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import ImageUpload from '../../components/ImageUpload';
import { toast } from 'sonner';

export default function AdminProfile() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any>(siteData.profile || {});

  const handleSave = () => {
    updateSection('profile', data);
    toast.success('Data Berhasil Disimpan!', {
      description: 'Pengaturan profil instansi telah diperbarui.'
    });
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
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input className="border p-2 rounded" placeholder="Nama Kepala" value={data.strukturOrganisasi?.kepala?.name || ''} onChange={e => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, name: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Jabatan/Role" value={data.strukturOrganisasi?.kepala?.role || ''} onChange={e => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, role: e.target.value})} />
          </div>
          <ImageUpload 
            label="Foto Kepala"
            value={data.strukturOrganisasi?.kepala?.photo || ''} 
            onChange={val => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, photo: val})} 
          />
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700">Daftar Pengurus Lainnya</h4>
          {(data.strukturOrganisasi?.pengurus || []).map((p: any, idx: number) => (
            <div key={idx} className="bg-slate-50 border p-3 rounded-lg flex flex-col gap-3">
              <div className="flex justify-between items-center">
                 <h5 className="font-bold text-sm text-slate-700">Pengurus {idx + 1}</h5>
                 <button onClick={() => removePengurus(idx)} className="p-2 text-red-600 hover:bg-red-100 rounded text-xs px-3">Hapus</button>
              </div>
              <div className="flex items-start gap-4 flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 shrink-0">
                  <ImageUpload 
                     value={p.photo} 
                     onChange={val => handlePengurusChange(idx, 'photo', val)} 
                  />
                </div>
                <div className="flex-grow grid grid-cols-1 gap-2 w-full">
                  <input className="border p-2 rounded text-sm w-full" placeholder="Nama" value={p.name} onChange={e => handlePengurusChange(idx, 'name', e.target.value)} />
                  <input className="border p-2 rounded text-sm w-full" placeholder="Jabatan" value={p.role} onChange={e => handlePengurusChange(idx, 'role', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addPengurus} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded mt-2">+ Tambah Pengurus</button>
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        <div>
           <label className="block text-lg font-bold text-slate-800">Manajemen Data Pegawai</label>
           <p className="text-sm text-slate-500 mt-1">Kelola divisi, jabatan, dan daftar pegawai secara terstruktur.</p>
        </div>
        
        <div className="space-y-6">
          <div className="flex gap-2">
            <input 
              id="new-role-input"
              className="border p-3 rounded-lg text-sm w-64 outline-none focus:border-blue-500" 
              placeholder="Nama Divisi/Poli Baru" 
            />
            <button 
              onClick={() => {
                const input = document.getElementById('new-role-input') as HTMLInputElement;
                if(input.value) {
                   setData({...data, pegawaiData: {...(data.pegawaiData||{}), [input.value]: []}});
                   input.value = '';
                }
              }} 
              className="bg-slate-800 text-white px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
            >
              <Plus size={16}/> Tambah Divisi
            </button>
          </div>

          {Object.keys(data.pegawaiData || {}).map((role) => (
             <div key={role} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-5 py-3.5 font-bold flex justify-between items-center">
                   <span className="text-slate-800">{role}</span>
                   <button onClick={() => {
                      if(confirm(`Hapus divisi "${role}" beserta pegawainya?`)) {
                         const newData = {...data.pegawaiData};
                         delete newData[role];
                         setData({...data, pegawaiData: newData});
                      }
                   }} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition">
                     <Trash2 size={18} />
                   </button>
                </div>
                <div className="p-5 space-y-4">
                   {(data.pegawaiData[role] || []).map((peg: any, pIdx: number) => (
                      <div key={pIdx} className="bg-white border border-slate-200 shadow-sm p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start">
                         <div className="w-full md:w-48 shrink-0">
                           <ImageUpload 
                              value={peg.photo || ''} 
                              onChange={(val) => {
                                 const updated = [...data.pegawaiData[role]];
                                 updated[pIdx].photo = val;
                                 setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                              }}
                           />
                         </div>
                         <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                            <input className="border border-slate-300 p-2.5 rounded-lg text-sm w-full outline-none focus:border-blue-500" placeholder="Nama Lengkap Pegawai" value={peg.name} onChange={(e) => {
                                 const updated = [...data.pegawaiData[role]];
                                 updated[pIdx].name = e.target.value;
                                 setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                            }} />
                            <input className="border border-slate-300 p-2.5 rounded-lg text-sm w-full outline-none focus:border-blue-500" placeholder="Jabatan Spesifik" value={peg.role} onChange={(e) => {
                                 const updated = [...data.pegawaiData[role]];
                                 updated[pIdx].role = e.target.value;
                                 setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                            }} />
                            <input className="border border-slate-300 p-2.5 rounded-lg text-sm md:col-span-2 w-full outline-none focus:border-blue-500" placeholder="NIP (Opsional)" value={peg.nip || ''} onChange={(e) => {
                                 const updated = [...data.pegawaiData[role]];
                                 updated[pIdx].nip = e.target.value;
                                 setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                            }} />
                         </div>
                         <button onClick={() => {
                             const updated = data.pegawaiData[role].filter((_:any, i:number) => i !== pIdx);
                             setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                         }} className="text-red-500 border border-red-200 hover:bg-red-50 p-2 rounded-lg self-start transition"><Trash2 size={16} /></button>
                      </div>
                   ))}
                   <button onClick={() => {
                       const updated = [...(data.pegawaiData[role] || []), {name: '', role: '', nip: '', photo: ''}];
                       setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                   }} className="text-blue-600 bg-blue-50 hover:bg-blue-100 transition font-semibold text-sm px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 border border-blue-100">
                     <Plus size={16} /> Tambah Daftar Pegawai
                   </button>
                </div>
             </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold w-full flex items-center justify-center gap-2">
        <Save size={18} /> Simpan Profil
      </button>
    </div>
  );
}
