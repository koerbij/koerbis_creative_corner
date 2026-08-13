const cursorImages = [
  {
    display: '../../../recources/Photos/curors/saddog big.png',
    cursor:  '../../recources/Photos/curors/saddog cursor.png',
  },
  {
    display: '../../../recources/Photos/curors/verticalpea big.png',
    cursor:  '../../../recources/Photos/curors/verticalpea cursor.png',
  },
  {
    display: '../../../recources/Photos/curors/emilio big.png',
    cursor:  '../../../recources/Photos/curors/emilio cursor.png',
  },
];

let currentSlide = 0;
let activeCursor = null;

function updateCarousel() {
  document.getElementById('carousel-img').src = cursorImages[currentSlide].display;
}

function changeSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = cursorImages.length - 1;
  if (currentSlide >= cursorImages.length) currentSlide = 0;
  updateCarousel();
}

document.getElementById('carousel-img').addEventListener('click', function() {
  const path = cursorImages[currentSlide].cursor;
  if (activeCursor === path) {
    document.body.style.cursor = 'default';
    activeCursor = null;
  } else {
    document.body.style.cursor = `url("${path}"), auto`;
    activeCursor = path;
  }
});