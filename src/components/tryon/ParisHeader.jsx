import { ShoppingBag, User as UserIcon, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParisLogo from './ParisLogo';
import PresentationModeBar from './PresentationModeBar';

export default function ParisHeader() {
  return (
    <>
      {/* Top utility bar */}
      <div className="top-bar text-center py-2 text-xs sm:text-sm font-medium tracking-wide">
        Produtos Originais • Provador Virtual com IA
      </div>

      {/* Main header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Encontre seu óculos"
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Logo oficial */}
          <Link to="/" className="flex items-center flex-shrink-0 mx-auto md:mx-0" aria-label="Ir para a página inicial">
            <ParisLogo className="h-10 sm:h-11 w-auto" />
          </Link>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <button className="flex items-center gap-1.5 text-sm text-slate-700 hover:text-accent transition-colors">
              <UserIcon className="w-5 h-5" />
              <span className="font-medium">Entrar</span>
            </button>
            <button className="text-slate-700 hover:text-accent transition-colors" aria-label="Sacola">
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile actions — ícones rápidos pra não deixar o header morto no celular */}
          <div className="md:hidden flex items-center gap-3 flex-shrink-0">
            <button className="text-slate-700" aria-label="Buscar">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-slate-700" aria-label="Sacola">
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Modos de apresentação da ferramenta */}
      <PresentationModeBar />
    </>
  );
}