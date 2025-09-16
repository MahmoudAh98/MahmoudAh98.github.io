
document.addEventListener('DOMContentLoaded', () => {
  // Enhanced Preloader
  const preloader = document.getElementById('preloader');
  const preloaderText = document.querySelector('.preloader-text');
  
  // Simulate loading progress
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 500);
    }
  }, 100);

  // Header scroll effect
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  });

  // Mobile nav toggle with animation
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
    toggle.classList.toggle('active');
  });
  
  document.querySelectorAll('#nav-menu a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('show');
      toggle.classList.remove('active');
    });
  });

  // Clean Typed.js animation with just two titles
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    new Typed('.typed', {
      strings: ['DevOps Engineer','Network &amp; System Engineer'],
      typeSpeed: 65,
      backSpeed: 30,
      backDelay: 100,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      smartBackspace: false,
    });
  }

  // Optimized Particles.js for better performance
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 1000 } },
        color: { value: '#6c63ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: false },
        size: { value: 2, random: false },
        line_linked: { 
          enable: true, 
          distance: 200, 
          color: '#6c63ff', 
          opacity: 0.2, 
          width: 1 
        },
        move: { 
          enable: true, 
          speed: 1, 
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: { 
        events: { 
          onhover: { enable: false },
          onclick: { enable: false }
        }
      },
      retina_detect: true
    });
  }

  // Enhanced ScrollReveal animations
  if (window.ScrollReveal) {
    const sr = ScrollReveal({ 
      distance: '40px', 
      duration: 1000, 
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
      origin: 'bottom', 
      reset: false 
    });
    
    // Staggered animations
    sr.reveal('.section-title', { delay: 200 });
    sr.reveal('.hero-left', { delay: 300, origin: 'left' });
    sr.reveal('.hero-right', { delay: 500, origin: 'right' });
    sr.reveal('.skill-card', { interval: 100, delay: 200 });
    sr.reveal('.tl-item', { interval: 150, delay: 300 });
    sr.reveal('.card', { interval: 200, delay: 400 });
    sr.reveal('.contact-card', { interval: 100, delay: 200 });
    sr.reveal('.about-grid > *', { interval: 150, delay: 300 });
  }

  // Enhanced scroll effects with throttling for better performance
  const sections = document.querySelectorAll('section[id]');
  const back = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('#nav-menu .nav-link');
  
  let ticking = false;
  
  function onScroll(){
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        
        // Active navigation
        sections.forEach(curr => {
          const h = curr.offsetHeight; 
          const top = curr.offsetTop - 150;
          const id = curr.getAttribute('id');
          const link = document.querySelector('#nav-menu a[href*=' + id + ']');
          
          if (scrollY > top && scrollY <= top + h) {
            navLinks.forEach(l => l.classList.remove('active'));
            if (link) link.classList.add('active');
          }
        });
        
        // Back to top button
        if (scrollY > 600) {
          back.classList.add('show');
        } else {
          back.classList.remove('show');
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true }); 
  onScroll();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced button hover effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Card hover effects
  document.querySelectorAll('.card, .skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Services tabs
  const svcTabs = document.querySelectorAll('.services-tab');
  const svcPanels = document.querySelectorAll('.service-panel');
  if (svcTabs.length) {
    svcTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        svcTabs.forEach(t => t.classList.remove('active'));
        svcPanels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.querySelector(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // Resume modal
  const modal = document.getElementById('resumeModal');
  const openBtns = document.querySelectorAll('.resume-pop');
  const closeEls = modal ? modal.querySelectorAll('[data-close]') : [];
  function openModal(e){
    e.preventDefault();
    if(!modal) return;
    modal.classList.add('show');
  }
  function closeModal(){ if(modal) modal.classList.remove('show'); }
  openBtns.forEach(b=> b.addEventListener('click', openModal));
  closeEls.forEach(el=> el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
});

// Function to scroll to specific sections
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const offsetTop = target.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}



document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = new FormData(form);

      try {
        const response = await fetch("https://formspree.io/f/mdklpwop", {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          status.textContent = "✅ Your message has been sent successfully!";
          status.style.color = "limegreen";
          form.reset();
        } else {
          status.textContent = "❌ Something went wrong. Please try again.";
          status.style.color = "red";
        }
      } catch (error) {
        status.textContent = "⚠️ Connection error. Try again later.";
        status.style.color = "orange";
      }
    });
  }
});


// === Inline submission (no redirect) for contact form ===
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mdklpwop", {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        status.textContent = "✅ Your message has been sent successfully!";
        status.style.color = "limegreen";
        form.reset();
      } else {
        status.textContent = "❌ Something went wrong. Please try again.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "⚠️ Connection error. Try again later.";
      status.style.color = "orange";
    }
  });
});
