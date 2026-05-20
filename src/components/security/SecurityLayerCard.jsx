import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

/**
 * Card editorial descrevendo uma camada de segurança aplicada no workflow.
 *
 * Props:
 *  - index: número da camada (1, 2, 3...)
 *  - icon: componente Lucide
 *  - title: título da camada
 *  - where: onde está implementado (frontend / backend / infra)
 *  - description: o que faz, em linguagem clara para a equipe
 *  - tools: array de strings — bibliotecas/serviços usados
 */
export default function SecurityLayerCard({
  index,
  icon: Icon,
  title,
  where,
  description,
  tools = [],
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
      className="card-paris p-5 sm:p-6 relative overflow-hidden group"
    >
      {/* Número da camada */}
      <div className="absolute top-3 right-4 text-5xl font-black text-secondary opacity-60 leading-none pointer-events-none">
        {String(index).padStart(2, '0')}
      </div>

      <div className="flex items-start gap-3 mb-3 relative">
        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent mb-0.5">
            {where}
          </p>
          <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight leading-tight">
            {title}
          </h3>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      {tools.length > 0 && (
        <div className="border-t border-border pt-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Ferramentas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 bg-secondary/40 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
              >
                <CheckCircle2 className="w-2.5 h-2.5" />
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}