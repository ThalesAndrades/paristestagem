# Provador Virtual com IA — Manual do Integrador

Documento de entrega comercial e técnica para parceiros que desejam embarcar o **Provador Virtual** em uma loja própria, marketplace ou storefront já integrado ao VTEX.

Este manual descreve o produto que você está adquirindo, como ele funciona, o que precisa ser configurado, como integrar com o seu catálogo, quais erros o cliente final pode ver e como operar a solução em produção.

---

## 1. O que é o produto

Uma aplicação web pronta para uso que permite ao consumidor:

1. Enviar uma foto do próprio rosto (selfie ou imagem da galeria).
2. Escolher um modelo de óculos — do catálogo da loja **ou** enviando a foto de um modelo qualquer.
3. Receber, em segundos, uma imagem foto-realista mostrando o próprio rosto usando aquele modelo.

A composição é feita por um motor de imagem generativa via um *system prompt* especializado em integração de eyewear (preserva identidade da pessoa, escala o modelo pela distância interpupilar, casa iluminação da cena e materiais físicos do produto).

Casos de uso atendidos:

- Provador embedado em PDP (Product Detail Page) do VTEX.
- Landing page dedicada com link a partir do catálogo.
- Modal acionado por botão "Experimentar Virtualmente".
- Marketplace próprio com vitrine e prova virtual integrada.

---

## 2. Jornada do cliente final

```
 ┌──────────────────┐    ┌─────────────────────┐    ┌────────────────────┐
 │  1. Boas-vindas  │ →  │  2. Envia 2 imagens │ →  │ 3. Validação       │
 │  (Hero + CTA)    │    │  (rosto + óculos)   │    │ técnica + conteúdo │
 └──────────────────┘    └─────────────────────┘    └─────────┬──────────┘
                                                              ▼
                ┌──────────────────────┐    ┌─────────────────────────┐
                │ 5. Resultado +       │ ←  │ 4. Geração com IA       │
                │ download / compra    │    │ (backend protegido)     │
                └──────────────────────┘    └─────────────────────────┘
```

- **Tempo médio percebido pelo cliente:** alguns segundos por geração (dependente da carga do provedor de IA).
- **Resultados:** o cliente pode baixar a imagem com a marca da loja em rodapé, comparar antes/depois, escolher outro modelo ou finalizar a compra direto no VTEX.

---

## 3. Arquitetura

A solução é composta por três camadas:

### 3.1. Front-end (SPA)
- **Stack:** React 18 + Vite 6 + TailwindCSS + Radix UI.
- **Roteamento:** React Router. Páginas entregues:
  - `/` — home institucional
  - `/provador` — fluxo do provador virtual
  - `/marketplace` — catálogo navegável
  - `/produto/:id` — página de produto com CTA de prova virtual
  - `/seguranca` — página pública que explica para o usuário as camadas de proteção

### 3.2. Back-end (Base44 Functions)
- Função serverless `generateTryOn` que orquestra autenticação, validação, geração e auditoria.
- Persistência de eventos na entidade `TryOnAuditLog`.
- Storage gerenciado para uploads (URLs assinadas pelo Base44).

### 3.3. Motor de IA
- Integração nativa com o gerador de imagem do Base44 (acionado via `integrations.Core.GenerateImage` no backend, jamais exposto ao cliente).
- *System prompt* fixo no servidor, blindado contra prompt-injection — o cliente não controla a instrução, apenas fornece as duas URLs de imagem.

---

## 4. Integração com o seu VTEX

O produto **não substitui** o storefront VTEX. Ele se integra como uma rota / componente complementar.

### 4.1. Passagem de imagens do catálogo

A função de geração aceita URLs hospedadas em hosts confiáveis configurados em uma *allow-list* (anti-SSRF). Por padrão a allow-list inclui:

- `media.base44.com`, `storage.base44.com`, `app.base44.com`, `base44.app` (uploads do próprio app)
- `vtexassets.com` (CDN padrão das lojas VTEX — cobre qualquer subdomínio como `tfcqdl.vtexassets.com`)

Para apontar uma vitrine VTEX para o provador, basta gerar um link ou abrir uma modal passando a URL completa da imagem do produto, ex:

```
https://provador.sualoja.com.br/provador?glasses=https://tfcqdl.vtexassets.com/arquivos/ids/195077-600-600
```

