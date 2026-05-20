import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// serverUrl precisa apontar pro backend do Base44; vazio faz o SDK usar
// URLs relativas que, em produção (domínio próprio), batem no host estático.
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: appBaseUrl,
  requiresAuth: false,
  appBaseUrl
});
