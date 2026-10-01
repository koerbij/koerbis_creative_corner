(function () {
  const banner   = document.getElementById('character-banner');
  const sfx      = document.getElementById('banner-sfx');
  const selector = document.querySelector('.cursor-selector');
  let started = false;

  function playBanner() {
    if (started) return;
    started = true;

    // Sound starts exactly when the banner starts flying in
    banner.addEventListener('animationstart', () => {
      sfx.currentTime = 0;
      sfx.play().catch(() => {});
    }, { once: true });

    banner.addEventListener('animationend', () => {
      banner.style.visibility = 'hidden';  // keeps layout stable
    }, { once: true });

    banner.classList.add('play');
  }

  // Start when the carousel area is actually on screen (once)
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      playBanner();
    }
  }, { threshold: 0.4 });

  observer.observe(selector);
})();