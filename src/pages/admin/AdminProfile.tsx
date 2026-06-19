import React, { useState } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Info, 
  Target, 
  Flag, 
  Star, 
  HeartHandshake, 
  ShieldCheck, 
  Network, 
  Users 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import ImageUpload from '../../components/ImageUpload';
import { toast } from 'sonner';

export default function AdminProfile() {
  const { siteData, updateSection } = useCMS();
  const [data, setData] = useState<any>(siteData.profile || {});
  const [activeSubTab, setActiveSubTab] = useState('selayang-pandang');

  const subTabs = [
    { id: 'selayang-pandang', name: 'Selayang Pandang', icon: Info },
    { id: 'visi-misi', name: 'Visi & Misi', icon: Target },
    { id: 'tujuan', name: 'Tujuan', icon: Flag },
    { id: 'tata-nilai', name: 'Tata Nilai', icon: Star },
    { id: 'motto', name: 'Motto', icon: HeartHandshake },
    { id: 'kebijakan-mutu', name: 'Kebijakan Mutu', icon: ShieldCheck },
    { id: 'struktur', name: 'Struktur Organisasi', icon: Network },
    { id: 'pegawai', name: 'Data Pegawai', icon: Users },
  ];

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
      {/* Horizontal sub-navigation tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-100 select-none scrollbar-thin">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10"
                  : "bg-white border-slate-250 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <IconComponent size={14} className={isActive ? "text-white" : "text-slate-400"} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Main tab panel render */}
      <div className="min-h-[400px]">
        {activeSubTab === 'selayang-pandang' && (
          <div className="space-y-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4 mb-4 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Selayang Pandang</h4>
                <p className="text-slate-500 text-xs">Uraikan deskripsi ringkas pengenalan Puskesmas.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Narasi Selayang Pandang</label>
              <textarea
                rows={10}
                value={data.selayangPandang || ''}
                onChange={(e) => setData({...data, selayangPandang: e.target.value})}
                className="w-full border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-sans leading-relaxed"
              />
            </div>
          </div>
        )}

        {activeSubTab === 'visi-misi' && (
          <div className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4 mb-4 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Visi & Misi</h4>
                <p className="text-slate-500 text-xs">Tentukan haluan visi instansi beserta jabaran misinya.</p>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Pernyataan Visi</label>
              <textarea
                rows={2}
                value={data.visi || ''}
                onChange={(e) => setData({...data, visi: e.target.value})}
                className="w-full border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-sans font-semibold text-slate-800"
              />
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Poin Misi</label>
              {(data.misi || []).map((m: string, idx: number) => (
                <div key={idx} className="flex gap-2 mb-2 items-start">
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-xs mt-1 selection:bg-none">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    className="flex-grow border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    value={m}
                    onChange={e => handleMisiChange(idx, e.target.value)}
                  />
                  <button 
                    onClick={() => removeMisi(idx)} 
                    className="bg-red-50 text-red-600 p-3 rounded-xl hover:bg-red-105 transition-colors mt-1 shrink-0"
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              ))}
              <button 
                onClick={addMisi} 
                className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <Plus size={14} /> Tambah Misi
              </button>
            </div>
          </div>
        )}

        {activeSubTab === 'tujuan' && (
          <div className="space-y-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4 mb-4 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Flag size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Tujuan</h4>
                <p className="text-slate-500 text-xs">Jabarkan tolok ukur kesuksesan pelayanan instansi.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Narasi Tujuan Organisasi</label>
              <textarea
                rows={8}
                value={data.tujuan || ''}
                onChange={(e) => setData({...data, tujuan: e.target.value})}
                className="w-full border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        )}

        {activeSubTab === 'tata-nilai' && (
          <div className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4 mb-4 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Star size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Tata Nilai (S.I.G.A.P)</h4>
                <p className="text-slate-500 text-xs">Sesuaikan jargon operasional sigap untuk personil medis.</p>
              </div>
            </div>
            <div className="grid gap-6">
              {(data.tataNilai || []).map((t: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-150 p-5 rounded-2xl relative shadow-sm">
                  <div className="flex gap-3 mb-3">
                    <input 
                      className="w-12 border border-slate-300 p-2 rounded-xl text-center font-extrabold text-blue-600 bg-white" 
                      value={t.letter} 
                      onChange={e => handleTataNilaiChange(idx, 'letter', e.target.value)} 
                    />
                    <input 
                      className="flex-grow border border-slate-300 p-2 px-3 rounded-xl font-bold bg-white outline-none focus:ring-2 focus:ring-blue-500/10" 
                      value={t.title} 
                      placeholder="Judul Tata Nilai" 
                      onChange={e => handleTataNilaiChange(idx, 'title', e.target.value)} 
                    />
                  </div>
                  <textarea 
                    rows={2}
                    className="w-full border border-slate-300 p-3 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500/10 resize-none" 
                    value={t.desc} 
                    placeholder="Deskripsi penjabaran" 
                    onChange={e => handleTataNilaiChange(idx, 'desc', e.target.value)} 
                  />
                </div>
              ))}
              {!(data.tataNilai) && (
                <button 
                  onClick={() => setData({...data, tataNilai: [{letter:'S', title:'Senyum', desc:''}]})} 
                  className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl font-bold transition inline-block w-fit"
                >
                  Buat Tata Nilai Baru
                </button>
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'motto' && (
          <div className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4 mb-4 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <HeartHandshake size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Motto Layananku (C.E.P.A.T)</h4>
                <p className="text-slate-500 text-xs">Pendidikan etos kerja utama untuk seluruh perwakilan faskes.</p>
              </div>
            </div>
            <div className="space-y-4">
              {(data.motto || []).map((m: any, idx: number) => (
                <div key={idx} className="flex gap-3 mb-2 items-center">
                  <input 
                    className="w-12 border border-slate-300 rounded-xl p-2.5 text-sm text-center font-extrabold text-blue-600 bg-slate-50" 
                    value={m.letter} 
                    onChange={e => handleMottoChange(idx, 'letter', e.target.value)} 
                  />
                  <input 
                    className="flex-grow border border-slate-300 rounded-xl p-2.5 px-3.5 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none" 
                    value={m.text} 
                    onChange={e => handleMottoChange(idx, 'text', e.target.value)} 
                  />
                </div>
              ))}
              {!(data.motto) && (
                <button 
                  onClick={() => setData({...data, motto: [{letter:'C', text:''}]})} 
                  className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl font-semibold transition"
                >
                  Buat Motto Baru
                </button>
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'kebijakan-mutu' && (
          <div className="space-y-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4 mb-4 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Kebijakan Mutu</h4>
                <p className="text-slate-500 text-xs">Pernyataan sertifikasi kualitas terpadu Puskesmas.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Narasi Kebijakan Mutu</label>
              <textarea
                rows={6}
                value={data.kebijakanMutu || ''}
                onChange={(e) => setData({...data, kebijakanMutu: e.target.value})}
                className="w-full border border-slate-300 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-sans leading-relaxed"
              />
            </div>
          </div>
        )}

        {activeSubTab === 'struktur' && (
          <div className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4 mb-4 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Network size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Struktur Organisasi</h4>
                <p className="text-slate-500 text-xs">Atur jajaran kepala puskesmas dan pimpinan divisi.</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
              <h4 className="font-bold text-blue-800 mb-3 text-sm uppercase tracking-wider select-none">Kepala Puskesmas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-650">Nama Lengkap</label>
                  <input className="w-full border p-2.5 rounded-lg text-sm" placeholder="Nama Kepala" value={data.strukturOrganisasi?.kepala?.name || ''} onChange={e => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-650">Jabatan Resmi</label>
                  <input className="w-full border p-2.5 rounded-lg text-sm" placeholder="Jabatan/Role" value={data.strukturOrganisasi?.kepala?.role || ''} onChange={e => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, role: e.target.value})} />
                </div>
              </div>
              <ImageUpload 
                label="Foto Kepala"
                value={data.strukturOrganisasi?.kepala?.photo || ''} 
                onChange={val => setStruktur('kepala', {...data.strukturOrganisasi?.kepala, photo: val})} 
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-700 select-none">Daftar Pengurus Jajaran</h4>
              <div className="space-y-4">
                {(data.strukturOrganisasi?.pengurus || []).map((p: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col gap-3 relative">
                    <div className="flex justify-between items-center">
                       <h5 className="font-bold text-xs text-blue-600 uppercase tracking-widest select-none">Pengurus {idx + 1}</h5>
                       <button 
                         onClick={() => removePengurus(idx)} 
                         className="text-xs font-semibold text-red-600 hover:bg-red-50 bg-white border border-red-105 px-3 py-1.5 rounded-xl transition"
                       >
                         Hapus
                       </button>
                    </div>
                    <div className="flex items-start gap-4 flex-col sm:flex-row">
                      <div className="w-full sm:w-1/3 shrink-0">
                        <ImageUpload 
                           value={p.photo} 
                           onChange={val => handlePengurusChange(idx, 'photo', val)} 
                        />
                      </div>
                      <div className="flex-grow grid grid-cols-1 gap-2.5 w-full">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase select-none">Nama Pengurus</span>
                          <input className="border p-2.5 rounded-xl text-sm w-full bg-white" placeholder="Nama" value={p.name} onChange={e => handlePengurusChange(idx, 'name', e.target.value)} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase select-none">Jabatan / Role</span>
                          <input className="border p-2.5 rounded-xl text-sm w-full bg-white" placeholder="Jabatan" value={p.role} onChange={e => handlePengurusChange(idx, 'role', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={addPengurus} 
                className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl font-bold transition inline-flex items-center gap-1.5"
              >
                <Plus size={14} /> Tambah Pengurus
              </button>
            </div>
          </div>
        )}

        {activeSubTab === 'pegawai' && (
          <div className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4 mb-4 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Manajemen Data Pegawai</h4>
                <p className="text-slate-500 text-xs">Kelola divisi, jabatan, dan list personel secara terstruktur.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-2">
                <input 
                  id="new-role-input"
                  className="border border-slate-300 p-3 rounded-xl text-sm w-64 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-semibold" 
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
                  className="bg-blue-600 text-white px-5 py-3 flex items-center gap-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition"
                >
                  <Plus size={16}/> Tambah Divisi
                </button>
              </div>

              <div className="space-y-4">
                {Object.keys(data.pegawaiData || {}).map((role) => (
                   <div key={role} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-slate-50">
                      <div className="bg-slate-105 px-5 py-3.5 font-bold flex justify-between items-center border-b border-slate-200">
                         <span className="text-slate-800 text-sm font-bold font-display select-none">{role}</span>
                         <button onClick={() => {
                            if(confirm(`Hapus divisi "${role}" beserta pegawainya?`)) {
                               const newData = {...data.pegawaiData};
                               delete newData[role];
                               setData({...data, pegawaiData: newData});
                            }
                         }} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition">
                           <Trash2 size={16} />
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
                                  <div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase select-none">Nama Lengkap</span>
                                    <input className="border border-slate-300 p-2.5 rounded-lg text-sm w-full outline-none focus:border-blue-500" placeholder="Nama Lengkap Pegawai" value={peg.name} onChange={(e) => {
                                         const updated = [...data.pegawaiData[role]];
                                         updated[pIdx].name = e.target.value;
                                         setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                                    }} />
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase select-none">Jabatan Spesifik</span>
                                    <input className="border border-slate-300 p-2.5 rounded-lg text-sm w-full outline-none focus:border-blue-500" placeholder="Jabatan Spesifik" value={peg.role} onChange={(e) => {
                                         const updated = [...data.pegawaiData[role]];
                                         updated[pIdx].role = e.target.value;
                                         setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                                    }} />
                                  </div>
                                  <div className="md:col-span-2">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase select-none">NIP (Opsional)</span>
                                    <input className="border border-slate-300 p-2.5 rounded-lg text-sm w-full outline-none focus:border-blue-500" placeholder="NIP (Opsional)" value={peg.nip || ''} onChange={(e) => {
                                         const updated = [...data.pegawaiData[role]];
                                         updated[pIdx].nip = e.target.value;
                                         setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                                    }} />
                                  </div>
                               </div>
                               <button onClick={() => {
                                   const updated = data.pegawaiData[role].filter((_:any, i:number) => i !== pIdx);
                                   setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                               }} className="text-red-500 border border-red-200 hover:bg-red-50 p-2.5 rounded-xl self-start transition shrink-0 mt-4 md:mt-1"><Trash2 size={16} /></button>
                            </div>
                         ))}
                         <button onClick={() => {
                             const updated = [...(data.pegawaiData[role] || []), {name: '', role: '', nip: '', photo: ''}];
                             setData({...data, pegawaiData: {...data.pegawaiData, [role]: updated}});
                         }} className="text-blue-600 bg-blue-50 hover:bg-blue-100 transition font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 border border-blue-100 w-full md:w-fit">
                           <Plus size={14} /> Tambah Daftar Pegawai
                         </button>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleSave} 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4.5 rounded-2xl text-sm font-bold w-full flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 transition duration-350"
      >
        <Save size={18} /> Simpan Seluruh Profil
      </button>
    </div>
  );
}
