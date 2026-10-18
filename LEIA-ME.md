# Catálogo de Brindes Imprima: publicação no GitHub Pages

Endereço previsto: **https://catalogo.graficaimprimaformiga.com.br**

## O que tem nesta pasta

| Arquivo | Para que serve |
|---|---|
| `index.html` | O catálogo (flipbook) |
| `pages/` | As 420 páginas do catálogo, em 84 imagens de 5 páginas cada (c01 = págs. 1–5, c02 = págs. 6–10...) |
| `js/page-flip.browser.js` | Biblioteca que faz o efeito de virar página (licença MIT) |
| `og-capa.jpg` | Imagem que aparece quando o link é enviado no WhatsApp |
| `favicon.png` | Ícone da aba do navegador |
| `CNAME` | Diz ao GitHub qual é o domínio do catálogo |
| `.nojekyll` | Faz o GitHub publicar os arquivos como estão (não apague) |

> O `.nojekyll` começa com ponto e pode ficar oculto no Windows/Mac. Ele precisa ir junto para o GitHub.

## Passo 1: criar o repositório

1. Entre no GitHub com a conta da organização **imprimaformiga**.
2. Clique em **New repository**.
3. Nome: `catalogo`. Visibilidade: **Public** (o GitHub Pages gratuito exige repositório público).
4. Clique em **Create repository**.

## Passo 2: enviar os arquivos

São 92 arquivos: dá para arrastar tudo de uma vez em **Add file → Upload files** no site do GitHub, ou usar o **GitHub Desktop**:

1. Instale o GitHub Desktop e entre com sua conta.
2. **File → Clone repository** e escolha `imprimaformiga/catalogo`.
3. Copie **todo o conteúdo desta pasta** (incluindo `.nojekyll` e `CNAME`) para a pasta do repositório clonado.
4. No GitHub Desktop, escreva um resumo (ex.: "Catálogo 2025") e clique em **Commit to main**.
5. Clique em **Push origin**.

Se preferir o terminal:

```bash
git clone https://github.com/imprimaformiga/catalogo.git
# copie o conteúdo desta pasta para dentro de "catalogo"
cd catalogo
git add -A
git commit -m "Catálogo de brindes 2025"
git push
```

## Passo 3: ligar o GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Branch: **main**, pasta **/ (root)**. Clique em **Save**.
4. Em **Custom domain**, confira se aparece `catalogo.graficaimprimaformiga.com.br` (vem do arquivo `CNAME`). Se não aparecer, digite e clique em **Save**.

## Passo 4: configurar o DNS

No painel onde o domínio **graficaimprimaformiga.com.br** é administrado (Registro.br, Hostgator, Cloudflare, etc.), crie **um** registro:

| Tipo | Nome / Host | Valor / Destino | TTL |
|---|---|---|---|
| **CNAME** | `catalogo` | `imprimaformiga.github.io` | padrão (ex.: 3600) |

Observações:

- Em alguns painéis o campo "Nome" pede o endereço completo: `catalogo.graficaimprimaformiga.com.br`.
- Alguns painéis pedem um ponto no final do valor: `imprimaformiga.github.io.`
- Não use registro A nem aponte o domínio principal. Só o subdomínio `catalogo`, assim o site e o sistema atuais não são afetados.
- Se usar Cloudflare, deixe a nuvem **cinza** (DNS only) até o HTTPS do GitHub ficar ativo.
- A propagação costuma levar de alguns minutos a algumas horas.

## Passo 5: ativar o HTTPS

1. Volte em **Settings → Pages**. Quando aparecer "DNS check successful", marque **Enforce HTTPS**.
2. O certificado pode levar até algumas horas para ficar pronto na primeira vez.

Recomendado: em **Settings da organização → Pages → Add a domain**, verifique o domínio `graficaimprimaformiga.com.br`. Isso impede que outra conta do GitHub use o seu subdomínio.

## Pronto

Acesse https://catalogo.graficaimprimaformiga.com.br e envie o link aos clientes.
Links para uma página específica funcionam assim: `https://catalogo.graficaimprimaformiga.com.br/#p65` (abre na página 65).

## Para atualizar no futuro

- **Trocar páginas:** cada arquivo em `pages/` tem 5 páginas empilhadas (c01 = págs. 1–5). Para trocar páginas, peça ao Claude para gerar os arquivos de novo.
- **Mudar o WhatsApp:** no `index.html`, procure `5537920006433` e troque (duas ocorrências), além do texto `(37) 92000-6433`.
- **Usar outro domínio:** troque o conteúdo do arquivo `CNAME` e os endereços `catalogo.graficaimprimaformiga.com.br` no topo do `index.html`.

## Páginas por categoria, sitemap e SEO (outubro de 2026)

O site hoje é publicado pela **Vercel** a partir deste repositório. Cada envio para o `main` atualiza o site.

| Arquivo | Para que serve |
|---|---|
| `<categoria>/index.html` | Página de texto de cada categoria (ex.: `/canetas-personalizadas`), com código, nome e botão de orçamento de cada produto. É o que o Google lê. |
| `sitemap.xml` | Lista de endereços do site para o Google |
| `robots.txt` | Libera o site para o Google e indica o sitemap |
| `logo.png` | Logotipo usado nas páginas de categoria e nos dados da empresa |
| `tools/gerar-paginas.js` | Gera as páginas de categoria, a lista de categorias do bloco "Sobre" e o `sitemap.xml` |
| `.vercelignore` | Impede que `tools/` e este LEIA-ME sejam publicados |

**Sempre que mudar produtos ou categorias** (`CATS` e `PROD` no `index.html`), rode na pasta do catálogo:

```bash
node tools/gerar-paginas.js
```

Uma categoria nova precisa de endereço e título na lista `SLUGS`, no começo de `tools/gerar-paginas.js`.

Endereço, telefone e Instagram aparecem em dois lugares: no `index.html` (dados da empresa no `<head>` e bloco "Sobre") e em `tools/gerar-paginas.js` (rodapé das páginas de categoria).
