(function () {
  const banner   = document.getElementById('character-banner');
  const sfx      = document.getElementById('banner-sfx');
  const selector = document.querySelector('.cursor-selector');
  let started = false;

  function playBanner() {
    if (started) return;
    started = true;

    function playSound(){
        let audio = document.getElementById('audio');
        audio.play();
        window.location.href = "myart.html";
      }

    banner.classList.add('play');
    sfx.currentTime = 0;

    sfx.play().catch(() => {
      // Autoplay blocked: play the sound on the first interaction, if the banner is still visible
      const retry = () => {
        if (banner.classList.contains('play') && getComputedStyle(banner).opacity > 0) {
          sfx.currentTime = 0;
          sfx.play().catch(() => {});
        }
      };
      ['pointerdown', 'keydown', 'touchstart'].forEach(e =>
        addEventListener(e, retry, { once: true })
      );
    });

    banner.addEventListener('animationend', () => {
      banner.style.visibility = 'hidden';   // keeps the reserved space, so the layout stays stable
    });
  }

  // Start when the selector is actually on screen (once)
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      playBanner();
    }
  }, { threshold: 0.4 });

  observer.observe(selector);
})();