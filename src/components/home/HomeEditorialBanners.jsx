/**
 * 3 banners editoriais lado a lado com imagens oficiais da Paris (VTEX).
 */
const BANNERS = [
  {
    title: 'Encontre a loja\nmais perto de você',
    cta: 'Nossas lojas',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/25bc78bf-de22-4c78-84e5-0d888d11fe64___d04c812ab0aecf173e3e4e4fa13d660e.jpg',
    accent: '#0F3E99',
  },
  {
    title: 'Favoritos',
    cta: 'Confira',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/63425e60-6670-4ca2-81e9-3befc00192da___ce8dc9dfa43863beb16761797d3d002d.jpeg',
    accent: '#0E71B8',
  },
  {
    title: 'Para todos os estilos',
    cta: 'Ver coleções',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/059f3658-d8dc-4bbf-a314-6a271ff216a5___c8c2d899215a8793f246e5b900d005fe.jpg',
    accent: '#0F3E99',
  },
];

export default function HomeEditorialBanners() {
  return (
    <section className="py-10 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-3">
          {BANNERS.map((b, i) => (
            <button
              key={i}
              className="relative rounded-sm overflow-hidden aspect-[4/3] group"
            >
              <img
                src={b.image}
                alt={b.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-left">
                <p className="text-white font-bold text-base sm:text-lg whitespace-pre-line leading-tight">
                  {b.title}
                </p>
                <span
                  className="inline-block mt-2 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm w-fit"
                  style={{ background: b.accent }}
                >
                  {b.cta}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}