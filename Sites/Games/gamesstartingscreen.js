document.addEventListener("DOMContentLoaded", function () {
  const sparkleSound = new Audio("recources/sounds/");

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