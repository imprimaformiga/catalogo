// Medição de visitas (Google Analytics) e aviso de cookies.
// Usado pelo index.html e pelas páginas de categoria. O ID do Analytics fica só aqui.
(function () {
  var GA = "G-DPVRMVW0K7";
  var KEY = "imprima-cookies"; // "sim" ou "nao"

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var escolha = null;
  try { escolha = localStorage.getItem(KEY); } catch (e) {}

  // Sem aceite, o Analytics não grava cookies (modo de consentimento do Google)
  gtag("consent", "default", {
    analytics_storage: escolha === "sim" ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"
  });
  gtag("js", new Date());
  gtag("config", GA);

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA;
  document.head.appendChild(s);

  // Clique em qualquer link de WhatsApp vira o evento "clique_whatsapp"
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me/"]');
    if (!a) return;
    var txt = "";
    try { txt = decodeURIComponent(a.href.split("text=")[1] || ""); } catch (err) {}
    var item = /item (\S+)/.exec(txt), pag = /p[áa]gina (\d+)/.exec(txt);
    gtag("event", "clique_whatsapp", {
      origem: location.pathname === "/" ? "catalogo" : location.pathname.replace(/\//g, ""),
      item_codigo: item ? item[1] : "(nenhum)",
      pagina_catalogo: pag ? pag[1] : "(nenhuma)"
    });
  }, true);

  // Aviso de cookies
  function salvar(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    gtag("consent", "update", { analytics_storage: v === "sim" ? "granted" : "denied" });
    var b = document.getElementById("cookies"); if (b) b.remove();
  }
  function aviso() {
    if (document.getElementById("cookies")) return;
    var b = document.createElement("div");
    b.id = "cookies";
    b.setAttribute("role", "region");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:40;max-width:560px;margin:0 auto;" +
      "display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;padding:12px 14px;border-radius:12px;" +
      "background:var(--bar,#fff);color:var(--ink,#1d2733);border:1px solid var(--line,#d3d9e0);" +
      "box-shadow:0 10px 30px rgba(0,0,0,.25);font:13px/1.45 var(--ui,system-ui,sans-serif)";
    var bt = "height:34px;padding:0 14px;border-radius:8px;font:inherit;font-weight:500;cursor:pointer;";
    b.innerHTML = '<span style="flex:1 1 260px">Usamos cookies para saber quantas pessoas visitam o catálogo e pedem orçamento.</span>' +
      '<span style="display:flex;gap:8px"><button type="button" data-v="nao" style="' + bt + 'border:1px solid var(--line,#d3d9e0);background:var(--chip,#f1f4f7);color:inherit">Recusar</button>' +
      '<button type="button" data-v="sim" style="' + bt + 'border:1px solid var(--blue,#0b5e96);background:var(--blue,#0b5e96);color:#fff">Aceitar</button></span>';
    b.addEventListener("click", function (e) { var v = e.target.getAttribute("data-v"); if (v) salvar(v); });
    document.body.appendChild(b);
  }
  window.preferenciasCookies = aviso;
  if (!escolha) {
    if (document.body) aviso(); else document.addEventListener("DOMContentLoaded", aviso);
  }
})();