> **Importante:** caso a sua loja use um domínio de CDN customizado (ex: `cdn.sualoja.com.br`), informe-o na entrega para que seja incluído na allow-list. URLs fora da lista são rejeitadas com a mensagem `Origem das imagens não autorizada.`

### 4.2. Onde inserir o CTA no VTEX

Recomendações de pontos de integração (ordenadas por impacto típico):

1. **PDP** — botão "Experimentar Virtualmente" abaixo da galeria.
2. **Vitrine** — badge "Prova Virtual" nos cards de produto.
3. **Carrinho** — sugestão "Antes de finalizar, veja como fica em você."
4. **E-mail / push** — link com `?glasses=` pré-selecionado.

### 4.3. Checkout

O fluxo de checkout permanece 100% no VTEX. A solução **não** lida com pagamento, frete, NF nem estoque. O botão "Comprar" na tela de resultado pode ser configurado para redirecionar à PDP correspondente.

---

## 5. Setup e deploy

### 5.1. Variáveis de ambiente obrigatórias

```env
VITE_BASE44_APP_ID=<id_do_app_no_base44>
VITE_BASE44_APP_BASE_URL=https://<seu-app>.base44.app
```

### 5.2. Comandos

| Comando            | Função                                |
| ------------------ | ------------------------------------- |
| `npm install`      | Instala dependências                  |
| `npm run dev`      | Servidor local com HMR (porta 5173)   |
| `npm run build`    | Build estático em `dist/`             |
| `npm run preview`  | Pré-visualiza o build local           |
| `npm run lint`     | Lint do código                        |
| `npm run typecheck`| Verificação de tipos                  |

**Node:** 18 ou superior.

### 5.3. Hospedagem

A SPA é estática e pode ser servida em qualquer hospedagem de arquivos. O repositório já inclui artefatos para:

- **Hostinger / Apache** — `public/.htaccess` com fallback de rotas, HTTPS forçado, cache de assets imutáveis, headers de segurança e gzip.
- **Netlify / Cloudflare Pages** — `public/_redirects`.
- **PWA mínimo** — `public/manifest.json` referenciado pelo `index.html`.

A função `generateTryOn` é deployada no Base44 (gerenciado).

### 5.4. Domínio e HTTPS

O CTA precisa apontar para um domínio com HTTPS válido. O acesso à câmera do dispositivo (para tirar selfie diretamente) só é permitido pelos navegadores em contextos seguros.

---

## 6. Contrato da função `generateTryOn`

### 6.1. Endpoint

```
POST  https://<seu-app>.base44.app/functions/generateTryOn
Content-Type: application/json
```

A autenticação é gerenciada pelo SDK do Base44 — o front-end utiliza `base44.functions.invoke('generateTryOn', body)` e a sessão do usuário é injetada automaticamente.

### 6.2. Request

```json
{
  "personImageUrl":  "https://media.base44.com/.../selfie.jpg",
  "glassesImageUrl": "https://tfcqdl.vtexassets.com/arquivos/ids/195077-600-600"
}
```

- Ambos os campos são **obrigatórios**.
- Cada URL: **string HTTPS**, tamanho máximo de **2.048 caracteres**.
- Host precisa estar na allow-list.
- Conteúdo precisa responder com `Content-Type` `image/jpeg`, `image/png` ou `image/webp` em uma requisição `HEAD`.

### 6.3. Response — sucesso

```json
{
  "imageUrl": "https://media.base44.com/images/public/.../generated_image.png"
}
```

- A URL retornada é pública e pode ser exibida em `<img src>`, baixada ou compartilhada.

### 6.4. Response — erros

Mensagens são **opacas para o cliente** por design — detalhes técnicos ficam apenas no log de auditoria interno. Códigos HTTP e mensagens visíveis:

| HTTP | Quando ocorre                                    | Mensagem retornada                                            |
| ---- | ------------------------------------------------ | ------------------------------------------------------------- |
| 400  | Payload mal formado (não-JSON)                   | `Requisição inválida.`                                        |
| 400  | Campos ausentes ou maiores que 2048 chars        | `Ambas as imagens são obrigatórias.`                          |
| 400  | Host fora da allow-list ou protocolo não-HTTPS   | `Origem das imagens não autorizada.`                          |
| 400  | URL não retorna Content-Type de imagem real      | `Uma das imagens não pôde ser verificada como imagem real.`   |
| 401  | Requisição sem usuário autenticado               | `Autenticação requerida.`                                     |
| 429  | Acima do rate limit por usuário/IP               | `Muitas tentativas em pouco tempo. Aguarde alguns segundos.`  |
| 500  | Falha interna (genérica)                         | `Falha interna ao gerar a imagem. Tente novamente.`           |
| 502  | Provedor de IA retornou resposta vazia           | `Não foi possível gerar a imagem agora.`                      |

