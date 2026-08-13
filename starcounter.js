// Clear count on reload, but not on navigation
if (performance.navigation.type === 1) {
  sessionStorage.removeItem("starCount");
}
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  const counter = document.getElementById("star-counter");
  const countDisplay = document.getElementById("count");
  const sparkleSound = new Audio("recources/sounds/sm64 get star sound (HD).mp3");
  let count = parseInt(sessionStorage.getItem("starCount")) || 0;
  if (count > 0) {
    countDisplay.textContent = count;
    counter.classList.remove("counter-hidden");
  }

  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      if (star.classList.contains("star-hidden")) return;
        sparkleSound.currentTime = 0;
        sparkleSound.play();
        star.classList.add("star-hidden");
        count++;
        countDisplay.textContent = count;
        sessionStorage.setItem("starCount", count);
        if (count === 1) {
            counter.classList.remove("counter-hidden");
        }
    });
  });
});
