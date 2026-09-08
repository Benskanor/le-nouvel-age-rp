(() => {
  const realmOrder=['Shintai','Asharun','Vanloria','Nerethis','Falkheim','Erythros'];
  let DB=null;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function hearts(c){
    if(!c.realms?.length)return '<span class="common-label">◇ Commune à tous les royaumes</span>';
    return `<span class="heart-list" aria-label="Réservée à ${esc(c.realms.join(', '))}">${c.realms.map(r=>`<span title="${esc(r)}">${DB.realmLegend[r].heart}<i>${esc(r)}</i></span>`).join('')}</span>`;
  }
  function card(c){return `<article class="creature-card" data-tier="${c.tier}">
    <div class="creature-card-top"><span>Tier ${c.tier}</span>${c.realms?.length?'<small>Accès royaume</small>':'<small>Commun</small>'}</div>
    <h3>${esc(c.name)}</h3>${hearts(c)}${c.note?`<p class="creature-note">${esc(c.note)}</p>`:''}
  </article>`}
  function render(){
    const q=norm(document.querySelector('#creatureSearch').value.trim());
    const tier=document.querySelector('#tierFilter').value;
    const realm=document.querySelector('#realmFilter').value;
    const filtered=DB.creatures.filter(c=>(tier==='all'||String(c.tier)===tier)&&(realm==='all'||c.realms.length===0||c.realms.includes(realm))&&(!q||norm([c.name,c.note,...c.realms].join(' ')).includes(q)));
    const host=document.querySelector('#creatureDirectory');host.innerHTML='';
    document.querySelector('#resultCount').textContent=filtered.length;
    for(const t of [2,3,4,5,6]){
      const rows=filtered.filter(c=>c.tier===t);if(!rows.length)continue;
      const sec=document.createElement('section');sec.className='creature-group';
      sec.innerHTML=`<header><div><span class="tier-number">0${t}</span><div><small>Catalogue actuel</small><h2>Tier ${t}</h2></div></div><strong>${rows.length} créature${rows.length>1?'s':''}</strong></header><div class="creature-grid">${rows.map(card).join('')}</div>${t===6&&DB.tiers.find(x=>x.tier===6).teaser?`<div class="tier-teaser"><span>💜</span><div><strong>Falkheim</strong><p>${esc(DB.tiers.find(x=>x.tier===6).teaser.replace('Falkheim : ',''))}</p></div></div>`:''}`;
      host.appendChild(sec);
    }
    if(!filtered.length)host.innerHTML='<div class="bestiary-empty">Aucune créature ne correspond à ces filtres.</div>';
  }
  async function boot(){
    const r=await fetch('../data/bestiaire.json',{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);DB=await r.json();
    document.querySelector('#documentedCount').textContent=DB.creatures.length;
    const overview=document.querySelector('#tierOverview');
    overview.innerHTML=DB.tiers.map(t=>`<article class="tier-summary tier-${t.tier} ${t.status==='À compléter'?'pending':'available'}"><div><span>0${t.tier}</span><small>${esc(t.status)}</small></div><h3>Tier ${t.tier}</h3><p>${esc(t.label)}</p><strong>${t.count?t.count+' créatures':t.status}</strong>${t.teaser?`<em>${esc(t.teaser)}</em>`:''}</article>`).join('');
    const legend=document.querySelector('#heartLegend');
    legend.innerHTML=realmOrder.map(r=>`<span style="--realm:${DB.realmLegend[r].color}"><b>${DB.realmLegend[r].heart}</b><strong>${r}</strong></span>`).join('')+'<span class="common"><b>◇</b><strong>Commun</strong></span>';
    const realmSel=document.querySelector('#realmFilter');
    realmOrder.forEach(r=>realmSel.insertAdjacentHTML('beforeend',`<option value="${r}">${DB.realmLegend[r].heart} ${r}</option>`));
    document.querySelector('#creatureSearch').addEventListener('input',render);document.querySelector('#tierFilter').addEventListener('change',render);realmSel.addEventListener('change',render);
    document.querySelector('#resetBestiary').addEventListener('click',()=>{document.querySelector('#creatureSearch').value='';document.querySelector('#tierFilter').value='all';realmSel.value='all';render()});
    render();
  }
  boot().catch(e=>{console.error(e);document.querySelector('#creatureDirectory').innerHTML='<div class="bestiary-empty">Impossible de charger le bestiaire.</div>'});
})();
