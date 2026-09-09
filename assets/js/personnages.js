const realmOrder=['Asharun','Falkheim','Shintai','Vanloria','Nerethis','Erythros'];
const realmRune={Asharun:'A',Falkheim:'F',Shintai:'S',Vanloria:'V',Nerethis:'N',Erythros:'E'};
let DB=null;let realmFilter='Tous';
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
function byId(id){return DB.characters.find(c=>c.id===id)}
function statusLabel(c){return DB.statusLegend[c.status]||c.status}
function statusEmoji(c){return DB.statusEmoji[c.status]||'•'}
function relationText(r){const target=r.target?byId(r.target):null;return `${target?target.name+' — ':''}${r.label}`}
function matches(c,q){return !q||[c.name,c.role,c.job,c.religion,c.summary,c.qualities,c.hobbies,...(c.notable||[])].join(' ').toLowerCase().includes(q)}

function featuredCard(c){
  const flag=`../assets/images/royaumes/drapeaux/${c.realm.toLowerCase()}.webp`;
  return `<article class="featured-character realm-${esc(c.realm.toLowerCase())}">
    <div class="featured-flag"><img src="${flag}" alt="Drapeau de ${esc(c.realm)}" loading="lazy"></div>
    <div class="featured-copy">
      <small>${esc(c.realm)} · ${esc(c.role||c.job||'Personnage')}</small>
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.summary||'Présentation à compléter.')}</p>
      <button class="details-btn featured-details" data-id="${esc(c.id)}" type="button">Lire sa fiche RP →</button>
    </div>
  </article>`;
}
function renderFeatured(){
  const host=document.querySelector('#featuredCharacters');if(!host)return;
  const ids=DB.featuredCharacters||[];
  const chars=ids.map(byId).filter(c=>c&&c.status==='vivant').slice(0,3);
  host.innerHTML=chars.map(featuredCard).join('');
  host.querySelectorAll('.details-btn').forEach(btn=>btn.addEventListener('click',()=>openCharacter(btn.dataset.id)));
}

