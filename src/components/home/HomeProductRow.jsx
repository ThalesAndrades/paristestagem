import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VtexProductCard from '@/components/marketplace/VtexProductCard';

/**
 * Linha horizontal de produtos no estilo da home oficial (prateleira VTEX):
 * título centralizado, navegação lateral e cards fiéis ao VTEX.
 */
export default function HomeProductRow({ title, products, ctaLabel = 'Ver todos os produtos' }) {
  return (
    <section className="py-10 sm:py-12 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-base sm:text-lg font-bold text-slate-900 mb-6 tracking-wide">
          {title}
        </h2>

        <div className="relative">
          <button className="hidden md:flex absolute -left-3 top-1/3 w-9 h-9 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-500 hover:text-slate-900 z-10 shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="hidden md:flex absolute -right-3 top-1/3 w-9 h-9 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-500 hover:text-slate-900 z-10 shadow-sm">
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {products.slice(0, 4).map((p) => (
              <VtexProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/marketplace"
            className="text-xs font-bold uppercase tracking-widest text-[#0F3E99] hover:text-[#0E71B8] transition-colors"
          >
            {ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}