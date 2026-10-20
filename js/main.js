// Site-wide JS. Header/footer include logic now lives in js/include.js (issue #1).
// Homepage-specific scripts (marquee, catering form) come in issue #3.

console.log("Cơm Nhà site scaffold loaded, Week 5 in progress.");

// Dish strip (marquee): pause while it's being touched on phones/tablets.
// Hover pause for mouse users is handled in css/style.css.
const marquee = document.getElementById('marquee');
if (marquee) {
  marquee.addEventListener('touchstart', () => {
    marquee.classList.add('is-paused');
  }, { passive: true });

  ['touchend', 'touchcancel'].forEach((evt) => {
    marquee.addEventListener(evt, () => {
      marquee.classList.remove('is-paused');
    });
  });
}