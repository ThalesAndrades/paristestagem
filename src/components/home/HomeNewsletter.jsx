/**
 * Faixa de captura de e-mail no fim da home — "Receba novidades e ofertas".
 */
export default function HomeNewsletter() {
  return (
    <section className="py-8 bg-secondary/40 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-semibold text-primary text-center md:text-left">
          Receba novidades e ofertas especiais!
        </p>
        <form className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <input
            type="text"
            placeholder="Seu nome"
            className="flex-1 md:w-40 px-3 py-2 text-xs border border-slate-200 rounded-sm bg-white focus:outline-none focus:border-primary"
          />
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="flex-1 md:w-56 px-3 py-2 text-xs border border-slate-200 rounded-sm bg-white focus:outline-none focus:border-primary"
          />
          <button
            type="button"
            className="paris-btn font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-sm whitespace-nowrap"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}