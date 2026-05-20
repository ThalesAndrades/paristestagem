import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Sparkles, Loader2, RefreshCw, Download, Camera } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { normalizeImageOrientation } from '@/components/tryon/normalizeImage';
import WatermarkOverlay from '@/components/tryon/WatermarkOverlay';
import GenerationOverlay from '@/components/tryon/GenerationOverlay';
import { composeBrandedDownload } from '@/components/tryon/composeBrandedDownload';

/**
 * Modal de prova virtual — fluxo simplificado dentro do card:
 * 1. Upload da foto
 * 2. Botão "Provar Virtualmente"
 * 3. Resultado aparece no MESMO card
 */
export default function VirtualTryOnModal({ open, onClose, product, variant }) {
  const [personImage, setPersonImage] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    const normalized = await normalizeImageOrientation(file);
    const preview = URL.createObjectURL(normalized);
    setPersonImage({ file: normalized, preview });
    setResultImage(null);
    setError(null);
  }, []);

  const handleGenerate = async () => {
    if (!personImage || !variant) return;
    setGenerating(true);
    setError(null);
    try {
      const upload = await base44.integrations.Core.UploadFile({ file: personImage.file });
      const response = await base44.functions.invoke('generateTryOn', {
        personImageUrl: upload.file_url,
        glassesImageUrl: variant.image,
      });
      if (response.data?.imageUrl) {
        setResultImage(response.data.imageUrl);
      } else {
        setError(response.data?.error || 'Não foi possível gerar a imagem.');
      }
    } catch (err) {
      setError(err.message || 'Erro ao gerar imagem.');
    }
    setGenerating(false);
  };

  const handleReset = () => {
    setPersonImage(null);
    setResultImage(null);
    setError(null);
  };

  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    if (!resultImage || downloading) return;
    setDownloading(true);
    try {
      await composeBrandedDownload({
        imageUrl: resultImage,
        brand: product?.brand,
        colorName: variant?.colorName,
      });
    } catch (err) {
      setError(err.message || 'Não foi possível baixar a imagem.');
    }
    setDownloading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.97 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-gradient-to-b from-secondary/30 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-tight leading-none">
                  <span className="font-editorial paris-red-text font-bold normal-case italic">Prova</span> Virtual
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{product?.name}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto flex-1">
            {/* Resultado */}
            {resultImage && (
              <div className="space-y-3">
                {/* Moldura editorial Paris */}
                <div className="relative p-2 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent shadow-xl">
                  <div className="relative rounded-xl overflow-hidden bg-muted">
                    <img
                      src={resultImage}
                      alt="Resultado da prova virtual"
                      className="w-full object-cover block"
                    />
                    <WatermarkOverlay opacity={0.14} angle={-24} />
                  </div>
                  {/* Tag editorial superior */}
                  <div className="absolute -top-2 left-4 bg-white text-primary text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-[0.22em] shadow-md border border-primary/10">
                    <span className="font-editorial italic font-bold normal-case text-primary mr-1">sua</span>
                    prova
                  </div>
                  {/* Selo IA */}
                  <div className="absolute -top-2 right-4 bg-secondary text-primary text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-[0.22em] shadow-md border border-primary/10 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    IA
                  </div>
                </div>
                {/* Microcopy editorial */}
                <p className="text-center text-[10px] text-muted-foreground tracking-[0.18em] uppercase font-bold">
                  <span className="font-editorial italic normal-case text-primary tracking-normal">
                    {product?.brand}
                  </span>
                  {' · '}
                  {variant?.colorName}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="paris-btn flex-1 font-bold text-xs uppercase tracking-widest py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Preparando
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        Baixar
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="paris-btn-outline flex-1 font-bold text-xs uppercase tracking-widest py-3 rounded-full flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refazer
                  </button>
                </div>
              </div>
            )}

            {/* Upload + Gerar */}
            {!resultImage && (
              <div className="space-y-4">
                {/* Mini preview do óculos escolhido */}
                {variant && (
                  <div className="flex items-center gap-3 bg-secondary/40 border border-secondary rounded-xl p-2.5">
                    <img
                      src={variant.image}
                      alt={variant.colorName}
                      className="w-12 h-12 rounded-lg object-cover bg-white border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-accent uppercase tracking-[0.18em] font-bold">
                        Você vai experimentar
                      </p>
                      <p className="text-xs font-bold text-foreground truncate">
                        {product?.brand} {product?.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{variant.colorName}</p>
                    </div>
                  </div>
                )}

                {/* Upload area */}
                <div
                  onClick={() => !generating && inputRef.current?.click()}
                  className={`
                    relative rounded-2xl border-2 border-dashed transition-all overflow-hidden
                    ${personImage ? 'border-primary/40 bg-primary/5' : 'border-border bg-muted/40 hover:border-primary/40 hover:bg-secondary/30'}
                    ${generating ? 'pointer-events-none' : 'cursor-pointer'}
                  `}
                >
                  {/* Overlay imersivo de geração */}
                  <GenerationOverlay
                    show={generating}
                    productName={product?.brand ? `${product.brand} ${product.name}` : product?.name}
                  />
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                    className="hidden"
                  />
                  {personImage ? (
                    <div className="relative aspect-[4/5] bg-muted">
                      <img
                        src={personImage.preview}
                        alt="Sua foto"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-white/95 backdrop-blur rounded-lg px-3 py-1.5 border border-border">
                        <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">
                          Foto carregada
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPersonImage(null);
                          }}
                          className="text-[10px] font-bold text-primary uppercase tracking-wider hover:text-accent transition-colors"
                        >
                          Trocar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/5] flex flex-col items-center justify-center text-center p-6">
                      <div className="w-14 h-14 rounded-full bg-white border border-border shadow-sm flex items-center justify-center mb-3">
                        <Camera className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm font-bold text-foreground">
                        Envie sua <span className="font-editorial paris-red-text italic font-bold normal-case">foto</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1 max-w-[200px]">
                        Foto de rosto centralizado, com boa iluminação
                      </p>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-1.5 paris-btn-outline text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full"
                      >
                        <Upload className="w-3 h-3" />
                        Escolher foto
                      </button>
                    </div>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3 text-center">
                    <p className="text-destructive text-xs font-medium">{error}</p>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={handleGenerate}
                  disabled={!personImage || generating}
                  className={`
                    relative w-full font-bold text-sm uppercase tracking-widest py-4 rounded-full
                    flex items-center justify-center gap-2 overflow-hidden transition-all
                    ${generating
                      ? 'bg-primary text-white cursor-wait'
                      : !personImage
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'paris-btn animate-paris-pulse'}
                  `}
                >
                  {generating ? (
                    <>
                      {/* Shimmer animado no botão durante geração */}
                      <span
                        className="absolute inset-0 opacity-50"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                          animation: 'shimmer 1.8s infinite',
                        }}
                      />
                      <Loader2 className="relative w-4 h-4 animate-spin" />
                      <span className="relative tracking-[0.25em]">Gerando sua prova</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Provar Virtualmente
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
                  A IA preserva seu rosto e ajusta apenas a posição dos óculos.
                  Suas fotos não são armazenadas para uso comercial.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}