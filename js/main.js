// Typewriter line under the name. Edit the phrases to change what it says.
const phrases = [
  "I build web tools.",
  "I make strange software projects.",
  "I work on security projects."
];

const el = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  // No animation: just show the first phrase.
  el.textContent = phrases[0];
} else {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    el.textContent = current.slice(0, charIndex);

    let delay = deleting ? 35 : 70;

    if (!deleting && charIndex === current.length) {
      deleting = true;
      delay = 1600; // pause on the full phrase
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    charIndex += deleting ? -1 : 1;
    setTimeout(tick, delay);
  }

  tick();
}