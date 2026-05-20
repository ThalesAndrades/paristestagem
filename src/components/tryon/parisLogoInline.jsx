// ─────────────────────────────────────────────────────────────────────────────
// Logo Óticas Paris — versão wordmark inline (SVG embutido como data URI).
//
// Por que inline?
//   • Funciona no <canvas> sem problemas de CORS (o SVG externo da VTEX bloqueia
//     a renderização em canvas, quebrando o download brandizado).
//   • Carregamento síncrono — não depende de fetch externo, não falha em
//     ambientes offline/cache.
//   • Pode ser recolorida via parâmetro (branca para fundos escuros, azul para
//     fundos claros) sem precisar de filtros CSS.
//
// O wordmark replica a tipografia do logotipo oficial: "ÓTICAS" em peso black
// + "Paris" em itálico editorial (Playfair-like serif).
// ─────────────────────────────────────────────────────────────────────────────

function buildLogoSvg(color) {
  // ViewBox dimensionado para wordmark horizontal (proporção ~ 4.2:1)
  // Usa fontes web-safe genéricas (sans-serif / serif) para máxima compatibilidade
  // ao renderizar em <img> e em canvas.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 100" preserveAspectRatio="xMidYMid meet">
    <g fill="${color}">
      <text x="0" y="55"
        font-family="'Helvetica Neue', 'Arial Black', sans-serif"
        font-weight="900"
        font-size="52"
        letter-spacing="2"
        style="font-stretch:condensed">ÓTICAS</text>
      <text x="200" y="82"
        font-family="Georgia, 'Times New Roman', serif"
        font-style="italic"
        font-weight="700"
        font-size="58">Paris</text>
    </g>
  </svg>`;
}

function toDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Variante branca — para fundos escuros (overlay de geração, rodapé do download)
export const LOGO_INLINE_WHITE = toDataUri(buildLogoSvg('#FFFFFF'));

// Variante azul Paris — para fundos claros, se necessário
export const LOGO_INLINE_BLUE = toDataUri(buildLogoSvg('#0F3E99'));