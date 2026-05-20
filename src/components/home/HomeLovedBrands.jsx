/**
 * "As marcas que mais amamos" — wordmark das marcas.
 */
const BRANDS = [
  { label: 'TOM FORD', font: 'font-bold tracking-widest' },
  { label: 'GUCCI', font: 'font-bold tracking-[0.2em]' },
  { label: 'MOSCOT', font: 'font-bold tracking-widest' },
  { label: 'OLIVER', font: 'font-bold tracking-widest italic' },
  { label: 'miu miu', font: 'italic font-light text-lg' },
  { label: 'CARRERA', font: 'font-black tracking-widest' },
];

export default function HomeLovedBrands() {
  return (
    <section className="py-10 border-b border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-sm font-semibold text-slate-600 mb-6 tracking-wide">
          As marcas que mais amamos
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {BRANDS.map((b, i) => (
            <span
              key={i}
              className={`text-slate-700 hover:text-slate-900 cursor-pointer transition-colors text-sm sm:text-base ${b.font}`}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}