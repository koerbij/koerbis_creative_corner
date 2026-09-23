// starcounter.js — tracks which decorative stars the visitor has clicked,
// persists that for the current browser session, and resets on a real reload.

document.addEventListener("DOMContentLoaded", function () {
  const STORAGE_KEY = "foundStars";

  const stars = Array.from(document.querySelectorAll(".star"));
  const counter = document.getElementById("star-counter");
  const countDisplay = document.getElementById("count");
  const sparkleSound = new Audio("recources/sounds/sm64 get star sound (HD).mp3");

  if (stars.length === 0) return; // nothing to do on this page

  // Give every star a stable id (based on its position in the DOM) so we can
  // remember exactly which ones were found, not just how many.
  stars.forEach((star, i) => {
    if (!star.dataset.starId) star.dataset.starId = `star-${i}`;
  });

  // --- storage helpers (private browsing can block sessionStorage) ---
  function readFound() {
    try {
      return new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || []);
    } catch {
      return new Set();
    }
  }

  function writeFound(foundSet) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...foundSet]));
    } catch {
      // storage unavailable — the hunt just won't persist, no big deal
    }
  }

  // --- was this a hard reload, or navigation from another page? ---
  function wasReloaded() {
    const [nav] = performance.getEntriesByType("navigation");
    return nav ? nav.type === "reload" : false;
  }

  let found = wasReloaded() ? new Set() : readFound();
  if (wasReloaded()) writeFound(found);

  function updateCounterUI() {
    if (found.size === stars.length) {
      countDisplay.textContent = `${found.size} ✨ all found!`;
    } else {
      countDisplay.textContent = found.size;
    }
    counter.classList.toggle("counter-hidden", found.size === 0);
  }

  // Re-hide any stars already found earlier in this session
  stars.forEach((star) => {
    if (found.has(star.dataset.starId)) {
      star.classList.add("star-hidden");
    }
  });
  updateCounterUI();

  // --- click handling ---
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const id = star.dataset.starId;
      if (found.has(id)) return; // already collected, ignore

      sparkleSound.currentTime = 0;
      sparkleSound.play().catch(() => {
        // autoplay/sound can fail silently in some browsers — that's fine
      });

      star.classList.add("star-hidden");
      found.add(id);
      writeFound(found);
      updateCounterUI();
    });
  });
});