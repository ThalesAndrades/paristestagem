import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck } from 'lucide-react';

/**
 * Card informativo exibido abaixo da imagem final.
 * Mostra o nome do modelo, marca e especificações técnicas da armação
 * para passar mais confiança ao cliente.
 *
 * Props:
 *  - model: { brand, name, colorName, image, specs: { material, shape, gender, bridge, lens, temple } }
 */
export default function ModelSpecsCard({ model }) {
  if (!model) return null;

  const specs = model.specs || {};
  const rows = [
    { label: 'Material', value: specs.material },
    { label: 'Formato', value: specs.shape },
    { label: 'Gênero', value: specs.gender },
    { label: 'Ponte', value: specs.bridge },
    { label: 'Lente', value: specs.lens },
    { label: 'Haste', value: specs.temple },
  ].filter((r) => r.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full max-w-md card-paris overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100">
        {model.image && (
          <div className="w-14 h-14 rounded-lg bg-slate-50 overflow-hidden flex-shrink-0">
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            {model.brand}
          </p>
          <h3 className="text-sm font-bold text-slate-900 truncate">{model.name}</h3>
          {model.colorName && (
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Cor: {model.colorName}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <BadgeCheck className="w-5 h-5 text-accent" />
        </div>
      </div>

      {/* Specs grid */}
      {rows.length > 0 && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 p-4">
          {rows.map((row) => (
            <div key={row.label}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                {row.label}
              </p>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">{row.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Trust footer */}
      <div className="flex items-center justify-center gap-1.5 bg-secondary/30 py-2.5 border-t border-slate-100">
        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
          Produto Original • Garantia Paris
        </p>
      </div>
    </motion.div>
  );
}