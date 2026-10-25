// Pickup or delivery chooser on the menu page (issue #39).
// Pickup goes to the main ordering page (SITE.orderUrl in js/config.js).
// Delivery goes to the restaurant's Uber Eats page (SITE.uberEatsUrl).
(function () {
  const note = document.getElementById('order-note');
  const go = document.querySelector('.order-go');
  const radios = document.querySelectorAll('input[name="order-type"]');
  if (!note || !go || !radios.length) return;

  const choices = {
    pickup: {
      note: 'Pick up at Shop 38, 478 Wanneroo Road, Westminster WA 6061. Open Tuesday to Saturday 11am to 8:30pm, Sunday 10:30am to 8:30pm. Closed Monday.',
      label: 'Order pickup',
      url: () => SITE.orderUrl
    },
    delivery: {
      note: 'Delivery is through Uber Eats. Enter your address there and it will tell you if we deliver to you.',
      label: 'Order delivery on Uber Eats',
      url: () => SITE.uberEatsUrl && SITE.uberEatsUrl + '?diningMode=DELIVERY'
    }
  };

  function update() {
    const type = document.querySelector('input[name="order-type"]:checked').value;
    const choice = choices[type];
    const url = choice.url();
    note.textContent = choice.note;
    go.textContent = choice.label;
    go.hidden = !url;
    if (url) go.href = url;
  }

  radios.forEach((r) => r.addEventListener('change', update));
  update();
})();