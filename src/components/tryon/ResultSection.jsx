import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Heart, Share2, GitCompare, Loader2 } from 'lucide-react';
import CompareModal from './CompareModal';
import WatermarkOverlay from './WatermarkOverlay';
import ModelSpecsCard from './ModelSpecsCard';
import { composeBrandedDownload } from './composeBrandedDownload';

export default function ResultSection({ resultImage, originalImage, selectedModel, onReset }) {
  const [compareOpen, setCompareOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await composeBrandedDownload({
        imageUrl: resultImage,
        brand: selectedModel?.brand,
        colorName: selectedModel?.colorName,
      });
    } catch (e) {
      // silencioso — botão volta ao normal
    }
    setDownloading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        {/* Editorial header */}
        <div className="text-center">
          <div className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-[#1E3A8A] bg-[#1E3A8A]/5 px-3 py-1 rounded-full mb-3">
            Resultado
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">
            Ficou{' '}
            <span className="font-editorial paris-red-text font-bold normal-case italic">
              perfeito
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Compartilhe ou baixe seu resultado
          </p>
        </div>

        {/* Result image — moldura editorial Paris com marca d'água em 3 camadas */}
        <div className="relative w-full max-w-md">
          {/* Tag editorial superior esquerda */}
          <div className="absolute -top-3 left-5 z-20 bg-white text-primary text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-primary/10 tracking-[0.22em] uppercase">
            <span className="font-editorial italic normal-case font-bold mr-1">sua</span>
            prova
          </div>
          {/* Selo IA superior direita */}
          <div className="absolute -top-3 right-5 z-20 bg-secondary text-primary text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-primary/10 tracking-[0.22em] uppercase">
            ✨ IA
          </div>
          {/* Moldura azul Paris */}
          <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent shadow-2xl">
            <div className="relative rounded-xl overflow-hidden bg-white">
              <img
                src={resultImage}
                alt="Resultado da prova virtual"
                className="relative w-full object-cover block"
                style={{ zIndex: 1 }}
              />
              {/* Marca d'água em 3 camadas: faixa diagonal sutil + selo + rodapé editorial */}
              <WatermarkOverlay opacity={0.14} angle={-24} />
            </div>
          </div>
        </div>

        {/* Card informativo: nome do modelo + specs técnicas */}
        {selectedModel && <ModelSpecsCard model={selectedModel} />}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2">
          <motion.button
            whileHover={!downloading ? { scale: 1.02 } : {}}
            whileTap={!downloading ? { scale: 0.97 } : {}}
            onClick={handleDownload}
            disabled={downloading}
            className="paris-btn font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-center gap-2 flex-1 disabled:opacity-70"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Preparando
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Baixar
              </>
            )}
          </motion.button>
          {originalImage && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCompareOpen(true)}
              className="bg-[#1E3A8A] text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#152A63] transition-colors"
            >
              <GitCompare className="w-4 h-4" />
              Comparar
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onReset}
            className="paris-btn-outline font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refazer
          </motion.button>
        </div>

        {/* Compare modal */}
        <CompareModal
          open={compareOpen}
          onClose={() => setCompareOpen(false)}
          beforeImage={originalImage}
          afterImage={resultImage}
        />

        {/* Secondary CTAs */}
        <div className="flex gap-4 text-xs text-slate-500">
          <button className="flex items-center gap-1.5 hover:text-[#E30613] transition-colors">
            <Heart className="w-4 h-4" /> Favoritar
          </button>
          <button className="flex items-center gap-1.5 hover:text-[#E30613] transition-colors">
            <Share2 className="w-4 h-4" /> Compartilhar
          </button>
        </div>

        {/* CTA Bar */}
        <div className="w-full max-w-md mt-4 p-4 bg-[#1E3A8A] rounded-2xl text-center">
          <p className="text-white text-sm font-medium mb-2">
            Gostou? Encontre este modelo na nossa loja
          </p>
          <button className="bg-white text-[#1E3A8A] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-slate-100 transition-colors">
            Comprar Agora
          </button>
        </div>
      </div>
    </motion.section>
  );
}