import { FlaskConical } from 'lucide-react';

/**
 * Faixa topo: indica que o ambiente é um protótipo de testes.
 * Aparece acima de TUDO (inclusive do top-bar oficial).
 */
export default function PrototypeBanner() {
  return (
    <div
      className="text-white text-center px-3 py-2 flex items-center justify-center gap-2 border-b border-white/10"
      style={{
        background:
          'linear-gradient(90deg, #0A2D72 0%, #0F3E99 50%, #0A2D72 100%)',
      }}
    >
      <FlaskConical className="w-3.5 h-3.5 text-[#FAD9E1] flex-shrink-0" />
      <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
        Modo Protótipo
      </span>
      <span className="hidden sm:inline text-white/30">·</span>
      <span className="hidden sm:inline italic text-[10px] sm:text-xs text-white/80 font-light">
        Modelo para uso EXCLUSIVO de teste e validação por equipe interna
      </span>
      <span className="sm:hidden italic text-[10px] text-white/80 font-light">
        Uso interno
      </span>
    </div>
  );
}