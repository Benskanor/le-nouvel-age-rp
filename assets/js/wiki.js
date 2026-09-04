(() => {
  const script=document.currentScript;
  const root=new URL('../../',script.src);
  const dataUrl=new URL('data/wiki.json',root);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const href=slug=>new URL(`wiki/ressources/${slug}/`,root).href;
  const imgUrl=p=>p?new URL(p,root).href:'';
  const initials=name=>String(name||'?').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase();
  const visual=(item,cls='resource-icon')=>item.image?`<span class="${cls} has-image"><img src="${imgUrl(item.image)}" alt="${esc(item.name)}" loading="lazy"></span>`:`<span class="${cls} fallback">${esc(item.icon||initials(item.name))}</span>`;
  const statusClass=s=>String(s||'').toLowerCase().includes('prioritaire')?'priority':'available';
  const resourceCard=r=>`<a class="wiki-resource-card" href="${href(r.slug)}">${visual(r)}<span class="resource-copy"><small>${esc(r.category)} · ${esc(r.realm)}</small><strong>${esc(r.name)}</strong><em>${esc(r.description)}</em></span><span class="resource-version">${esc(r.version)}</span></a>`;

  function home(db){
    document.querySelectorAll('[data-count]').forEach(el=>{const m={resources:db.resources.length,categories:db.categories.length,products:db.economy.kingdomProducts};el.textContent=m[el.dataset.count]??'—';});
    const cats=document.querySelector('#wikiCategories');
    if(cats) cats.innerHTML=db.categories.map(c=>{const n=db.resources.filter(r=>r.category===c.name).length;return `<a class="wiki-category-card" href="${new URL(`wiki/ressources/?categorie=${encodeURIComponent(c.name)}`,root)}"><span>${esc(c.icon)}</span><div><strong>${esc(c.name)}</strong><p>${esc(c.description)}</p><small>${n} fiches</small></div></a>`}).join('');
    const v4=db.versions.find(v=>String(v.id).toLowerCase()==='v4')||db.versions[0];
    const feats=document.querySelector('#latestFeatures');
    if(feats&&v4) feats.innerHTML=v4.features.map(f=>`<article class="feature-card"><div><span class="status-chip ${statusClass(f.status)}">${esc(f.status)}</span><small>${esc(f.type)}</small></div><h3>${esc(f.name)}</h3><p>${esc(f.description)}</p></article>`).join('');
    const featured=document.querySelector('#featuredResources');
    if(featured) featured.innerHTML=db.resources.filter(r=>r.image).slice(0,10).map(resourceCard).join('');
    const q=document.querySelector('#wikiSearch'),res=document.querySelector('#searchResults');
    if(q&&res) q.addEventListener('input',()=>{const s=q.value.trim().toLowerCase();if(!s){res.hidden=true;res.innerHTML='';return}const rows=db.resources.filter(r=>[r.name,r.realm,r.category,r.description,r.recipe].join(' ').toLowerCase().includes(s)).slice(0,12);res.hidden=false;res.innerHTML=rows.length?rows.map(resourceCard).join(''):'<div class="wiki-empty">Aucun résultat.</div>';});
  }

  function resources(db){
    const host=document.querySelector('#resourceDirectory'),search=document.querySelector('#resourceSearch'),cat=document.querySelector('#resourceCategory'),realm=document.querySelector('#resourceRealm');if(!host)return;
    [...new Set(db.resources.map(r=>r.category))].forEach(v=>cat.insertAdjacentHTML('beforeend',`<option>${esc(v)}</option>`));
    [...new Set(db.resources.map(r=>r.realm))].forEach(v=>realm.insertAdjacentHTML('beforeend',`<option>${esc(v)}</option>`));
    const p=new URLSearchParams(location.search);if(p.get('categorie'))cat.value=p.get('categorie');
    const render=()=>{const q=search.value.trim().toLowerCase();const rows=db.resources.filter(r=>(!q||[r.name,r.realm,r.category,r.description,r.recipe].join(' ').toLowerCase().includes(q))&&(cat.value==='Toutes'||r.category===cat.value)&&(realm.value==='Tous'||r.realm===realm.value));document.querySelector('#resourceCount').textContent=rows.length;host.innerHTML=rows.length?rows.map(resourceCard).join(''):'<div class="wiki-empty">Aucune ressource.</div>';};
    search.addEventListener('input',render);cat.addEventListener('change',render);realm.addEventListener('change',render);render();
  }

  function news(db){
    const host=document.querySelector('#versionTimeline');if(!host)return;
    host.innerHTML=db.versions.map(v=>`<section class="version-block"><div class="version-heading"><div><span class="overline">Mise à jour publiée</span><h2>${esc(v.name)}</h2></div><span class="status-chip ${statusClass(v.status)}">${esc(v.status)}</span></div><p class="version-summary">${esc(v.summary)}</p><div class="feature-grid">${v.features.map(f=>`<article class="feature-card"><div><span class="status-chip ${statusClass(f.status)}">${esc(f.status)}</span><small>${esc(f.type)}</small></div><h3>${esc(f.name)}</h3><p>${esc(f.description)}</p></article>`).join('')}</div></section>`).join('');
  }

  function economy(db){
    const e=db.economy,byName=new Map(db.resources.map(r=>[r.name,r]));
    const stats=document.querySelector('#economyStats');if(stats)stats.innerHTML=`<div><strong>${e.kingdomProducts}</strong><span>produits royaume</span></div><div><strong>${e.transformedProducts}</strong><span>transformations</span></div><div><strong>${e.kingdomConsumables}</strong><span>consommables</span></div><div><strong>${e.craftStructures}</strong><span>structures craft</span></div>`;
    document.querySelector('#stationGrid').innerHTML=e.commonStations.map(s=>`<article class="feature-card"><small>${esc(s.base)}</small><h3>${esc(s.name)}</h3><p>${esc(s.role)}</p></article>`).join('');
    document.querySelector('#economyRules').innerHTML=e.rules.map(x=>`<li>${esc(x)}</li>`).join('');
    const realms=['Asharun','Falkheim','Shintai','Vanloria','Nerethis','Erythros'];
    document.querySelector('#realmEconomy').innerHTML=realms.map(realm=>{const tr=e.transformations.filter(x=>x.realm===realm),co=e.consumables.filter(x=>x.realm===realm),crops=(e.crops[realm]||[]).join(', ');return `<section class="realm-economy-block realm-${realm.toLowerCase()}"><div class="realm-economy-head"><h3>${esc(realm)}</h3><span>${tr.length} transformations · ${co.length} consommables</span></div><p><strong>Cultures :</strong> ${esc(crops)}</p><div class="economy-columns"><div><h4>Transformations</h4>${tr.map(x=>{const r=byName.get(x.name)||x;return `<div class="economy-row visual-row">${visual(r,'mini-item')}<div><b>${esc(x.name)}</b><span>${esc(x.station)}</span><small>${esc(x.recipe)} → ×${esc(x.yield)}</small></div></div>`}).join('')}</div><div><h4>Consommables</h4>${co.map(x=>`<div class="economy-row visual-row">${visual(x,'mini-item')}<div><b>${esc(x.name)}</b><span>${esc(x.station)}</span><small>${esc(x.trade)}</small></div></div>`).join('')}</div></div></section>`}).join('');
  }

  function consumables(db){
    const e=db.economy,realms=['Asharun','Falkheim','Shintai','Vanloria','Nerethis','Erythros'];
    document.querySelector('#kingdomConsumables').innerHTML=realms.map(realm=>`<section class="realm-economy-block realm-${realm.toLowerCase()}"><div class="realm-economy-head"><h3>${esc(realm)}</h3><span>${e.consumables.filter(x=>x.realm===realm).length} recettes</span></div><div class="consumable-chip-grid">${e.consumables.filter(x=>x.realm===realm).map(x=>`<div class="consumable-chip">${visual(x,'consumable-image')}<div><strong>${esc(x.name)}</strong><small>${esc(x.trade)}</small></div></div>`).join('')}</div></section>`).join('');
    document.querySelector('#vanillaConsumables').innerHTML=e.vanillaReworked.map(x=>`<div class="vanilla-row"><span>${esc(x.source)}</span><b>→</b><strong>${esc(x.name)}</strong></div>`).join('');
  }

  fetch(dataUrl).then(r=>r.json()).then(db=>{const page=document.body.dataset.wikiPage;if(page==='home')home(db);if(page==='resources')resources(db);if(page==='news')news(db);if(page==='economy')economy(db);if(page==='consumables')consumables(db)}).catch(e=>console.error(e));
})();
