import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import { motion } from 'motion/react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Seed admin if empty
    supabase.from('admins').select('*').then(async ({ data, error }) => {
      if (!error && data && data.length === 0) {
        const hash = await bcrypt.hash('admin123', 10);
        await supabase.from('admins').insert([{ username: 'admin', password: hash }]);
        console.log('Default admin seeded.');
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const { data: adminRows, error: fetchErr } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username);
        
      if (fetchErr || !adminRows || adminRows.length === 0) {
        throw new Error('Username atau password salah');
      }

      const admin = adminRows[0];
      const match = await bcrypt.compare(password, admin.password);
      
      if (!match) {
        throw new Error('Username atau password salah');
      }
      
      localStorage.setItem('auth_token', 'frontend-token');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center"
      >
        <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-600/30 mb-6">
           <Activity size={32} />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Portal Admin
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-slate-500">
          Masuk dengan akun Puskesmas Lumpue
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md w-full px-4 sm:px-0"
      >
        <div className="bg-white py-10 px-6 sm:px-10 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100/60">
          <form className="space-y-6 w-full" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm text-center font-medium w-full flex items-center justify-center gap-2">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Username</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 sm:text-sm border-slate-200 rounded-xl border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 sm:text-sm border-slate-200 rounded-xl border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:shadow-none"
              >
                {isLoading ? 'Memproses...' : 'Masuk ke Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

