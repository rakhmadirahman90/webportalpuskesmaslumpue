import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 font-display">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Masuk dengan akun terdaftar untuk mengelola data website
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-100 flex flex-col items-center">
          <form className="space-y-6 w-full" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium w-full">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">Username</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Masuk ke Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
