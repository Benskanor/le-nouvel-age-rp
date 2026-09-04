(() => {
  const script = document.currentScript;
  const root = new URL("../../", script.src);
  const here = location.pathname;

  const links = [
    ["Royaumes", "royaumes/"],
    ["Territoire", "territoire/"],
    ["Bestiaire", "bestiaire/"],
    ["Activités", "activites/"],
    ["Métiers", "metiers/"],
    ["Personnages", "personnages/"],
    ["Wiki", "wiki/"],
    ["Nouveautés", "wiki/nouveautes/"],
    ["Règlement", "reglement/"]
  ];

  const header = document.querySelector("#wiki-site-header");
  if (header) {
    const nav = links.map(([label, href]) => {
      const active = (label === "Wiki" && here.includes("/wiki/") && !here.includes("/nouveautes/")) || (label === "Nouveautés" && here.includes("/wiki/nouveautes/")) ? " active" : "";
      return `<a class="${active.trim()}" href="${new URL(href, root)}">${label}</a>`;
    }).join("");

    header.innerHTML = `
      <header class="site-header">
        <a class="brand" href="${root}">
          <span class="brand-seal">LNA</span>
          <span><strong>Le Nouvel Âge</strong><small>RP ARK · Ragnarok</small></span>
        </a>
        <nav class="top-nav">${nav}</nav>
        <details class="mobile-menu">
          <summary>Explorer</summary>
          <nav>
            <a href="${root}">Portail</a>
            <a href="${new URL("royaumes/", root)}">Royaumes</a>
            <a href="${new URL("personnages/", root)}">Personnages</a>
            <a href="${new URL("wiki/", root)}">Wiki du mod</a>
            <a href="${new URL("wiki/economie/", root)}">Économie V4</a><a href="${new URL("wiki/ressources/", root)}">Ressources</a><a href="${new URL("wiki/consommables/", root)}">Consommables</a><a href="${new URL("wiki/nouveautes/", root)}">Nouveautés</a>
            <a href="${new URL("reglement/", root)}">Règlement</a>
          </nav>
        </details>
      </header>`;
  }

  const footer = document.querySelector("#wiki-site-footer");
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer wiki-footer">
        <div>
          <span class="brand-seal">LNA</span>
          <p><strong>Le Nouvel Âge RP ARK</strong><small>Wiki officiel du mod</small></p>
        </div>
        <a href="${root}">Retour au portail ↑</a>
      </footer>`;
  }
})();