import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import HeroSection from '@/components/tryon/HeroSection';
import ImageUploadCard from '@/components/tryon/ImageUploadCard';
import ValidationPanel from '@/components/tryon/ValidationPanel';
import ResultSection from '@/components/tryon/ResultSection';
import GeneratingProgress from '@/components/tryon/GeneratingProgress';
import ParisHeader from '@/components/tryon/ParisHeader';
import ParisFooter from '@/components/tryon/ParisFooter';
import SuggestedGlassesCarousel from '@/components/tryon/SuggestedGlassesCarousel';
import ValidationAlerts from '@/components/tryon/ValidationAlerts';
import PhotoTipsGuide from '@/components/tryon/PhotoTipsGuide';
import { normalizeImageOrientation } from '@/components/tryon/normalizeImage';
import AccessCodeGate from '@/components/tryon/AccessCodeGate';
import UploadRejected from '@/components/tryon/UploadRejected';
import { technicalValidate, contentValidate } from '@/components/tryon/validateUpload';

// Analyze image quality using canvas — returns structured statuses + actionable issues
async function analyzeImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX = 200;
      const scale = Math.min(MAX / img.width, MAX / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // Brightness + sharpness (variance) in single pass
      let brightness = 0;
      const lums = new Float32Array(data.length / 4);
      for (let i = 0, j = 0; i < data.length; i += 4, j++) {
        const lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        lums[j] = lum;
        brightness += lum;
      }
      brightness = brightness / lums.length;

      let variance = 0;
      for (let j = 0; j < lums.length; j++) {
        variance += Math.pow(lums[j] - brightness, 2);
      }
      variance = variance / lums.length;

      const resolution = file.size;
      const aspectRatio = img.width / img.height;
      URL.revokeObjectURL(url);

      // ── Status classification ───────────────────────────────────────
      const lighting =
        brightness < 50 ? 'fail' :
        brightness > 220 ? 'fail' :        // superexposição
        (brightness < 80 || brightness > 195) ? 'warning' :
        'ok';

      const quality =
        variance > 1800 && resolution > 150000 ? 'excellent' :
        variance > 800 ? 'ok' :
        variance > 400 ? 'warning' : 'fail';

      // Face heuristic — aspect ratio + minimum size
      // Portrait/square photos centered on face score best
      const face =
        (aspectRatio > 0.55 && aspectRatio < 1.6 && resolution > 50000) ? 'ok' :
        (aspectRatio > 0.4 && aspectRatio < 2.0 && resolution > 30000) ? 'warning' :
        'fail';

      // ── Build structured issue list ─────────────────────────────────
      const issues = [];

      // Lighting issues
      if (brightness < 50) {
        issues.push({
          type: 'lighting',
          severity: 'error',
          title: 'Foto muito escura',
          description: 'Não conseguimos identificar bem o seu rosto por falta de luz na imagem.',
          tip: 'Posicione-se de frente para uma janela ou ligue uma luz ambiente antes de tirar a foto.',
        });
      } else if (brightness > 220) {
        issues.push({
          type: 'lighting',
          severity: 'error',
          title: 'Foto superexposta',
          description: 'A imagem está com excesso de luz, apagando os detalhes do rosto.',
          tip: 'Evite tirar foto contra a luz forte (sol direto, lâmpada de teto) ou com flash apontado no rosto.',
        });
      } else if (brightness < 80) {
        issues.push({
          type: 'lighting',
          severity: 'warning',
          title: 'Iluminação fraca',
          description: 'Sua foto está um pouco escura. O resultado pode perder qualidade.',
          tip: 'Tente refazer a foto com mais luz natural para uma prova virtual mais precisa.',
        });
      } else if (brightness > 195) {
        issues.push({
          type: 'lighting',
          severity: 'warning',
          title: 'Iluminação intensa',
          description: 'A foto está um pouco estourada de luz, o que pode prejudicar a integração dos óculos.',
          tip: 'Reduza a intensidade da luz ou afaste-se um pouco da fonte luminosa.',
        });
      }

      // Face / framing issues
      if (face === 'fail') {
        if (aspectRatio < 0.4 || aspectRatio > 2.0) {
          issues.push({
            type: 'face',
            severity: 'error',
            title: 'Enquadramento incorreto',
            description: 'A proporção da foto sugere um ângulo extremo ou imagem panorâmica — o rosto pode estar fora do quadro.',
            tip: 'Use uma foto de rosto centralizado, no formato vertical (selfie) ou quadrado, de frente para a câmera.',
          });
        } else {
          issues.push({
            type: 'face',
            severity: 'error',
            title: 'Rosto não detectado',
            description: 'A imagem é pequena demais ou não parece conter um rosto claro.',
            tip: 'Envie uma foto maior, com o rosto ocupando boa parte do quadro e olhando para a câmera.',
          });
        }
      } else if (face === 'warning') {
        issues.push({
          type: 'face',
          severity: 'warning',
          title: 'Ângulo fora do ideal',
          description: 'O rosto parece estar inclinado ou descentralizado. A IA pode ter dificuldade para posicionar os óculos.',
          tip: 'O melhor resultado vem com o rosto olhando para a câmera, levemente angulado no máximo.',
        });
      }

      // Quality / sharpness issues — only show if other things are ok
      if (quality === 'fail' && lighting !== 'fail' && face !== 'fail') {
        issues.push({
          type: 'quality',
          severity: 'warning',
          title: 'Imagem fora de foco',
          description: 'A nitidez da foto está baixa, o que dificulta o ajuste preciso dos óculos no rosto.',
          tip: 'Mantenha a câmera firme e foque no rosto antes de tirar a foto.',
        });
      } else if (quality === 'warning' && lighting === 'ok' && face === 'ok') {
        issues.push({
          type: 'quality',
          severity: 'warning',
          title: 'Resolução baixa',
          description: 'A imagem tem qualidade aceitável, mas uma foto maior gera resultado mais realista.',
          tip: 'Se possível, envie uma foto em alta resolução, sem compressão excessiva.',
        });
      }

      resolve({ lighting, face, quality, brightness, issues });
    };
    img.src = url;
  });
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export default function TryOn() {
  const tryOnRef = useRef(null);

  const [personImage, setPersonImage] = useState(null);
  const [glassesImage, setGlassesImage] = useState(null);
  const [validation, setValidation] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);
  // Estados de upload (validação técnica + moderação de conteúdo)
  const [personUploadState, setPersonUploadState] = useState({ checking: false, rejected: null });
  const [glassesUploadState, setGlassesUploadState] = useState({ checking: false, rejected: null });

  const handleStart = () => {
    tryOnRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePersonImage = useCallback(async (file) => {
    setPersonUploadState({ checking: true, rejected: null });
    setResultImage(null);
    setError(null);

    // CAMADA 1 — validação técnica (anti-injeção, MIME real, tamanho)
    const tech = await technicalValidate(file);
    if (!tech.ok) {
      setPersonUploadState({ checking: false, rejected: tech.reason });
      return;
    }

    // Normaliza orientação EXIF antes do upload e da moderação
    const normalizedFile = await normalizeImageOrientation(file);
    const preview = URL.createObjectURL(normalizedFile);

    // CAMADA 2/3 — moderação de conteúdo (NSFW / +18 / off-topic / rosto humano)
    const { file_url } = await base44.integrations.Core.UploadFile({ file: normalizedFile });
    const content = await contentValidate(file_url, 'person');
    if (!content.ok) {
      URL.revokeObjectURL(preview);
      setPersonUploadState({ checking: false, rejected: content.reason });
      return;
    }

    setPersonImage({ file: normalizedFile, preview, remoteUrl: file_url });
    setValidation(null);
    setPersonUploadState({ checking: false, rejected: null });

    const result = await analyzeImage(normalizedFile);
    setValidation(result);
  }, []);

  const handleGlassesImage = useCallback(async (file) => {
    setGlassesUploadState({ checking: true, rejected: null });
    setResultImage(null);
    setError(null);

    // CAMADA 1 — validação técnica
    const tech = await technicalValidate(file);
    if (!tech.ok) {
      setGlassesUploadState({ checking: false, rejected: tech.reason });
      return;
    }

    // CAMADA 2/3 — moderação de conteúdo (deve ser foto de óculos)
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const content = await contentValidate(file_url, 'glasses');
    if (!content.ok) {
      setGlassesUploadState({ checking: false, rejected: content.reason });
      return;
    }

    const preview = URL.createObjectURL(file);
    setGlassesImage({ file, preview, remoteUrl: file_url });
    setGlassesUploadState({ checking: false, rejected: null });
  }, []);

  // Select a suggested model from the carousel (uses remote URL, no file upload needed)
  const handleSelectSuggested = useCallback((model) => {
    setGlassesImage({
      file: null,
      preview: model.image,
      remoteUrl: model.image,
      suggestedId: model.id,
      name: model.name,
      brand: model.brand,
      colorName: model.colorName,
      specs: model.specs,
    });
    setResultImage(null);
    setError(null);
  }, []);

  const hasBlockingIssue = validation?.issues?.some((i) => i.severity === 'error');
  const isValidationPassed = validation && !hasBlockingIssue;

  const isCheckingUpload = personUploadState.checking || glassesUploadState.checking;
  const canGenerate = personImage && glassesImage && isValidationPassed && !isCheckingUpload;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setIsGenerating(true);
    setError(null);
    setResultImage(null);
    try {
    // Reaproveita as URLs já enviadas durante a validação de upload (evita upload duplicado).
    // Fallback: caso a URL remota não exista (cenário antigo), faz upload sob demanda.
    const personImageUrl = personImage.remoteUrl
      || (await base44.integrations.Core.UploadFile({ file: personImage.file })).file_url;
    const glassesImageUrl = glassesImage.remoteUrl
      || (await base44.integrations.Core.UploadFile({ file: glassesImage.file })).file_url;

    const response = await base44.functions.invoke('generateTryOn', {
      personImageUrl,
      glassesImageUrl,
    });

    if (response.data?.imageUrl) {
      setResultImage(response.data.imageUrl);
    } else {
      setError(response.data?.error || 'Não foi possível gerar a imagem. Tente novamente.');
    }

    } catch (err) {
      setError(err.message || 'Erro ao gerar imagem. Tente novamente.');
    }
    setIsGenerating(false);
  };

  const handleReset = () => {
    setPersonImage(null);
    setGlassesImage(null);
    setValidation(null);
    setResultImage(null);
    setError(null);
    setPersonUploadState({ checking: false, rejected: null });
    setGlassesUploadState({ checking: false, rejected: null });
    tryOnRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AccessCodeGate>
    <div className="min-h-screen bg-white font-inter overflow-x-hidden flex flex-col">
      <ParisHeader />

      {/* Hero */}
      <HeroSection onStart={handleStart} />

      {/* Upload Section */}
      <section ref={tryOnRef} className="relative px-4 py-12 sm:py-16 bg-slate-50/50">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8">
            <div className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-primary bg-primary/5 px-3 py-1 rounded-full mb-3">
              Experimente Agora
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">
              Como{' '}
              <span className="font-editorial paris-red-text font-bold normal-case italic">
                funciona
              </span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
              Envie uma foto sua e a imagem do óculos que deseja experimentar
            </p>
          </div>

          <div className="space-y-5">
            {/* Dicas visuais antes do upload — só aparece enquanto não há foto */}
            {!personImage && <PhotoTipsGuide />}

            {/* Upload cards */}
            <div className="grid grid-cols-2 gap-4">
              <ImageUploadCard
                type="person"
                image={personImage}
                onImageSelect={handlePersonImage}
                label="Sua Foto"
                hint="Foto de rosto com boa iluminação"
                buttonLabel="Escolher"
              />
              <ImageUploadCard
                type="glasses"
                image={glassesImage}
                onImageSelect={handleGlassesImage}
                label="Os Óculos"
                hint="Modelo que deseja experimentar"
                buttonLabel="Escolher"
              />
            </div>

            {/* Feedback de validação de upload (técnica + moderação de conteúdo) */}
            <AnimatePresence>
              {(personUploadState.checking || glassesUploadState.checking) && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center justify-center gap-2 text-xs text-slate-500"
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Verificando imagem...
                </motion.div>
              )}
              {personUploadState.rejected && (
                <UploadRejected
                  key="person-rejected"
                  reason={personUploadState.rejected}
                  onDismiss={() => setPersonUploadState({ checking: false, rejected: null })}
                />
              )}
              {glassesUploadState.rejected && (
                <UploadRejected
                  key="glasses-rejected"
                  reason={glassesUploadState.rejected}
                  onDismiss={() => setGlassesUploadState({ checking: false, rejected: null })}
                />
              )}
            </AnimatePresence>

            {/* Suggested glasses carousel */}
            <SuggestedGlassesCarousel
              onSelect={handleSelectSuggested}
              selectedId={glassesImage?.suggestedId}
              disabled={isGenerating}
            />

            {/* Validation panel (resumo de status) */}
            <ValidationPanel validation={validation} show={!!personImage} />

            {/* Detailed validation alerts */}
            {validation?.issues?.length > 0 && (
              <ValidationAlerts
                issues={validation.issues}
                onChangePhoto={() => {
                  setPersonImage(null);
                  setValidation(null);
                  setResultImage(null);
                  setError(null);
                }}
              />
            )}

            {/* Generate button */}
            <div className="flex justify-center pt-2">
              <motion.button
                whileHover={canGenerate ? { scale: 1.03 } : {}}
                whileTap={canGenerate ? { scale: 0.97 } : {}}
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className={`
                  paris-btn font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-full
                  flex items-center gap-3
                  ${(!canGenerate || isGenerating) ? 'opacity-50 cursor-not-allowed' : 'animate-paris-pulse'}
                `}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Prova Virtual
                  </>
                )}
              </motion.button>
            </div>

            {/* Progress bar */}
            <GeneratingProgress isGenerating={isGenerating} />

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center"
                >
                  <p className="text-primary text-sm font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Result Section */}
      <AnimatePresence>
        {resultImage && (
          <ResultSection
            resultImage={resultImage}
            originalImage={personImage?.preview}
            selectedModel={glassesImage?.specs ? {
              name: glassesImage.name,
              brand: glassesImage.brand,
              colorName: glassesImage.colorName,
              image: glassesImage.preview,
              specs: glassesImage.specs,
            } : null}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>

      <div className="flex-1" />
      <ParisFooter />
    </div>
    </AccessCodeGate>
  );
}