import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, ArrowLeftRight } from 'lucide-react';

export default function CompareModal({ open, onClose, beforeImage, afterImage }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    updateFromClientX(e.clientX);
  };

  useEffect(() => {
    if (!open) return;
    const handleMove = (e) => {
      if (!isDraggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const handleUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [open, updateFromClientX]);

  // Reset slider when re-opening
  useEffect(() => {
    if (open) setPosition(50);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  Comparar Resultado
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Compare canvas */}
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              className="relative w-full aspect-square bg-slate-100 overflow-hidden select-none touch-none cursor-ew-resize"
            >
              {/* After (full width, background) */}
              <img
                src={afterImage}
                alt="Com óculos"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
              />

              {/* Before (clipped by position) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${position}%` }}
              >
                <img
                  src={beforeImage}
                  alt="Foto original"
                  className="absolute inset-0 h-full object-cover"
                  style={{
                    width: containerRef.current
                      ? `${containerRef.current.clientWidth}px`
                      : '100%',
                  }}
                  draggable={false}
                />
              </div>

              {/* Labels */}
              <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full pointer-events-none backdrop-blur-sm">
                Antes
              </div>
              <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full pointer-events-none">
                Depois
              </div>

              {/* Divider line + handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] pointer-events-none"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-primary">
                  <ArrowLeftRight className="w-4 h-4 text-primary" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 bg-slate-50 text-center">
              <p className="text-xs text-slate-500">
                Arraste a linha para comparar
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}