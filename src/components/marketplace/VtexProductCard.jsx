import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { formatPrice, getVtexPricing } from './catalog';

/**
 * Card de produto fiel ao VTEX (Óticas Paris):
 *  - badge "Exclusividade" no topo esquerdo
 *  - ícone de wishlist no topo direito
 *  - hover troca para a 2ª imagem (variante alternativa quando disponível)
 *  - bloco de preço com:
 *      • preço cheio riscado + selo -%off
 *      • preço PIX em azul accent + "(N% de desconto)"
 *      • preço de venda + "em 10x de R$ X,XX sem juros"
 */
export default function VtexProductCard({ product, showBadge = true }) {
  const {
    listPrice,
    sellPrice,
    pixPrice,
    installments,
    installmentValue,
    discountPct,
    pixDiscountPct,
  } = getVtexPricing(product);

  const primaryImg = product.variants[0]?.image;
  const hoverImg = product.variants[1]?.image || primaryImg;

  return (
    <Link
      to={`/produto/${product.id}`}
      aria-label={`Óculos ${product.brand} ${product.name}`}
      className="group block bg-white border border-slate-100 rounded-sm overflow-hidden hover:shadow-md transition-shadow text-center"
    >
      {/* Imagem com hover swap + badges */}
      <div className="relative aspect-square bg-white p-4">
        <img
          src={primaryImg}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={hoverImg}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Badge Exclusividade (canto sup. esquerdo) */}
        {showBadge && (
          <div className="absolute top-2 left-2 bg-[#0F3E99] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
            Exclusividade
          </div>
        )}

        {/* Wishlist (canto sup. direito) */}
        <button
          type="button"
          aria-label="Adicionar à lista de desejos"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center text-slate-400 hover:text-[#0F3E99] transition-colors"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="px-3 pb-4 pt-1 flex flex-col items-center">
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold">
          {product.brand}
        </p>
        <h3 className="text-[13px] text-slate-800 leading-snug mt-2 mb-3 line-clamp-2 min-h-[2.4rem] px-1">
          Óculos de Sol {product.brand} {product.name}
        </h3>

        {/* Bloco de preço VTEX */}
        <div className="w-full text-center space-y-0.5">
          {/* Linha 1: preço cheio riscado + selo -%off */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-[11px] text-slate-400 line-through">
              {formatPrice(listPrice)}
            </span>
            <span className="text-[10px] font-bold text-[#0F3E99]">
              -{discountPct}%
            </span>
          </div>

          {/* Linha 2: preço PIX (destaque) */}
          <div className="text-[13px] font-bold text-[#0E71B8]">
            {formatPrice(pixPrice)}{' '}
            <span className="font-normal text-[11px] text-slate-500">no pix</span>
          </div>
          <div className="text-[10px] text-slate-500">
            ({pixDiscountPct}% de desconto)
          </div>

          {/* Linha 3: preço de venda + parcelamento */}
          <div className="pt-1.5">
            <span className="text-[14px] font-bold text-slate-900">
              {formatPrice(sellPrice)}
            </span>
            <div className="text-[10px] text-slate-500">
              em <strong className="font-semibold">{installments}x</strong> de{' '}
              {formatPrice(installmentValue)} sem juros
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}