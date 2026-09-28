// Menu page (issue #5).
// Reads data/menu.json and builds the category nav and the dish lists.
// Like include.js, this needs a local server to preview (fetch is blocked on file://).

function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
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
        dish.appendChild(top);

        if (item.description) dish.appendChild(makeEl("p", "dish-desc", item.description));

        list.appendChild(dish);
      });

      section.appendChild(list);
      container.appendChild(section);
    });
  } catch (err) {
    console.error("Could not load menu:", err);
    container.innerHTML = "";
    container.appendChild(
      makeEl("p", "menu-status", "Sorry, the menu couldn't load. Please refresh the page or call us on (08) 9470 6438.")
    );
  }
}

document.addEventListener("DOMContentLoaded", loadMenu);
