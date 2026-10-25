// Rotating Uber Eats reviews (issue #49).
// Reviews live in data/reviews.json. Add or remove entries there; nothing else changes.
// With one review the block stays still. With more, it fades to the next every 7 seconds,
// pauses on hover or focus, and has dots to jump between reviews.
(async function () {
  const slidesBox = document.getElementById('review-slides');
  const dotsBox = document.getElementById('review-dots');
  const block = document.getElementById('reviews');
  if (!slidesBox || !dotsBox || !block) return;

  let reviews = [];
  try {
    const res = await fetch('data/reviews.json');
    reviews = (await res.json()).reviews || [];
  } catch (e) {
    return; // keep the review already in the page
  }
  if (reviews.length < 2) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  slidesBox.textContent = '';
  const slides = reviews.map((r, i) => {
    const fig = document.createElement('figure');
    fig.className = 'rating-slide' + (i === 0 ? ' is-active' : '');
    const q = document.createElement('blockquote');
    q.className = 'rating-quote';
    q.textContent = '"' + r.quote + '"';
    const c = document.createElement('figcaption');
    c.className = 'rating-author';
    c.textContent = '– ' + r.author;
    fig.append(q, c);
    slidesBox.appendChild(fig);
    return fig;
  });

  const dots = reviews.map((r, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.className = 'rating-dot' + (i === 0 ? ' is-active' : '');
    d.setAttribute('aria-label', 'Show review ' + (i + 1) + ' of ' + reviews.length);
    d.addEventListener('click', () => { show(i); restart(); });
    dotsBox.appendChild(d);
    return d;
  });
  dotsBox.hidden = false;

  let current = 0;
  let timer = null;

  function show(i) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = i;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function next() { show((current + 1) % slides.length); }
  function stop() { clearInterval(timer); timer = null; }
  function start() {
    if (reduceMotion.matches || timer) return;
    timer = setInterval(next, 7000);
  }
  function restart() { stop(); start(); }

  block.addEventListener('mouseenter', stop);
  block.addEventListener('mouseleave', start);
  block.addEventListener('focusin', stop);
  block.addEventListener('focusout', start);
  reduceMotion.addEventListener('change', () => { stop(); start(); });

  start();
})();