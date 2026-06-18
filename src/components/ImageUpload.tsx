import React, { useRef, useState } from 'react';
import { Upload, X, FileVideo } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  accept?: string;
}

export default function ImageUpload({ value, onChange, label = "Upload Media", accept = "image/*,video/*" }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
             if (width > MAX_WIDTH) {
               height *= MAX_WIDTH / width;
               width = MAX_WIDTH;
             }
          } else {
             if (height > MAX_HEIGHT) {
               width *= MAX_HEIGHT / height;
               height = MAX_HEIGHT;
             }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress as JPEG with 0.7 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          onChange(dataUrl);
          setIsUploading(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      // For video, we just use a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
         onChange(event.target?.result as string);
         setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setIsUploading(false);
    }
  };

  const isVideo = value && (value.startsWith('data:video') || value.endsWith('.mp4') || value.endsWith('.webm'));
  const isYoutube = value && (value.includes('youtube.com') || value.includes('youtu.be'));

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div className="flex gap-4 items-start">
        <div className="flex-grow">
          {value ? (
            <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-w-sm">
               {isVideo || isYoutube ? (
                 <div className="aspect-video bg-slate-900 flex items-center justify-center relative w-full">
                   {isYoutube ? <iframe src={value.replace('watch?v=', 'embed/')} className="w-full h-full" /> : <video src={value} className="w-full h-full object-cover" controls />}
                 </div>
               ) : (
                 <img src={value} alt="preview" className="w-full h-auto max-h-48 object-cover" />
               )}
               <button 
                 type="button"
                 onClick={() => onChange('')} 
                 className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
               >
                 <X size={16} />
               </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-500 transition-colors"
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              ) : (
                <Upload size={32} className="mb-2 text-slate-400" />
              )}
              <span className="text-sm font-medium">{isUploading ? 'Memproses Kompresi...' : 'Klik untuk Unggah Media'}</span>
              <span className="text-xs mt-1 text-slate-400">Otomatis di-kompresi persentase tinggi</span>
            </button>
          )}
          <input 
             type="file" 
             ref={fileInputRef} 
             onChange={handleFileChange} 
             className="hidden" 
             accept={accept} 
          />
        </div>
      </div>
    </div>
  );
}
