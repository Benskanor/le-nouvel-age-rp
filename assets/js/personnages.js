
const realmOrder=['Asharun','Falkheim','Shintai','Vanloria','Nerethis','Erythros'];
const realmRune={Asharun:'A',Falkheim:'F',Shintai:'S',Vanloria:'V',Nerethis:'N',Erythros:'E'};
let DB=null;let realmFilter='Tous';
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
function byId(id){return DB.characters.find(c=>c.id===id)}
function statusLabel(c){return DB.statusLegend[c.status]||c.status}
function statusEmoji(c){return DB.statusEmoji[c.status]||'•'}
function relationText(r){const target=r.target?byId(r.target):null;return `${target?target.name+' — ':''}${r.label}`}
function render(){
  const q=document.querySelector('#search').value.trim().toLowerCase();
  const status=document.querySelector('#status').value;
  const host=document.querySelector('#directory');host.innerHTML='';
  for(const realm of realmOrder){
    if(realmFilter!=='Tous'&&realmFilter!==realm)continue;
    const chars=DB.characters.filter(c=>c.realm===realm)
      .filter(c=>status==='all'||c.status===status)
      .filter(c=>!q||[c.name,c.role,c.job,c.religion,c.summary,...(c.notable||[])].join(' ').toLowerCase().includes(q));
    if(!chars.length)continue;
    const sec=document.createElement('section');sec.className='realm-section';sec.id=realm.toLowerCase();
    sec.innerHTML=`<div class="realm-heading"><div class="realm-title-wrap"><span class="realm-rune">${realmRune[realm]}</span><h2>${esc(realm)}</h2></div><p>${chars.length} personnage${chars.length>1?'s':''}</p></div><div class="cards"></div>`;
    const grid=sec.querySelector('.cards');
    for(const c of chars){
      const card=document.createElement('article');
      card.className=`character-card${c.leader?' is-leader':''}`;
      const notes=(c.notable||[]).slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('');
      const relCount=(c.relations||[]).length;
      card.innerHTML=`${c.leader?'<div class="leader-crown" title="Dirigeant">👑</div>':''}
        <div class="status-box status-${esc(c.status)}"><span class="status-emoji">${statusEmoji(c)}</span><span class="status-label">${esc(statusLabel(c))}</span></div>
        <div class="card-head"><div><h3>${esc(c.name)}</h3><div class="leader-role">${esc(c.role||'')}</div></div></div>
        <div class="current-era">Nouveau Monde · situation actuelle</div><div class="card-meta">${esc(c.age?c.age+' ans':'Âge non publié')} · ${esc(c.religion||'Religion non publiée')}</div>
        <div class="job-line">${esc(c.job||'Fonction non publiée')}</div>
        <p class="card-summary">${esc(c.summary||'Présentation à compléter.')}</p>
        ${notes?`<div class="public-notes">${notes}</div>`:''}
        ${relCount?`<div class="relation-count">${relCount} lien${relCount>1?'s':''} public${relCount>1?'s':''} recensé${relCount>1?'s':''}</div>`:''}
        <div class="card-actions"><button class="details-btn" data-id="${esc(c.id)}" type="button">Voir la fiche complète</button></div>`;
      grid.appendChild(card);
    }
    host.appendChild(sec);
  }
  if(!host.children.length)host.innerHTML='<p class="empty">Aucun personnage ne correspond à ces filtres.</p>';
  host.querySelectorAll('.details-btn').forEach(btn=>btn.addEventListener('click',()=>openCharacter(btn.dataset.id)));
}
function openCharacter(id){
  const c=byId(id);if(!c)return;
  const notes=(c.notable||[]).length?`<section class="modal-section"><h3>Repères RP actuels</h3><ul class="bullet-list">${c.notable.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>`:'';
  const relations=(c.relations||[]).length?`<section class="modal-section"><h3>Liens publics connus</h3><div class="relation-list">${c.relations.map(r=>`<div class="relation-row ${esc(r.type||'')}">${esc(relationText(r))}</div>`).join('')}</div></section>`:`<section class="modal-section"><h3>Liens publics connus</h3><p>Aucun lien public suffisamment établi n’est actuellement recensé.</p></section>`;
  const history=c.history?`<section class="modal-section history-archive"><h3>Fiche RP d’origine</h3><div class="archive-warning"><strong>Archive du personnage</strong><span>Cette fiche correspond au passé et au point de départ RP du personnage, avant son évolution dans le Nouveau Monde. Les métiers, fonctions, allégeances ou relations mentionnés dans ce texte peuvent ne plus correspondre à sa situation actuelle.</span></div>${c.sheetDate?`<span class="sheet-source">Fiche joueur d’origine · ${esc(c.sheetDate)}</span>`:''}<div class="history-original">${esc(c.history)}</div></section>`:`<section class="modal-section history-archive"><h3>Fiche RP d’origine</h3><p class="no-sheet">La fiche RP d’origine de ce personnage n’a pas encore été transmise aux archives du site.</p></section>`;
  const recent=c.recentHistory?`<section class="modal-section"><h3>Chronique du Nouveau Monde</h3><div class="chronicle-box">${esc(c.recentHistory)}</div></section>`:'';
  document.querySelector('#modalBody').innerHTML=`<article class="modal-content">
    <div class="modal-kicker">${esc(c.realm)} · ${statusEmoji(c)} ${esc(statusLabel(c))}</div>
    <div class="modal-title-row"><div><h2>${esc(c.name)}</h2>${c.role?`<div class="modal-role">${esc(c.role)}${c.leader?' · 👑':''}</div>`:''}</div></div>
    <div class="modal-era-label">Nouveau Monde · situation actuelle</div>
    <div class="modal-grid"><div class="info"><span>Statut actuel</span>${statusEmoji(c)} ${esc(statusLabel(c))}</div><div class="info"><span>Royaume actuel</span>${esc(c.realm)}</div><div class="info"><span>Âge</span>${esc(c.age?c.age+' ans':'Non publié')}</div><div class="info"><span>Métier actuel</span>${esc(c.job||'Non publié')}</div><div class="info"><span>Religion</span>${esc(c.religion||'Non publiée')}</div></div>
    <section class="modal-section current-situation"><h3>Situation actuelle dans le Nouveau Monde</h3><p>${esc(c.summary||'À compléter.')}</p></section>
    ${notes}${relations}${history}${recent}
  </article>`;
  document.querySelector('#characterModal').showModal();
}
async function boot(){
  const r=await fetch('../data/personnages.json',{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);DB=await r.json();
  document.querySelector('#total').textContent=DB.characters.length;
  document.querySelector('#aliveCount').textContent=DB.characters.filter(c=>c.status==='vivant').length;
  document.querySelector('#missingCount').textContent=DB.characters.filter(c=>c.status==='disparu').length;
  const counts={};DB.characters.forEach(c=>counts[c.realm]=(counts[c.realm]||0)+1);
  const tabs=document.querySelector('#realmTabs');
  ['Tous',...realmOrder].forEach(realm=>{const b=document.createElement('button');b.type='button';b.textContent=realm==='Tous'?`Tous (${DB.characters.length})`:`${realm} (${counts[realm]||0})`;if(realm==='Tous')b.classList.add('active');b.addEventListener('click',()=>{realmFilter=realm;tabs.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render()});tabs.appendChild(b)});
  document.querySelector('#search').addEventListener('input',render);document.querySelector('#status').addEventListener('change',render);
  document.querySelector('#closeModal').addEventListener('click',()=>document.querySelector('#characterModal').close());
  document.querySelector('#characterModal').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
  render();
}
boot().catch(err=>{console.error(err);document.querySelector('#directory').innerHTML='<p class="empty">Impossible de charger le registre des personnages.</p>'});
