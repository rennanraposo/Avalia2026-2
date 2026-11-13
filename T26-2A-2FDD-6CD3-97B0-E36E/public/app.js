const statusEl=document.getElementById('statusMessage');
const sendBtn=document.getElementById('sendBtn');
sendBtn.disabled=true;
async function carregarStatus(){
 try{
  const res=await fetch('/api/status');const data=await res.json();if(!res.ok)throw new Error(data.error);
  const profile=document.getElementById('discordProfile');profile.replaceChildren();
  if(data.sessionUser){const user=data.sessionUser;const img=document.createElement('img');img.src=user.avatar;img.alt='Avatar Discord';img.width=38;img.height=38;const name=document.createElement('span');name.textContent=user.display_name+' (@'+user.username+') — ID '+user.user_id;const logout=document.createElement('button');logout.textContent='Sair';logout.addEventListener('click',async()=>{await fetch('/api/logout',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});await carregarStatus();});profile.append(img,name,logout);}
  else{const link=document.createElement('a');link.href='/api/auth/discord';link.textContent='Entrar com Discord';profile.append(link);}
  sendBtn.disabled=!data.sessionUser;
  statusEl.textContent=data.sessionUser?'D1 conectado. Envie um registro para testar a persistência.':'D1 conectado. Entre com Discord para registrar seu teste.';
  const list=document.getElementById('recordsList');list.replaceChildren();
  for(const item of data.ultimosRegistros){const li=document.createElement('li');li.textContent='['+item.created_at+'] @'+item.username+': '+item.conteudo;list.append(li);}
  if(!data.ultimosRegistros.length){const li=document.createElement('li');li.textContent='Nenhum registro da sua conta nesta sessão de diagnóstico.';list.append(li);}
 }catch(error){statusEl.textContent=error.message||'Não foi possível consultar o diagnóstico.';sendBtn.disabled=true;}
}
sendBtn.addEventListener('click',async()=>{const input=document.getElementById('recordInput');const conteudo=input.value.trim();if(!conteudo)return;sendBtn.disabled=true;try{const res=await fetch('/api/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({conteudo})});const data=await res.json();if(!res.ok)throw new Error(data.error);input.value='';await carregarStatus();statusEl.textContent='Registro salvo no D1 com sua identidade Discord.';}catch(error){statusEl.textContent=error.message;sendBtn.disabled=false;}});
carregarStatus();
