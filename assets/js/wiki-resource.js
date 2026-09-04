(() => {
  const script = document.currentScript;
  const root = new URL("../../", script.src);
  const dataUrl = new URL("data/wiki.json", root);
  const slug = document.body.dataset.resourceSlug;
  const esc = v => String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const show = v => (v === undefined || v === null || v === "" || v === "—") ? '<span class="undocumented">Non applicable / non documenté</span>' : esc(v);

  fetch(dataUrl).then(r=>r.json()).then(db=>{
    const r=db.resources.find(x=>x.slug===slug);
    if(!r) throw new Error("Ressource inconnue");
    document.title=`${r.name} | Wiki Le Nouvel Âge`;
    document.querySelector("#resourceTitle").textContent=r.name;
    document.querySelector("#resourceCategoryLabel").textContent=`${r.category} · ${r.realm} · ${r.version}`;
    document.querySelector("#resourceLead").textContent=r.description;
    document.querySelector("#obtentionText").textContent=r.obtention || "—";
    document.querySelector("#usesList").innerHTML=(r.uses?.length?r.uses:["À documenter"]).map(x=>`<li>${esc(x)}</li>`).join("");

    const info=document.querySelector("#resourceInfobox");
    info.innerHTML=`
      <div class="infobox-title">${esc(r.name)}</div>
      <div class="infobox-icon">${esc(r.icon)}</div>
      <dl>
        <div><dt>Catégorie</dt><dd>${esc(r.category)}</dd></div>
        <div><dt>Origine</dt><dd>${esc(r.realm)}</dd></div>
        <div><dt>Version</dt><dd>${esc(r.version)}</dd></div>
        <div><dt>État</dt><dd>${esc(r.status)}</dd></div>
        <div><dt>Station</dt><dd>${show(r.station)}</dd></div>
        <div><dt>Rendement</dt><dd>${show(r.yield)}</dd></div>
        <div><dt>Stack</dt><dd>${show(r.stack)}</dd></div>
        <div><dt>Poids</dt><dd>${show(r.weight)}</dd></div>
        <div><dt>Péremption</dt><dd>${show(r.spoil)}</dd></div>
      </dl>`;

    document.querySelector("#recipeText").innerHTML=show(r.recipe);
    if(r.craftTime) document.querySelector("#craftTime").innerHTML=`<strong>Temps de craft :</strong> ${esc(r.craftTime)}`;
    else document.querySelector("#craftTime").innerHTML="";

    const tech=r.technical||{};
    document.querySelector("#technicalGrid").innerHTML=`
      <div><span>Blueprint / classe</span><code>${show(tech.blueprint)}</code></div>
      <div><span>Commande GFI</span><code>${show(tech.gfi)}</code></div>
      <div><span>Pondération pêche</span><code>${show(r.lootWeight)}</code></div>`;

    const related=db.resources.filter(x=>x.slug!==r.slug&&(x.category===r.category||x.realm===r.realm)).slice(0,6);
    document.querySelector("#relatedResources").innerHTML=related.map(x=>`
      <a href="${new URL(`wiki/ressources/${x.slug}/`,root)}"><span>${esc(x.icon)}</span><div><small>${esc(x.category)}</small><strong>${esc(x.name)}</strong></div></a>
    `).join("");
  }).catch(e=>{
    console.error(e);
    document.querySelector("#resourceLead").textContent="Cette fiche n’a pas pu être chargée.";
  });
})();