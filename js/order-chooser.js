// Pickup or delivery chooser on the menu page (issue #39).
// The Order now link comes from js/config.js (SITE.orderUrl).
(function () {
  const note = document.getElementById('order-note');
  const uber = document.querySelector('.order-uber');
  const radios = document.querySelectorAll('input[name="order-type"]');
  if (!note || !radios.length) return;

  const notes = {
    pickup: 'Pick up at Shop 38, 478 Wanneroo Road, Westminster WA 6061. Open Tuesday to Saturday 11am to 8:30pm, Sunday 10:30am to 8:30pm. Closed Monday.',
    delivery: 'Enter your address on the ordering page and it will tell you if we deliver to you. You can also order delivery on Uber Eats.'
  };

  function update() {
    const type = document.querySelector('input[name="order-type"]:checked').value;
    note.textContent = notes[type];
    if (uber && SITE.uberEatsUrl) uber.hidden = type !== 'delivery';
  }

  radios.forEach((r) => r.addEventListener('change', update));
  update();
})();