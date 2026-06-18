import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Kontak() {
  const { siteData } = useCMS();
  const kontakData = siteData.kontak || {};

  return (
    <section id="kontak" className="min-h-[calc(100vh-80px)] mt-20 py-12 flex flex-col justify-center bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Hubungi Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-display">Kontak & Lokasi</h2>
          <p className="text-slate-600 text-lg">
            Kami siap melayani Anda. Kunjungi puskesmas kami atau hubungi kami melalui kontak yang tersedia untuk informasi lebih lanjut.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Kontak & Foto */}
          <div className="space-y-8">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative h-64 sm:h-80 w-full bg-slate-200">
              <img 
                src={kontakData.gambarGedung} 
                alt="Gedung UPTD Puskesmas Lumpue" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6">
                <h3 className="text-white font-bold text-xl">Gedung UPTD Puskesmas Lumpue</h3>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 flex flex-col">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Alamat Lengkap</h4>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {kontakData.alamat}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-50 text-green-600 p-3 rounded-2xl shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Telepon / WhatsApp</h4>
                  <p className="text-slate-600 font-medium">{kontakData.telepon}</p>
                  <p className="text-slate-500 text-sm">Pelayanan 24 Jam</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 text-orange-600 p-3 rounded-2xl shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                  <p className="text-slate-600 font-medium">{kontakData.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maps */}
          <div className="h-[600px] lg:h-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative min-h-[400px]">
             <iframe 
              src={kontakData.embedMap}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Peta Lokasi Puskesmas Lumpue"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
