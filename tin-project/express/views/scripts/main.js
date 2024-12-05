let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function updateSlider() {
    const offset = -currentIndex * 600;
    document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
}

setInterval(showNextSlide, 3000);