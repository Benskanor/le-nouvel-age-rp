(() => {
  const script = document.currentScript;
  const siteRoot = new URL("../../", script.src);

  const REALMS = {
    asharun: {
      name: "Asharun",
      logo: "data:image/webp;base64,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",
      identity: "Civilisation des dunes, oasis et caravanes",
      description: "Une souveraineté désertique façonnée par les oasis, les routes caravanières, l’hospitalité et l’Esprit des Dunes."
    },
    falkheim: {
      name: "Falkheim",
      logo: "data:image/webp;base64,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",
      identity: "Clans nordiques, fjords et serments",
      description: "Une confédération de clans nordiques forgée par le froid, les fjords, les sagas et la force du serment collectif."
    },
    shintai: {
      name: "Shintai",
      logo: "data:image/webp;base64,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",
      identity: "Dynastie impériale, traditions et voie du sabre",
      description: "Une dynastie impériale où traditions, harmonie, spiritualité des kami et discipline martiale structurent la société."
    },
    vanloria: {
      name: "Vanloria",
      logo: "data:image/webp;base64,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",
      identity: "Royauté chevaleresque, forteresses et serments",
      description: "Un royaume chevaleresque bâti autour de la Couronne, des serments, des forteresses et du devoir de protection."
    },
    nerethis: {
      name: "Nerethis",
      logo: "data:image/webp;base64,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",
      identity: "Peuple corsaire, flottes et cités maritimes",
      description: "Un peuple maritime et corsaire attaché à la liberté, aux flottes et aux routes océanes après la perte de sa terre."
    },
    erythros: {
      name: "Erythros",
      logo: "data:image/webp;base64,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",
      identity: "Cités antiques, philosophie et héritage hellénique",
      description: "Des cités d’inspiration hellénique où citoyenneté, justice, savoir, commerce et institutions façonnent la vie commune."
    }
  };

  const JOBS = [
    {
      icon: "⚒️",
      name: "Forgeron / Armurier",
      description: "Raffine les métaux, forge les armes et entretient les équipements du royaume.",
      output: "Armes, outils, armures et réparations"
    },
    {
      icon: "🌾",
      name: "Tavernier / Agriculteur",
      description: "Cultive, transforme, cuisine et fait vivre les tavernes et les exploitations.",
      output: "Récoltes, repas, boissons et élevage agricole"
    },
    {
      icon: "🦖",
      name: "Dompteur / Reproducteur",
      description: "Apprivoise les créatures, fabrique leurs selles et développe les lignées.",
      output: "Montures, élevage, selles et reproduction"
    },
    {
      icon: "🏗️",
      name: "Bâtisseur / Charpentier",
      description: "Conçoit les bâtiments, mène les chantiers et construit les ouvrages du royaume.",
      output: "Habitations, ateliers, navires et ouvrages publics"
    },
    {
      icon: "🪑",
      name: "Menuisier / Ingénieur",
      description: "Équipe les intérieurs et développe mobilier, rangement, logistique et engins.",
      output: "Mobilier, contenants, transport et machines de siège"
    },
    {
      icon: "🧪",
      name: "Alchimiste / Médecin",
      description: "Transforme plantes et composants en préparations utiles à la survie et aux autres métiers.",
      output: "Remèdes, poudres, antidotes et préparations"
    }
  ];

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

  function injectGlobalStyle() {
    if (document.getElementById("lna-global-overrides")) return;

    const style = document.createElement("style");
    style.id = "lna-global-overrides";
    style.textContent = `
      :root {
        --night: #0c0b0f !important;
        --panel: #17151b !important;
        --ink: #f4efe7 !important;
        --muted: #b8b1a8 !important;
        --gold: #c9a767 !important;
        --gold-soft: #f0d79c !important;
        --line: rgba(210, 177, 109, .2) !important;
      }

      html { font-size: 18px !important; }
      body {
        background: radial-gradient(circle at 50% -15%, #25212b 0, #100f13 38%, #0a090c 72%) fixed !important;
        color: #f4efe7 !important;
        font-size: 17px !important;
        line-height: 1.65 !important;
      }

      main p:not(.overline), main li { font-size: 16px !important; line-height: 1.72 !important; }
      main small { font-size: 13px !important; line-height: 1.45 !important; }
      main h1 { font-size: clamp(44px, 6vw, 82px) !important; line-height: .98 !important; }
      main h2 { font-size: clamp(32px, 4vw, 56px) !important; line-height: 1.08 !important; }
      main h3 { font-size: clamp(21px, 2.4vw, 30px) !important; line-height: 1.18 !important; }
      main h4 { font-size: 19px !important; line-height: 1.25 !important; }

      .overline,
      [class*="overline"],
      [class*="eyebrow"],
      .section-number,
      .side-nav > p,
      [class*="sidebar"] > p,
      [class*="sidebar"] > div > p {
        font-size: 12px !important;
        line-height: 1.45 !important;
      }

      .site-header,
      [class$="-header"] {
        background: rgba(12, 11, 15, .94) !important;
        border-color: rgba(210, 177, 109, .2) !important;
      }

      .brand strong,
      [class*="brand"] strong { font-size: 18px !important; }
      .brand small,
      [class*="brand"] small { font-size: 11px !important; }

      .top-nav,
      .top-nav a,
      header nav a,
      [class*="header"] nav a,
      [class*="sidebar"] a,
      .side-nav > a,
      .mobile-menu nav a {
        font-size: 14px !important;
        line-height: 1.4 !important;
      }

      .side-nav > a { font-size: 15px !important; padding-block: 14px !important; }
      .side-nav > a > span { font-size: 11px !important; }
      .button, button, [role="button"] { font-size: 14px !important; }

      .portal-hero .hero-shade {
        background: linear-gradient(90deg, rgba(8, 7, 10, .97) 5%, rgba(11, 10, 14, .82) 45%, rgba(11, 10, 14, .3) 78%),
                    linear-gradient(transparent 45%, rgba(8, 7, 10, .95)) !important;
      }
      .site-header,
      .hero-status,
      .live-chip,
      .mobile-menu nav { background-color: rgba(12, 11, 15, .9) !important; }

      .quick-grid > a,
      .profession-grid > article,
      .kingdom-card,
      .principle,
      .profession-cta,
      .religion-preview-cta,
      .demigod-preview-cta,
      .faction-preview-cta,
      .player-tools-grid > a {
        background: linear-gradient(145deg, #1a171f, #111015) !important;
        border-color: rgba(210, 177, 109, .18) !important;
      }

      .kingdom-card {
        background: linear-gradient(145deg, color-mix(in srgb, var(--accent, #8b7d9b) 11%, #17151b), #111015 72%) !important;
      }

      .hero-copy > p:not(.overline) { font-size: 18px !important; line-height: 1.72 !important; }
      .live-chip { font-size: 12px !important; }
      .hero-status span { font-size: 12px !important; min-width: 150px !important; }
      .hero-status strong { font-size: 23px !important; }

      .quick-grid span,
      .quick-grid b,
      .principle > span,
      .profession-grid small,
      .kingdom-body small { font-size: 12px !important; }
      .quick-grid p,
      .profession-grid p,
      .profession-grid strong,
      .kingdom-body p,
      .kingdom-body li { font-size: 15px !important; }
      .kingdom-heading small { font-size: 12px !important; }
      .kingdom-heading em { font-size: 14px !important; line-height: 1.45 !important; }

      .quick-grid.lna-player-path { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
      .quick-grid.lna-player-path > a { min-height: 250px !important; }
      .quick-grid.lna-player-path h3 { margin-top: 28px !important; }

      .job-mark {
        font-size: 24px !important;
        line-height: 1 !important;
        display: grid !important;
        place-items: center !important;
      }

      .lna-realm-logo {
        width: 38px;
        height: 38px;
        object-fit: contain;
        display: inline-block;
        vertical-align: middle;
        flex: 0 0 auto;
        filter: drop-shadow(0 4px 10px rgba(0, 0, 0, .35));
      }
      .kingdom-mark .lna-realm-logo { width: 44px; height: 44px; }
      .realm-card h2 { display: flex !important; align-items: center !important; gap: 10px !important; }
      .realm-card h2 .lna-realm-logo { width: 36px; height: 36px; }
      .realms-callout a { display: inline-flex !important; align-items: center !important; gap: 7px !important; }
      .realms-callout a .lna-realm-logo { width: 24px; height: 24px; }
      .lna-realm-inline { display: inline-flex !important; align-items: center !important; gap: 8px !important; }
      .lna-realm-inline .lna-realm-logo { width: 28px; height: 28px; }
      .lna-realm-hero-badge {
        display: inline-flex !important;
        align-items: center !important;
        gap: 10px !important;
      }
      .lna-realm-hero-badge .lna-realm-logo { width: 46px; height: 46px; }

      .discord-join-card {
        border: 1px solid rgba(210, 177, 109, .35);
        background: linear-gradient(135deg, rgba(92, 76, 120, .22), rgba(20, 17, 25, .94));
        display: grid;
        gap: 7px;
        margin: 28px 0 22px;
        padding: 22px 24px;
        text-decoration: none;
        transition: transform .2s ease, border-color .2s ease;
      }
      .discord-join-card:hover { transform: translateY(-2px); border-color: #c9a767; }
      .discord-join-card span { color: #c9a767; text-transform: uppercase; letter-spacing: .14em; font-size: 12px; font-weight: 800; }
      .discord-join-card strong { font-family: Georgia, "Times New Roman", serif; font-size: 26px; font-weight: 500; }
      .discord-join-card small { color: #b8b1a8; font-size: 14px !important; }
      .discord-join-card b { color: #f0d79c; font-size: 14px; margin-top: 5px; }

      @media (max-width: 1100px) {
        .quick-grid.lna-player-path { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .hero-status { max-width: calc(100% - 48px); flex-wrap: wrap !important; }
      }
      @media (max-width: 720px) {
        html { font-size: 17px !important; }
        body { font-size: 16px !important; }
        main p:not(.overline), main li { font-size: 16px !important; }
        main h1 { font-size: clamp(38px, 11vw, 56px) !important; }
        main h2 { font-size: clamp(30px, 8vw, 44px) !important; }
        main h3 { font-size: 22px !important; }
        .quick-grid.lna-player-path { grid-template-columns: 1fr !important; }
        .hero-status span { min-width: 50% !important; }
        .discord-join-card strong { font-size: 23px; }
      }
    `;
    document.head.appendChild(style);
  }

  function logoFor(key, extraClass = "") {
    const realm = REALMS[key];
    if (!realm) return null;
    const img = document.createElement("img");
    img.className = `lna-realm-logo ${extraClass}`.trim();
    img.src = new URL(realm.logo, siteRoot).href;
    img.alt = `Emblème de ${realm.name}`;
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }

  function enhanceHome() {
    const overline = document.querySelector(".portal-hero .hero-copy > .overline");
    if (overline) overline.textContent = "Bienvenue sur Le Nouvel Âge RP";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = "Serveur RP francophone sur ARK: Survival Ascended : 6 royaumes, 12 métiers, 36 combinaisons et un monde évolutif façonné par les joueurs.";

    const heroStatus = [...document.querySelectorAll(".hero-status > span")];
    const sellingPoints = [
      ["6", "royaumes jouables"],
      ["36", "combinaisons de métiers"],
      ["RP", "monde évolutif"],
      ["LNA", "contenu exclusif"]
    ];
    heroStatus.forEach((el, i) => {
      if (!sellingPoints[i]) return;
      el.innerHTML = `<strong>${sellingPoints[i][0]}</strong>${sellingPoints[i][1]}`;
    });

    const startTitle = document.querySelector("#depart .section-title > div .overline");
    if (startTitle) startTitle.textContent = "Votre parcours en 4 étapes";
    const startDescription = document.querySelector("#depart .section-title > p");
    if (startDescription) startDescription.textContent = "Suivez ces étapes dans l’ordre pour arriver en jeu avec un personnage cohérent et prêt à rejoindre le RP.";

    const quickGrid = document.querySelector("#depart .quick-grid");
    if (quickGrid) {
      quickGrid.classList.add("lna-player-path");
      quickGrid.innerHTML = `
        <a href="reglement/"><span>Étape 1</span><h3>Lire le règlement</h3><p>Comprenez les règles RP, les limites de construction et le fonctionnement général du serveur.</p><b>Commencer ici →</b></a>
        <a href="royaumes/"><span>Étape 2</span><h3>Choisir son royaume</h3><p>Comparez les six cultures, leurs valeurs, leur histoire et leur manière de vivre dans le Nouveau Monde.</p><b>Voir les royaumes →</b></a>
        <a href="metiers/"><span>Étape 3</span><h3>Choisir ses métiers</h3><p>Sélectionnez 1 métier principal et 1 métier secondaire parmi 36 combinaisons possibles.</p><b>Voir les 12 métiers →</b></a>
        <a href="creer-son-personnage/"><span>Étape 4</span><h3>Créer son personnage</h3><p>Préparez votre fiche RP, rejoignez le Discord puis faites valider votre arrivée sur le serveur.</p><b>Créer ma fiche →</b></a>
      `;
    }

    document.querySelectorAll(".kingdom-card").forEach(card => {
      const key = Object.keys(REALMS).find(k => card.classList.contains(k) || (k === "falkheim" && card.classList.contains("falkeim")));
      if (!key) return;
      const realm = REALMS[key];
      const mark = card.querySelector(".kingdom-mark");
      if (mark && !mark.querySelector("img")) {
        mark.textContent = "";
        mark.appendChild(logoFor(key));
      }
      const identity = card.querySelector(".kingdom-heading em");
      if (identity) identity.textContent = realm.identity;
      const bodyText = card.querySelector(".kingdom-body > p");
      if (bodyText) {
        const textNode = [...bodyText.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (textNode) textNode.textContent = `${realm.description} `;
      }
    });

    const professionCards = [...document.querySelectorAll("#metiers .profession-grid > article")];
    professionCards.forEach((card, i) => {
      const job = JOBS[i];
      if (!job) return;
      const mark = card.querySelector(".job-mark");
      const title = card.querySelector("h3");
      const description = card.querySelector("p");
      const output = card.querySelector("div > strong");
      if (mark) mark.textContent = job.icon;
      if (title) title.textContent = job.name;
      if (description) description.textContent = job.description;
      if (output) output.textContent = job.output;
    });

    const professionCtaTitle = document.querySelector(".profession-cta h3");
    if (professionCtaTitle) professionCtaTitle.textContent = "6 principaux + 6 secondaires = 36 combinaisons possibles";
    const professionCtaText = document.querySelector(".profession-cta p");
    if (professionCtaText) professionCtaText.textContent = "Chaque personnage choisit un métier principal et un métier secondaire : assez de liberté pour se distinguer, sans pouvoir tout faire seul.";

    document.querySelectorAll(".religion-preview-card").forEach(card => {
      const key = Object.keys(REALMS).find(k => card.classList.contains(k) || (k === "falkheim" && card.classList.contains("falkeim")));
      const marker = card.querySelector(":scope > span");
      if (!key || !marker || marker.querySelector("img")) return;
      marker.textContent = "";
      marker.appendChild(logoFor(key));
    });

    const join = document.querySelector("#rejoindre");
    if (join) {
      const joinLead = join.querySelector(":scope > p:not(.overline)");
      if (joinLead) {
        const directText = [...joinLead.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (directText) directText.textContent = "Lisez les règles, choisissez votre royaume et vos métiers, préparez votre fiche puis rejoignez la communauté sur Discord. ";
      }

      const listItems = [...join.querySelectorAll("ol > li")];
      const steps = [
        "Lire le règlement",
        "Choisir un royaume",
        "Choisir 1 métier principal + 1 secondaire",
        "Créer sa fiche et rejoindre le Discord"
      ];
      const ol = join.querySelector("ol");
      if (ol) {
        ol.innerHTML = steps.map((label, i) => `<li><span>${i + 1}</span>${label}</li>`).join("");
      } else if (listItems.length) {
        listItems.forEach((li, i) => {
          if (steps[i]) li.innerHTML = `<span>${i + 1}</span>${steps[i]}`;
        });
      }

      if (!join.querySelector(".discord-join-card")) {
        const discord = document.createElement("a");
        discord.className = "discord-join-card";
        discord.href = "https://discord.gg/8bq6qZjEpe";
        discord.target = "_blank";
        discord.rel = "noopener noreferrer";
        discord.innerHTML = `
          <span>Discord officiel</span>
          <strong>Rejoindre Le Nouvel Âge RP</strong>
          <small>Fiches de personnage, annonces, entraide, échanges entre royaumes et organisation du serveur.</small>
          <b>Ouvrir l’invitation Discord ↗</b>
        `;
        const actions = join.querySelector(".join-actions");
        if (actions) join.insertBefore(discord, actions);
        else join.appendChild(discord);
      }

      const actions = join.querySelector(".join-actions");
      if (actions && !actions.querySelector("a[href^='https://discord.gg/']")) {
        const discordButton = document.createElement("a");
        discordButton.className = "button primary";
        discordButton.href = "https://discord.gg/8bq6qZjEpe";
        discordButton.target = "_blank";
        discordButton.rel = "noopener noreferrer";
        discordButton.textContent = "Rejoindre le Discord";
        actions.prepend(discordButton);
      }
    }
  }

  function enhanceJobs() {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = "Découvrez les 6 métiers principaux et les 6 métiers secondaires du Nouvel Âge RP : 36 combinaisons possibles pour construire votre personnage.";

    const stats = [...document.querySelectorAll(".jobs-stats > span")];
    if (stats[2]) stats[2].innerHTML = "<strong>36</strong> combinaisons";

    const intro = document.querySelector(".jobs-hero-copy > p:not(.overline)");
    if (intro) {
      const textNode = [...intro.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if (textNode) textNode.textContent = "Un personnage choisit 1 métier principal et 1 métier secondaire. Avec 6 choix dans chaque catégorie, cela représente 36 combinaisons possibles pour construire un rôle réellement complémentaire. ";
    }
  }

  function enhanceRealmDirectoryAndPages() {
    document.querySelectorAll(".realm-card").forEach(card => {
      const key = Object.keys(REALMS).find(k => card.classList.contains(k) || (card.getAttribute("href") || "").includes(k));
      if (!key) return;
      const realm = REALMS[key];
      const small = card.querySelector("small");
      if (small) {
        const prefix = (small.textContent.match(/^\s*\d+\s*·\s*/) || [""])[0];
        small.textContent = `${prefix}${realm.identity}`;
      }
      const title = card.querySelector("h2");
      if (title && !title.querySelector(".lna-realm-logo")) {
        const text = title.textContent.trim();
        title.textContent = "";
        title.appendChild(logoFor(key));
        title.append(document.createTextNode(text || realm.name));
      }
      const p = card.querySelector("p");
      if (p) {
        const textNode = [...p.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (textNode) textNode.textContent = `${realm.description} `;
      }
    });

    document.querySelectorAll(".realms-callout a").forEach(link => {
      const key = Object.keys(REALMS).find(k => link.textContent.trim().toLowerCase() === REALMS[k].name.toLowerCase());
      if (!key || link.querySelector(".lna-realm-logo")) return;
      link.prepend(logoFor(key));
    });

    const path = currentRoute();
    const match = path.match(/^\/royaumes\/([^/]+)\/$/);
    if (match && REALMS[match[1]]) {
      const key = match[1];
      const realm = REALMS[key];
      const heroCopy = document.querySelector(".vanloria-hero-copy");
      const identity = heroCopy?.querySelector("p");
      if (identity && !identity.querySelector(".lna-realm-logo")) {
        identity.classList.add("lna-realm-hero-badge");
        identity.prepend(logoFor(key));
      }
      document.title = document.title.replace(/^.*?(?=\s*\|)/, realm.name);
    }
  }

  function enhanceInlineRealmMentions() {
    const candidates = document.querySelectorAll(".religion-preview-card small, .realms-callout a");
    candidates.forEach(el => {
      const text = el.textContent.trim();
      const key = Object.keys(REALMS).find(k => text.startsWith(REALMS[k].name));
      if (!key || el.querySelector(".lna-realm-logo")) return;
      el.classList.add("lna-realm-inline");
      el.prepend(logoFor(key));
    });
  }

  function enhancePage(route) {
    if (route === "/") enhanceHome();
    if (route === "/metiers/") enhanceJobs();
    enhanceRealmDirectoryAndPages();
    enhanceInlineRealmMentions();
  }

  async function injectLayout() {
    const route = currentRoute();
    try {
      const response = await fetch(new URL("data/layout.json", siteRoot));
      const layout = await response.json();
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
    } finally {
      enhancePage(route);
      window.setTimeout(() => enhancePage(route), 450);
      window.setTimeout(() => enhancePage(route), 1400);
    }
  }

  injectGlobalStyle();
  injectLayout();
})();
