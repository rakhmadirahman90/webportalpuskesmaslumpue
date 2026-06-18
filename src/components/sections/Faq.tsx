import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Faq() {
  const { siteData } = useCMS();
  const faqData = Array.isArray(siteData?.faqs) ? siteData.faqs : [];
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 relative min-h-[calc(100vh-80px)] mt-20 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Tanya Jawab
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 font-display"
          >
            FAQ <span className="text-blue-600">(Pertanyaan Umum)</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Temukan jawaban cepat untuk pertanyaan yang sering ditanyakan mengenai pelayanan, jadwal, dan operasional Puskesmas kami.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqData.map((item: any, idx: number) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border text-left border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
              >
                <span className="font-bold text-slate-800 text-lg pr-4">{item.question}</span>
                <ChevronDown 
                  className={`text-slate-400 transform transition-transform duration-300 shrink-0 ${openId === item.id ? 'rotate-180 text-blue-600' : ''}`} 
                  size={20} 
                />
              </button>
              
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
