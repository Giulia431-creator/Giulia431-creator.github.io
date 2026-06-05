/* =========================================================
   Sito personale di Giulia Cecconi — script.js
   - Menù hamburger (mobile)
   - Comparsa delle sezioni allo scroll (IntersectionObserver)
   - Anno dinamico nel footer
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Icone Lucide (caricate via CDN) ---- */
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ---- Menù hamburger ---- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__list");

  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Chiusura al click su un link
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Chiusura con il tasto Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Comparsa sezioni allo scroll ---- */
  const revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    // Fallback: mostra tutto se l'API non è disponibile
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ---- Anno dinamico nel footer ---- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
