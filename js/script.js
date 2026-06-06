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

  /* ---- Lightbox galleria (zoom a schermo intero) ---- */
  const galleries = document.querySelectorAll(".gallery, .collage");
  if (galleries.length > 0) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Chiudi">&times;</button>' +
      '<img class="lightbox__img" src="" alt="">';
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector(".lightbox__img");

    const openLightbox = (src, alt) => {
      lbImg.src = src;
      lbImg.alt = alt || "";
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lbImg.src = "";
    };

    galleries.forEach((gallery) => {
      gallery.addEventListener("click", (e) => {
        const img = e.target.closest("img");
        if (img && gallery.contains(img)) {
          openLightbox(img.currentSrc || img.src, img.alt);
        }
      });
    });

    overlay.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }
});
