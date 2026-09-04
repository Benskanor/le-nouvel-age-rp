(() => {
  const script = document.currentScript;
  const root = new URL("../../", script.src);
  const dataUrl = new URL("data/wiki.json", root);
  const slug = document.body.dataset.resourceSlug;

  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));

  const value = (v) => v ? esc(v) : '<span class="undocumented">À documenter</span>';

  fetch(dataUrl).then(r => r.json()).then(db => {
    const r = db.resources.find(x => x.slug === slug);
    if (!r) throw new Error("Ressource inconnue");

    document.title = `${r.name} | Wiki Le Nouvel Âge`;
    document.querySelector("#resourceTitle").textContent = r.name;
    document.querySelector("#resourceCategoryLabel").textContent = `${r.category} · ${r.version}`;
    document.querySelector("#resourceLead").textContent = r.description;
    document.querySelector("#resourceBigIcon").textContent = r.icon;

    const info = document.querySelector("#resourceInfobox");
    info.innerHTML = `
      <div class="infobox-title">${esc(r.name)}</div>
      <div class="infobox-icon">${esc(r.icon)}</div>
      <dl>
        <div><dt>Type</dt><dd>${esc(r.category)}</dd></div>
        <div><dt>Royaume</dt><dd>${esc(r.realm)}</dd></div>
        <div><dt>Ajout</dt><dd>${esc(r.version)}</dd></div>
        <div><dt>État</dt><dd><span class="status-chip available">${esc(r.status)}</span></dd></div>
        <div><dt>Poids</dt><dd>${value(r.weight)}</dd></div>
        <div><dt>Taille de pile</dt><dd>${value(r.stack)}</dd></div>
      </dl>`;

    document.querySelector("#obtentionText").textContent = r.obtention;
    document.querySelector("#usesList").innerHTML = (r.uses?.length ? r.uses : ["À documenter"]).map(x => `<li>${esc(x)}</li>`).join("");

    const tech = r.technical || {};
    document.querySelector("#technicalGrid").innerHTML = `
      <div><span>Blueprint</span><code>${value(tech.blueprint)}</code></div>
      <div><span>Commande GFI</span><code>${value(tech.gfi)}</code></div>
      <div><span>Classe</span><code>${value(tech.class)}</code></div>`;

    const related = db.resources.filter(x => x.slug !== r.slug && (x.category === r.category || x.realm === r.realm)).slice(0,4);
    document.querySelector("#relatedResources").innerHTML = related.map(x => `
      <a href="${new URL(`wiki/ressources/${x.slug}/`, root)}"><span>${esc(x.icon)}</span><div><small>${esc(x.category)}</small><strong>${esc(x.name)}</strong></div></a>
    `).join("");
  }).catch(err => {
    console.error(err);
    document.querySelector("#resourceLead").textContent = "Cette fiche n’a pas pu être chargée.";
  });
})();