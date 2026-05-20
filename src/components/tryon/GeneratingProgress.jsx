import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Enviando imagens', duration: 3000 },
  { id: 2, label: 'Analisando seu rosto', duration: 4000 },
  { id: 3, label: 'Identificando o modelo de óculos', duration: 3500 },
  { id: 4, label: 'IA montando a prova virtual', duration: 0 },
];

export default function GeneratingProgress({ isGenerating }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    setCurrentStep(0);
    setProgress(0);

    const stepTimers = [];
    let accumulated = 0;
    STEPS.forEach((step, i) => {
      if (step.duration > 0) {
        const t = setTimeout(() => setCurrentStep(i + 1), accumulated + step.duration);
        stepTimers.push(t);
        accumulated += step.duration;
      }
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const increment = (90 - prev) * 0.03;
        return Math.min(prev + increment + 0.4, 90);
      });
    }, 300);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isGenerating]);

  useEffect(() => {
    if (!isGenerating && progress > 0) setProgress(100);
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="card-paris p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#E30613] flex items-center justify-center flex-shrink-0">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Processando com IA</p>
              <p className="text-xs text-slate-500">Aguarde alguns segundos</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 mb-5 overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-[#E30613]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-2.5">
            {STEPS.map((step, i) => {
              const isDone = currentStep > i;
              const isActive = currentStep === i;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isDone || isActive ? 1 : 0.4, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : isActive ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#E30613]" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isDone ? 'text-green-700 font-medium' :
                      isActive ? 'text-slate-900 font-bold' :
                      'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}