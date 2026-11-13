import { HttpError, requireOrigin, safeResponse, json } from './http.js';
export const endpoint = handler => async ({request,env}) => {
 try {
  if (!env.DB) throw new HttpError(503,'Banco não configurado.');
  if (!['GET','HEAD'].includes(request.method)) requireOrigin(request);
  return safeResponse(await handler(request,env));
 } catch(error) { return safeResponse(json({error:error instanceof HttpError ? error.message : 'Não foi possível concluir. Confira as migrações do banco.'},error instanceof HttpError ? error.status : 503)); }
};
