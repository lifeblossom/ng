/* ============================================================
   Life Blossom Care and Cure Hospital — Main JavaScript
   ============================================================ */

/* ---------- Navbar: sticky scroll + hamburger ---------- */
const header    = document.getElementById('mainHeader');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ---------- Scroll to Top ---------- */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Animate on Scroll ---------- */
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger sibling animations slightly
      const delay = entry.target.closest('.grid-2, .grid-3, .grid-4, .why-grid, .testimonial-grid, .services-grid, .gallery-masonry')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => observer.observe(el));

/* ---------- Set minimum date on appointment form ---------- */
const preferredDateInput = document.getElementById('preferredDate');
if (preferredDateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  preferredDateInput.min = `${yyyy}-${mm}-${dd}`;
}

/* ---------- Gallery filter button styles (injected) ---------- */
const style = document.createElement('style');
style.textContent = `
  .gallery-filter-btn {
    padding: .55rem 1.4rem;
    border-radius: 50px;
    border: 2px solid var(--light-gray);
    background: var(--white);
    color: var(--text);
    font-size: .88rem;
    font-weight: 600;
    cursor: pointer;
    transition: all .25s ease;
    font-family: var(--font);
  }
  .gallery-filter-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  .gallery-filter-btn.active {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    box-shadow: 0 4px 15px rgba(10,92,138,.3);
  }
  /* Responsive contact layout fix */
  @media (max-width: 900px) {
    .contact-layout {
      grid-template-columns: 1fr !important;
    }
    .about-story-grid {
      grid-template-columns: 1fr !important;
    }
    .stats-grid {
      grid-template-columns: 1fr 1fr !important;
    }
  }
  @media (max-width: 600px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr !important;
    }
  }
`;
document.head.appendChild(style);