function activeCard(c){
  const notes=(c.notable||[]).slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('');
  const relCount=(c.relations||[]).length;
  return `<article class="character-card${c.leader?' is-leader':''}">${c.leader?'<div class="leader-crown" title="Dirigeant actuel">👑</div>':''}
    <div class="status-box status-${esc(c.status)}"><span class="status-emoji">${statusEmoji(c)}</span><span class="status-label">${esc(statusLabel(c))}</span></div>
    <div class="card-head"><div><h3>${esc(c.name)}</h3><div class="leader-role">${esc(c.role||'')}</div></div></div>
    <div class="current-era">Nouveau Monde · situation actuelle</div>
    <div class="card-meta">${esc(c.age?c.age+' ans':'Âge non publié')} · ${esc(c.religion||'Religion non publiée')}</div>
    <div class="job-line">${esc(c.job||'Fonction non publiée')}</div>
    <p class="card-summary">${esc(c.summary||'Présentation à compléter.')}</p>
    ${notes?`<div class="public-notes">${notes}</div>`:''}
    ${relCount?`<div class="relation-count">${relCount} lien${relCount>1?'s':''} public${relCount>1?'s':''} recensé${relCount>1?'s':''}</div>`:''}
    <div class="card-actions"><button class="details-btn" data-id="${esc(c.id)}" type="button">Voir la fiche complète</button></div>
  </article>`;
}
function archiveRow(c){
  return `<article class="archive-row status-${esc(c.status)}">
    <div class="archive-status" aria-label="${esc(statusLabel(c))}"><span>${statusEmoji(c)}</span><small>${esc(statusLabel(c))}</small></div>
    <div class="archive-copy"><strong>${esc(c.name)}</strong><span>${esc(c.realm)} · ${esc(c.role||c.job||'Fonction non publiée')}</span></div>
    <button class="details-btn archive-details" data-id="${esc(c.id)}" type="button">Consulter</button>
  </article>`;
}
function render(){
  const q=document.querySelector('#search').value.trim().toLowerCase();
  const status=document.querySelector('#status').value;
  const host=document.querySelector('#directory');
  const archive=document.querySelector('#archivesDirectory');
  const archiveDetails=document.querySelector('#peopleArchives');
  host.innerHTML='';archive.innerHTML='';

  const explicitArchive=status==='disparu'||status==='mort';
  const activeStatus=status==='vivant'||status==='all';
  let activeFound=0,archiveFound=0;

  if(activeStatus){
    for(const realm of realmOrder){
      if(realmFilter!=='Tous'&&realmFilter!==realm)continue;
      const chars=DB.characters.filter(c=>c.realm===realm&&c.status==='vivant'&&matches(c,q));
      if(!chars.length)continue;
      activeFound+=chars.length;
      const sec=document.createElement('section');sec.className='realm-section';sec.id=realm.toLowerCase();
      sec.innerHTML=`<div class="realm-heading"><div class="realm-title-wrap"><span class="realm-rune">${realmRune[realm]}</span><h2>${esc(realm)}</h2></div><p>${chars.length} personnage${chars.length>1?'s':''} actif${chars.length>1?'s':''}</p></div><div class="cards">${chars.map(activeCard).join('')}</div>`;
      host.appendChild(sec);
    }
  }

  const archived=DB.characters.filter(c=>c.status!=='vivant')
    .filter(c=>realmFilter==='Tous'||c.realm===realmFilter)
    .filter(c=>status==='all'||c.status===status)
    .filter(c=>matches(c,q));
  archiveFound=archived.length;
  for(const realm of realmOrder){
    const rows=archived.filter(c=>c.realm===realm);if(!rows.length)continue;
    const section=document.createElement('section');section.className='archive-realm';
    section.innerHTML=`<div class="archive-realm-title"><strong>${esc(realm)}</strong><span>${rows.length}</span></div><div class="archive-list">${rows.map(archiveRow).join('')}</div>`;
    archive.appendChild(section);
  }

  const archiveCount=document.querySelector('#archiveCount');archiveCount.textContent=archiveFound;
  const archiveSummary=document.querySelector('#archiveSummaryText');
  archiveSummary.textContent=archiveFound?`${archiveFound} fiche${archiveFound>1?'s':''} archivée${archiveFound>1?'s':''}`:'Aucune fiche archivée avec ces filtres';
  archiveDetails.hidden=!archiveFound;
  if(explicitArchive||(q&&archiveFound&&!activeFound))archiveDetails.open=true;
  if(status==='vivant')archiveDetails.hidden=true;

  if(!activeFound&&activeStatus)host.innerHTML='<p class="empty">Aucun personnage vivant ne correspond à ces filtres.</p>';
  if(explicitArchive)host.innerHTML='<div class="archive-mode-note">Les résultats demandés sont affichés dans les archives ci-dessous afin de ne pas mettre les personnages morts ou disparus au même niveau visuel que les personnages actifs.</div>';

  document.querySelectorAll('.details-btn').forEach(btn=>btn.addEventListener('click',()=>openCharacter(btn.dataset.id)));
}
function openCharacter(id){
  const c=byId(id);if(!c)return;
  const notes=(c.notable||[]).length?`<section class="modal-section"><h3>Repères RP actuels</h3><ul class="bullet-list">${c.notable.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>`:'';
  const relations=(c.relations||[]).length?`<section class="modal-section"><h3>Liens publics connus</h3><div class="relation-list">${c.relations.map(r=>`<div class="relation-row ${esc(r.type||'')}">${esc(relationText(r))}</div>`).join('')}</div></section>`:`<section class="modal-section"><h3>Liens publics connus</h3><p>Aucun lien public suffisamment établi n’est actuellement recensé.</p></section>`;
  const history=c.history?`<section class="modal-section history-archive"><h3>Fiche RP d’origine</h3><div class="archive-warning"><strong>Archive du personnage</strong><span>Cette fiche correspond au passé et au point de départ RP du personnage, avant son évolution dans le Nouveau Monde. Les métiers, fonctions, allégeances ou relations mentionnés dans ce texte peuvent ne plus correspondre à sa situation actuelle.</span></div>${c.sheetDate?`<span class="sheet-source">Fiche joueur d’origine · ${esc(c.sheetDate)}</span>`:''}<div class="history-original">${esc(c.history)}</div></section>`:`<section class="modal-section history-archive"><h3>Fiche RP d’origine</h3><p class="no-sheet">La fiche RP d’origine de ce personnage n’a pas encore été transmise aux archives du site.</p></section>`;
  const recent=c.recentHistory?`<section class="modal-section"><h3>Chronique du Nouveau Monde</h3><div class="chronicle-box">${esc(c.recentHistory)}</div></section>`:'';
  const leaderMark=c.leader&&c.status==='vivant'?' · 👑':'';
  document.querySelector('#modalBody').innerHTML=`<article class="modal-content">
    <div class="modal-kicker">${esc(c.realm)} · ${statusEmoji(c)} ${esc(statusLabel(c))}</div>
    <div class="modal-title-row"><div><h2>${esc(c.name)}</h2>${c.role?`<div class="modal-role">${esc(c.role)}${leaderMark}</div>`:''}</div></div>
    <div class="modal-era-label">Nouveau Monde · situation actuelle</div>
    <div class="modal-grid"><div class="info"><span>Statut actuel</span>${statusEmoji(c)} ${esc(statusLabel(c))}</div><div class="info"><span>Royaume actuel</span>${esc(c.realm)}</div><div class="info"><span>Âge</span>${esc(c.age?c.age+' ans':'Non publié')}</div><div class="info"><span>Métier actuel</span>${esc(c.job||'Non publié')}</div><div class="info"><span>Religion</span>${esc(c.religion||'Non publiée')}</div>${c.qualities?`<div class="info"><span>Qualités / défauts</span>${esc(c.qualities)}</div>`:''}${c.hobbies?`<div class="info"><span>Hobbies</span>${esc(c.hobbies)}</div>`:''}</div>
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
  const deadCount=DB.characters.filter(c=>c.status==='mort').length;const deadStat=document.querySelector('#deadCount');if(deadStat)deadStat.textContent=deadCount;
  const counts={};DB.characters.forEach(c=>counts[c.realm]=(counts[c.realm]||0)+1);
  const tabs=document.querySelector('#realmTabs');
  ['Tous',...realmOrder].forEach(realm=>{const b=document.createElement('button');b.type='button';b.textContent=realm==='Tous'?`Tous (${DB.characters.length})`:`${realm} (${counts[realm]||0})`;if(realm==='Tous')b.classList.add('active');b.addEventListener('click',()=>{realmFilter=realm;tabs.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render()});tabs.appendChild(b)});
  document.querySelector('#search').addEventListener('input',render);document.querySelector('#status').addEventListener('change',render);
  document.querySelector('#closeModal').addEventListener('click',()=>document.querySelector('#characterModal').close());
  document.querySelector('#characterModal').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
  renderFeatured();
  render();
}
boot().catch(err=>{console.error(err);document.querySelector('#directory').innerHTML='<p class="empty">Impossible de charger le registre des personnages.</p>'});
