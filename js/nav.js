// Hamburger menu and side drawer for the shared header (issue #52).
// The header is loaded later by include.js, so the button doesn't exist
// yet when this file runs. Listening on the whole document instead means
// clicks on the button are still caught once it appears.

function setMenu(header, open) {
  header.classList.toggle("nav-open", open);
  document.body.classList.toggle("nav-locked", open);
  const toggle = header.querySelector(".nav-toggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
}

// Tap the button to open or close. Tap the dark area or a link to close.
document.addEventListener("click", (e) => {
  const header = document.querySelector("header.nav");
  if (!header) return;

  if (e.target.closest(".nav-toggle")) {
    setMenu(header, !header.classList.contains("nav-open"));
    return;
  }

  if (e.target.closest(".nav-backdrop") || e.target.closest("#site-nav a")) {
    setMenu(header, false);
  }
});

// Escape closes the drawer and puts focus back on the button.
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const header = document.querySelector("header.nav.nav-open");
  if (!header) return;
  setMenu(header, false);
  const toggle = header.querySelector(".nav-toggle");
  if (toggle) toggle.focus();
});

// If the window is widened past the phone layout, close the drawer.
window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
  const header = document.querySelector("header.nav.nav-open");
  if (e.matches && header) setMenu(header, false);
});
