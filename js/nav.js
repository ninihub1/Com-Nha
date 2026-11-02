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
// While the drawer is open, Tab loops between the button and the drawer links,
// so keyboard focus never lands on the page hidden behind the dark overlay.
document.addEventListener("keydown", (e) => {
  const header = document.querySelector("header.nav.nav-open");
  if (!header) return;
  const toggle = header.querySelector(".nav-toggle");

  if (e.key === "Escape") {
    setMenu(header, false);
    if (toggle) toggle.focus();
    return;
  }

  if (e.key !== "Tab" || !toggle) return;
  const items = [toggle, ...header.querySelectorAll("#site-nav a")];
  const first = items[0];
  const last = items[items.length - 1];
  const inside = items.includes(document.activeElement);
  if (e.shiftKey && (document.activeElement === first || !inside)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
    e.preventDefault();
    first.focus();
  }
});

// If the window is widened past the phone layout, close the drawer.
window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
  const header = document.querySelector("header.nav.nav-open");
  if (e.matches && header) setMenu(header, false);
});
