(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  const currentLabel = document.getElementById('current-page');
  const progress = document.querySelector('.progress-fill');
  let current = 0;
  let locked = false;

  function show(index) {
    if (locked || index === current || index < 0 || index >= slides.length) return;
    locked = true;
    const previous = current;
    const outgoing = slides[previous];
    outgoing.classList.remove('active', 'exit-left', 'exit-right');
    outgoing.classList.add(index > previous ? 'exit-left' : 'exit-right');
    current = index;
    slides[current].classList.remove('exit-left', 'exit-right');
    slides[current].classList.add('active');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    currentLabel.textContent = String(current + 1).padStart(2, '0');
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    window.setTimeout(() => {
      outgoing.classList.remove('exit-left', 'exit-right');
      locked = false;
    }, 780);
  }

  document.querySelectorAll('.next-button').forEach(button => button.addEventListener('click', () => show(current + 1)));
  document.querySelector('.prev-button').addEventListener('click', () => show(current - 1));
  document.querySelector('.replay-button').addEventListener('click', () => show(0));
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
})();
