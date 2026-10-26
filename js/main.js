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

// Projects carousel: one project at a time, with previous/next arrows.
// To add a project, copy an <article class="card slide"> in index.html. The dots and counter update themselves.
(function () {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const track = document.getElementById("project-track");
  const slides = Array.from(track.querySelectorAll(".slide"));
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const count = document.getElementById("count");
  const dotsBox = document.getElementById("dots");
  if (slides.length === 0) return;

  let current = 0;

  // One dot per project, so you can jump straight to any of them.
  const dots = slides.map((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", "Show " + slide.getAttribute("aria-label"));
    dot.addEventListener("click", () => show(i));
    dotsBox.appendChild(dot);
    return dot;
  });

  function show(index) {
    // Wrap around: next on the last project goes back to the first.
    current = (index + slides.length) % slides.length;
    track.style.transform = "translateX(" + (-current * 100) + "%)";

    slides.forEach((slide, i) => {
      // Hidden slides can't be tabbed into or read out.
      slide.inert = i !== current;
    });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    count.textContent = (current + 1) + " / " + slides.length;
  }

  prevBtn.addEventListener("click", () => show(current - 1));
  nextBtn.addEventListener("click", () => show(current + 1));

  // Left and right arrow keys work while focus is inside the carousel.
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { show(current - 1); }
    else if (e.key === "ArrowRight") { show(current + 1); }
  });

  // Swipe on touch screens.
  let startX = null;
  carousel.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
    startX = null;
  });

  carousel.classList.add("is-ready");
  show(0);
})();