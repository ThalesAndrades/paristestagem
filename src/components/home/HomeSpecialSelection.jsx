/**
 * "Uma seleção especial para você" — categorias visuais com imagens oficiais VTEX.
 */
const CATEGORIES = [
  {
    label: 'Esportivo',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/3a3fe74b-4ee6-48d0-a480-528ab7e47560___748712de09152a5d9ddf1b3374003283.png',
  },
  {
    label: 'Acetato',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/e8161619-caf0-4fa1-a8a4-d8d0e2aa4fab___dccc719c39a74c5f44ed572ce95603db.png',
  },
  {
    label: 'Espelhado',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/d7984b42-5449-4240-b559-43ad34e5b7c9___7d611249df5301762f890e4bcc969055.png',
  },
  {
    label: 'Aviador',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/4c6cb037-5e53-4971-932a-762cd44ae89d___e9afcd33fb998a1685d33dca9179a6ec.png',
  },
  {
    label: 'Quadrado',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/92cbaf13-27da-43d1-9a9b-09bef35608bf___efdf3a45504f9c3ea58e25f8e261f0db.png',
  },
  {
    label: 'Geek',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/fd03e596-5dc8-4793-a301-4407f187bc76___65666f186d2097df9a7371dd2657e917.png',
  },
];

export default function HomeSpecialSelection() {
  return (
    <section className="py-10 sm:py-12 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-base sm:text-lg font-bold text-slate-900 mb-6 tracking-wide">
          Uma seleção especial para você
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map((c, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-full aspect-square bg-slate-50 rounded-sm overflow-hidden border border-slate-100 group-hover:border-[#0F3E99] transition-colors">
                <img
                  src={c.image}
                  alt={c.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-slate-700">
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}