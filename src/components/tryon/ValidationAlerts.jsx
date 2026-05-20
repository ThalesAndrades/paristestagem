import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Sun, User, Camera, Lightbulb } from 'lucide-react';

const ICONS = {
  lighting: Sun,
  face: User,
  quality: Camera,
  brightness: Lightbulb,
};

const SEVERITY_STYLES = {
  error: {
    bg: 'bg-[#E30613]/5',
    border: 'border-[#E30613]/25',
    iconBg: 'bg-[#E30613]',
    iconColor: 'text-white',
    title: 'text-[#E30613]',
    badge: 'bg-[#E30613] text-white',
    badgeLabel: 'Bloqueio',
    Icon: AlertCircle,
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-500',
    iconColor: 'text-white',
    title: 'text-amber-700',
    badge: 'bg-amber-500 text-white',
    badgeLabel: 'Atenção',
    Icon: AlertTriangle,
  },
};

export default function ValidationAlerts({ issues, onChangePhoto }) {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <AnimatePresence>
        {issues.map((issue, i) => {
          const style = SEVERITY_STYLES[issue.severity] || SEVERITY_STYLES.warning;
          const TypeIcon = ICONS[issue.type] || style.Icon;
          return (
            <motion.div
              key={`${issue.type}-${i}`}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className={`${style.bg} border ${style.border} rounded-xl p-3.5 flex gap-3`}
            >
              {/* Icon */}
              <div
                className={`${style.iconBg} ${style.iconColor} w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <TypeIcon className="w-4 h-4" strokeWidth={2.5} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${style.badge}`}
                  >
                    {style.badgeLabel}
                  </span>
                  <h4 className={`text-sm font-bold ${style.title}`}>{issue.title}</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-2">
                  {issue.description}
                </p>
                {issue.tip && (
                  <p className="text-[11px] text-slate-500 italic leading-relaxed">
                    💡 {issue.tip}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Action button: replace photo */}
      {issues.some((i) => i.severity === 'error') && onChangePhoto && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onChangePhoto}
          className="w-full text-xs font-bold uppercase tracking-widest text-[#1E3A8A] hover:text-[#E30613] transition-colors py-2"
        >
          ↻ Enviar outra foto
        </motion.button>
      )}
    </div>
  );
}