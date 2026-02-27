import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero: entrada escalonada al cargar con título animado
 */
function initHeroEntrance() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const badge = hero.querySelector('.badget');
  const title = hero.querySelector('.hero-title');
  const words = hero.querySelectorAll('[data-animate="word"]');
  const nameLetters = hero.querySelectorAll('.name .letter');
  const wave = hero.querySelector('[data-animate="wave"]');
  const desc = hero.querySelector('.hero-description');
  const img = hero.querySelector('img');
  const ctas = hero.querySelector('.ctas');

  const tl = gsap.timeline({ delay: 0.1 });

  // Badge
  if (badge) {
    gsap.set(badge, { opacity: 0, scale: 0.8, y: -10 });
    tl.to(badge, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(2)',
    }, 0);
  }

  // "Hola," y "soy" con slide
  if (words.length) {
    gsap.set(words, { opacity: 0, x: -30, rotationZ: -5 });
    tl.to(words, {
      opacity: 1,
      x: 0,
      rotationZ: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    }, 0.2);
  }

  // Letras del nombre cayendo con rebote
  if (nameLetters.length) {
    gsap.set(nameLetters, { 
      opacity: 0, 
      y: -80,
      rotationZ: () => gsap.utils.random(-20, 20),
      scale: 0.5,
    });
    tl.to(nameLetters, {
      opacity: 1,
      y: 0,
      rotationZ: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.04,
      ease: 'bounce.out',
    }, 0.5);
  }

  // Emoji wave animado
  if (wave) {
    gsap.set(wave, { opacity: 0, scale: 0, rotationZ: -30 });
    tl.to(wave, {
      opacity: 1,
      scale: 1,
      rotationZ: 0,
      duration: 0.4,
      ease: 'back.out(3)',
    }, 0.9)
    .to(wave, {
      rotationZ: 20,
      duration: 0.15,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 5,
    }, 1.1);
  }

  // Descripción
  if (desc) {
    gsap.set(desc, { opacity: 0, y: 20 });
    tl.to(desc, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 1.3);
  }

  // Photo slider con fade + scale
  const photoSlider = hero.querySelector('.photo-slider');
  if (photoSlider) {
    gsap.set(photoSlider, { opacity: 0, scale: 0.9, y: 20 });
    tl.to(photoSlider, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: 'back.out(1.5)',
    }, 1.0);
  } else if (img) {
    gsap.set(img, { opacity: 0, scale: 0.9 });
    tl.to(img, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'power2.out',
    }, 1.0);
  }

  // CTAs
  if (ctas) {
    gsap.set(ctas, { opacity: 0, y: 20 });
    tl.to(ctas, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 1.5);
  }
}

/**
 * Secciones: reveal al hacer scroll
 */
function initScrollReveal() {
  const sections = document.querySelectorAll('[data-reveal]');
  sections.forEach((section) => {
    const inner = section.querySelector('[data-reveal-inner]') || section;

    gsap.from(inner.children, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });
}

/**
 * Works: título + accordion items en stagger
 */
function initWorksReveal() {
  const section = document.querySelector('.works');
  if (!section) return;

  const heading = section.querySelector('.heading');
  const accordion = section.querySelector('.accordion');
  const items = accordion ? accordion.querySelectorAll('.accordion-item') : [];

  if (heading) {
    gsap.from(heading, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  if (items.length === 0) return;

  gsap.from(items, {
    opacity: 0,
    y: 60,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: accordion,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

/**
 * Skills: tags con stagger al entrar
 */
function initSkillsReveal() {
  const section = document.querySelector('.skills');
  if (!section) return;

  const heading = section.querySelector('.heading');
  const tags = section.querySelector('.tags');
  if (!tags) return;

  gsap.set(tags.children, { opacity: 0, y: 30, scale: 0.8 });
  
  gsap.from(heading, {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.to(tags.children, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.5,
    stagger: 0.04,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: tags,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}

/**
 * Contact: links con stagger
 */
function initContactReveal() {
  const section = document.querySelector('.contact');
  if (!section) return;

  const heading = section.querySelector('.heading');
  const subline = section.querySelector('.subline');
  const links = section.querySelector('.links');
  if (!heading || !links) return;

  const elements = [heading, subline, ...links.querySelectorAll('.link')].filter(Boolean);

  gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

function init() {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  initHeroEntrance();
  initScrollReveal();
  initWorksReveal();
  initSkillsReveal();
  initContactReveal();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
