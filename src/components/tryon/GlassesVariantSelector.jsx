import { motion } from 'framer-motion';

/**
 * Compact color/texture swatch selector for a glasses model.
 * Renders inline beneath the selected card.
 */
export default function GlassesVariantSelector({ variants, activeVariantId, onSelect, disabled }) {
  if (!variants || variants.length <= 1) return null;

  return (
    <div className="px-2 pb-2 pt-1 border-t border-slate-100">
      <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">
        Cor
      </p>
      <div className="flex gap-1.5 flex-wrap">
        {variants.map((v) => {
          const isActive = v.id === activeVariantId;
          return (
            <motion.button
              key={v.id}
              whileTap={!disabled ? { scale: 0.9 } : {}}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) onSelect(v);
              }}
              disabled={disabled}
              title={v.colorName}
              aria-label={v.colorName}
              className={`
                relative w-5 h-5 rounded-full border transition-all
                ${isActive ? 'ring-2 ring-primary ring-offset-1 border-white' : 'border-slate-300 hover:border-slate-500'}
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              `}
              style={{
                background: v.swatch,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}