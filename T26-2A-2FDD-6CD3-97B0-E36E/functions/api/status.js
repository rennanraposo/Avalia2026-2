import { currentUser, requireUser } from '../../lib/auth.js';
import { endpoint } from '../../lib/secure.js';
import { json, readJson, stringField, assertKeys } from '../../lib/http.js';
const chave = 'T26-2A-2FDD-6CD3-97B0-E36E';
export const onRequestGet = endpoint(async (request,env) => {
 const user = await currentUser(request,env);
 const total = await env.DB.prepare('SELECT COUNT(*) AS total FROM project_records').first();
 const rows = user ? await env.DB.prepare('SELECT id,username,conteudo,created_at FROM project_records WHERE user_id=? ORDER BY id DESC LIMIT 10').bind(user.user_id).all() : {results:[]};
 return json({ok:true,chave,projectId:0,d1Connected:true,discordOAuthConfigured:Boolean(env.DISCORD_CLIENT_ID&&env.DISCORD_CLIENT_SECRET),sessionUser:user,totalRegistros:total.total,ultimosRegistros:rows.results});
});
export const onRequestPost = endpoint(async (request,env) => {
 const user = await requireUser(request,env); const body = await readJson(request); assertKeys(body,['conteudo']);
 const conteudo = stringField(body.conteudo,'Conteúdo',500);
 await env.DB.prepare('INSERT INTO project_records(user_id,username,chave_projeto,conteudo) VALUES(?,?,?,?)').bind(user.user_id,user.username,chave,conteudo).run();
 return json({ok:true,saved:true,chave},201);
});
