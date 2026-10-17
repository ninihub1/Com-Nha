// Loads the shared header and footer into any page that has
// <div id="site-header"></div> and <div id="site-footer"></div>.
//
// This only works when the page is served over http(s), not opened
// directly as a file:// URL, browsers block fetch() on local files.
// Run a local server to preview, for example from the repo root:
//   python3 -m http.server 8000
// then open http://localhost:8000/index.html
//
// Pages inside pages/ (like menu.html) are one folder deeper, so they
// pass a "../" prefix. That prefix is also added to the links and
// images inside the header and footer so they work from any folder.

// Adds the prefix to relative links and image paths inside the partial.
// Skips full URLs (https:, mailto:, tel:), root paths (/), page anchors (#)
// and paths that already start with ../
function fixRelativePaths(container, prefix) {
  if (!prefix) return;
  container.querySelectorAll("[href], [src]").forEach((el) => {
    const attr = el.hasAttribute("href") ? "href" : "src";
    const value = el.getAttribute(attr);
    if (!value) return;
    if (/^([a-z]+:|\/|#|\.\.\/)/i.test(value)) return;
    el.setAttribute(attr, prefix + value);
  });
}

async function loadPartial(targetId, url, prefix) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} responded ${res.status}`);
    target.innerHTML = await res.text();
    fixRelativePaths(target, prefix);
  } catch (err) {
    console.error("Could not load partial:", url, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const prefix = document.body.dataset.partialPrefix || "";
  loadPartial("site-header", `${prefix}partials/header.html`, prefix);
  loadPartial("site-footer", `${prefix}partials/footer.html`, prefix);
});