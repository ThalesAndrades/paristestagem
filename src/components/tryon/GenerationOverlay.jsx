import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOGO_INLINE_WHITE } from './parisLogoInline';

/**
 * Overlay imersivo durante a geração da prova virtual.
 * Identidade Paris: gradiente sutil em azul oficial, tipografia editorial
 * hierárquica, ornamentos decorativos discretos, e mensagens sequenciais
 * que comunicam o progresso da IA.
 */
const STEPS = [
  'Analisando seus traços',
  'Mapeando pontos faciais',
  'Posicionando os óculos',
  'Refinando luz e sombra',
  'Finalizando sua prova',
];

export default function GenerationOverlay({ show, productName }) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (!show) {
      setStepIdx(0);
      return;
    }
    const id = setInterval(() => {
      setStepIdx((i) => (i + 1) % STEPS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 overflow-hidden"
          style={{
            background:
              'linear-gradient(155deg, #0A2D72 0%, #0F3E99 50%, #0E71B8 100%)',
          }}
        >
          {/* Ornamentos atmosféricos sutis */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-[-15%] right-[-20%] w-[60%] aspect-square rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-[-20%] left-[-15%] w-[55%] aspect-square rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(250,217,225,0.22), transparent 70%)' }}
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </div>

          {/* Filete decorativo superior */}
          <div className="absolute top-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            <div className="w-6 h-px bg-white/40" />
            <div className="w-1 h-1 rounded-full bg-white/60" />
            <div className="w-6 h-px bg-white/40" />
          </div>

          {/* Logo central — wordmark branco inline, sem círculo */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 -m-10"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, transparent 65%)',
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.25, 0.6] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={LOGO_INLINE_WHITE}
              alt="Óticas Paris"
              className="relative h-12 sm:h-14 w-auto"
              style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.35))' }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Headline editorial */}
          <div className="mt-8 space-y-3">
            <h3 className="text-[22px] sm:text-2xl font-black text-white uppercase tracking-tight leading-[0.95]">
              Criando sua
              <br />
              <span
                className="font-editorial italic font-bold normal-case text-[26px] sm:text-[28px]"
                style={{ color: '#FAD9E1', letterSpacing: '-0.01em' }}
              >
                prova virtual
              </span>
            </h3>
            {productName && (
              <p
                className="text-[9px] text-white/55 uppercase font-bold pt-1"
                style={{ letterSpacing: '0.35em' }}
              >
                {productName}
              </p>
            )}
          </div>

          {/* Separador decorativo */}
          <div className="mt-7 mb-5 flex items-center gap-2 opacity-50">
            <div className="w-8 h-px bg-white/50" />
            <div className="w-1 h-1 rounded-full bg-white/70" />
            <div className="w-8 h-px bg-white/50" />
          </div>

          {/* Step rotativo */}
          <div className="h-5 overflow-hidden relative w-full max-w-[280px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={stepIdx}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-[13px] text-white/95 font-medium tracking-wide"
              >
                {STEPS[stepIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Barra de progresso refinada */}
          <div className="mt-5 w-40 h-[2px] rounded-full bg-white/15 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(250,217,225,0.95), transparent)',
                width: '40%',
              }}
              animate={{ x: ['-110%', '260%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Assinatura inferior */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            <div className="w-5 h-px bg-white/30" />
            <p
              className="text-[8px] uppercase font-bold text-white/55"
              style={{ letterSpacing: '0.42em' }}
            >
              IA · Óticas Paris
            </p>
            <div className="w-5 h-px bg-white/30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}