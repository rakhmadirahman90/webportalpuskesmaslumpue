import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, ThumbsUp, Share2 } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image?: string;
  date?: string;
  category?: string;
  content?: string;
  views?: number;
  likes?: number;
  shares?: number;
  onLike?: () => void;
  onShare?: () => void;
}

export default function DetailModal({
  isOpen,
  onClose,
  title,
  image,
  date,
  category,
  content,
  views,
  likes,
  shares,
  onLike,
  onShare,
}: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {image && (
            <div className="relative h-48 sm:h-64 shrink-0">
              <img src={image} alt={title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1538108149393-fbbd81895a09?auto=format&fit=crop&q=80&w=800' }} />
              {category && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700">
                  {category}
                </div>
              )}
            </div>
          )}
          
          <div className="flex-grow overflow-y-auto p-6 sm:p-8">
            <div className="flex justify-between items-start gap-4 mb-6">
              <div>
                {date && <div className="text-sm font-medium text-slate-500 mb-2">{date}</div>}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="prose prose-slate max-w-none">
              {content ? (
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{content}</p>
              ) : (
                <p className="text-slate-500 italic">Detail konten belum tersedia untuk item ini.</p>
              )}
            </div>

            {/* Interactions Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1" title="Dilihat">
                  <Eye size={16} className="text-slate-400" />
                  {views || 0} Dilihat
                </span>
                <span className="flex items-center gap-1" title="Suka">
                  <ThumbsUp size={16} className="text-slate-400 animate-pulse" />
                  {likes || 0} Suka
                </span>
                <span className="flex items-center gap-1" title="Dibagikan">
                  <Share2 size={16} className="text-slate-400" />
                  {shares || 0} Bagikan
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {onLike && (
                  <button
                    onClick={onLike}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 rounded-xl transition-all"
                  >
                    <ThumbsUp size={14} className="text-blue-500" />
                    Suka
                  </button>
                )}
                {onShare && (
                  <button
                    onClick={onShare}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 rounded-xl transition-all"
                  >
                    <Share2 size={14} className="text-blue-500" />
                    Bagikan
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
