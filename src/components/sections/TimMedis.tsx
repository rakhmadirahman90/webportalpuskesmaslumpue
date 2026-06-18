import React from 'react';
import { motion } from 'motion/react';
import { useCMS } from '../../context/CMSContext';

export default function TimMedis() {
  const { siteData } = useCMS();
  const timMedisData = Array.isArray(siteData?.timMedis) ? siteData.timMedis : [];

  return (
    <section id="tim-medis" className="py-20 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Tim Medis Kami
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 font-display"
          >
            Tenaga Medis <span className="text-blue-600">Profesional</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Tim dokter, perawat, dan staf medis kami dedikasikan diri untuk memberikan pelayanan kesehatan berkualitas tinggi bagi Anda dan keluarga.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {timMedisData.map((person: any, idx: number) => (
            <motion.div
              key={person.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 rounded-[2rem] overflow-hidden aspect-[3/4] shadow-md border-[6px] border-white group-hover:border-blue-50 transition-colors">
                <img 
                  src={person.img || 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400'} 
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=400' }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                  <div className="text-white font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    Detail Profil →
                  </div>
                </div>
              </div>
              <div className="text-center px-2">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h3>
                <p className="text-blue-600 font-medium text-sm bg-blue-50 py-1.5 px-4 rounded-full inline-block">
                  {person.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
