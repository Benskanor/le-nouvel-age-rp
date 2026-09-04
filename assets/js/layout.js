(() => {
  const script = document.currentScript;
  const siteRoot = new URL("../../", script.src);

  function currentRoute() {
    const pageUrl = new URL(window.location.href);
    let rel = pageUrl.pathname;

    const rootPath = siteRoot.pathname.endsWith("/")
      ? siteRoot.pathname
      : siteRoot.pathname + "/";

    if (rel.startsWith(rootPath)) {
      rel = rel.slice(rootPath.length - 1);
    }

    if (!rel.startsWith("/")) rel = "/" + rel;
    if (rel.endsWith("/index.html")) rel = rel.slice(0, -"index.html".length);
    if (rel === "/index.html") rel = "/";
    if (rel !== "/" && !rel.endsWith("/")) rel += "/";
    return rel;
  }

  function buildHeader(config) {
    if (!config) return "";

    const navItems = (config.nav_items || []).map(item => {
      const cls = item.class ? ` class="${item.class}"` : "";
      return `<a${cls} href="${item.href}">${item.text}</a>`;
    }).join("");

    const navClass = config.nav_class ? ` class="${config.nav_class}"` : "";
    const aria = config.nav_aria ? ` aria-label="${config.nav_aria}"` : "";

    return `
      <header class="${config.class || ""}">
        ${config.brand_html || ""}
        ${config.nav_items?.length ? `<nav${navClass}${aria}>${navItems}</nav>` : ""}
        ${config.mobile_link_html || ""}
        ${config.mobile_menu_html || ""}
      </header>
    `;
  }

  function buildFooter(config) {
    return config?.html || "";
  }

  async function injectLayout() {
    try {
      const response = await fetch(new URL("data/layout.json", siteRoot));
      const layout = await response.json();
      const route = currentRoute();
      const page = layout.pages[route] || layout.pages["/"];

      const headerTarget = document.getElementById("lna-site-header");
      const footerTarget = document.getElementById("lna-site-footer");

      if (headerTarget && page?.header) {
        headerTarget.outerHTML = buildHeader(page.header);
      }

      if (footerTarget && page?.footer) {
        footerTarget.outerHTML = buildFooter(page.footer);
      }
    } catch (error) {
      console.error("[LNA] Impossible de charger le layout partagé.", error);
    }
  }

  injectLayout();
})();
