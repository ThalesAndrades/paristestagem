import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, Eye, Camera } from 'lucide-react';

const StatusIcon = ({ status }) => {
  if (status === 'ok' || status === 'excellent') {
    return <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />;
  }
  if (status === 'warning') {
    return <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />;
  }
  return <XCircle className="w-4 h-4 text-[#E30613] flex-shrink-0" />;
};

const StatusLabel = ({ status, label }) => {
  const colorClass =
    status === 'ok' ? 'text-green-700' :
    status === 'excellent' ? 'text-green-700 font-bold' :
    status === 'warning' ? 'text-amber-600' :
    'text-[#E30613]';
  return <span className={`${colorClass} font-semibold text-xs uppercase tracking-wide`}>{label}</span>;
};

export default function ValidationPanel({ validation, show }) {
  if (!show || !validation) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="card-paris p-4 mx-auto w-full"
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
          <div className="w-1 h-4 bg-[#E30613] rounded-full" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
            Análise da Foto
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 py-1">
            <Lightbulb className="w-4 h-4 text-[#1E3A8A] flex-shrink-0" />
            <span className="text-slate-700 text-xs font-medium flex-1">Iluminação</span>
            <StatusLabel status={validation.lighting} label={validation.lighting === 'ok' ? 'OK' : validation.lighting === 'warning' ? 'Fraca' : 'Ruim'} />
            <StatusIcon status={validation.lighting} />
          </div>
          <div className="flex items-center gap-3 py-1">
            <Eye className="w-4 h-4 text-[#1E3A8A] flex-shrink-0" />
            <span className="text-slate-700 text-xs font-medium flex-1">Rosto visível</span>
            <StatusLabel status={validation.face} label={validation.face === 'ok' ? 'OK' : 'Não detectado'} />
            <StatusIcon status={validation.face} />
          </div>
          <div className="flex items-center gap-3 py-1">
            <Camera className="w-4 h-4 text-[#1E3A8A] flex-shrink-0" />
            <span className="text-slate-700 text-xs font-medium flex-1">Qualidade</span>
            <StatusLabel
              status={validation.quality}
              label={
                validation.quality === 'excellent' ? 'Excelente' :
                validation.quality === 'ok' ? 'Boa' : 'Baixa'
              }
            />
            <StatusIcon status={validation.quality} />
          </div>
        </div>

        {validation.tip && (
          <p className="text-[11px] text-slate-500 text-center mt-3 pt-2 border-t border-slate-100 italic">
            {validation.tip}
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}