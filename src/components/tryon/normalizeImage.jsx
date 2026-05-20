/**
 * Normaliza uma imagem do usuário:
 * - Aplica a orientação EXIF corretamente (corrige fotos rotacionadas em 90°/180°/270°
 *   tiradas no iPhone/Android que vêm com flag de orientação)
 * - Re-encoda como JPEG limpo (sem metadados EXIF), garantindo que o backend/IA
 *   receba a imagem já na posição visual correta
 * - Redimensiona se for muito grande (max 2048px no maior lado) preservando qualidade
 *
 * Retorna um novo File pronto para upload.
 */
export async function normalizeImageOrientation(file) {
  // Usa createImageBitmap com imageOrientation: 'from-image' — já aplica EXIF nativamente
  // (suportado em Chrome, Safari 16+, Firefox)
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    // Fallback simples: sem correção, mas ainda re-encoda
    bitmap = await createImageBitmap(file);
  }

  const MAX_SIDE = 2048;
  let { width, height } = bitmap;
  const scale = Math.min(1, MAX_SIDE / Math.max(width, height));
  width = Math.round(width * scale);
  height = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', 0.92)
  );

  return new File([blob], 'photo.jpg', { type: 'image/jpeg' });
}