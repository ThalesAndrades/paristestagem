import { ChevronDown } from 'lucide-react';

/**
 * Menu de navegação horizontal — espelho do menu oficial Óticas Paris (VTEX).
 * Categorias principais com indicador de submenu (decorativo, não funcional).
 */
const MENU_ITEMS = [
  { label: 'Marcas', hasSubmenu: true },
  { label: 'Óculos de sol', hasSubmenu: true },
  { label: 'Óculos de grau', hasSubmenu: true },
  { label: 'Lentes de contato', hasSubmenu: true },
  { label: 'Acessórios', hasSubmenu: true },
  { label: 'Outlet', hasSubmenu: false, highlight: true },
];

export default function HomeMainMenu() {
  return (
    <nav className="bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className="flex-shrink-0">
              <button
                className={`flex items-center gap-1 px-3 sm:px-5 py-3.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap border-b-2 border-transparent ${
                  item.highlight
                    ? 'text-primary hover:border-primary font-bold'
                    : 'text-slate-700 hover:text-primary hover:border-primary'
                }`}
              >
                {item.label}
                {item.hasSubmenu && (
                  <ChevronDown className="w-3 h-3 opacity-50" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}