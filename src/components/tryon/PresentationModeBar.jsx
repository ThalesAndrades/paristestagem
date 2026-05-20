import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Store, ChevronRight, Home as HomeIcon } from 'lucide-react';

/**
 * Faixa que apresenta os MODOS da ferramenta:
 * 1. Home Oficial → réplica do site oficial Óticas Paris
 * 2. Marketplace → provador embutido na loja (catálogo + página de produto)
 * 3. Provador IA → página dedicada / captação externa
 *
 * Mostra qual modo está ativo de acordo com a rota atual.
 */
export default function PresentationModeBar() {
  const { pathname } = useLocation();

  const isHomeMode = pathname === '/';
  const isTryOnMode = pathname === '/provador';
  const isMarketplaceMode =
    pathname.startsWith('/marketplace') || pathname.startsWith('/produto');

  // Cores alinhadas à paleta oficial Paris:
  //   primary  #0F3E99  → Home (institucional)
  //   accent   #0E71B8  → Marketplace (azul claro de produto)
  //   gradient #0F3E99→#0E71B8 com badge rosa  → Provador IA (destaque editorial)
  const modes = [
    {
      id: 'home',
      title: 'Home Oficial',
      subtitle: 'Réplica do site Paris',
      icon: HomeIcon,
      to: '/',
      active: isHomeMode,
      accent: '#0F3E99',
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      subtitle: 'Provador embutido na loja',
      icon: Store,
      to: '/marketplace',
      active: isMarketplaceMode,
      accent: '#0E71B8',
    },
    {
      id: 'tryon',
      title: 'Provador IA',
      subtitle: 'Página dedicada · captação',
      icon: Sparkles,
      to: '/provador',
      active: isTryOnMode,
      accent: '#0A2D72',
    },
  ];

  return (
    <div className="bg-slate-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-2.5">
        <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            Modos de Apresentação
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {modes.map((m) => (
            <Link
              key={m.id}
              to={m.to}
              className={`
                group relative flex items-center gap-2.5 sm:gap-3 rounded-xl border bg-white px-3 py-2.5 sm:py-3
                transition-all
                ${
                  m.active
                    ? 'border-2 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }
              `}
              style={m.active ? { borderColor: m.accent } : {}}
            >
              <div
                className={`
                  w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                  ${m.active ? 'text-white' : 'text-slate-500 bg-slate-100 group-hover:bg-slate-200'}
                `}
                style={m.active ? { background: m.accent } : {}}
              >
                <m.icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-tight">
                    {m.title}
                  </p>
                  {m.active && (
                    <span
                      className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full"
                      style={{ background: m.accent }}
                    >
                      Ativo
                    </span>
                  )}
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                  {m.subtitle}
                </p>
              </div>

              {!m.active && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 flex-shrink-0 transition-colors" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}