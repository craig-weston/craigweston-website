const stops = [...document.querySelectorAll('.passport-stop')];
const stamps = new Set();
const counter = document.querySelector('#stamp-count');
for (const stop of stops) {
  const choices = stop.querySelector('.practice');
  const feedback = stop.querySelector('.reply');
  choices.hidden = false;
  choices.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    feedback.textContent = button.dataset.reply;
    if (button.hasAttribute('data-correct')) {
      stamps.add(stop.id);
      stop.querySelector('.stamp').textContent = 'Stamp collected ✓';
      counter.textContent = stamps.size === stops.length
        ? 'All three stamps collected. Choose a free lesson to keep exploring.'
        : stamps.size + ' of 3 stamps collected';
    }
  });
}
