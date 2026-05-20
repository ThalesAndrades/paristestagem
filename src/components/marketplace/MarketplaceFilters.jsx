const FILTERS = ['Todos', 'Masculino', 'Feminino', 'Unissex'];

export default function MarketplaceFilters({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {FILTERS.map((f) => {
        const isActive = active === f;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            aria-pressed={isActive}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all
              ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary'
              }
            `}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}