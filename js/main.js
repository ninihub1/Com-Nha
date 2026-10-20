// Site-wide JS. Header/footer include logic now lives in js/include.js .

// Catering form: send to Formspree and show a message
const cateringForm = document.getElementById('catering-form');
if (cateringForm) {
  const statusMsg = document.getElementById('form-status');
  cateringForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!cateringForm.checkValidity()) {
      cateringForm.reportValidity();
      return;
    }
    try {
      const res = await fetch(cateringForm.action, {
        method: 'POST',
        body: new FormData(cateringForm),
        headers: { Accept: 'application/json' }
      });
      statusMsg.hidden = false;
      if (res.ok) {
        statusMsg.textContent = 'Thanks! We got your enquiry and will be in touch soon.';
        cateringForm.reset();
      } else {
        statusMsg.textContent = 'Sorry, something went wrong. Please call us instead.';
      }
    } catch {
      statusMsg.hidden = false;
      statusMsg.textContent = 'Sorry, something went wrong. Please call us instead.';
    }
  });
}

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
