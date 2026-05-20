import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function HeroSection({ onStart }) {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background ornament — paleta oficial */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-[0.05] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20 grid md:grid-cols-2 gap-10 items-center relative">
        {/* Left: Editorial copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Provador Virtual com IA
          </div>

          {/* Editorial headline (Paris signature: italic serif + bold sans) */}
          <h1 className="leading-[0.95] mb-5">
            <span className="block text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight uppercase">
              Na
            </span>
            <span className="block font-editorial text-6xl sm:text-7xl md:text-8xl paris-red-text font-bold leading-none">
              Paris,
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight uppercase mt-2">
              você prova antes
              <br />
              de comprar
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg mb-8 font-normal max-w-md mx-auto md:mx-0">
            Envie sua foto e o modelo escolhido — nossa IA mostra como o óculos
            fica em você em segundos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStart}
              className="paris-btn font-bold text-sm tracking-widest px-8 py-4 rounded-full uppercase"
            >
              Começar Agora
            </motion.button>
            <button className="paris-btn-outline font-semibold text-sm tracking-wide px-8 py-4 rounded-full uppercase">
              Ver Modelos
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 justify-center md:justify-start text-xs text-slate-500 font-medium">
            <span>✓ Produtos Originais</span>
            <span>✓ Resultado em segundos</span>
            <span>✓ 100% gratuito</span>
          </div>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-md aspect-square">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-3xl" />
            {/* Glasses image */}
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80"
              alt="Óculos de sol"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Powered by</div>
                  <div className="text-sm font-black text-slate-900">IA Generativa</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}