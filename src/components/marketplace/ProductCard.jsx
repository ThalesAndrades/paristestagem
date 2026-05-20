import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star } from 'lucide-react';
import { formatPrice } from './catalog';

export default function ProductCard({ product }) {
  const variant = product.variants[0];

  return (
    <Link to={`/produto/${product.id}`} className="block group">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all"
      >
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
          <img
            src={variant.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* AI badge */}
          <div className="absolute top-2 left-2 bg-[#E30613] text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            Provar c/ IA
          </div>
          {/* Variant count */}
          {product.variants.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {product.variants.length} cores
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-sm font-bold text-slate-900 truncate mt-0.5">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] text-slate-500">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="mt-2">
            <p className="text-base font-black text-slate-900">
              {formatPrice(product.price)}
            </p>
            <p className="text-[10px] text-slate-500">
              ou {product.installments}x de{' '}
              {formatPrice(product.price / product.installments)}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}