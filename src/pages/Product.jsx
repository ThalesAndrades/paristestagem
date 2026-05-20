import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  ChevronLeft,
  MessageCircle,
} from 'lucide-react';
import ParisHeader from '@/components/tryon/ParisHeader';
import ParisFooter from '@/components/tryon/ParisFooter';
import AccessCodeGate from '@/components/tryon/AccessCodeGate';
import VirtualTryOnModal from '@/components/marketplace/VirtualTryOnModal';
import { getProductById, formatPrice } from '@/components/marketplace/catalog';

// Tamanhos de armação oferecidos (padrão da Óticas Paris)
const SIZES = ['52', '54'];

export default function Product() {
  const { id } = useParams();
  const product = getProductById(id);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeSize, setActiveSize] = useState(SIZES[1]);
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const [cep, setCep] = useState('');

  if (!product) return <Navigate to="/marketplace" replace />;

  const variant = product.variants[activeVariantIdx];

  // Cálculos de preço — pix com 19% off (padrão Óticas Paris)
  const pixDiscount = 0.19;
  const pixPrice = product.price * (1 - pixDiscount);
  const originalPrice = product.price * 1.24; // preço "de" (riscado)
  const installmentValue = product.price / product.installments;

  // Galeria — replica thumbnails laterais. Como temos uma imagem por variante,
  // reusamos a mesma 6 vezes com leve variação visual (estilo placeholder oficial)
  const galleryThumbs = Array(6).fill(variant.image);

  return (
    <AccessCodeGate>
      <div className="min-h-screen bg-white font-inter flex flex-col">
        <ParisHeader />

        {/* Sub-nav de categorias (estilo Paris) */}
        <div className="border-b border-slate-100 bg-white hidden md:block">
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-7 text-xs font-medium text-slate-600">
            {[
              'Marcas',
              'Óculos de sol',
              'Óculos por Estilo',
              'Óculos de grau',
              'Lentes de contato',
            ].map((label) => (
              <span key={label} className="hover:text-primary cursor-pointer transition-colors">
                {label}
              </span>
            ))}
            <span className="bg-primary text-white px-2.5 py-1 rounded font-bold text-[11px]">
              ZEV
            </span>
            <span className="hover:text-primary cursor-pointer transition-colors">
              Lançamentos
            </span>
            <span className="bg-accent text-white px-2.5 py-1 rounded font-bold text-[11px]">
              Outlet
            </span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto w-full px-4 py-3">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Voltar ao marketplace
          </Link>
        </div>

        {/* Product layout — 3 colunas no desktop (galeria + img principal + painel) */}
        <section className="px-4 pb-12 flex-1">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[80px_1fr_420px] gap-4 lg:gap-8">
            {/* Coluna 1: thumbnails verticais (desktop) */}
            <div className="hidden lg:flex flex-col gap-2">
              {galleryThumbs.map((thumb, i) => (
                <button
                  key={i}
                  className={`
                    aspect-square rounded-lg border bg-white overflow-hidden transition-all
                    ${i === 0 ? 'border-primary border-2' : 'border-slate-200 hover:border-slate-300'}
                  `}
                >
                  <img src={thumb} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>

            {/* Coluna 2: imagem principal + favorito */}
            <div className="relative">
              <button
                aria-label="Adicionar aos favoritos"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-primary hover:text-primary flex items-center justify-center text-slate-400 transition-colors z-10 shadow-sm"
              >
                <Heart className="w-4 h-4" />
              </button>
              <div className="bg-white rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-6 sm:p-10 border border-slate-100">
                <motion.img
                  key={variant.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={variant.image}
                  alt={`${product.name} ${variant.colorName}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Thumbnails horizontais — mobile */}
              <div className="lg:hidden flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                {galleryThumbs.map((thumb, i) => (
                  <button
                    key={i}
                    className={`
                      flex-shrink-0 w-16 h-16 rounded-lg border bg-white overflow-hidden
                      ${i === 0 ? 'border-primary border-2' : 'border-slate-200'}
                    `}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Coluna 3: painel de informações */}
            <div className="flex flex-col">
              {/* Marca + nome */}
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                {product.brand}
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1 leading-tight">
                Óculos {product.specs.gender === 'Feminino' ? 'de' : 'de'} {product.name}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Ref.: {product.id.slice(0, 6).toUpperCase()}
              </p>

              {/* Cores — swatches circulares com mini imagem */}
              <div className="mt-5">
                <p className="text-sm text-slate-700 mb-2">Cores</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantIdx(idx)}
                      title={v.colorName}
                      aria-label={`Cor ${v.colorName}`}
                      aria-pressed={idx === activeVariantIdx}
                      className={`
                        relative w-11 h-11 rounded-full overflow-hidden border-2 bg-slate-50 transition-all
                        ${idx === activeVariantIdx ? 'border-primary ring-2 ring-primary/15' : 'border-slate-200 hover:border-slate-300'}
                      `}
                    >
                      <img src={v.image} alt={v.colorName} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamanho */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-700">Tamanho</p>
                  <button className="text-xs text-primary font-medium hover:underline">
                    Guia de medidas
                  </button>
                </div>
                <div className="flex gap-2">
                  {SIZES.map((s) => {
                    const isActive = activeSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setActiveSize(s)}
                        aria-pressed={isActive}
                        className={`
                          w-14 h-11 rounded border text-sm font-medium transition-all
                          ${
                            isActive
                              ? 'border-primary border-2 text-primary bg-primary/5'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }
                        `}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preço */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 line-through">
                    R$ {originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    -19%
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                  <span className="text-2xl font-bold text-slate-800">
                    R$ {pixPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-sm text-slate-600">no pix</span>
                  <span className="text-xs text-[#16a34a] font-medium">
                    (19% de desconto)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {formatPrice(product.price)} em {product.installments}x de{' '}
                  {formatPrice(installmentValue)} sem juros
                </p>
              </div>

              {/* Faixa frete grátis */}
              <div className="mt-3 bg-secondary/40 border border-secondary rounded py-2 px-3 text-center">
                <p className="text-xs text-primary font-bold">
                  Frete Grátis Sul, Sudeste, Centro-Oeste e Bahia
                </p>
              </div>

              {/* CTAs principais */}
              <div className="mt-3 space-y-2">
                <button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium text-sm py-3.5 rounded transition-colors">
                  Comprar
                </button>
                <button className="w-full bg-white border border-[#16a34a] text-[#16a34a] hover:bg-green-50 font-medium text-sm py-3.5 rounded transition-colors">
                  Comprar Somente Armação
                </button>

                {/* CTA destaque: Provar com IA — paleta oficial Paris (azul escuro → azul claro) */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setTryOnOpen(true)}
                  className="relative w-full font-bold text-xs uppercase tracking-widest py-3.5 rounded overflow-hidden text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-accent/30 transition-shadow group animate-paris-pulse"
                  style={{
                    background:
                      'linear-gradient(135deg, #0A2D72 0%, #0F3E99 45%, #0E71B8 100%)',
                  }}
                >
                  {/* Shine sweep */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Provar Virtualmente com IA
                  </span>
                </motion.button>
              </div>

              {/* CEP */}
              <div className="mt-5">
                <label className="text-sm text-slate-700 block mb-2">
                  Digite seu CEP
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    inputMode="numeric"
                    placeholder="00000-000"
                    className="flex-1 border border-slate-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                  <button className="border border-primary text-primary hover:bg-primary hover:text-white font-medium text-sm px-4 py-2.5 rounded transition-colors whitespace-nowrap">
                    Calcular frete
                  </button>
                </div>
                <button className="text-xs text-primary mt-2 hover:underline">
                  Não sei meu CEP
                </button>
              </div>

              {/* Fale com a gente */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs text-slate-600">
                  Precisa de ajuda para escolher seu óculos?
                </p>
                <button className="inline-flex items-center gap-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Fale com a gente
                </button>
              </div>
            </div>
          </div>

          {/* Descrição + Specs — bloco inferior largura total */}
          <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3">
                Descrição
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3">
                Especificações técnicas
              </h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                {[
                  ['Material', product.specs.material],
                  ['Formato', product.specs.shape],
                  ['Gênero', product.specs.gender],
                  ['Ponte', product.specs.bridge],
                  ['Lente', product.specs.lens],
                  ['Haste', product.specs.temple],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col">
                    <dt className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                      {label}
                    </dt>
                    <dd className="text-slate-700 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <ParisFooter />

        {/* Try-on modal */}
        <VirtualTryOnModal
          open={tryOnOpen}
          onClose={() => setTryOnOpen(false)}
          product={product}
          variant={variant}
        />
      </div>
    </AccessCodeGate>
  );
}