---

## 7. Validações no front-end (antes do upload)

Antes mesmo de chamar o backend, o front aplica três camadas para reduzir uploads inválidos e proteger o backend.

### 7.1. Camada técnica (anti-injeção)

Rejeita o arquivo com mensagem amigável quando:

- Arquivo vazio ou ausente.
- Tamanho **maior que 12 MB**.
- Extensão perigosa (`.svg`, `.html`, `.js`, `.exe`, `.bat`, `.php`, `.xml`, `.swf`, `.jar`, entre outras).
- MIME declarado fora de `image/jpeg`, `image/png` ou `image/webp`.
- **Magic number** binário do arquivo não corresponde a uma imagem real (bloqueia, por exemplo, um `.js` renomeado para `.jpg`).

### 7.2. Camada de moderação de conteúdo

Imagens aprovadas tecnicamente passam por análise de conteúdo via IA, que reprova:

- Conteúdo NSFW / +18 / violento.
- Imagens claramente fora do contexto (paisagens, prints de tela, memes).

### 7.3. Camada de nicho (slot certo, conteúdo certo)

- O slot **"Sua Foto"** exige uma foto com rosto humano detectável.
- O slot **"Os Óculos"** exige uma foto que represente um produto de eyewear.

Cada rejeição mostra ao cliente um card explicativo com:

- O motivo em linguagem clara.
- Uma dica acionável ("tire foto de frente para a janela", "envie uma foto maior", etc.).
- Um botão para tentar de novo.

### 7.4. Análise heurística da foto da pessoa

Após o upload válido, a foto é analisada localmente (canvas) para iluminação, foco e enquadramento. O resultado é um painel de status (OK / atenção / erro) com sugestões objetivas. Quando há erro grave (rosto não detectado, foto muito escura, superexposição), o botão de gerar fica desabilitado até o cliente trocar a foto.

---

## 8. Segurança do backend

A função `generateTryOn` aplica, em sequência:

1. **Autenticação obrigatória** — sem sessão válida, 401 imediato.
2. **Rate limit em memória** — 6 gerações por minuto por chave `(email, IP)`.
3. **Validação estrita do payload** — forma JSON, presença e tamanho dos campos.
4. **Allow-list de hosts** — apenas HTTPS de domínios pré-aprovados.
5. **HEAD probe** — confirma `Content-Type` de imagem real antes de chamar o provedor de IA.
6. **Anti prompt-injection** — URLs são tratadas como *dados*, nunca como instrução; o *system prompt* é constante no servidor.
7. **Auditoria forense não-bloqueante** — todo evento (sucesso, falha, bloqueio) é registrado em `TryOnAuditLog`. Falhas no log nunca derrubam o pedido.
8. **Erros opacos** — detalhes técnicos ficam apenas na auditoria; o cliente recebe uma mensagem genérica.

> A página pública `/seguranca` explica essas camadas para o consumidor final, em linguagem não-técnica.

---

## 9. Auditoria — entidade `TryOnAuditLog`

Toda chamada gera ao menos um registro. Esquema:

| Campo               | Tipo    | Descrição                                                          |
| ------------------- | ------- | ------------------------------------------------------------------ |
| `event_type`        | enum    | `generation_success`, `generation_failed`, `rate_limited`, `blocked_url`, `blocked_content`, `blocked_input`, `blocked_unauthenticated` |
| `user_email`        | string  | Snapshot do email autenticado (vazio em bloqueios pré-auth)         |
| `person_image_url`  | string  | URL da imagem da pessoa                                            |
| `glasses_image_url` | string  | URL da imagem do óculos                                            |
| `ip_hash`           | string  | SHA-256 do IP de origem (não armazena PII)                         |
| `user_agent`        | string  | Cabeçalho `User-Agent` (até 240 chars)                             |
| `duration_ms`       | number  | Duração da geração                                                 |
| `block_reason`      | string  | Texto curto explicando o bloqueio, quando aplicável                |
| `error_message`     | string  | Mensagem técnica do erro, quando aplicável (até 500 chars)         |

A operação do parceiro tem acesso de leitura à entidade pelo painel do Base44 para detecção de abuso, ajuste de allow-list e suporte ao cliente final.

