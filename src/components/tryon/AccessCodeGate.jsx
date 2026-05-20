import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Loader2, AlertCircle } from 'lucide-react';
import ParisLogo from './ParisLogo';

const ACCESS_CODE = '190955';
const STORAGE_KEY = 'paris_access_granted';
const CODE_LENGTH = 6;

export default function AccessCodeGate({ children }) {
  // Lazy initializer — lê sessionStorage SÍNCRONO no primeiro render,
  // sem flash de conteúdo antes da verificação
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const inputsRef = useRef([]);

  // Foco no primeiro input quando o gate está visível
  useEffect(() => {
    if (!unlocked) {
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [unlocked]);

  const handleChange = (idx, value) => {
    const v = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[idx] = v;
    setDigits(next);
    setError(false);

    if (v && idx < CODE_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }

    // Auto-submit quando completo
    if (next.every((d) => d !== '') && next.join('').length === CODE_LENGTH) {
      verify(next.join(''));
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (!pasted) return;
    const next = Array(CODE_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    if (pasted.length === CODE_LENGTH) {
      verify(pasted);
    } else {
      inputsRef.current[pasted.length]?.focus();
    }
  };

  const verify = (code) => {
    setVerifying(true);
    setTimeout(() => {
      if (code === ACCESS_CODE) {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setUnlocked(true);
      } else {
        setError(true);
        setDigits(Array(CODE_LENGTH).fill(''));
        inputsRef.current[0]?.focus();
      }
      setVerifying(false);
    }, 400);
  };

  // Desbloqueado → renderiza o conteúdo protegido normalmente
  if (unlocked) return <>{children}</>;

  // Bloqueado → renderiza APENAS o gate (conteúdo nunca aparece atrás)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 p-7 sm:p-8 text-center relative overflow-hidden"
        >
          {/* Ornament — rosa Paris */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-primary opacity-[0.04] rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="flex justify-center mb-5 relative">
            <ParisLogo className="h-10 w-auto" />
          </div>

          <div className="w-12 h-12 mx-auto rounded-full bg-primary/5 flex items-center justify-center mb-4 relative">
            <Lock className="w-5 h-5 text-primary" />
          </div>

          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">
            Acesso{' '}
            <span className="font-editorial paris-red-text font-bold normal-case italic">
              restrito
            </span>
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Digite o código de 6 dígitos para acessar o provador virtual
          </p>

          {/* Inputs */}
          <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={verifying}
                className={`
                  w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-xl border-2 transition-all
                  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15
                  ${error ? 'border-destructive bg-destructive/5 text-destructive' : 'border-slate-200 bg-white text-slate-900'}
                  ${verifying ? 'opacity-50' : ''}
                `}
              />
            ))}
          </div>

          {/* States */}
          <div className="h-6">
            {verifying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 text-xs text-slate-500"
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Verificando...
              </motion.div>
            )}
            {error && !verifying && (
              <motion.div
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5 text-xs text-destructive font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                Código inválido — tente novamente
              </motion.div>
            )}
          </div>

          <p className="text-[10px] text-slate-400 mt-4 tracking-wider uppercase">
            Óticas Paris • Provador Virtual
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}