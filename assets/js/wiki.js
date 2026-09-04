(() => {
  const script = document.currentScript;
  const root = new URL("../../", script.src);
  const dataUrl = new URL("data/wiki.json", root);

  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));

  const resourceHref = (slug) => new URL(`wiki/ressources/${slug}/`, root).href;

  const statusClass = (s) => {
    const v = String(s || "").toLowerCase();
    if (v.includes("disponible")) return "available";
    if (v.includes("développement")) return "development";
    if (v.includes("prioritaire")) return "priority";
    return "planned";
  };

  function resourceCard(r) {
    return `<a class="wiki-resource-card" href="${resourceHref(r.slug)}" data-search="${esc([r.name,r.category,r.realm,r.description].join(" ").toLowerCase())}">
      <span class="resource-icon">${esc(r.icon)}</span>
      <span class="resource-copy">
        <small>${esc(r.category)} · ${esc(r.realm)}</small>
        <strong>${esc(r.name)}</strong>
        <em>${esc(r.description)}</em>
      </span>
      <span class="resource-version">${esc(r.version)}</span>
    </a>`;
  }

  function renderHome(db) {
    const resourceHost = document.querySelector("#featuredResources");
    if (resourceHost) {
      resourceHost.innerHTML = db.resources.slice(0, 8).map(resourceCard).join("");
    }

    const catHost = document.querySelector("#wikiCategories");
    if (catHost) {
      catHost.innerHTML = db.categories.map(c => {
        const count = db.resources.filter(r => r.category === c.name).length;
        return `<a class="wiki-category-card" href="${new URL(`wiki/ressources/?categorie=${encodeURIComponent(c.name)}`, root)}">
          <span>${esc(c.icon)}</span>
          <div><strong>${esc(c.name)}</strong><p>${esc(c.description)}</p><small>${count} fiche${count>1?"s":""}</small></div>
        </a>`;
      }).join("");
    }

    const latest = db.versions[0];
    const latestHost = document.querySelector("#latestFeatures");
    if (latestHost) {
      latestHost.innerHTML = latest.features.slice(0, 6).map(f => `
        <article class="feature-card">
          <div><span class="status-chip ${statusClass(f.status)}">${esc(f.status)}</span><small>${esc(f.type)}</small></div>
          <h3>${esc(f.name)}</h3><p>${esc(f.description)}</p>
        </article>`).join("");
    }

    const counts = {
      resources: db.resources.length,
      versions: db.versions.length,
      categories: db.categories.length
    };
    document.querySelectorAll("[data-count]").forEach(el => {
      el.textContent = counts[el.dataset.count] ?? "—";
    });

    const search = document.querySelector("#wikiSearch");
    const results = document.querySelector("#searchResults");
    if (search && results) {
      const run = () => {
        const q = search.value.trim().toLowerCase();
        if (!q) { results.innerHTML = ""; results.hidden = true; return; }
        const matches = db.resources.filter(r => [r.name,r.category,r.realm,r.description,...(r.uses||[])].join(" ").toLowerCase().includes(q)).slice(0,10);
        results.hidden = false;
        results.innerHTML = matches.length
          ? matches.map(resourceCard).join("")
          : `<div class="wiki-empty">Aucune fiche ne correspond à « ${esc(search.value)} ».</div>`;
      };
      search.addEventListener("input", run);
    }
  }

  function renderResources(db) {
    const host = document.querySelector("#resourceDirectory");
    if (!host) return;

    const search = document.querySelector("#resourceSearch");
    const cat = document.querySelector("#resourceCategory");
    const realm = document.querySelector("#resourceRealm");

    const categories = [...new Set(db.resources.map(r => r.category))];
    const realms = [...new Set(db.resources.map(r => r.realm))];

    categories.forEach(v => cat.insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`));
    realms.forEach(v => realm.insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`));

    const params = new URLSearchParams(location.search);
    if (params.get("categorie") && categories.includes(params.get("categorie"))) cat.value = params.get("categorie");

    const render = () => {
      const q = search.value.trim().toLowerCase();
      const rows = db.resources.filter(r =>
        (!q || [r.name,r.category,r.realm,r.description,...(r.uses||[])].join(" ").toLowerCase().includes(q)) &&
        (cat.value === "Toutes" || r.category === cat.value) &&
        (realm.value === "Tous" || r.realm === realm.value)
      );
      document.querySelector("#resourceCount").textContent = rows.length;
      host.innerHTML = rows.length ? rows.map(resourceCard).join("") : `<div class="wiki-empty">Aucune ressource avec ces filtres.</div>`;
    };

    [search,cat,realm].forEach(el => el.addEventListener(el.tagName === "INPUT" ? "input" : "change", render));
    render();
  }

  function renderNews(db) {
    const host = document.querySelector("#versionTimeline");
    if (!host) return;
    host.innerHTML = db.versions.map(v => `
      <section class="version-block">
        <div class="version-heading">
          <div><span class="overline">Mise à jour</span><h2>${esc(v.name)}</h2></div>
          <span class="status-chip ${statusClass(v.status)}">${esc(v.status)}</span>
        </div>
        <p class="version-summary">${esc(v.summary)}</p>
        <div class="feature-grid">
          ${v.features.map(f => `<article class="feature-card">
            <div><span class="status-chip ${statusClass(f.status)}">${esc(f.status)}</span><small>${esc(f.type)}</small></div>
            <h3>${esc(f.name)}</h3><p>${esc(f.description)}</p>
          </article>`).join("")}
        </div>
      </section>`).join("");
  }

  fetch(dataUrl).then(r => r.json()).then(db => {
    const page = document.body.dataset.wikiPage;
    if (page === "home") renderHome(db);
    if (page === "resources") renderResources(db);
    if (page === "news") renderNews(db);
  }).catch(err => {
    console.error(err);
    document.querySelectorAll(".wiki-loading").forEach(el => el.textContent = "Impossible de charger les données du Wiki.");
  });
})();