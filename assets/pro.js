// ============ Pro Interactions (Vanilla) ============
// - Smooth internal linking, reveal-on-scroll, active nav highlight
// - No external libraries

(function (){
  // 1) Smooth anchor link offset fix (for sticky nav)
  const nav = document.querySelector('.navbar');
  const navHeight = nav ? nav.offsetHeight : 0;

  function scrollToHash(hash){
    const el = document.querySelector(hash);
    if(!el) return;
    const rect = el.getBoundingClientRect();
    const top = window.pageYOffset + rect.top - (navHeight + 12);
    window.scrollTo({ top, behavior: 'smooth' });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href && href.length > 1){
      e.preventDefault();
      history.pushState(null, "", href);
      scrollToHash(href);
    }
  });

  if(location.hash && document.querySelector(location.hash)){
    setTimeout(() => scrollToHash(location.hash), 50);
  }

  // 2) Reveal on scroll using IntersectionObserver
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced && 'IntersectionObserver' in window){
    const revealables = Array.from(document.querySelectorAll('.reveal, section, .card, .project, .projects, .grid, img, h2, h3, p, li'))
      .filter(el => !el.classList.contains('navbar') && !el.closest('.navbar'));
    // Add 'reveal' class if element doesn't have it
    revealables.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          // Stagger children if parent has .stagger or .projects or .grid
          if(entry.target.classList.contains('stagger') ||
             entry.target.classList.contains('projects') ||
             entry.target.classList.contains('grid')){
            Array.from(entry.target.children).forEach((child, i) => {
              child.style.animationDelay = (i * 80) + 'ms';
              child.classList.add('reveal');
              child.classList.add('in-view');
            });
          }
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealables.forEach(el => io.observe(el));
  }

  // 3) Active section highlighting in navbar while scrolling
  const sections = Array.from(document.querySelectorAll('section[id], [data-section]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar a[href^="#"]'));
  if(sections.length && navLinks.length){
    const byId = Object.fromEntries(navLinks.map(a => [a.getAttribute('href'), a]));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + (entry.target.getAttribute('id') || entry.target.getAttribute('data-section'));
        const link = byId[id];
        if(link){
          if(entry.isIntersecting){
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    }, { rootMargin: '-50% 0px -45% 0px', threshold: 0.01 });
    sections.forEach(s => obs.observe(s));
  }
})();