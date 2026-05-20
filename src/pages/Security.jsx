import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  FileSearch,
  Eye,
  Brain,
  KeyRound,
  Gauge,
  Globe,
  Image as ImageIcon,
  ScrollText,
  AlertOctagon,
  ShieldCheck,
  ServerCog,
  UserCheck,
  Bug,
  Sparkles,
} from 'lucide-react';
import AccessCodeGate from '@/components/tryon/AccessCodeGate';
import ParisHeader from '@/components/tryon/ParisHeader';
import ParisFooter from '@/components/tryon/ParisFooter';
import SecurityLayerCard from '@/components/security/SecurityLayerCard';

export default function Security() {
  const layers = useMemo(
    () => [
      // ── ENTRADA ───────────────────────────────────────────────────────────
      {
        icon: Lock,
        title: 'Gate de Acesso por Código',
        where: 'Frontend · Entrada',
        description:
          'O provador só renderiza após validação de código de 6 dígitos persistido em sessionStorage. Impede acesso direto via URL pública antes da liberação interna.',
        tools: ['React', 'sessionStorage', 'AccessCodeGate'],
      },
      {
        icon: UserCheck,
        title: 'Autenticação obrigatória no backend',
        where: 'Backend · Borda',
        description:
          'Toda chamada a generateTryOn exige usuário autenticado via base44.auth.me(). Requisições anônimas são rejeitadas com 401 e auditadas.',
        tools: ['Base44 Auth SDK', 'Deno Serve'],
      },
      {
        icon: Gauge,
        title: 'Rate-limit por IP + usuário',
        where: 'Backend · Borda',
        description:
          'Janela deslizante de 60s com no máximo 6 gerações por chave (email + hash de IP). Protege contra automação, scraping de prompt e estouro de custo.',
        tools: ['Token Bucket in-memory', 'crypto.subtle (SHA-256)'],
      },

      // ── VALIDAÇÃO DE ARQUIVO ──────────────────────────────────────────────
      {
        icon: FileSearch,
        title: 'Sanitização técnica do upload',
        where: 'Frontend · Camada 1',
        description:
          'Antes do upload validamos tamanho (máx 12MB), extensão permitida e MIME real lendo os "magic numbers" do binário — impede arquivo executável renomeado para .jpg.',
        tools: ['FileReader API', 'Magic-numbers (JPEG/PNG/WEBP)', 'Blacklist de extensões'],
      },
      {
        icon: ImageIcon,
        title: 'Normalização de orientação e EXIF',
        where: 'Frontend · Camada 1',
        description:
          'Imagens passam por createImageBitmap → Canvas → re-encode em JPEG limpo. Remove metadados EXIF (GPS, modelo de câmera) e elimina vetores de prompt-injection via metadata.',
        tools: ['createImageBitmap', 'HTML5 Canvas', 'normalizeImageOrientation'],
      },
      {
        icon: Eye,
        title: 'Moderação NSFW e fora-de-nicho',
        where: 'Frontend · Camada 2',
        description:
          'InvokeLLM com schema JSON estrito classifica a imagem em is_safe, has_human_face, niche_match e usable_for_tryon. Bloqueia nudez, violência, menores em contexto impróprio e fotos fora do escopo.',
        tools: ['Base44 InvokeLLM', 'JSON Schema validation', 'Vision moderation'],
      },
      {
        icon: Brain,
        title: 'Classificador de slot (pessoa vs. óculos)',
        where: 'Frontend · Camada 3',
        description:
          'A mesma IA confirma que o slot 1 é selfie de pessoa real e o slot 2 é produto de eyewear — não estátua, mascote, mannequin ou imagem genérica.',
        tools: ['Base44 InvokeLLM', 'Computer Vision classifier'],
      },

      // ── REDE / BACKEND ────────────────────────────────────────────────────
      {
        icon: Globe,
        title: 'Allow-list de hosts (anti-SSRF)',
        where: 'Backend · Rede',
        description:
          'URLs de imagem só são aceitas se forem HTTPS de domínios base44.* confiáveis. Impede que um atacante peça à IA para baixar imagens de redes internas, metadados de nuvem ou arquivos locais.',
        tools: ['URL parser nativo', 'Allow-list explícita'],
      },
      {
        icon: ImageIcon,
        title: 'HEAD probe de Content-Type',
        where: 'Backend · Rede',
        description:
          'Antes de enviar à IA, fazemos HEAD nas duas URLs e exigimos Content-Type image/(jpeg|png|webp). Bloqueia URLs que mudam de conteúdo entre verificação e download (TOCTOU básico).',
        tools: ['fetch HEAD', 'Content-Type assertion'],
      },

      // ── PROMPT / MODELO ───────────────────────────────────────────────────
      {
        icon: ShieldCheck,
        title: 'Prompt blindado contra injeção',
        where: 'Backend · IA',
        description:
          'O system primer instrui o modelo a tratar as imagens como DADOS e ignorar qualquer texto embutido (camisetas, placas, EXIF, watermarks). O prompt é constante no servidor — o cliente nunca passa instruções, apenas URLs.',
        tools: ['Server-side fixed prompt', 'Prompt-injection hardening'],
      },
      {
        icon: Sparkles,
        title: 'Política de uso da IA generativa',
        where: 'Backend · IA',
        description:
          'O FIXED_PROMPT proíbe explicitamente alteração de identidade, idade, etnia, corpo ou roupas. Garante que a IA atue como compositor forense — apenas enxerta os óculos, nunca reinventa a pessoa.',
        tools: ['Base44 GenerateImage', 'Forensic compositing policy'],
      },
      {
        icon: KeyRound,
        title: 'Princípio de menor privilégio',
        where: 'Backend · IA',
        description:
          'GenerateImage roda com asServiceRole apenas para chamar o gerador. Nenhum dado da entidade User ou de outros usuários é acessado durante a geração.',
        tools: ['Base44 asServiceRole', 'Scoped service role'],
      },

      // ── OBSERVABILIDADE ───────────────────────────────────────────────────
      {
        icon: ScrollText,
        title: 'Auditoria forense de cada evento',
        where: 'Backend · Observabilidade',
        description:
          'Cada sucesso, falha ou bloqueio gera um registro em TryOnAuditLog com tipo do evento, email, hash de IP, user-agent, URLs e duração. Permite investigar abuso sem armazenar PII bruta.',
        tools: ['Entity TryOnAuditLog', 'SHA-256 IP hashing'],
      },
      {
        icon: AlertOctagon,
        title: 'Erros opacos para o cliente',
        where: 'Backend · Resposta',
        description:
          'Stack traces e mensagens internas nunca chegam ao frontend — apenas mensagens humanas e códigos HTTP. Os detalhes técnicos vivem só no log de auditoria, acessível aos admins.',
        tools: ['Response shaping', 'Error redaction'],
      },

      // ── INFRA ─────────────────────────────────────────────────────────────
      {
        icon: ServerCog,
        title: 'Runtime isolado (Deno)',
        where: 'Infra · Plataforma',
        description:
          'Funções rodam em sandbox Deno com permissões mínimas, importações com versão pinada (npm:@base44/sdk@0.8.25) e sem acesso a sistema de arquivos persistente.',
        tools: ['Deno runtime', 'Pinned npm imports', 'Sandbox de execução'],
      },
      {
        icon: Bug,
        title: 'Watermark + assinatura visual',
        where: 'Output · Pós-processo',
        description:
          'Toda imagem gerada é re-renderizada no canvas do navegador com logo, faixa diagonal e selo "PROVA VIRTUAL · IA". Comunica que é uma simulação e dificulta uso fraudulento.',
        tools: ['composeBrandedDownload', 'WatermarkOverlay', 'Canvas 2D'],
      },
    ],
    [],
  );

  return (
    <AccessCodeGate>
      <div className="min-h-screen bg-white flex flex-col">
        <ParisHeader />

        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 via-white to-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-[0.05] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20 relative">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
                  <Shield className="w-3.5 h-3.5" />
                  Segurança · IA · Auditoria
                </div>

                <h1 className="leading-[0.95] mb-5">
                  <span className="block text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight uppercase">
                    Como protegemos
                  </span>
                  <span className="block font-editorial text-5xl sm:text-6xl md:text-7xl paris-red-text font-bold leading-none mt-1">
                    o provador
                  </span>
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  Mapa interno das políticas e ferramentas que protegem o workflow
                  de IA do Provador Virtual — da foto da cliente até a imagem final
                  gerada e baixada.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 justify-center text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    {layers.length} camadas ativas
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ScrollText className="w-3.5 h-3.5 text-primary" />
                    Auditoria forense em tempo real
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    Compatível com LGPD
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CAMADAS */}
          <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
            <div className="mb-8 sm:mb-10 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
                Defense in depth
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight uppercase">
                Camadas de{' '}
                <span className="font-editorial italic font-bold normal-case paris-red-text">
                  proteção
                </span>
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
                Cada camada bloqueia uma classe diferente de risco. Nenhuma
                depende sozinha — todas operam em série.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {layers.map((layer, idx) => (
                <SecurityLayerCard key={layer.title} index={idx + 1} {...layer} />
              ))}
            </div>
          </section>

          {/* FLUXO DO PEDIDO */}
          <section className="bg-secondary/20 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
                  Pipeline
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight uppercase">
                  Caminho de uma{' '}
                  <span className="font-editorial italic font-bold normal-case paris-red-text">
                    prova
                  </span>
                </h2>
              </div>

              <ol className="space-y-3">
                {[
                  ['Cliente envia foto', 'Gate de acesso, normalização EXIF e MIME check no navegador.'],
                  ['Moderação visual', 'IA classifica safety + nicho + utilidade para try-on.'],
                  ['Upload para storage Base44', 'Arquivo limpo recebe URL HTTPS assinada.'],
                  ['Chamada autenticada a generateTryOn', 'Backend valida sessão, rate-limit, payload e allow-list de host.'],
                  ['HEAD probe + Content-Type', 'Servidor confirma que as URLs respondem como imagem.'],
                  ['IA generativa com prompt blindado', 'Compositor forense recebe as imagens como DADOS, nunca como instrução.'],
                  ['Auditoria forense', 'Evento registrado em TryOnAuditLog (sucesso, falha ou bloqueio).'],
                  ['Watermark + download', 'Imagem final é re-renderizada com selo Óticas Paris antes do download.'],
                ].map(([title, desc], i) => (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="flex gap-3 sm:gap-4 bg-white border border-border rounded-xl p-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-black text-xs flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground leading-tight">
                        {title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </section>

          {/* RODAPÉ DE COMPROMISSO */}
          <section className="max-w-3xl mx-auto px-4 py-12 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nenhuma foto enviada é usada para treino de IA. Logs de auditoria
              armazenam apenas hash de IP — sem PII bruta — e são acessíveis
              somente à equipe Óticas Paris para investigação de abuso.
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-4 font-bold">
              Óticas Paris · Política de Segurança v1.0
            </p>
          </section>
        </main>

        <ParisFooter />
      </div>
    </AccessCodeGate>
  );
}