import { LOGO_URL } from './ParisLogo';

/**
 * Marca d'água Óticas Paris — composição em 3 camadas:
 *
 * 1. FAIXA DIAGONAL CENTRAL (sutil): logo + wordmark atravessando a zona de
 *    rosto/óculos, dificultando crop sem perder a referência da marca.
 * 2. SELO DE AUTENTICIDADE (canto inferior direito): badge sólido com logo +
 *    "PROVA VIRTUAL", servindo como assinatura visual do gerador.
 * 3. RODAPÉ EDITORIAL: faixa fina inferior com tagline "ÓTICAS PARIS • IA".
 *
 * Tudo é não-interativo. O container pai precisa ser `relative` +
 * `overflow-hidden`.
 */
export default function WatermarkOverlay({
  opacity = 0.02,
  angle = 0,
  showSeal = true,
  showFooter = true,
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* 1. FAIXA DIAGONAL CENTRAL — sutil, atravessa a zona do rosto */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center gap-4 whitespace-nowrap"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'center center',
            opacity,
          }}
        >
          <img
            src={LOGO_URL}
            alt=""
            className="h-8 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
          />
          <span
            className="font-black uppercase text-white"
            style={{
              fontSize: '1.7rem',
              letterSpacing: '0.42em',
              textShadow:
                '0 1px 3px rgba(0,0,0,0.6), 0 0 18px rgba(0,0,0,0.4)',
            }}
          >
            Óticas Paris
          </span>
        </div>
      </div>

      {/* 2. SELO DE AUTENTICIDADE — canto inferior direito */}
      {showSeal && (
        <div
          className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full pl-2 pr-3 py-1.5 shadow-lg"
          style={{
            border: '1px solid rgba(15, 62, 153, 0.18)',
            boxShadow:
              '0 4px 16px rgba(15, 62, 153, 0.25), 0 1px 3px rgba(0,0,0,0.18)',
          }}
        >
          <img src={LOGO_URL} alt="" className="h-4 w-auto" />
          <div className="flex flex-col leading-none">
            <span
              className="text-[7px] font-black uppercase"
              style={{ color: '#0F3E99', letterSpacing: '0.18em' }}
            >
              Prova Virtual
            </span>
            <span
              className="text-[6px] font-bold uppercase mt-0.5"
              style={{ color: '#0E71B8', letterSpacing: '0.2em' }}
            >
              IA · Autêntica
            </span>
          </div>
        </div>
      )}

      {/* 3. RODAPÉ EDITORIAL — faixa fina inferior */}
      {showFooter && (
        <div
          className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center"
          style={{
            background:
              'linear-gradient(to top, rgba(15, 62, 153, 0.55), rgba(15, 62, 153, 0))',
          }}
        >
          <span
            className="text-[8px] font-bold uppercase text-white/85"
            style={{ letterSpacing: '0.45em' }}
          >
            Óticas Paris · oticasparis.com.br
          </span>
        </div>
      )}
    </div>
  );
}