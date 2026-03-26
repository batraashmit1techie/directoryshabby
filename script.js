const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".topnav a");
const sectionIds = [...navLinks].map((link) => document.querySelector(link.getAttribute("href")));
const counters = document.querySelectorAll("[data-counter]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countUp = (element) => {
  const target = Number(element.dataset.counter);
  const suffix = target >= 1000 ? "M+" : target >= 50 ? "+" : "+";
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const setActiveLink = () => {
  const currentY = window.scrollY + 140;
  let activeIndex = 0;

  sectionIds.forEach((section, index) => {
    if (section && section.offsetTop <= currentY) {
      activeIndex = index;
    }
  });

  navLinks.forEach((link, index) => {
    link.classList.toggle("is-active", index === activeIndex);
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
