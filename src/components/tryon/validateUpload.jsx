// ─────────────────────────────────────────────────────────────────────────────
// Validação de upload em 3 camadas para o Provador Virtual Paris:
//   1. Sanitização técnica (anti-injeção): MIME real via magic numbers,
//      tamanho, extensão, nome de arquivo.
//   2. Moderação de conteúdo (NSFW / +18 / violência / off-topic) via IA.
//   3. Validação de nicho (rosto humano vs. óculos), garantindo que cada
//      slot receba o tipo correto de imagem.
// ─────────────────────────────────────────────────────────────────────────────
import { base44 } from '@/api/base44Client';

const ALLOWED_MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_BYTES = 12 * 1024 * 1024; // 12 MB
const DANGEROUS_EXTENSIONS = [
  '.svg', '.html', '.htm', '.js', '.mjs', '.ts', '.css',
  '.exe', '.bat', '.sh', '.php', '.py', '.jsp', '.asp',
  '.xml', '.swf', '.jar',
];

// Magic numbers (assinatura binária real do arquivo)
function detectRealMime(buffer) {
  const bytes = new Uint8Array(buffer);
  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return 'image/jpeg';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e &&
    bytes[3] === 0x47 && bytes[4] === 0x0d && bytes[5] === 0x0a
  ) {
    return 'image/png';
  }
  // WEBP: 52 49 46 46 ?? ?? ?? ?? 57 45 42 50
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 &&
    bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x45 &&
    bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return 'image/webp';
  }
  return null;
}

function readHeader(file, byteCount = 16) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file.slice(0, byteCount));
  });
}

// ── CAMADA 1 — Validação técnica (anti-injeção) ───────────────────────────────
export async function technicalValidate(file) {
  if (!file) {
    return { ok: false, reason: 'Nenhum arquivo selecionado.' };
  }
  if (file.size === 0) {
    return { ok: false, reason: 'O arquivo está vazio.' };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, reason: 'Imagem muito grande (máximo 12 MB).' };
  }
  const lowerName = (file.name || '').toLowerCase();
  if (DANGEROUS_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
    return {
      ok: false,
      reason: 'Tipo de arquivo não permitido. Envie apenas imagens JPG, PNG ou WEBP.',
    };
  }
  if (!ALLOWED_MIME.includes(file.type)) {
    return {
      ok: false,
      reason: 'Formato não suportado. Envie uma foto em JPG, PNG ou WEBP.',
    };
  }
  // Confirma assinatura binária real (impede arquivo .js renomeado para .jpg)
  const header = await readHeader(file);
  const realMime = detectRealMime(header);
  if (!realMime) {
    return {
      ok: false,
      reason: 'Esse arquivo não é uma imagem válida. Envie um JPG, PNG ou WEBP real.',
    };
  }
  return { ok: true, realMime };
}

