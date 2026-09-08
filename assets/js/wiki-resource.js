(() => {
  const script = document.currentScript;
  const root = new URL('../../', script.src);
  const dataUrl = new URL('data/wiki.json', root);
  const slug = document.body.dataset.resourceSlug;
  const $ = sel => document.querySelector(sel);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const has = value => !(value === undefined || value === null || value === '' || value === '—');
  const text = value => has(value) ? esc(value) : '<span class="undocumented">Non documenté</span>';
  const imgUrl = path => path ? new URL(path, root).href : '';
  const articleUrl = id => new URL(`wiki/ressources/${id}/`, root).href;
  const initials = name => String(name || 'LNA').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase();

  const recipeParts = recipe => {
    if (!has(recipe)) return [];
    const raw = String(recipe).trim();
    if (/^(loot direct|récolte|aucun)$/i.test(raw)) return [raw];
    return raw.split(/\s+\+\s+/).map(x=>x.trim()).filter(Boolean);
  };

  const statLabel = key => ({food:'Nourriture',water:'Eau',health:'Santé',stamina:'Endurance'}[key] || key);
  const signed = value => {
    if (value === undefined || value === null || value === '') return '—';
    const n = Number(value);
    if (!Number.isNaN(n)) return `${n > 0 ? '+' : ''}${String(n).replace('.', ',')}`;
    return String(value);
  };

  fetch(dataUrl).then(r => {
    if (!r.ok) throw new Error(`wiki.json ${r.status}`);
    return r.json();
  }).then(db => {
    const item = db.resources.find(x => x.slug === slug);
    if (!item) throw new Error(`Ressource inconnue : ${slug}`);
    const tech = item.technical || {};

    document.title = `${item.name} | Wiki Le Nouvel Âge RP`;
    $('#resourceTitle').textContent = item.name;
    $('#resourceCategoryLabel').textContent = item.name;
    $('#resourceLead').textContent = item.description || 'Aucune description documentée.';
    $('#resourceBadges').innerHTML = [item.category, item.realm, item.version, item.status].filter(Boolean).map(v => `<span>${esc(v)}</span>`).join('');

    $('#generalText').textContent = item.description || 'Aucune généralité supplémentaire n’est documentée pour cette fiche.';
    const uses = Array.isArray(item.uses) ? item.uses.filter(Boolean) : [];
    $('#usesSummary').innerHTML = uses.length
      ? `<strong>Rôle principal</strong><span>${uses.map(esc).join(' · ')}</span>`
      : `<strong>Rôle principal</strong><span class="undocumented">Non documenté</span>`;

    $('#craftStation').innerHTML = text(item.station);
    $('#craftYield').innerHTML = has(item.yield) ? `×${esc(item.yield)}` : '<span class="undocumented">Non documenté</span>';
    $('#craftTime').innerHTML = text(item.craftTime);
    const parts = recipeParts(item.recipe);
    $('#recipeComponents').innerHTML = parts.length
      ? parts.map((part, i) => `<div class="recipe-component"><span>${i+1}</span><strong>${esc(part)}</strong></div>`).join('')
      : '<div class="wiki-empty">Aucune recette documentée.</div>';
    $('#obtentionText').innerHTML = `<strong>Obtention :</strong> ${text(item.obtention)}`;

    const stats = item.stats || {};
    const statEntries = Object.entries(stats).filter(([,v]) => v !== undefined && v !== null && v !== '');
    $('#statsGrid').innerHTML = statEntries.length
      ? statEntries.map(([k,v]) => `<div><span>${esc(statLabel(k))}</span><strong>${esc(signed(v))}</strong></div>`).join('')
      : '<div class="stats-none">Aucune valeur de consommation documentée pour cette ressource.</div>';
    const effectNone = !has(item.effect) || /^aucun$/i.test(String(item.effect).trim());
    $('#effectPanel').innerHTML = effectNone
      ? '<div class="effect-none"><strong>Effet temporaire</strong><span>Aucun effet temporaire documenté.</span></div>'
      : `<div><strong>Effet temporaire</strong><p>${esc(item.effect)}</p>${has(item.buffDuration) ? `<small>Durée : ${esc(item.buffDuration)}</small>` : ''}</div>`;

    $('#spoilRows').innerHTML = `<tr><td>Objet de base</td><td>${has(item.spoil) ? esc(item.spoil) : '<span class="undocumented">Non documentée</span>'}</td></tr>`;

    $('#tradePanel').innerHTML = has(item.trade)
      ? `<strong>Dépendances / commerce</strong><p>${esc(item.trade)}</p>`
      : `<strong>Dépendances / commerce</strong><p class="undocumented">Aucune dépendance commerciale spécifique documentée.</p>`;
    $('#usesList').innerHTML = uses.length ? uses.map(v => `<li>${esc(v)}</li>`).join('') : '<li class="undocumented">Utilisations non documentées.</li>';

    const technicalRows = [
      ['PrimalItem / classe', tech.primalItem || tech.blueprint],
      ['EngramEntry', tech.engramClass || tech.engram],
      ['Rôle de l’Engram', tech.engramRole],
      ['Source vanilla', item.sourceVanilla || tech.sourceVanilla],
      ['Intégration / remap', tech.integration],
      ['Buff Blueprint', tech.buffBlueprint],
      ['Nom du buff', item.buffName],
      ['Réglages du buff', item.buffSettings],
      ['Cumul', item.stacking],
      ['Commande GFI', tech.gfi],
      ['Pondération pêche', item.lootWeight],
      ['Niveau réf.', item.levelRef],
      ['EP réf.', item.epRef]
    ];
    $('#technicalGrid').innerHTML = technicalRows.map(([label,value]) => `<div><span>${esc(label)}</span><code>${text(value)}</code></div>`).join('');

    const icon = item.image
      ? `<img src="${imgUrl(item.image)}" alt="${esc(item.name)}">`
      : `<span class="infobox-fallback">${esc(item.icon || initials(item.name))}</span>`;
    const infoboxRows = [
      ['Type', item.category], ['Origine', item.realm], ['Version', item.version], ['État', item.status],
      ['Station', item.station], ['Rendement', has(item.yield) ? `×${item.yield}` : null], ['Temps de craft', item.craftTime],
      ['Péremption', item.spoil], ['Stack', item.stack], ['Poids', item.weight]
    ];
    $('#resourceInfobox').innerHTML = `
      <div class="infobox-title">${esc(item.name)}</div>
      <div class="infobox-icon ${item.image ? 'has-image' : ''}">${icon}</div>
      <dl>${infoboxRows.map(([k,v]) => `<div><dt>${esc(k)}</dt><dd>${text(v)}</dd></div>`).join('')}</dl>
      ${(has(item.levelRef) || has(item.epRef)) ? `<div class="infobox-note"><strong>Progression</strong><p>Niveau ${has(item.levelRef)?esc(item.levelRef):'—'} · ${has(item.epRef)?esc(item.epRef):'—'} EP. Le guide les conserve comme repères d’équilibrage ; leur utilisation effective dépend de la configuration serveur.</p></div>` : ''}`;

    const direct = [...(item.ingredientSlugs || []), ...(item.usedInSlugs || [])];
    const directSet = new Set(direct);
    const related = [
      ...direct.map(slug => db.resources.find(x => x.slug === slug)).filter(Boolean),
      ...db.resources.filter(x => x.slug !== item.slug && !directSet.has(x.slug) && (x.realm === item.realm || x.category === item.category))
    ].filter((x,i,arr) => x && arr.findIndex(y => y.slug === x.slug) === i).slice(0,6);
    $('#relatedResources').innerHTML = related.length ? related.map(x => `
      <a href="${articleUrl(x.slug)}">
        ${x.image ? `<img src="${imgUrl(x.image)}" alt="">` : `<span class="related-fallback">${esc(x.icon || initials(x.name))}</span>`}
        <div><small>${esc(x.category)} · ${esc(x.realm)}</small><strong>${esc(x.name)}</strong></div>
      </a>`).join('') : '<div class="wiki-empty">Aucune fiche liée.</div>';
  }).catch(err => {
    console.error(err);
    const lead = $('#resourceLead');
    if (lead) lead.textContent = 'Cette fiche n’a pas pu être chargée.';
  });
})();
