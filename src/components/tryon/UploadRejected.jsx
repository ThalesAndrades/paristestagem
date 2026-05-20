import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function UploadRejected({ reason, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 flex items-start gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
        <AlertTriangle className="w-4 h-4 text-destructive" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 mb-0.5">
          Imagem não aceita
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">{reason}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-700 transition-colors flex-shrink-0"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}