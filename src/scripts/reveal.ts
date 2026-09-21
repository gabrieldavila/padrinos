const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let observer: IntersectionObserver | undefined;

const showAll = () => {
  observer?.disconnect();
  scenes.forEach((scene) => scene.classList.remove('awaiting-reveal'));
};

try {
  if (!motion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('awaiting-reveal');
          observer?.unobserve(entry.target);
        }
      }
    }, { threshold: 0, rootMargin: '0px 0px 24px 0px' });

    for (const scene of scenes) {
      // Never hide anything already seen or above a restored scroll position.
      if (scene.getBoundingClientRect().top > window.innerHeight) {
        observer.observe(scene);
        scene.classList.add('awaiting-reveal');
      }
    }
    motion.addEventListener('change', (event) => { if (event.matches) showAll(); });
    window.addEventListener('pageshow', (event) => { if (event.persisted) showAll(); });
    window.addEventListener('hashchange', showAll);
    // Keyboard navigation must never land on visually hidden content.
    document.addEventListener('focusin', (event) => {
      if (event.target instanceof Element) event.target.closest('[data-reveal]')?.classList.remove('awaiting-reveal');
    });
  }
} catch {
  showAll();
}
