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
// pass a "../" prefix.

async function loadPartial(targetId, url) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} responded ${res.status}`);
    target.innerHTML = await res.text();
  } catch (err) {
    console.error("Could not load partial:", url, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const prefix = document.body.dataset.partialPrefix || "";
  loadPartial("site-header", `${prefix}partials/header.html`);
  loadPartial("site-footer", `${prefix}partials/footer.html`);
});
