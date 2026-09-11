(() => {
  const nav = [
    ['Accueil','/'],['Royaumes','/royaumes/'],['Territoire','/territoire/'],['Bestiaire','/bestiaire/'],
    ['Activités','/activites/'],['Métiers','/metiers/'],['Personnages','/personnages/'],['Wiki','/wiki/'],
    ['Nouveautés','/wiki/nouveautes/'],['Règlement','/reglement/']
  ];
  const exact = new Map([
    ['/','Accueil'],['/royaumes/','Royaumes'],['/royaumes/asharun/','Asharun'],['/royaumes/falkheim/','Falkheim'],['/royaumes/shintai/','Shintai'],['/royaumes/vanloria/','Vanloria'],['/royaumes/nerethis/','Nerethis'],['/royaumes/erythros/','Erythros'],
    ['/territoire/','Territoire'],['/bestiaire/','Bestiaire'],['/activites/','Activités'],['/creer-son-personnage/','Créer son personnage'],['/personnages/','Registre des personnages'],['/metiers/','Métiers'],['/origines/','Origines'],['/histoire/','Histoire'],['/religions/','Religions'],['/demi-dieux/','Demi-dieux'],['/factions/','Factions'],['/mods/','Mods serveur'],['/mods/le-nouvel-age/','Mod Le Nouvel Âge'],['/reglement/','Règlement'],
    ['/wiki/','Wiki officiel'],['/wiki/nouveautes/','Nouveautés du mod'],['/wiki/stations/','Stations de craft'],['/wiki/economie/','Économie V4'],['/wiki/consommables/','Consommables'],['/wiki/ressources/','Ressources']
  ]);
  const route=()=>{let p=location.pathname.replace(/index\.html$/,'');if(!p.endsWith('/'))p+='/';return p.replace(/\/+/g,'/');};
  const label=()=>{const p=route();if(exact.has(p))return exact.get(p);if(p.startsWith('/wiki/ressources/'))return 'Fiche ressource';return document.title.split('|')[0].trim()||'Le Nouvel Âge';};
  const isActive=(href)=>{const p=route();if(href==='/wiki/')return p.startsWith('/wiki/')&&!p.startsWith('/wiki/nouveautes/');if(href==='/')return p==='/';return p.startsWith(href);};
  const html=()=>`<header id="lna-unified-header" class="lna-unified-header">
    <a class="lna-unified-brand" href="/" aria-label="Retour à l'accueil"><span class="lna-unified-seal">LNA</span><span><strong>Le Nouvel Âge</strong><small>${label()}</small></span></a>
    <nav class="lna-unified-nav" aria-label="Navigation principale">${nav.map(([n,h])=>`<a class="${isActive(h)?'active':''}" href="${h}">${n}</a>`).join('')}</nav>
    <details class="lna-unified-mobile"><summary>Explorer</summary><nav>${nav.map(([n,h])=>`<a class="${isActive(h)?'active':''}" href="${h}">${n}</a>`).join('')}<a href="/creer-son-personnage/">Créer son personnage</a><a href="/mods/">Mods serveur</a></nav></details>
  </header>`;
  function mount(){
    if(document.getElementById('lna-unified-header'))return;
    const target=document.querySelector('#lna-site-header, #wiki-site-header, header.site-header, header.realms-header, header.character-header, header.mods-header, header.activities-header, header.bestiary-header, header.jobs-header, header.origins-header, header.rules-header, header.territory-header, header.story-header, header.factions-header, header.demigods-header');
    const box=document.createElement('div');box.innerHTML=html();const header=box.firstElementChild;
    if(target){
      target.replaceWith(header);
    } else if(document.body){document.body.prepend(header);}
  }
  mount();
  document.addEventListener('DOMContentLoaded',mount,{once:true});
  window.addEventListener('load',mount,{once:true});
  const refreshResourceLabel=()=>{if(route().startsWith('/wiki/ressources/')){const h=document.querySelector('#resourceTitle');const sm=document.querySelector('#lna-unified-header .lna-unified-brand small');if(h&&sm&&h.textContent.trim()&&!/chargement/i.test(h.textContent))sm.textContent=h.textContent.trim();}};
  setTimeout(mount,120);setTimeout(mount,600);setTimeout(refreshResourceLabel,350);setTimeout(refreshResourceLabel,1000);
})();
