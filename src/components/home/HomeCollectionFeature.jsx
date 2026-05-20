import VtexProductCard from '@/components/marketplace/VtexProductCard';

/**
 * Banner editorial "Coleção do Prisma" – Zev Prisma:
 * imagem editorial + 2 produtos em destaque.
 */
export default function HomeCollectionFeature({ products }) {
  const picks = products.filter((p) => p.brand === 'Zev').slice(0, 2);

  return (
    <section className="py-10 sm:py-12 border-b border-slate-100 bg-slate-50/40">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-base sm:text-lg font-bold text-slate-900 mb-6 tracking-wide">
          ZEV Prisma
        </h2>

        <div className="grid md:grid-cols-2 gap-5 bg-white rounded-sm border border-slate-100 overflow-hidden">
          {/* Visual editorial oficial */}
          <div className="relative min-h-[260px] flex items-end p-6 overflow-hidden">
            <img
              src="https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/e36e1573-2375-425c-8120-e9d08f07f52e___82fd564b8d036402ff8a82e8923a642a.jpg"
              alt="Coleção Prisma"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="relative z-10">
              <p className="font-editorial italic text-2xl sm:text-3xl text-white drop-shadow-lg leading-tight">
                coleção do prisma
              </p>
              <button className="mt-3 bg-primary hover:bg-[#0A2D72] text-white font-bold text-[10px] uppercase tracking-widest px-5 py-2 rounded-sm transition-colors">
                Conheça a coleção
              </button>
            </div>
          </div>

          {/* Produtos da coleção */}
          <div className="grid grid-cols-2 gap-3 p-5">
            {picks.map((p) => (
              <VtexProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}