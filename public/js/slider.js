// JavaScript para el slider
const slider = document.querySelector('.slider');
let currentIndex = 0;

function showSlide(index) {
  // Calcula la posición del slider en función del índice
  const newPosition = -index * 100 + '%';
  slider.style.transform = 'translateX(' + newPosition + ')';
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slider.children.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
  showSlide(currentIndex);
}

// Inicia el slider
showSlide(currentIndex);

setInterval(function() {
  nextSlide();
}, 7000);