---

## 10. Personalização

O produto é entregue com a identidade visual de demonstração, mas todos os pontos de marca são parametrizados:

| Item                  | Onde alterar                                                       |
| --------------------- | ------------------------------------------------------------------ |
| Logo                  | `src/components/tryon/ParisLogo.jsx` e `parisLogoInline.jsx`        |
| Header / Footer       | `src/components/tryon/ParisHeader.jsx` / `ParisFooter.jsx`          |
| Paleta de cores       | `tailwind.config.js` (token `paris-red`) + variáveis CSS em `src/index.css` |
| Textos e copy         | Cada componente é um arquivo isolado em `src/components/tryon/`     |
| Catálogo de óculos sugeridos | `src/components/marketplace/catalog.js` + `SuggestedGlassesCarousel.jsx` |
| Marca d'água do download | `src/components/tryon/WatermarkOverlay.jsx` + `composeBrandedDownload.jsx` |
| Página de segurança   | `src/pages/Security.jsx`                                            |

Recomendamos manter a página `/seguranca` adaptada à marca do parceiro — é um diferencial de confiança visível ao consumidor.

---

## 11. Limites operacionais

| Limite                          | Valor                                  |
| ------------------------------- | -------------------------------------- |
| Tamanho máximo por imagem       | 12 MB                                  |
| Formatos aceitos                | JPG, PNG, WEBP                         |
| Tamanho máximo da URL           | 2.048 caracteres                       |
| Gerações por minuto             | 6 por usuário/IP (configurável)        |
| Hosts permitidos                | Base44 + `vtexassets.com` (extensível) |
| Protocolo                       | Somente HTTPS                          |

Para volume maior do que o limite padrão, o parceiro pode acordar uma janela e capacidade dedicadas — o rate limit é ajustável no código da função.

---

## 12. Acessibilidade e privacidade

- Textos do app em português (pt-BR); estrutura preparada para internacionalização.
- Não solicitamos dados sensíveis no fluxo da prova virtual além do necessário.
- O IP é armazenado **apenas em hash SHA-256** para fins de rate-limit e detecção de abuso.
- O cliente final pode acionar "trocar foto" a qualquer momento; nada é persistido sem ação dele.
- A página `/seguranca` comunica de forma transparente o que é coletado e por quê.

---

## 13. Checklist de go-live

Antes de subir para produção, garanta:

- [ ] Domínio próprio configurado com HTTPS válido.
- [ ] Variáveis `VITE_BASE44_APP_ID` e `VITE_BASE44_APP_BASE_URL` apontando para o seu app.
- [ ] CDN do seu VTEX (ou domínio customizado) incluído na allow-list, se diferente de `vtexassets.com`.
- [ ] Logo, paleta, header, footer e textos institucionais atualizados.
- [ ] Catálogo de óculos sugeridos preenchido com SKUs reais (com link para PDP).
- [ ] Página `/seguranca` revisada e assinada institucionalmente.
- [ ] Política de privacidade do site linkada no footer.
- [ ] Botão "Comprar" na tela de resultado apontando para a PDP correta.
- [ ] Teste end-to-end em desktop e em mobile (Safari iOS, Chrome Android).
- [ ] Acesso ao painel do Base44 com a equipe de suporte do parceiro.

---

## 14. Suporte e versionamento

- Cada release de produção é uma tag no repositório do parceiro.
- A função `generateTryOn` pode ser pinada a uma versão específica via `VITE_BASE44_FUNCTIONS_VERSION` no `.env` (opcional).
- Mudanças na *allow-list*, no rate limit ou no *system prompt* exigem deploy da função no Base44 — não bastam alterações no front.
- Recomenda-se monitorar a entidade `TryOnAuditLog` semanalmente nos primeiros 30 dias para calibrar limites e detectar padrões de abuso.

---

## 15. O que **não** está incluído

Para transparência, deixe claro o escopo:

- Não é uma loja completa — não substitui o VTEX em catálogo, carrinho, checkout, pagamento, frete, NF ou estoque.
- Não é uma SDK pronta para outros frameworks — é uma aplicação web entregue como código-fonte.
- Não é responsável pela hospedagem do front-end — o parceiro escolhe onde publicar.
- O motor de IA é fornecido pelo Base44; cotas e SLA seguem o contrato do parceiro com a plataforma.

---

*Documento revisado em 2026-05-20.*
