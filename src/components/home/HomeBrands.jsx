/**
 * Carrossel circular de marcas em destaque — logos oficiais (VTEX Óticas Paris).
 */
const BRANDS = [
  {
    name: 'Miu Miu',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/2c80f35b-6fe0-4f3f-bfa6-50aa0e03298b___27ab759eb653e31bc14e265429af1a02.png',
  },
  {
    name: 'Prada',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/ea8b5786-90a9-4832-8ea9-76116759aeb3___a6ba486deb05cc8da0a70798569b3a14.png',
  },
  {
    name: 'Ray-Ban',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/8ff7e2b6-21e6-46a4-acd2-f09d805cce86___0f3d41c6848d971e294ddddab3cbfc1f.png',
  },
  {
    name: 'Zev',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/8ff7ed5b-1272-411b-9b3e-bcb0a404666f___428ea6209d952e51f2e77e81aea7c582.png',
  },
  {
    name: 'Vogue',
    image:
      'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/24d26b76-7862-4ecd-96f1-f33c72369ab9___b408a028da7da226456f2274e09e34e7.png',
  },
];

export default function HomeBrands() {
  return (
    <section className="py-10 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-center gap-6 sm:gap-10 flex-wrap">
          {BRANDS.map((b) => (
            <button
              key={b.name}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-slate-200 bg-white flex items-center justify-center group-hover:border-[#0F3E99] transition-colors overflow-hidden p-4">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                {b.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}