/**
 * Faixas de preço — cards rosa pastel como na home oficial.
 */
const BUCKETS = [
  { label: 'Óculos até', value: 'R$ 350,00' },
  { label: 'Óculos até', value: 'R$ 500,00' },
  { label: 'Óculos até', value: 'R$ 750,00' },
  { label: 'Óculos acima de', value: 'R$ 800,00' },
];

export default function HomePriceBuckets() {
  return (
    <section className="py-10 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BUCKETS.map((b, i) => (
            <button
              key={i}
              className="bg-secondary hover:bg-secondary/70 transition-colors rounded-sm py-4 px-3 text-center group"
            >
              <p className="text-[11px] sm:text-xs text-primary/70 font-medium">
                {b.label}
              </p>
              <p className="text-sm sm:text-base font-bold text-primary mt-0.5">
                {b.value}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}