// ── CAMADA 2 + 3 — Moderação de conteúdo + validação de nicho ─────────────────
// kind: 'person' → exige rosto humano apropriado
// kind: 'glasses' → exige foto de óculos/eyewear
export async function contentValidate(fileUrl, kind) {
  const isPerson = kind === 'person';

  const prompt = isPerson
    ? `You are a strict content moderator and computer vision classifier for an eyewear virtual try-on platform.

Analyze the image and classify it across these dimensions:

1. is_safe: true ONLY if the image is fully safe-for-work — no nudity, no sexual content, no underwear/lingerie/swimwear close-ups, no violence, no gore, no weapons, no drugs, no offensive symbols, no minors in inappropriate context, no explicit text.

2. has_human_face: true if there is at least ONE clearly visible HUMAN face (eyes, nose, mouth identifiable). False for: cartoons, anime, drawings, statues, mannequins, animals, masks, heavily obscured faces.

3. face_usable_for_tryon: true if the face is suitable for a virtual eyewear try-on (mostly front-facing or 3/4 view, eyes visible or eye area visible, not extreme profile, not heavily occluded by hands/objects).

4. niche_match: true if this image is appropriate for the "your selfie" slot of an eyewear try-on — i.e. a real photo of a real person's face/upper body.

5. rejection_reason: short Portuguese (Brazil) sentence explaining the issue if any of the above is false. Empty string if everything is ok.`
    : `You are a strict content moderator and computer vision classifier for an eyewear virtual try-on platform.

Analyze the image and classify it across these dimensions:

1. is_safe: true ONLY if the image is fully safe-for-work — no nudity, no sexual content, no violence, no weapons, no drugs, no offensive symbols, no explicit text.

2. is_eyewear_product: true if the image clearly shows ONE pair of eyewear (eyeglasses / sunglasses / optical frames). The frames must be the main subject of the image. False for: faces wearing glasses (that's a person photo, not a product photo), other accessories (watches, jewelry, hats), unrelated products, generic objects.

3. eyewear_usable_for_tryon: true if the product photo is clear enough for try-on — frames visible from the front or near-front, not heavily folded, not blurry, not tiny in the frame.

4. niche_match: true if this image is appropriate for the "glasses to try on" slot — a real product photo of eyewear on a neutral or simple background, or a catalog shot.

5. rejection_reason: short Portuguese (Brazil) sentence explaining the issue if any of the above is false. Empty string if everything is ok.`;

  const schema = {
    type: 'object',
    properties: {
      is_safe: { type: 'boolean' },
      ...(isPerson
        ? {
            has_human_face: { type: 'boolean' },
            face_usable_for_tryon: { type: 'boolean' },
          }
        : {
            is_eyewear_product: { type: 'boolean' },
            eyewear_usable_for_tryon: { type: 'boolean' },
          }),
      niche_match: { type: 'boolean' },
      rejection_reason: { type: 'string' },
    },
    required: ['is_safe', 'niche_match', 'rejection_reason'],
  };

  const result = /** @type {{
    is_safe?: boolean;
    has_human_face?: boolean;
    face_usable_for_tryon?: boolean;
    is_eyewear_product?: boolean;
    eyewear_usable_for_tryon?: boolean;
    niche_match?: boolean;
    rejection_reason?: string;
  }} */ (
    await base44.integrations.Core.InvokeLLM({
      prompt,
      file_urls: [fileUrl],
      response_json_schema: schema,
    })
  );

  // Política de bloqueio em ordem (a mais grave primeiro)
  if (!result.is_safe) {
    return {
      ok: false,
      reason:
        result.rejection_reason ||
        'Conteúdo impróprio detectado. Envie apenas fotos apropriadas para um provador de óculos.',
    };
  }

  if (isPerson) {
    if (!result.has_human_face) {
      return {
        ok: false,
        reason:
          result.rejection_reason ||
          'Não conseguimos identificar um rosto humano nesta foto. Envie uma selfie com o rosto visível.',
      };
    }
    if (!result.face_usable_for_tryon) {
      return {
        ok: false,
        reason:
          result.rejection_reason ||
          'O rosto está pouco visível ou em ângulo difícil. Tente uma foto de frente, com os olhos visíveis.',
      };
    }
  } else {
    if (!result.is_eyewear_product) {
      return {
        ok: false,
        reason:
          result.rejection_reason ||
          'Esta imagem não parece ser de um óculos. Envie a foto do modelo (armação ou óculos de sol) que deseja experimentar.',
      };
    }
    if (!result.eyewear_usable_for_tryon) {
      return {
        ok: false,
        reason:
          result.rejection_reason ||
          'A foto do óculos está pouco clara. Tente uma imagem frontal e nítida do modelo.',
      };
    }
  }

  if (!result.niche_match) {
    return {
      ok: false,
      reason:
        result.rejection_reason ||
        'Imagem fora do contexto do provador virtual de óculos.',
    };
  }

  return { ok: true };
}