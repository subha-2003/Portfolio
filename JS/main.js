/* Theme handling */
function initTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('.theme-toggle i');
  if (icon) {
    icon.className = theme === 'light' 
      ? 'fa-solid fa-moon' 
      : 'fa-solid fa-sun';
  }
}

/* Page load fade-in and theme init */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  initTheme();
});

// Theme toggle handler
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

/* Mobile menu toggle with body scroll lock and ARIA state */
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("primary-navigation");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));

    const icon = menuBtn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
    }
  });

  // Close nav when clicking a link (better mobile UX)
  navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuBtn.setAttribute("aria-expanded", "false");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    });
  });
}

/* Active link on scroll + sticky header shadow */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("header nav a");
const headerEl = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const top = window.scrollY;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });

  headerEl?.classList.toggle("sticky", window.scrollY > 60);
});

/* IntersectionObserver: reveal sections on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Stop observing once visible for performance
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".observe").forEach(el => io.observe(el));
