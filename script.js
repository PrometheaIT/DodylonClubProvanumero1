document.addEventListener("DOMContentLoaded", function() {
  /* PARALLAX SYSTEM */
  const parallaxSections = document.querySelectorAll('.parallax-section');
  let currentActive = 0;
  let isScrolling = false;
  const parallaxContainer = document.querySelector('.parallax-container');
  parallaxContainer.style.height = `${window.innerHeight * parallaxSections.length}px`;
  const sectionPositions = Array.from(parallaxSections).map((_, index) => window.innerHeight * index);
  
  function updateActiveSection() {
    const scrollPos = window.pageYOffset;
    let newActive = sectionPositions.findIndex(pos => scrollPos < pos) - 1;
    if (scrollPos >= sectionPositions[sectionPositions.length - 1]) {
      newActive = parallaxSections.length - 1;
    }
    if (newActive !== currentActive && newActive >= 0) {
      parallaxSections[currentActive].classList.remove('active');
      parallaxSections[newActive].classList.add('active');
      currentActive = newActive;
    }
  }
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateActiveSection();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
  parallaxSections[0].classList.add('active');

/* SLIDESHOW GALLERIA */
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let slideIndex = 0;
let slideInterval;

function showSlides(auto = true) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[slideIndex].classList.add('active');
  
  if(auto) {
    clearInterval(slideInterval);
    slideInterval = setTimeout(() => {
      nextSlide();
    }, 5000);
  }
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlides();
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlides();
}

if(slides.length > 0) {
  // Event listeners per frecce
  prevBtn.addEventListener('click', () => {
    prevSlide();
    showSlides(false);
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    showSlides(false);
  });

  // Avvia automatico
  showSlides();
}

  /* NAVIGATION SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        const yOffset = -60; // Offset per l'header fisso
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
  
  /* ANIMAZIONE MARILIN: L'immagine appare con un fade da sopra quando la sezione "Chi siamo" è visibile */
  const chiSiamoSection = document.getElementById('chi-siamo');
  const marilin = document.querySelector('.marilin');
  if(chiSiamoSection && marilin) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          marilin.style.top = '50%';
          marilin.style.transform = 'translateY(-50%)';
          marilin.style.opacity = '1';
        } else {
          marilin.style.top = '-100px';
          marilin.style.opacity = '0';
        }
      });
    }, { threshold: 0.1 });
    observer.observe(chiSiamoSection);
  }
});


// hamburger
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Toggle menu
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Chiudi menu al click su link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Chiudi menu al click esterno
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });