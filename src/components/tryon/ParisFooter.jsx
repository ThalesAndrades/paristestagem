import ParisLogo from './ParisLogo';

export default function ParisFooter() {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <div className="flex justify-center sm:justify-start mb-3">
              <div className="bg-white rounded-md px-2 py-1.5 inline-flex">
                <ParisLogo className="h-8 w-auto" />
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Produtos originais e atendimento especializado. Provador virtual com inteligência artificial.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-white">Institucional</h4>
            <ul className="space-y-1.5 text-xs text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Nossas Lojas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marcas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lançamentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Outlet</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-white">Atendimento</h4>
            <ul className="space-y-1.5 text-xs text-white/70">
              <li>WhatsApp: (27) 3145-1555</li>
              <li>Troca fácil</li>
              <li>Compre e retire na loja</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-[11px] text-white/50">
          © {new Date().getFullYear()} Óticas Paris — Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}