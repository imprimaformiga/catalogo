// Gera as páginas de texto por categoria, a lista de categorias do index.html e o sitemap.xml.
// Os produtos e categorias vêm das listas CATS e PROD que já estão no index.html.
// Uso (na pasta do catálogo):  node tools/gerar-paginas.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://catalogo.graficaimprimaformiga.com.br";
const WA = "5537920006433";
const FONE = "(37) 92000-6433";
const TOTAL = 420, CH = 5;

// página inicial da categoria (igual ao CATS do index.html) -> endereço e título da página
const SLUGS = {
  5: ["garrafas-squeezes-personalizados", "Garrafas e squeezes personalizados"],
  65: ["canecas-copos-personalizados", "Canecas e copos personalizados"],
  91: ["brindes-bar-bebidas", "Brindes de bar e bebidas personalizados"],
  103: ["brindes-cozinha", "Brindes de cozinha personalizados"],
  131: ["bolsas-termicas-personalizadas", "Bolsas térmicas personalizadas"],
  147: ["sacolas-personalizadas", "Sacolas personalizadas"],
  159: ["mochilas-bolsas-personalizadas", "Mochilas e bolsas personalizadas"],
  195: ["malas-frasqueiras-personalizadas", "Malas e frasqueiras personalizadas"],
  205: ["brindes-viagem", "Brindes de viagem personalizados"],
  211: ["estojos-necessaires-personalizados", "Estojos e nécessaires personalizados"],
  227: ["organizadores-personalizados", "Organizadores personalizados"],
  235: ["brindes-cuidados-pessoais", "Brindes de cuidados pessoais personalizados"],
  251: ["brindes-moda", "Brindes de moda personalizados"],
  255: ["guarda-chuvas-personalizados", "Guarda-chuvas personalizados"],
  261: ["brindes-diversos", "Brindes diversos personalizados"],
  265: ["expositores-personalizados", "Expositores personalizados"],
  271: ["eletronicos-personalizados", "Eletrônicos personalizados"],
  275: ["carregadores-personalizados", "Carregadores personalizados"],
  285: ["caixas-de-som-personalizadas", "Caixas de som personalizadas"],
  293: ["fones-de-ouvido-personalizados", "Fones de ouvido personalizados"],
  299: ["acessorios-celular-personalizados", "Acessórios de celular personalizados"],
  305: ["brindes-informatica", "Brindes de informática personalizados"],
  311: ["brindes-escritorio", "Brindes de escritório personalizados"],
  321: ["blocos-cadernetas-personalizados", "Blocos e cadernetas personalizados"],
  341: ["canetas-personalizadas", "Canetas personalizadas"],
  381: ["chaveiros-personalizados", "Chaveiros personalizados"],
  395: ["ferramentas-personalizadas", "Ferramentas personalizadas"],
  405: ["lanternas-luminarias-personalizadas", "Lanternas e luminárias personalizadas"],
  411: ["ventiladores-climatizadores-personalizados", "Ventiladores e climatizadores personalizados"],
};

