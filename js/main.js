// Site-wide JS. Header/footer include logic now lives in js/include.js (issue #1).

// Catering form: send to Formspree and show a message
const cateringForm = document.getElementById('catering-form');
if (cateringForm) {
  const statusMsg = document.getElementById('form-status');
  const sendBtn = cateringForm.querySelector('button[type="submit"]');
  const failText = 'Sorry, something went wrong. Please call us instead.';

  function showStatus(text, isError) {
    statusMsg.hidden = false;
    statusMsg.textContent = text;
    statusMsg.classList.toggle('is-error', isError);
  }

  cateringForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!cateringForm.checkValidity()) {
      cateringForm.reportValidity();
      return;
    }
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    try {
      const res = await fetch(cateringForm.action, {
        method: 'POST',
        body: new FormData(cateringForm),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        showStatus('Thanks! We got your enquiry and will be in touch soon.', false);
        cateringForm.reset();
      } else {
        showStatus(failText, true);
      }
    } catch {
      showStatus(failText, true);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send enquiry';
    }
  });
}

console.log("Cơm Nhà site scaffold loaded, Week 5 in progress.");