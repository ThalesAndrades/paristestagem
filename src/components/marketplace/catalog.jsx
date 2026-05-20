// Catálogo de modelos do marketplace — imita o catálogo oficial Óticas Paris.
// Cada modelo possui variantes de cor e especificações técnicas reais.

export const CATALOG = [
  {
    id: 'prada-linea-rossa-a52s',
    name: 'Linea Rossa A52S/LR',
    brand: 'Prada',
    category: 'Masculino',
    price: 2890,
    installments: 10,
    rating: 4.9,
    reviews: 124,
    description:
      'Armação Prada Linea Rossa em acetato e metal, com design retangular e identidade esportiva sofisticada. Linha exclusiva inspirada no automobilismo, ideal para uso diário com elegância.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/195077-600-600?v=639083190128970000&width=600&height=600&aspect=true',
      },
      {
        id: 'prada-linea-rossa-a52s-gunmetal',
        colorName: 'Grafite',
        swatch: 'linear-gradient(135deg, #4a4a4a, #2a2a2a)',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/195077-600-600?v=639083190128970000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'rayban-3929',
    name: 'RB 3929 001/8H',
    brand: 'Ray-Ban',
    category: 'Unissex',
    price: 1490,
    installments: 10,
    rating: 4.8,
    reviews: 312,
    description:
      'Ray-Ban Aviator clássico em metal dourado, com lentes leves e haste anatômica. Um ícone atemporal que combina com qualquer estilo.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/196222-600-600?v=639107374505200000&width=600&height=600&aspect=true',
      },
      {
        id: 'rayban-3929-silver',
        colorName: 'Prata',
        swatch: 'linear-gradient(135deg, #d8d8d8, #a0a0a0)',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/196222-600-600?v=639107374505200000&width=600&height=600&aspect=true',
      },
      {
        id: 'rayban-3929-black',
        colorName: 'Preto',
        swatch: '#0d0d0d',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/196222-600-600?v=639107374505200000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'miu-miu-a56s',
    name: 'A56S 5AK20I',
    brand: 'Miu Miu',
    category: 'Feminino',
    price: 2390,
    installments: 10,
    rating: 4.9,
    reviews: 89,
    description:
      'Miu Miu em acetato premium com formato cat-eye delicado. Sofisticação italiana e elegância feminina em um modelo versátil.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/196465-600-600?v=639111044116370000&width=600&height=600&aspect=true',
      },
      {
        id: 'miu-miu-a56s-black',
        colorName: 'Preto',
        swatch: '#111',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/196465-600-600?v=639111044116370000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'rayban-3774d',
    name: 'RB 3774D 001/87',
    brand: 'Ray-Ban',
    category: 'Unissex',
    price: 1390,
    installments: 10,
    rating: 4.7,
    reviews: 201,
    description:
      'Ray-Ban com formato hexagonal moderno em metal leve. Estilo descontraído e diferenciado para quem busca um visual fora do convencional.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/195744-600-600?v=639098899075830000&width=600&height=600&aspect=true',
      },
      {
        id: 'rayban-3774d-gold',
        colorName: 'Dourado',
        swatch: 'linear-gradient(135deg, #e0b558, #b8862a)',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/195744-600-600?v=639098899075830000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'prada-d06s',
    name: 'D06S 27I20W',
    brand: 'Prada',
    category: 'Feminino',
    price: 2790,
    installments: 10,
    rating: 4.9,
    reviews: 76,
    description:
      'Prada feminino em acetato havana com design quadrado clássico. Refinamento italiano que combina com produções dia a dia e looks de gala.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/194971-600-600?v=639080767914230000&width=600&height=600&aspect=true',
      },
      {
        id: 'prada-d06s-black',
        colorName: 'Preto',
        swatch: '#111',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/194971-600-600?v=639080767914230000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'ermenegildo-zegna-0281',
    name: '0281 45E',
    brand: 'Ermenegildo Zegna',
    category: 'Masculino',
    price: 3190,
    installments: 10,
    rating: 4.8,
    reviews: 54,
    description:
      'Ermenegildo Zegna em combinação de acetato e metal, com formato retangular masculino. Alfaiataria italiana em forma de armação.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/194919-600-600?v=639077201531470000&width=600&height=600&aspect=true',
      },
      {
        id: 'ermenegildo-zegna-0281-black',
        colorName: 'Preto',
        swatch: '#0d0d0d',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/194919-600-600?v=639077201531470000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'prada-15ws',
    name: '15WS 01R0A6',
    brand: 'Prada',
    category: 'Unissex',
    price: 2590,
    installments: 10,
    rating: 4.7,
    reviews: 41,
    description:
      'Prada geométrico em acetato premium. Linhas marcantes e construção robusta para um visual contemporâneo e expressivo.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/195859-600-600?v=639099737806100000&width=600&height=600&aspect=true',
      },
      {
        id: 'prada-15ws-crystal',
        colorName: 'Cristal',
        swatch: 'linear-gradient(135deg, #e8eef5, #c0c8d0)',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/195859-600-600?v=639099737806100000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'zev-negroni',
    name: 'Negroni Preto LCD',
    brand: 'Zev',
    category: 'Unissex',
    price: 690,
    installments: 6,
    rating: 4.6,
    reviews: 158,
    description:
      'Zev Negroni em acetato preto LCD com design redondo. Estilo retrô-moderno com preço acessível e qualidade brasileira.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/191353-600-600?v=638936267831170000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'zev-lolita',
    name: 'Lolita 01',
    brand: 'Zev',
    category: 'Feminino',
    price: 750,
    installments: 6,
    rating: 4.7,
    reviews: 92,
    description:
      'Zev Lolita em acetato vermelho com formato cat-eye marcante. Para mulheres que querem destaque e personalidade no olhar.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/196336-600-600?v=639107493423930000&width=600&height=600&aspect=true',
      },
      {
        id: 'zev-lolita-tortoise',
        colorName: 'Tartaruga',
        swatch: 'linear-gradient(135deg, #7a4118, #2e1808)',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/196336-600-600?v=639107493423930000&width=600&height=600&aspect=true',
      },
    ],
  },
  {
    id: 'vogue-4339s',
    name: '4339S 280/87',
    brand: 'Vogue',
    category: 'Feminino',
    price: 890,
    installments: 8,
    rating: 4.6,
    reviews: 134,
    description:
      'Vogue aviador feminino em metal dourado. Modelo leve, sofisticado e atemporal para o dia a dia.',
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
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/191691-600-600?v=638944958089530000&width=600&height=600&aspect=true',
      },
      {
        id: 'vogue-4339s-rose',
        colorName: 'Rosé',
        swatch: 'linear-gradient(135deg, #e8b5a8, #b87868)',
        image:
          'https://tfcqdl.vtexassets.com/arquivos/ids/191691-600-600?v=638944958089530000&width=600&height=600&aspect=true',
      },
    ],
  },
];

export function getProductById(id) {
  return CATALOG.find((p) => p.id === id);
}

export function formatPrice(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

/**
 * Regras de preço idênticas ao site oficial VTEX (Óticas Paris):
 *  - listPrice  = preço cheio (price)
 *  - sellPrice  = -15% sobre o cheio (preço de venda padrão)
 *  - pixPrice   = -19% sobre o cheio (preço no PIX)
 *  - 10x sem juros sobre o sellPrice
 */
export function getVtexPricing(product) {
  const listPrice = product.price;
  const sellPrice = listPrice * 0.85;            // -15%
  const pixPrice = listPrice * 0.81;             // -19%
  const installments = product.installments || 10;
  const installmentValue = sellPrice / installments;
  return {
    listPrice,
    sellPrice,
    pixPrice,
    installments,
    installmentValue,
    discountPct: 15,
    pixDiscountPct: 19,
  };
}