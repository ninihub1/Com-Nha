// Menu page (issue #5).
// Reads data/menu.json and builds the category nav and the dish lists.
// Like include.js, this needs a local server to preview (fetch is blocked on file://).

function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// Keeps the category pills pinned and highlights the one being read
function setupStickyNav(nav) {
  const links = nav.querySelectorAll("a");
  const sections = document.querySelectorAll(".menu-category");

  // Work out the header height so the pills sit just under it
  function setOffset() {
    const wrap = document.getElementById("site-header");
    let h = 0;
    [wrap, wrap && wrap.firstElementChild].forEach((el) => {
      if (!el) return;
      const pos = getComputedStyle(el).position;
      if (pos === "sticky" || pos === "fixed") h = el.offsetHeight;
    });
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  }
  setOffset();
  window.addEventListener("load", setOffset);
  window.addEventListener("resize", setOffset);
  // The header is loaded after this runs and its height changes on phones
  const headerWrap = document.getElementById("site-header");
  if (headerWrap && "ResizeObserver" in window) {
    new ResizeObserver(setOffset).observe(headerWrap);
  }

  function setActive(id) {
    links.forEach((link) => {
      const on = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", on);
      if (on) {
        link.setAttribute("aria-current", "true");
        // On phones, slide the pill row so the active pill is visible
        if (nav.scrollWidth > nav.clientWidth) {
          nav.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
        }
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((section) => observer.observe(section));
  if (sections[0]) setActive(sections[0].id);
}

// Vegetarian filter (issue #50).
// Adds a toggle to the category bar. When it is on, only dishes marked
// [V] are shown, and categories with no [V] dishes (and their pills) hide.
function setupVegFilter(nav, container) {
  const toggle = makeEl("button", "veg-toggle", "[V] Vegetarian only");
  toggle.type = "button";
  toggle.setAttribute("aria-pressed", "false");

  toggle.addEventListener("click", () => {
    const on = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(on));
    nav.classList.toggle("veg-only", on);
    container.classList.toggle("veg-only", on);
  });

  nav.prepend(toggle);
}

async function loadMenu() {
  const nav = document.getElementById("menu-nav");
  const container = document.getElementById("menu-sections");

  try {
    const res = await fetch("../data/menu.json");
    if (!res.ok) throw new Error(`menu.json responded ${res.status}`);
    const data = await res.json();

    container.innerHTML = "";

    data.categories.forEach((category) => {
      // Category nav link, jumps to the section below
      const link = makeEl("a", "", category.name);
      link.href = `#${category.id}`;
      nav.appendChild(link);

      // Used by the vegetarian filter (issue #50) to hide categories with no [V] dishes
      const hasVeg = category.items.some((item) => item.vegetarian);
      if (!hasVeg) link.classList.add("no-veg");

      // Category section
      const section = makeEl("section", "menu-category");
      section.id = category.id;
      if (!hasVeg) section.classList.add("no-veg");
      section.appendChild(makeEl("h2", "", category.name));

      const list = makeEl("ul", "dish-list");

      category.items.forEach((item) => {
        const dish = makeEl("li", "dish");
        if (item.vegetarian) dish.classList.add("is-veg");

        // Photo placeholder (issue #28) — no <img src> yet, just the
        // reserved slot. Swap this for a real <img> once photos exist.
        const thumb = makeEl("div", "dish-thumb", "photo");
        dish.appendChild(thumb);

        const main = makeEl("div", "dish-main");
        const top = makeEl("div", "dish-top");

        const name = makeEl("h3", "dish-name", item.name);
        if (item.english) name.appendChild(makeEl("span", "dish-en", ` (${item.english})`));
        if (item.vegetarian) {
          const v = makeEl("span", "dish-v", " [V]");
          v.title = "Vegetarian option available";
          name.appendChild(v);
        }

        top.appendChild(name);
        top.appendChild(makeEl("span", "dish-price", `$${item.price}`));
        main.appendChild(top);

        if (item.description) main.appendChild(makeEl("p", "dish-desc", item.description));

        dish.appendChild(main);
        list.appendChild(dish);
      });

      section.appendChild(list);
      container.appendChild(section);
    });

    // Vegetarian-only toggle at the start of the category bar (issue #50)
    setupVegFilter(nav, container);

    // Pin the category pills and highlight the current one
    setupStickyNav(nav);
  } catch (err) {
    console.error("Could not load menu:", err);
    container.innerHTML = "";
    container.appendChild(
      makeEl("p", "menu-status", "Sorry, the menu couldn't load. Please refresh the page or call us on (08) 9470 6438.")
    );
  }
}

document.addEventListener("DOMContentLoaded", loadMenu);
