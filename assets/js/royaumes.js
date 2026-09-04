(() => {
  const script = document.currentScript;
  const siteRoot = new URL("../../", script.src);

  const cleanRoute = () => {
    const page = new URL(window.location.href);
    let path = page.pathname;
    const root = siteRoot.pathname.endsWith("/") ? siteRoot.pathname : siteRoot.pathname + "/";
    if (path.startsWith(root)) path = path.slice(root.length);
    path = path.replace(/index\.html$/, "").replace(/^\/+|\/+$/g, "");
    return path;
  };

  const setText = (el, value) => {
    if (el && value !== undefined && value !== null) el.textContent = value;
  };

  const setMultilineHeading = (el, value) => {
    if (!el || value === undefined || value === null) return;
    el.innerHTML = String(value).split("\n").map(x => x.trim()).join("<br>");
  };

  const setFirstDirectText = (el, value) => {
    if (!el || value === undefined || value === null) return;
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.textContent = value + " ";
        return;
      }
    }
  };

  const setTrailingDirectText = (el, value) => {
    if (!el || value === undefined || value === null) return;
    const textNodes = [...el.childNodes].filter(
      n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
    );
    if (textNodes.length) textNodes[textNodes.length - 1].textContent = " " + value;
  };

  function applyDirectory(data) {
    const hero = document.querySelector(".realms-hero");
    if (hero && data.hero) {
      const p = hero.querySelector("p");
      setFirstDirectText(p, data.hero.eyebrow);
      setMultilineHeading(hero.querySelector("h1"), data.hero.title);
      setText(hero.querySelector("strong"), data.hero.description);
      setText(hero.querySelector("a"), data.hero.button);
      const img = hero.querySelector("img");
      if (img && data.hero.image) img.src = new URL(data.hero.image, siteRoot).href;
      if (img && data.hero.imageAlt !== undefined) img.alt = data.hero.imageAlt;
    }

    const intro = document.querySelector(".realms-intro");
    if (intro && data.intro) {
      setText(intro.querySelector("small"), data.intro.eyebrow);
      setText(intro.querySelector("h2"), data.intro.title);
      setText(intro.querySelector("p"), data.intro.description);
    }

    const cards = [...document.querySelectorAll(".realm-card")];
    for (const c of data.cards || []) {
      const card = cards.find(el => (el.getAttribute("href") || "").includes(c.key));
      if (!card) continue;
      setText(card.querySelector("small"), c.orderLabel);
      setText(card.querySelector("h2"), c.name);
      const p = card.querySelector("p");
      setFirstDirectText(p, c.summary);
      const lis = [...card.querySelectorAll("li")];
      for (let i = 0; i < Math.min(3, lis.length, (c.values || []).length); i++) {
        // Nested LI markup from original capture: only replace direct text.
        setFirstDirectText(lis[i], c.values[i]);
      }
      setText(card.querySelector("b"), c.button);
      if (c.href) card.href = c.href;
      const img = card.querySelector(":scope > img");
      if (img && c.image) img.src = new URL(c.image, siteRoot).href;
      const flag = card.querySelector(".realm-flag-badge img");
      if (flag && c.flag) flag.src = new URL(c.flag, siteRoot).href;
    }

    const callout = document.querySelector(".realms-callout");
    if (callout && data.callout) {
      setText(callout.querySelector("small"), data.callout.eyebrow);
      setText(callout.querySelector("h2"), data.callout.title);
      setFirstDirectText(callout.querySelector("p"), data.callout.description);
    }
  }

  function applyRealm(realm) {
    const hero = document.querySelector(".vanloria-hero");
    if (hero) {
      const copyP = hero.querySelector(".vanloria-hero-copy p");
      setFirstDirectText(copyP, realm.identity);
      setMultilineHeading(hero.querySelector("h1"), realm.motto);
      setText(hero.querySelector(".vanloria-hero-copy strong"), realm.intro);

      const links = [...hero.querySelectorAll(".vanloria-hero-copy a")];
      if (realm.buttons) {
        setText(links[0], realm.buttons.discover);
        setText(links[1], realm.buttons.chronicles);
      }

      const img = hero.querySelector("img");
      if (img && realm.heroImage) img.src = new URL(realm.heroImage, siteRoot).href;
      if (img && realm.heroAlt !== undefined) img.alt = realm.heroAlt;

      const stats = [...hero.querySelectorAll(".vanloria-hero-record > span")];
      (realm.stats || []).forEach((stat, i) => {
        const row = stats[i];
        if (!row) return;
        setText(row.querySelector("strong"), stat.value);
        setTrailingDirectText(row, stat.label);
      });
    }

    const valueCards = [...document.querySelectorAll(".vanloria-pillars > article")];
    (realm.values || []).forEach((value, i) => {
      const card = valueCards[i];
      if (!card) return;
      setText(card.querySelector("small"), value.number);
      setText(card.querySelector("h3"), value.name);
      setText(card.querySelector("p"), value.description);
    });

    const ending = document.querySelector(".vanloria-ending");
    if (ending && realm.ending) {
      setText(ending.querySelector("small"), realm.ending.eyebrow);
      setMultilineHeading(ending.querySelector("h2"), realm.ending.title);
      setText(ending.querySelector("p"), realm.ending.description);
    }
  }

  async function boot() {
    try {
      const response = await fetch(new URL("data/royaumes.json", siteRoot));
      if (!response.ok) return;
      const data = await response.json();
      const route = cleanRoute();

      if (route === "royaumes") {
        applyDirectory(data.directory);
        return;
      }

      const match = route.match(/^royaumes\/([^/]+)$/);
      if (match && data.realms?.[match[1]]) {
        applyRealm(data.realms[match[1]]);
      }
    } catch (err) {
      // En ouverture locale file://, le navigateur peut bloquer fetch.
      // Le HTML statique reste volontairement une copie fidèle et fonctionnelle.
      console.debug("[LNA] Données Royaumes non chargées; fallback HTML conservé.", err);
    }
  }

  boot();
})();
