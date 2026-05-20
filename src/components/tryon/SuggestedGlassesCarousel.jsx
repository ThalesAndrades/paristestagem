import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import GlassesVariantSelector from './GlassesVariantSelector';

// Modelos reais coletados do site oficial Óticas Paris (oticasparis.com.br)
// Cada modelo possui variantes de cor/textura. O swatch representa a tonalidade
// da armação para visualização rápida pelo usuário.
const SUGGESTED_GLASSES = [
  {
    id: 'prada-linea-rossa-a52s',
    name: 'Linea Rossa A52S/LR',
    brand: 'Prada',
    specs: {
      material: 'Acetato e metal',
      shape: 'Retangular',
      gender: 'Masculino',
      bridge: '18 mm',
      lens: '56 mm',
      temple: '145 mm',
    },
    variants: [
      {
        id: 'prada-linea-rossa-a52s-black',
        colorName: 'Preto Fosco',
        swatch: '#1a1a1a',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/195077-600-600?v=639083190128970000&width=600&height=600&aspect=true',
      },
      {
        id: 'prada-linea-rossa-a52s-gunmetal',
        colorName: 'Grafite',
        swatch: 'linear-gradient(135deg, #4a4a4a, #2a2a2a)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/195077-600-600?v=639083190128970000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'rayban-3929',
    name: 'RB 3929 001/8H',
    brand: 'Ray-Ban',
    specs: {
      material: 'Metal',
      shape: 'Aviador',
      gender: 'Unissex',
      bridge: '14 mm',
      lens: '58 mm',
      temple: '140 mm',
    },
    variants: [
      {
        id: 'rayban-3929-gold',
        colorName: 'Dourado',
        swatch: 'linear-gradient(135deg, #d4a857, #b8862a)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/196222-600-600?v=639107374505200000&width=600&height=600&aspect=true',
      },
      {
        id: 'rayban-3929-silver',
        colorName: 'Prata',
        swatch: 'linear-gradient(135deg, #d8d8d8, #a0a0a0)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/196222-600-600?v=639107374505200000&width=600&height=600&aspect=true',
      },
      {
        id: 'rayban-3929-black',
        colorName: 'Preto',
        swatch: '#0d0d0d',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/196222-600-600?v=639107374505200000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'miu-miu-a56s',
    name: 'A56S 5AK20I',
    brand: 'Miu Miu',
    specs: {
      material: 'Acetato',
      shape: 'Cat-eye',
      gender: 'Feminino',
      bridge: '17 mm',
      lens: '54 mm',
      temple: '140 mm',
    },
    variants: [
      {
        id: 'miu-miu-a56s-tortoise',
        colorName: 'Tartaruga',
        swatch: 'linear-gradient(135deg, #6b3410, #2a1a08)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/196465-600-600?v=639111044116370000&width=600&height=600&aspect=true',
      },
      {
        id: 'miu-miu-a56s-black',
        colorName: 'Preto',
        swatch: '#111',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/196465-600-600?v=639111044116370000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'rayban-3774d',
    name: 'RB 3774D 001/87',
    brand: 'Ray-Ban',
    specs: {
      material: 'Metal',
      shape: 'Hexagonal',
      gender: 'Unissex',
      bridge: '16 mm',
      lens: '57 mm',
      temple: '145 mm',
    },
    variants: [
      {
        id: 'rayban-3774d-black',
        colorName: 'Preto',
        swatch: '#0d0d0d',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/195744-600-600?v=639098899075830000&width=600&height=600&aspect=true',
      },
      {
        id: 'rayban-3774d-gold',
        colorName: 'Dourado',
        swatch: 'linear-gradient(135deg, #e0b558, #b8862a)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/195744-600-600?v=639098899075830000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'prada-d06s',
    name: 'D06S 27I20W',
    brand: 'Prada',
    specs: {
      material: 'Acetato',
      shape: 'Quadrado',
      gender: 'Feminino',
      bridge: '17 mm',
      lens: '53 mm',
      temple: '140 mm',
    },
    variants: [
      {
        id: 'prada-d06s-havana',
        colorName: 'Havana',
        swatch: 'linear-gradient(135deg, #8b4a1f, #3a1d08)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/194971-600-600?v=639080767914230000&width=600&height=600&aspect=true',
      },
      {
        id: 'prada-d06s-black',
        colorName: 'Preto',
        swatch: '#111',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/194971-600-600?v=639080767914230000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'ermenegildo-zegna-0281',
    name: '0281 45E',
    brand: 'Ermenegildo Zegna',
    specs: {
      material: 'Acetato e metal',
      shape: 'Retangular',
      gender: 'Masculino',
      bridge: '17 mm',
      lens: '55 mm',
      temple: '145 mm',
    },
    variants: [
      {
        id: 'ermenegildo-zegna-0281-brown',
        colorName: 'Marrom',
        swatch: 'linear-gradient(135deg, #5a3920, #2e1c10)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/194919-600-600?v=639077201531470000&width=600&height=600&aspect=true',
      },
      {
        id: 'ermenegildo-zegna-0281-black',
        colorName: 'Preto',
        swatch: '#0d0d0d',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/194919-600-600?v=639077201531470000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'prada-15ws',
    name: '15WS 01R0A6',
    brand: 'Prada',
    specs: {
      material: 'Acetato',
      shape: 'Geométrico',
      gender: 'Unissex',
      bridge: '18 mm',
      lens: '54 mm',
      temple: '145 mm',
    },
    variants: [
      {
        id: 'prada-15ws-black',
        colorName: 'Preto',
        swatch: '#0d0d0d',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/195859-600-600?v=639099737806100000&width=600&height=600&aspect=true',
      },
      {
        id: 'prada-15ws-crystal',
        colorName: 'Cristal',
        swatch: 'linear-gradient(135deg, #e8eef5, #c0c8d0)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/195859-600-600?v=639099737806100000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'zev-negroni',
    name: 'Negroni Preto LCD',
    brand: 'Zev',
    specs: {
      material: 'Acetato',
      shape: 'Redondo',
      gender: 'Unissex',
      bridge: '20 mm',
      lens: '49 mm',
      temple: '145 mm',
    },
    variants: [
      {
        id: 'zev-negroni-black',
        colorName: 'Preto LCD',
        swatch: '#0a0a0a',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/191353-600-600?v=638936267831170000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'zev-lolita',
    name: 'Lolita 01',
    brand: 'Zev',
    specs: {
      material: 'Acetato',
      shape: 'Cat-eye',
      gender: 'Feminino',
      bridge: '16 mm',
      lens: '52 mm',
      temple: '140 mm',
    },
    variants: [
      {
        id: 'zev-lolita-01',
        colorName: 'Vermelho',
        swatch: '#9a1818',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/196336-600-600?v=639107493423930000&width=600&height=600&aspect=true',
      },
      {
        id: 'zev-lolita-tortoise',
        colorName: 'Tartaruga',
        swatch: 'linear-gradient(135deg, #7a4118, #2e1808)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/196336-600-600?v=639107493423930000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'vogue-4339s',
    name: '4339S 280/87',
    brand: 'Vogue',
    specs: {
      material: 'Metal',
      shape: 'Aviador',
      gender: 'Feminino',
      bridge: '14 mm',
      lens: '55 mm',
      temple: '140 mm',
    },
    variants: [
      {
        id: 'vogue-4339s-gold',
        colorName: 'Dourado',
        swatch: 'linear-gradient(135deg, #e0b558, #b8862a)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/191691-600-600?v=638944958089530000&width=600&height=600&aspect=true',
      },
      {
        id: 'vogue-4339s-rose',
        colorName: 'Rosé',
        swatch: 'linear-gradient(135deg, #e8b5a8, #b87868)',
        image: 'https://tfcqdl.vtexassets.com/arquivos/ids/191691-600-600?v=638944958089530000&width=600&height=600&aspect=true',
      },
    ],
  },
];

export default function SuggestedGlassesCarousel({ onSelect, selectedId, disabled }) {
  const scrollRef = useRef(null);
  // Track active variant per model id (defaults to first variant when not set)
  const [activeVariants, setActiveVariants] = useState({});

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const getActiveVariant = (model) => {
    const id = activeVariants[model.id];
    return model.variants.find((v) => v.id === id) || model.variants[0];
  };

  const handleSelectModel = (model) => {
    if (disabled) return;
    const variant = getActiveVariant(model);
    onSelect({
      id: model.id,
      name: `${model.name} — ${variant.colorName}`,
      brand: model.brand,
      image: variant.image,
      variantId: variant.id,
      colorName: variant.colorName,
      specs: model.specs,
    });
  };

  const handleSelectVariant = (model, variant) => {
    if (disabled) return;
    setActiveVariants((prev) => ({ ...prev, [model.id]: variant.id }));
    // If this model is currently selected, propagate the variant change upstream
    if (selectedId === model.id) {
      onSelect({
        id: model.id,
        name: `${model.name} — ${variant.colorName}`,
        brand: model.brand,
        image: variant.image,
        variantId: variant.id,
        colorName: variant.colorName,
        specs: model.specs,
      });
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E30613]" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
            Sugestões Paris
          </h3>
        </div>
        <div className="hidden sm:flex gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-[#E30613] hover:text-[#E30613] flex items-center justify-center transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-[#E30613] hover:text-[#E30613] flex items-center justify-center transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide items-start"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SUGGESTED_GLASSES.map((g) => {
          const isSelected = selectedId === g.id;
          const activeVariant = getActiveVariant(g);
          return (
            <motion.div
              key={g.id}
              whileHover={!disabled ? { y: -3 } : {}}
              className={`
                flex-shrink-0 snap-start w-32 sm:w-36 rounded-xl overflow-hidden bg-white
                border-2 transition-all text-left
                ${isSelected ? 'border-[#E30613] shadow-lg' : 'border-slate-200 hover:border-slate-300'}
                ${disabled ? 'opacity-50' : ''}
              `}
            >
              <button
                onClick={() => handleSelectModel(g)}
                disabled={disabled}
                className={`w-full text-left ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="aspect-square bg-slate-50 overflow-hidden relative">
                  <img
                    src={activeVariant.image}
                    alt={`${g.name} ${activeVariant.colorName}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-[#E30613] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Em uso
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider truncate">
                    {g.brand}
                  </p>
                  <p className="text-xs font-bold text-slate-900 truncate">{g.name}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {activeVariant.colorName}
                  </p>
                </div>
              </button>

              <GlassesVariantSelector
                variants={g.variants}
                activeVariantId={activeVariant.id}
                onSelect={(v) => handleSelectVariant(g, v)}
                disabled={disabled}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}