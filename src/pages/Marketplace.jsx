import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ParisHeader from '@/components/tryon/ParisHeader';
import ParisFooter from '@/components/tryon/ParisFooter';
import AccessCodeGate from '@/components/tryon/AccessCodeGate';
import VtexProductCard from '@/components/marketplace/VtexProductCard';
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters';
import { CATALOG } from '@/components/marketplace/catalog';

export default function Marketplace() {
  const [filter, setFilter] = useState('Todos');

  const filtered = useMemo(() => {
    if (filter === 'Todos') return CATALOG;
    return CATALOG.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <AccessCodeGate>
      <div className="min-h-screen bg-white font-inter flex flex-col">
        <ParisHeader />

        {/* Hero strip */}
        <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:py-14 border-b border-slate-100">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.3em] uppercase text-primary bg-primary/5 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3 h-3" />
              Marketplace
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight leading-none">
              Toda a coleção{' '}
              <span className="font-editorial paris-red-text font-bold normal-case italic">
                Paris
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">
              Explore nossos modelos e experimente cada um virtualmente com
              inteligência artificial.
            </p>
          </div>
        </section>

        {/* Catalog */}
        <section className="px-4 py-8 flex-1">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <MarketplaceFilters active={filter} onChange={setFilter} />
            </div>

            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
            >
              {filtered.map((product) => (
                <VtexProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400 text-sm">
                Nenhum modelo encontrado nesta categoria.
              </div>
            )}
          </div>
        </section>

        <ParisFooter />
      </div>
    </AccessCodeGate>
  );
}