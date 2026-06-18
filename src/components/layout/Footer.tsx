import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-50 bg-[#0B1120] text-slate-400 py-4 border-t border-slate-800 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} UPTD Puskesmas Lumpue, Parepare. Hak cipta dilindungi undang-undang.</p>
        <div className="mt-4 sm:mt-0 space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Syarat & Ketentuan</a>
        </div>
      </div>
    </footer>
  );
}

