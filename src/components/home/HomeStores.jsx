import { MapPin } from 'lucide-react';

/**
 * Bloco "Nossas lojas" — seletor por estado.
 */
export default function HomeStores() {
  return (
    <section className="py-10 bg-secondary/30 border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-base sm:text-lg font-bold text-primary mb-1 tracking-wide">
          Nossas lojas
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Encontre a loja Óticas Paris mais próxima de você
        </p>
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2.5">
          <MapPin className="w-4 h-4 text-primary" />
          <select className="text-sm text-slate-700 bg-transparent outline-none cursor-pointer pr-2">
            <option>Minas Gerais</option>
            <option>São Paulo</option>
            <option>Rio de Janeiro</option>
            <option>Bahia</option>
          </select>
        </div>
      </div>
    </section>
  );
}