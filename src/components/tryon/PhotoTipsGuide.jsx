import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Lightbulb, ChevronDown, Sun, Camera, Eye, Smile } from 'lucide-react';

/**
 * Guia de dicas visuais para o usuário antes do upload da selfie.
 * Estética editorial Paris: cards "Faça assim / Evite" em paridade visual,
 * iconografia delicada e tipografia hierárquica.
 *
 * Colapsável — começa expandido para educar, mas pode ser recolhido sem ruído.
 */

const TIPS = [
  {
    icon: Sun,
    title: 'Iluminação natural',
    good: 'Luz frontal, vinda de uma janela',
    bad: 'Contra-luz ou sombras no rosto',
  },
  {
    icon: Camera,
    title: 'Ângulo frontal',
    good: 'Rosto de frente para a câmera',
    bad: 'Perfil, inclinação ou foto de baixo',
  },
  {
    icon: Eye,
    title: 'Olhos visíveis',
    good: 'Sem óculos, franja ou cabelo cobrindo',
    bad: 'Olhos escondidos ou semicerrados',
  },
  {
    icon: Smile,
    title: 'Enquadramento',
    good: 'Rosto centralizado, ocupando o quadro',
    bad: 'Foto distante, cortada ou com muito fundo',
  },
];

export default function PhotoTipsGuide() {
  const [open, setOpen] = useState(true);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-paris overflow-hidden"
    >
      {/* Header colapsável */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4 text-primary" strokeWidth={2.2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-primary/70 leading-none mb-1">
            Antes de começar
          </p>
          <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-tight leading-none">
            Dicas para uma{' '}
            <span className="font-editorial italic font-bold normal-case paris-red-text">
              foto perfeita
            </span>
          </h3>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-slate-400 flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3">
              {/* Filete decorativo */}
              <div className="flex items-center gap-2 pb-1">
                <div className="flex-1 h-px bg-border" />
                <div className="w-1 h-1 rounded-full bg-primary/30" />
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Cabeçalhos das colunas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.22em] uppercase text-emerald-700">
                  <Check className="w-3 h-3" strokeWidth={3} />
                  Faça assim
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.22em] uppercase text-destructive">
                  <X className="w-3 h-3" strokeWidth={3} />
                  Evite isso
                </div>
              </div>

              {/* Lista de dicas */}
              <div className="space-y-2.5">
                {TIPS.map((tip, idx) => (
                  <TipRow key={tip.title} tip={tip} delay={idx * 0.06} />
                ))}
              </div>

              {/* Microcopy editorial */}
              <p className="text-[10.5px] text-muted-foreground text-center pt-2 leading-relaxed">
                Quanto melhor sua foto, mais{' '}
                <span className="font-editorial italic text-primary font-bold">
                  realista
                </span>{' '}
                será o resultado da IA.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function TipRow({ tip, delay }) {
  const Icon = tip.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="grid grid-cols-2 gap-3"
    >
      {/* Bom */}
      <div className="relative rounded-lg bg-emerald-50/60 border border-emerald-100 px-3 py-2.5 flex items-start gap-2">
        <Icon className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" strokeWidth={2.2} />
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-wide leading-tight">
            {tip.title}
          </p>
          <p className="text-[10.5px] text-slate-700 leading-snug mt-0.5">
            {tip.good}
          </p>
        </div>
      </div>

      {/* Evitar */}
      <div className="relative rounded-lg bg-destructive/[0.04] border border-destructive/15 px-3 py-2.5 flex items-start gap-2">
        <Icon className="w-3.5 h-3.5 text-destructive/70 flex-shrink-0 mt-0.5" strokeWidth={2.2} />
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-destructive uppercase tracking-wide leading-tight">
            {tip.title}
          </p>
          <p className="text-[10.5px] text-slate-600 leading-snug mt-0.5">
            {tip.bad}
          </p>
        </div>
      </div>
    </motion.div>
  );
}