// ─────────────────────────────────────────────────────────────────────────────
// Compõe um arquivo PNG final para download contendo:
//   • A imagem gerada pela IA
//   • Moldura editorial azul Paris (gradiente)
//   • Tag superior "SUA PROVA" + selo "IA"
//   • Watermark horizontal sutil
//   • Rodapé com logo + assinatura "Óticas Paris · Prova Virtual com IA"
//
// Tudo via Canvas 2D nativo — sem dependências extras.
// ─────────────────────────────────────────────────────────────────────────────
import { LOGO_INLINE_WHITE } from './parisLogoInline';

const COLORS = {
  primary: '#0F3E99',
  primaryDark: '#0A2D72',
  accent: '#0E71B8',
  pink: '#FAD9E1',
  white: '#FFFFFF',
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * @param {object} opts
 * @param {string} opts.imageUrl  URL da imagem gerada
 * @param {string} [opts.brand]   ex: "Ray-Ban"
 * @param {string} [opts.colorName]  ex: "Preto"
 * @returns {Promise<void>}  dispara o download diretamente
 */
export async function composeBrandedDownload({ imageUrl, brand, colorName }) {
  const [photo, logo] = await Promise.all([
    loadImage(imageUrl),
    loadImage(LOGO_INLINE_WHITE),
  ]);

  // Dimensões base — usa o tamanho real da foto, com bordas proporcionais
  const photoW = photo.naturalWidth;
  const photoH = photo.naturalHeight;
  const pad = Math.round(Math.max(photoW, photoH) * 0.045); // moldura
  const footerH = Math.round(photoH * 0.11); // rodapé editorial

  const canvasW = photoW + pad * 2;
  const canvasH = photoH + pad * 2 + footerH;

  const canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');

  // ── 1. Moldura: gradiente azul Paris ───────────────────────────────────────
  const grad = ctx.createLinearGradient(0, 0, canvasW, canvasH);
  grad.addColorStop(0, COLORS.primaryDark);
  grad.addColorStop(0.55, COLORS.primary);
  grad.addColorStop(1, COLORS.accent);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // ── 2. Imagem com cantos arredondados ──────────────────────────────────────
  const photoRadius = Math.round(pad * 0.6);
  ctx.save();
  roundedRect(ctx, pad, pad, photoW, photoH, photoRadius);
  ctx.clip();
  ctx.drawImage(photo, pad, pad, photoW, photoH);

  // ── 3. Watermark horizontal SUTIL sobre a foto (98% transparente) ─────────
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = COLORS.white;
  const wmFont = Math.round(photoH * 0.07);
  ctx.font = `900 ${wmFont}px "MuseoSans", "Avenir Next", Avenir, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const wmText = 'ÓTICAS PARIS';
  ctx.fillText(wmText, pad + photoW / 2, pad + photoH / 2);
  ctx.globalAlpha = 1;
  ctx.restore();

  // ── 4. Tag "SUA PROVA" — canto superior esquerdo ──────────────────────────
  const tagY = pad - Math.round(pad * 0.35);
  const tagH = Math.round(pad * 0.7);
  ctx.font = `900 ${Math.round(tagH * 0.42)}px "MuseoSans", sans-serif`;
  const tagText = 'SUA PROVA';
  const tagPadX = Math.round(tagH * 0.55);
  const tagTextW = ctx.measureText(tagText).width;
  const tagW = tagTextW + tagPadX * 2;
  const tagX = pad + Math.round(pad * 0.4);

  ctx.fillStyle = COLORS.white;
  roundedRect(ctx, tagX, tagY, tagW, tagH, tagH / 2);
  ctx.fill();

  ctx.fillStyle = COLORS.primary;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(tagText, tagX + tagW / 2, tagY + tagH / 2);

  // ── 5. Selo "✨ IA" — canto superior direito ───────────────────────────────
  const sealText = '✨ IA';
  ctx.font = `900 ${Math.round(tagH * 0.42)}px "MuseoSans", sans-serif`;
  const sealTextW = ctx.measureText(sealText).width;
  const sealW = sealTextW + tagPadX * 2;
  const sealX = pad + photoW - sealW - Math.round(pad * 0.4);

  ctx.fillStyle = COLORS.pink;
  roundedRect(ctx, sealX, tagY, sealW, tagH, tagH / 2);
  ctx.fill();

  ctx.fillStyle = COLORS.primary;
  ctx.fillText(sealText, sealX + sealW / 2, tagY + tagH / 2);

  // ── 6. Rodapé editorial: logo + assinatura ─────────────────────────────────
  const footerY = pad + photoH + pad;
  const footerCenterY = footerY + footerH / 2;

  // Logo (já em branco — wordmark inline) no rodapé
  const logoH = Math.round(footerH * 0.6);
  // SVGs sem largura definida podem retornar naturalWidth=0; usa proporção fixa do viewBox.
  const logoRatio =
    logo.naturalWidth && logo.naturalHeight
      ? logo.naturalWidth / logo.naturalHeight
      : 420 / 100;
  const logoW = logoH * logoRatio;
  const logoX = pad + Math.round(pad * 0.4);
  const logoY = footerCenterY - logoH / 2;
  ctx.drawImage(logo, logoX, logoY, logoW, logoH);

  // Divisor vertical
  const divX = logoX + logoW + Math.round(pad * 0.5);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(divX, footerCenterY - footerH * 0.28);
  ctx.lineTo(divX, footerCenterY + footerH * 0.28);
  ctx.stroke();

  // Texto editorial
  const textX = divX + Math.round(pad * 0.5);
  const titleSize = Math.round(footerH * 0.22);
  const subtitleSize = Math.round(footerH * 0.16);

  ctx.fillStyle = COLORS.white;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `900 ${titleSize}px "MuseoSans", sans-serif`;
  ctx.fillText('PROVA VIRTUAL', textX, footerCenterY - footerH * 0.04);

  ctx.fillStyle = 'rgba(250, 217, 225, 0.95)';
  ctx.font = `500 ${subtitleSize}px "MuseoSans", sans-serif`;
  const subtitle =
    brand && colorName
      ? `${brand} · ${colorName}`
      : 'Óticas Paris · Gerado com IA';
  ctx.fillText(subtitle, textX, footerCenterY + footerH * 0.22);

  // Carimbo direito: oticasparis.com.br
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = `700 ${Math.round(footerH * 0.13)}px "MuseoSans", sans-serif`;
  ctx.textAlign = 'right';
  ctx.fillText(
    'OTICASPARIS.COM.BR',
    canvasW - pad - Math.round(pad * 0.2),
    footerCenterY + footerH * 0.05
  );

  // ── 7. Trigger download ────────────────────────────────────────────────────
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Falha ao gerar imagem para download.'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const safeName = (brand || 'oticas-paris')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');
      link.download = `${safeName}-prova-virtual.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, 'image/png');
  });
}