const indexPath = path.join(ROOT, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
const CATS = JSON.parse(index.match(/var CATS = (\[.*?\]);/)[1]);
const PROD = JSON.parse(index.match(/var PROD = (\[.*?\]);/)[1]).filter((p) => p[1]);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const wa = (txt) => `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;
const pageImg = (n) => {
  const c = Math.ceil(n / CH), r = (n - 1) % CH;
  return { src: `/pages/c${String(c).padStart(2, "0")}.webp`, pos: `0 ${(r * 100) / (CH - 1)}%` };
};

const cats = CATS.map((c, i) => {
  const [slug, titulo] = SLUGS[c[0]] || (() => { throw new Error("Categoria sem endereço em SLUGS: " + c[1]); })();
  const fim = (CATS[i + 1] ? CATS[i + 1][0] : TOTAL + 1) - 1;
  const prods = PROD.filter((p) => p[2] >= c[0] && p[2] <= fim);
  return { inicio: c[0], fim, nome: c[1], slug, titulo, prods };
});

const CSS = `:root{--table:#e7eaee;--bar:#fff;--ink:#1d2733;--ink-soft:#5d6976;--line:#d3d9e0;--blue:#0b5e96;--orange:#f5a20a;--chip:#f1f4f7;--wa:#1a9e55;--ui:"Poppins","Segoe UI",system-ui,-apple-system,sans-serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--table:#151c24;--bar:#1c252f;--ink:#e8edf2;--ink-soft:#9aa7b4;--line:#2c3845;--blue:#4ea3dc;--orange:#f7b23b;--chip:#26313d;color-scheme:dark}}
:root[data-theme="dark"]{--table:#151c24;--bar:#1c252f;--ink:#e8edf2;--ink-soft:#9aa7b4;--line:#2c3845;--blue:#4ea3dc;--orange:#f7b23b;--chip:#26313d;color-scheme:dark}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--table);color:var(--ink);font-family:var(--ui);font-size:15px;line-height:1.55}
a{color:var(--blue)}
.top{background:var(--bar);border-bottom:1px solid var(--line);padding:10px max(16px,env(safe-area-inset-left,0px));display:flex;align-items:center;gap:12px;flex-wrap:wrap;position:sticky;top:0;z-index:5}
.top .logo{height:30px;width:auto;background:#fff;border-radius:6px;padding:4px 8px;box-sizing:content-box;display:block}
.top nav{margin-left:auto;display:flex;gap:6px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid var(--line);background:var(--chip);border-radius:8px;font-size:13px;font-weight:500;color:var(--ink);text-decoration:none}
.btn:hover{border-color:var(--blue);color:var(--blue)}
.btn.wa{background:var(--wa);border-color:var(--wa);color:#fff}
.btn.wa:hover{filter:brightness(1.08);color:#fff}
main{max-width:1040px;margin:0 auto;padding:28px 16px 40px}
.crumbs{font-size:12.5px;color:var(--ink-soft);margin:0 0 10px}
.crumbs a{color:var(--ink-soft)}
h1{font-size:26px;line-height:1.25;margin:0 0 12px;font-weight:600}
.intro{max-width:70ch;margin:0 0 24px}
.pg{display:grid;grid-template-columns:minmax(0,260px) minmax(0,1fr);gap:20px;background:var(--bar);border:1px solid var(--line);border-radius:12px;padding:16px;margin:0 0 16px}
.pg img{width:100%;height:auto;aspect-ratio:595/842;object-fit:cover;border-radius:6px;border:1px solid var(--line);background:#fff;display:block}
.pg h2{font-size:15px;font-weight:600;margin:0 0 8px;color:var(--ink-soft)}
.pg h2 a{color:inherit}
.prods{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.prods li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;align-items:center;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--chip)}
.prods h3{font-size:14.5px;font-weight:500;margin:0}
.prods .cd{font-size:12px;color:var(--blue);font-weight:500;letter-spacing:.03em}
.prods .btn.wa{grid-row:1/3;grid-column:2;font-size:12.5px}
.outras{margin-top:32px}
.outras h2,.contato h2{font-size:17px;font-weight:600;margin:0 0 10px}
.cat-links{display:flex;flex-wrap:wrap;gap:8px;padding:0;margin:0;list-style:none}
.cat-links a{display:inline-block;padding:7px 12px;border:1px solid var(--line);border-radius:999px;background:var(--bar);color:var(--ink);text-decoration:none;font-size:13px}
.cat-links a:hover{border-color:var(--blue);color:var(--blue)}
.contato{margin-top:32px;background:var(--bar);border:1px solid var(--line);border-radius:12px;padding:18px}
.contato p{margin:0 0 6px}
footer{text-align:center;font-size:12px;color:var(--ink-soft);padding:0 16px 28px}
@media (max-width:640px){.pg{grid-template-columns:1fr}.pg img{max-width:280px;margin:0 auto}.prods li{grid-template-columns:1fr}.prods .btn.wa{grid-row:auto;grid-column:auto;justify-self:start}h1{font-size:22px}}`;

const catLinks = (atual) =>
  `<ul class="cat-links">${cats.map((c) => c.slug === atual ? "" : `<li><a href="/${c.slug}">${esc(c.titulo)}</a></li>`).join("")}</ul>`;

function pagina(c) {
  const url = `${SITE}/${c.slug}`;
  const n = c.prods.length;
  const exemplos = c.prods.slice(0, 3).map((p) => p[1]).join(", ");
  const desc = `${n} modelos de ${c.nome.toLowerCase()} para personalizar com a sua marca${exemplos ? ": " + exemplos : ""}. Gráfica Imprima em Formiga-MG. Orçamento pelo WhatsApp ${FONE}.`;
  const porPagina = new Map();
  c.prods.forEach((p) => { if (!porPagina.has(p[2])) porPagina.set(p[2], []); porPagina.get(p[2]).push(p); });

  const blocos = [...porPagina].map(([pg, itens]) => {
    const im = pageImg(pg);
    const lis = itens.map((p) => `<li><h3>${esc(p[1])}</h3><span class="cd">Código ${esc(p[0])}</span><a class="btn wa" href="${esc(wa(`Olá! Quero um orçamento do item ${p[0]} - ${p[1]} (catálogo Imprima, página ${pg}).`))}" target="_blank" rel="noopener">Pedir orçamento deste item</a></li>`).join("\n      ");
    return `  <section class="pg">
    <a href="/#p${pg}"><img src="${im.src}" style="object-position:${im.pos}" width="595" height="842" loading="lazy" alt="${esc(`Página ${pg} do catálogo Imprima: ${itens.map((p) => p[1]).join(", ")}`)}"></a>
    <div>
      <h2><a href="/#p${pg}">Página ${pg} do catálogo</a></h2>
      <ul class="prods">
      ${lis}
      </ul>
    </div>
  </section>`;
  }).join("\n");

  const ld = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Catálogo de brindes", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: c.titulo, item: url },
    ],
  };

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.titulo)} em Formiga-MG | Imprima</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(c.titulo)} em Formiga-MG | Imprima">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og-capa.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>
${CSS}
</style>
</head>
<body>
<header class="top">
  <a href="/" aria-label="Catálogo de brindes Imprima"><img class="logo" src="/logo.png" alt="Imprima" width="123" height="48"></a>
  <nav>
    <a class="btn" href="/#p${c.inicio}">Ver no catálogo</a>
    <a class="btn wa" href="${esc(wa(`Olá! Vi a página de ${c.nome.toLowerCase()} da Imprima e gostaria de um orçamento.`))}" target="_blank" rel="noopener">Pedir orçamento</a>
  </nav>
</header>
<main>
  <p class="crumbs"><a href="/">Catálogo de brindes</a> › ${esc(c.nome)}</p>
  <h1>${esc(c.titulo)} em Formiga-MG</h1>
  <p class="intro">${n} modelos de ${esc(c.nome.toLowerCase())} para personalizar com o logotipo da sua empresa, escola ou evento. A Imprima prepara a arte, envia a prova para aprovação e faz a personalização. Escolha o item e toque em <b>Pedir orçamento deste item</b>: a mensagem no WhatsApp já vai com o código do produto.</p>
${blocos}
  <section class="outras">
    <h2>Outras categorias</h2>
    ${catLinks(c.slug)}
  </section>
  <section class="contato">
    <h2>Imprima Gráfica e Brindes Personalizados</h2>
    <p>R. Padre Remaclo Foxius, Formiga - MG, 35574-073</p>
    <p>WhatsApp: <a href="https://wa.me/${WA}" target="_blank" rel="noopener">${FONE}</a> · Instagram: <a href="https://www.instagram.com/_imprima/" target="_blank" rel="noopener">@_imprima</a></p>
    <p><a href="/#sobre">Endereço, mapa e dúvidas frequentes</a></p>
  </section>
</main>
<footer>© Imprima Gráfica e Brindes Personalizados · Formiga-MG</footer>
</body>
</html>
`;
}

for (const c of cats) {
  const dir = path.join(ROOT, c.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pagina(c));
}

// lista de categorias no bloco "Sobre" do index.html
index = index.replace(/<!--categorias-->[\s\S]*?<!--\/categorias-->/,
  `<!--categorias-->\n    ${catLinks(null)}\n    <!--/categorias-->`);
fs.writeFileSync(indexPath, index);

// sitemap.xml
const hoje = new Date().toISOString().slice(0, 10);
const urls = [SITE + "/", ...cats.map((c) => `${SITE}/${c.slug}`)];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${hoje}</lastmod></url>`).join("\n")}\n</urlset>\n`);

console.log(`${cats.length} páginas de categoria, ${PROD.length} produtos, sitemap com ${urls.length} endereços.`);
cats.filter((c) => !c.prods.length).forEach((c) => console.log("Atenção: categoria sem produtos: " + c.nome));
