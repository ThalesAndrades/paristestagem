import { useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Glasses, Upload } from 'lucide-react';

export default function ImageUploadCard({ type, image, onImageSelect, label, hint, buttonLabel }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onImageSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  // Paleta oficial Paris: primary (azul escuro) para a pessoa, accent (azul claro) para os óculos
  const accentColor = type === 'person' ? '#0F3E99' : '#0E71B8';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-paris p-5 flex flex-col items-center gap-3 w-full"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Step indicator */}
      <div
        className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
        style={{ background: `${accentColor}10`, color: accentColor }}
      >
        {type === 'person' ? 'Passo 1' : 'Passo 2'}
      </div>

      <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase text-center leading-tight">
        {label}
      </h3>

      {/* Preview area */}
      <div
        className="w-full aspect-square max-w-[160px] rounded-xl border-2 border-dashed bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer transition-all"
        style={{ borderColor: image ? accentColor : '#CBD5E1' }}
        onClick={() => inputRef.current?.click()}
      >
        {image ? (
          <img
            src={image.preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2" style={{ color: `${accentColor}80` }}>
            {type === 'person' ? (
              <User className="w-10 h-10" strokeWidth={1.5} />
            ) : (
              <Glasses className="w-10 h-10" strokeWidth={1.5} />
            )}
            <Upload className="w-4 h-4" strokeWidth={2} />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => inputRef.current?.click()}
        className="px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wider transition-all text-white"
        style={{ background: accentColor }}
      >
        {buttonLabel}
      </motion.button>

      <p className="text-[11px] text-slate-500 text-center leading-snug">{hint}</p>
    </motion.div>
  );
}