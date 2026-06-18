import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-50 bg-[#0B1120] text-slate-400 py-3 sm:py-4 border-t border-slate-800 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[10px] sm:text-sm leading-tight sm:leading-normal">
        <p>
          &copy; {new Date().getFullYear()} UPTD Puskesmas Lumpue, Parepare. Hak
          cipta dilindungi undang-undang.
        </p>
      </div>
    </footer>
  );
}
