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

      // Category section
      const section = makeEl("section", "menu-category");
      section.id = category.id;
      section.appendChild(makeEl("h2", "", category.name));

      const list = makeEl("ul", "dish-list");

      category.items.forEach((item) => {
        const dish = makeEl("li", "dish");

        // Photo placeholder (issue #28) — no <img src> yet, just the
        // reserved slot. Swap this for a real <img> once photos exist.
        // aria-hidden: screen readers would otherwise say "photo" for every dish.
        // When a real <img> goes in, drop aria-hidden and give it alt text.
        const thumb = makeEl("div", "dish-thumb", "photo");
        thumb.setAttribute("aria-hidden", "true");
        dish.appendChild(thumb);

        const main = makeEl("div", "dish-main");
        const top = makeEl("div", "dish-top");

        const name = makeEl("h3", "dish-name", item.name);
        if (item.english) name.appendChild(makeEl("span", "dish-en", ` (${item.english})`));
        if (item.vegetarian) {
          // [V] is visual only; screen readers get the words instead
          // (title tooltips can't be reached by keyboard or touch).
          const v = makeEl("span", "dish-v", " [V]");
          v.setAttribute("aria-hidden", "true");
          name.appendChild(v);
          name.appendChild(makeEl("span", "sr-only", " (vegetarian option available)"));
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
