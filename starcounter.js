// starcounter.js — tracks which decorative stars the visitor has clicked,
// persists that for the current browser session, and resets on a real reload.

// Must be captured here, at top-level script execution — document.currentScript
// is only set while this file is first running, and would be null by the time
// the DOMContentLoaded callback below actually fires.
const STARCOUNTER_SCRIPT_URL = document.currentScript.src;

document.addEventListener("DOMContentLoaded", function () {
  const STORAGE_KEY = "foundStars";

  // Set this once you know the final total across every page (index has 9,
  // skills has 8, etc.) so the "found them all" message means the whole
  // hunt, not just this one page. Leave as null to skip that message.
  const TOTAL_STARS_SITE_WIDE = null;

  const stars = Array.from(document.querySelectorAll(".star"));
  const counter = document.getElementById("star-counter");
  const countDisplay = document.getElementById("count");

  if (!counter || !countDisplay) return; // this page has no counter widget at all

  // Resolve relative to this script's own file (which always lives at the
  // site root), so the sound works correctly no matter how deeply nested
  // the page that loaded it is.
  const soundURL = new URL(
    "recources/sounds/sm64 get star sound (HD).mp3",
    STARCOUNTER_SCRIPT_URL
  ).href;
  const sparkleSound = new Audio(soundURL);

  // Give every star a stable id, scoped to this page + its position in the
  // DOM, so the "3rd star" on index.html and the "3rd star" on skills.html
  // are never treated as the same collectible.
  stars.forEach((star, i) => {
    if (!star.dataset.starId) star.dataset.starId = `${location.pathname}-star-${i}`;
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
    if (TOTAL_STARS_SITE_WIDE && found.size === TOTAL_STARS_SITE_WIDE) {
      countDisplay.textContent = `${found.size} ✨ all found!`;
    } else {
      countDisplay.textContent = found.size;
    }
    counter.classList.toggle("counter-hidden", found.size === 0);
  }

  // Always reflect the persisted state, even on pages with no stars at all
  updateCounterUI();

  if (stars.length === 0) return; // nothing further to wire up on this page

  // Re-hide any stars already found earlier in this session
  stars.forEach((star) => {
    if (found.has(star.dataset.starId)) {
      star.classList.add("star-hidden");
    }
  });

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