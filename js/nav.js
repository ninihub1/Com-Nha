// Hamburger menu for the shared header (issue #52).
// The header is loaded later by include.js, so the button doesn't exist
// yet when this file runs. Listening on the whole document instead means
// clicks on the button are still caught once it appears.

function closeMenu(header) {
  header.classList.remove("nav-open");
  const toggle = header.querySelector(".nav-toggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
}

// Tap the button to open or close; tap a link to close.
document.addEventListener("click", (e) => {
  const header = document.querySelector("header.nav");
  if (!header) return;

  const toggle = e.target.closest(".nav-toggle");
  if (toggle) {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    return;
  }

  if (e.target.closest("#site-nav a")) closeMenu(header);
});

// Escape key closes the menu and puts focus back on the button.
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const header = document.querySelector("header.nav.nav-open");
  if (!header) return;
  closeMenu(header);
  const toggle = header.querySelector(".nav-toggle");
  if (toggle) toggle.focus();
});