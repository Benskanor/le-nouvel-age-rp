
async function loadSiteData(){
  const rootPrefix = document.body.dataset.root || "";
  try{
    const response = await fetch(`${rootPrefix}data/site.json`);
    const data = await response.json();
    document.querySelectorAll("[data-site-name]").forEach(el => el.textContent = data.siteName);

    const realmGrid = document.querySelector("#realm-grid");
    if(realmGrid){
      realmGrid.innerHTML = data.realms.map(r => `
        <article class="card realm-card" style="--realm:${r.color}">
          <h3>${r.name}</h3>
          <p>${r.summary}</p>
        </article>
      `).join("");
    }

    const tradeList = document.querySelector("#trade-list");
    if(tradeList){
      tradeList.innerHTML = data.mainTrades.map(t => `<li>${t}</li>`).join("");
    }
  }catch(e){
    console.warn("Impossible de charger data/site.json", e);
  }
}
loadSiteData();
