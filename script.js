/* script.js
   - Accessible mobile menu (supports div or button toggles)
   - Progress bar animation using IntersectionObserver
   - Contact form submission via fetch (Formspree placeholder)
   - Header scroll effect + Esc to close mobile menu
*/

// --- Mobile menu toggle (supports both <button> and <div>)
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Ensure elements exist before using them
if (menuToggle && navLinks) {
  // If toggle is not a button, add accessibility attributes
  if (menuToggle.tagName.toLowerCase() !== 'button') {
    menuToggle.setAttribute('role', 'button');
    menuToggle.setAttribute('tabindex', '0');
    menuToggle.setAttribute('aria-controls', 'navLinks');
    menuToggle.setAttribute('aria-expanded', 'false');
  } else {
    // If it's a button, ensure aria-controls exists
    if (!menuToggle.hasAttribute('aria-controls')) {
      menuToggle.setAttribute('aria-controls', 'navLinks');
    }
    if (!menuToggle.hasAttribute('aria-expanded')) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Toggle function
  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Focus first link when opening
    if (isOpen) {
      const firstLink = navLinks.querySelector('a');
      firstLink && firstLink.focus();
    }
  }

  // Click handler
  menuToggle.addEventListener('click', toggleMenu);

  // Keyboard support: Enter and Space to toggle
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

// --- Animate progress bars when skills section is visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const observerOptions = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress') || '0';
          bar.style.width = progress + '%';
        });
      }
    });
  }, observerOptions);

  observer.observe(skillsSection);
}

// --- Contact form submission (Formspree example)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);

    // Replace with your Formspree endpoint or your backend endpoint
    const endpoint = 'https://formspree.io/f/your_form_id_here';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (res.ok) {
        // Optionally show a nicer in-page message instead of alert()
        alert('Thank you — message sent!');
        contactForm.reset();
      } else {
        const data = await res.json().catch(() => null);
        const errorMsg = data?.error || 'Form submission failed.';
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error(err);
      alert('Oops — something went wrong. Try again later or email lokhandevipul245@gmail.com directly.');
    }
  });
}

// --- Header scroll shadow tweak
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
  } else {
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});
