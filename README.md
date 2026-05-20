**Welcome to your Base44 project** 

**About**

View and Edit  your app on [Base44.com](http://Base44.com) 

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:** 

1. Clone the repository using the project's Git URL 
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

Run the app: `npm run dev`

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

---

## Deploy no Hostinger (via GitHub)

Este projeto está preparado para deploy estático no Hostinger (Apache + GitHub import).

**Configuração na importação:**

| Campo                | Valor                  |
| -------------------- | ---------------------- |
| Install command      | `npm install`          |
| Build command        | `npm run build`        |
| Output directory     | `dist`                 |
| Node version         | `>=18` (definido em `package.json`) |

**Variáveis de ambiente:**

```
VITE_BASE44_APP_ID=6a0d05aa26af897b0567e927        # obrigatório
VITE_BASE44_APP_BASE_URL=https://seu-app.base44.app # opcional (ver abaixo)
```

`VITE_BASE44_APP_BASE_URL` só é necessário quando o front-end está num
domínio diferente do backend Base44 (ex.: hospedado no Hostinger em
`paristeste.cloud`). Se o app é servido pelo próprio Base44 em
`*.base44.app`, deixe em branco — o app resolve via `window.location.origin`
em runtime.

Veja `.env.example` para a lista completa.

**Já incluído para produção:**

- `public/.htaccess` — fallback de rotas para SPA (React Router), cache de assets imutáveis, gzip, headers de segurança, HTTPS forçado
- `public/_redirects` — fallback estilo Netlify
- `public/manifest.json` — PWA mínimo referenciado por `index.html`
- `public/robots.txt`

Após o deploy, configure as variáveis no painel do Hostinger e dispare um novo build.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)
