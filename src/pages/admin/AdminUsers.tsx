import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User, Key, Trash2, Plus, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import bcrypt from 'bcryptjs';

export default function AdminUsers() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAdminUsername, setSelectedAdminUsername] = useState<string | null>(null);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('username')
        .order('username', { ascending: true });

      if (error) {
        throw error;
      }
      setAdmins(data || []);
    } catch (err: any) {
      toast.error('Gagal mengambil daftar pengguna', { description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddOrEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername) {
      toast.error('Username tidak boleh kosong');
      return;
    }

    if (!selectedAdminUsername && !password) {
      toast.error('Password wajib diisi untuk pengguna baru');
      return;
    }

    setIsSaving(true);
    try {
      if (selectedAdminUsername) {
        // Update
        const updates: any = { username: cleanUsername };
        if (password) {
          updates.password = await bcrypt.hash(password, 10);
        }

        const { error } = await supabase
          .from('admins')
          .update(updates)
          .eq('username', selectedAdminUsername);

        if (error) throw error;
        toast.success('Pengguna berhasil diperbarui!');
      } else {
        // Check local duplicate first
        const isDuplicate = admins.some(
          (admin) => admin.username.toLowerCase() === cleanUsername.toLowerCase()
        );
        if (isDuplicate) {
          toast.error('Username sudah digunakan', { description: 'Silakan gunakan username unik yang lain.' });
          setIsSaving(false);
          return;
        }

        // Insert
        const hashedPassword = await bcrypt.hash(password, 10);
        const { error } = await supabase
          .from('admins')
          .insert([{ username: cleanUsername, password: hashedPassword }]);

        if (error) throw error;
        toast.success('Pengguna baru berhasil ditambahkan!');
      }

      // Reset Form
      setUsername('');
      setPassword('');
      setSelectedAdminUsername(null);
      fetchAdmins();
    } catch (err: any) {
      toast.error('Gagal menyimpan pengguna', { description: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (usernameToDelete: string) => {
    if (admins.length <= 1) {
      toast.error('Gagal menghapus', { description: 'Harus tersisa minimal satu akun administrator.' });
      return;
    }
    
    if (!confirm(`Apakah Anda yakin ingin menghapus administrator "${usernameToDelete}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('username', usernameToDelete);

      if (error) throw error;
      toast.success('Pengguna berhasil dihapus!');
      // If we deleted the user that was currently being edited, reset form
      if (selectedAdminUsername === usernameToDelete) {
        setSelectedAdminUsername(null);
        setUsername('');
        setPassword('');
      }
      fetchAdmins();
    } catch (err: any) {
      toast.error('Gagal menghapus pengguna', { description: err.message });
    }
  };

  const handleEditClick = (admin: any) => {
    setSelectedAdminUsername(admin.username);
    setUsername(admin.username);
    setPassword(''); // leave blank if password is not to be changed
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
          <ShieldCheck size={20} className="text-blue-600" />
          Manajemen User Admin
        </h3>
        <p className="text-sm text-slate-500">
          Kelola kredensial akun administrator yang memiliki hak akses untuk mengubah konten website Portal Puskesmas Lumpue.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="md:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h4 className="font-bold text-sm text-slate-700 mb-4">
            {selectedAdminUsername ? 'Edit Akun Admin' : 'Tambah Akun Admin'}
          </h4>
          <form onSubmit={handleAddOrEdit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-slate-900 bg-white border border-slate-300 rounded-xl py-2 pl-9 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">
                Password {selectedAdminUsername && '(Kosongkan jika tidak diubah)'}
              </label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required={!selectedAdminUsername}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-slate-900 bg-white border border-slate-300 rounded-xl py-2 pl-9 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 animate-none"
              >
                {isSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Plus size={14} />
                )}
                {selectedAdminUsername ? 'Simpan' : 'Tambah'}
              </button>
              {selectedAdminUsername && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAdminUsername(null);
                    setUsername('');
                    setPassword('');
                  }}
                  className="bg-slate-200 text-slate-700 py-2 px-4 rounded-xl text-xs font-semibold hover:bg-slate-300 transition-colors"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* User List Container */}
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="py-12 flex justify-center items-center text-slate-400 text-sm">
              <Loader2 className="animate-spin mr-2" /> Loading data...
            </div>
          ) : admins.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              Belum ada administrator yang terdaftar.
            </div>
          ) : (
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Username</th>
                    <th className="px-6 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {admins.map((admin) => (
                    <tr key={admin.username} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-700 font-extrabold uppercase shrink-0">
                          {admin.username[0]}
                        </div>
                        <span className="truncate">{admin.username}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(admin)}
                            className="bg-slate-100 hover:bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-bold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(admin.username)}
                            className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
