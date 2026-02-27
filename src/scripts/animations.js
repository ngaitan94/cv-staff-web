import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero: entrada escalonada al cargar
 */
function initHeroEntrance() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const badge = hero.querySelector('.badget');
  const title = hero.querySelector('h1');
  const desc = hero.querySelector('p');
  const img = hero.querySelector('img');
  const ctas = hero.querySelector('.ctas');

  const els = [badge, title, desc, img, ctas].filter(Boolean);
  gsap.set(els, { opacity: 0, y: 20 });

  gsap.to(els, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.12,
    ease: 'power2.out',
    delay: 0.15,
  });
}

/**
 * Secciones: reveal al hacer scroll
 */
function initScrollReveal() {
  const sections = document.querySelectorAll('[data-reveal]');
  sections.forEach((section) => {
    const inner = section.querySelector('[data-reveal-inner]') || section;
    const delay = parseFloat(section.dataset.revealDelay || '0');

    gsap.from(inner.children, {
      opacity: 0,
      y: 32,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      delay,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
    });
  });
}

/**
 * Works: título + timeline con eventos en stagger
 */
function initWorksReveal() {
  const section = document.querySelector('.works');
  if (!section) return;

  const heading = section.querySelector('.heading');
  const timeline = section.querySelector('.timeline');
  const events = timeline ? timeline.querySelectorAll('.event') : [];

  if (heading) {
    gsap.from(heading, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  }

  if (events.length === 0) return;

  gsap.from(events, {
    opacity: 0,
    y: 24,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: timeline,
      start: 'top 85%',
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

  gsap.set(tags.children, { opacity: 0, y: 16 });
  gsap.from(heading, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
  });
  gsap.to(tags.children, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.03,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
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
  const links = section.querySelector('.links');
  if (!heading || !links) return;

  gsap.from([heading, ...links.querySelectorAll('.link')], {
    opacity: 0,
    y: 24,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 88%',
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
