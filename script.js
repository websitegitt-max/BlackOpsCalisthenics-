/* ============================================================
   IRON PEAK FITNESS — JAVASCRIPT
   ============================================================
   CLIENT CUSTOMIZATION:
   Change the values inside CONFIG below when creating a new gym.
   You normally do NOT need to edit the rest of this file.
   ============================================================ */

const CONFIG = {
  // ===== GYM INFORMATION =====
  gymName: "IRON PEAK FITNESS",
  location: "Bengaluru, Karnataka",
  locationShort: "Bengaluru, Karnataka",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210",
  email: "info@ironpeakfitness.com",
  address: "123 Fitness Street, Bengaluru, Karnataka",

  // ===== OPENING HOURS =====
  hoursHTML: "Monday – Saturday: 5:30 AM – 10:00 PM<br>Sunday: 6:00 AM – 2:00 PM",

  // ===== SOCIAL MEDIA =====
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",

  // ===== GOOGLE MAPS =====
  // Replace this with your Google Maps embed URL.
  mapEmbed: "https://www.google.com/maps?q=Bengaluru%2C%20Karnataka&output=embed",

  // Directions link can be a Google Maps search link.
  directions: "https://www.google.com/maps/search/?api=1&query=123+Fitness+Street+Bengaluru+Karnataka",

  // ===== COPYRIGHT =====
  copyrightYear: "2026"
};

/* ================= BASIC CONTENT SETUP ================= */
document.querySelectorAll("[data-gym-name]").forEach(el => {
  el.textContent = CONFIG.gymName;
});

document.querySelectorAll("[data-phone]").forEach(el => {
  el.textContent = CONFIG.phone;
});

document.querySelectorAll("[data-email]").forEach(el => {
  el.textContent = CONFIG.email;
});

document.querySelectorAll("[data-address]").forEach(el => {
  el.textContent = CONFIG.address;
});

document.querySelectorAll("[data-location-short]").forEach(el => {
  el.textContent = CONFIG.locationShort;
});

document.querySelectorAll("[data-hours]").forEach(el => {
  el.innerHTML = CONFIG.hoursHTML;
});

document.title = `${CONFIG.gymName} | Premium Gym in ${CONFIG.location.split(",")[0]}`;

const phoneHref = `tel:${CONFIG.phone.replace(/\s+/g, "")}`;
const emailHref = `mailto:${CONFIG.email}`;
const whatsappMessage = encodeURIComponent(
  "Hello, I would like to know more about your gym membership and programs."
);
const whatsappHref = `https://wa.me/${CONFIG.whatsappNumber}?text=${whatsappMessage}`;

document.querySelector("#phone-link")?.setAttribute("href", phoneHref);
document.querySelector("#footer-phone")?.setAttribute("href", phoneHref);
document.querySelector("#email-link")?.setAttribute("href", emailHref);
document.querySelector("#footer-email")?.setAttribute("href", emailHref);
document.querySelector("#whatsapp-button")?.setAttribute("href", whatsappHref);
document.querySelector("#whatsapp-footer")?.setAttribute("href", whatsappHref);
document.querySelector("#instagram-link")?.setAttribute("href", CONFIG.instagram);
document.querySelector("#facebook-link")?.setAttribute("href", CONFIG.facebook);
document.querySelector("#youtube-link")?.setAttribute("href", CONFIG.youtube);
document.querySelector("#map-frame")?.setAttribute("src", CONFIG.mapEmbed);
document.querySelector("#directions-link")?.setAttribute("href", CONFIG.directions);
document.querySelector("#copyright-year").textContent = CONFIG.copyrightYear;

/* ================= STICKY HEADER ================= */
const header = document.querySelector("#site-header");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ================= MOBILE MENU ================= */
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

/* ================= SCROLL REVEAL ================= */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ================= COUNTERS ================= */
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;

  document.querySelectorAll(".counter").forEach(counter => {
    const target = Number(counter.dataset.target);
    const duration = 1300;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

const statsSection = document.querySelector("#stats");
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounters();
    statsObserver.disconnect();
  }
}, { threshold: 0.4 });

statsObserver.observe(statsSection);

/* ================= GALLERY FILTER ================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = [...document.querySelectorAll(".gallery-item")];

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryItems.forEach(item => {
      const matches = filter === "all" || item.dataset.category === filter;
      item.style.display = matches ? "" : "none";
    });
  });
});

/* ================= GALLERY LIGHTBOX ================= */
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector("#lightbox-close");
const lightboxPrev = document.querySelector("#lightbox-prev");
const lightboxNext = document.querySelector("#lightbox-next");

let visibleGalleryItems = [];
let currentGalleryIndex = 0;

function refreshVisibleGalleryItems() {
  visibleGalleryItems = galleryItems.filter(item => item.style.display !== "none");
}

function openLightbox(index) {
  refreshVisibleGalleryItems();
  currentGalleryIndex = index;
  const item = visibleGalleryItems[currentGalleryIndex];
  if (!item) return;

  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector("img").alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function moveLightbox(direction) {
  refreshVisibleGalleryItems();
  if (!visibleGalleryItems.length) return;
  currentGalleryIndex =
    (currentGalleryIndex + direction + visibleGalleryItems.length) %
    visibleGalleryItems.length;
  const item = visibleGalleryItems[currentGalleryIndex];
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector("img").alt;
}

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    refreshVisibleGalleryItems();
    openLightbox(visibleGalleryItems.indexOf(item));
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => moveLightbox(-1));
lightboxNext.addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

/* ================= TESTIMONIAL SLIDER ================= */
const testimonialSlides = [...document.querySelectorAll(".testimonial-slide")];
let testimonialIndex = 0;

function showTestimonial(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

document.querySelector("#testimonial-prev").addEventListener("click", () => {
  testimonialIndex =
    (testimonialIndex - 1 + testimonialSlides.length) %
    testimonialSlides.length;
  showTestimonial(testimonialIndex);
});

document.querySelector("#testimonial-next").addEventListener("click", () => {
  testimonialIndex =
    (testimonialIndex + 1) % testimonialSlides.length;
  showTestimonial(testimonialIndex);
});

/* Optional autoplay */
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
  showTestimonial(testimonialIndex);
}, 7000);

/* ================= CONTACT FORM =================
   This validates the form and displays a success message.
   It does NOT send email because there is no backend.
*/
const contactForm = document.querySelector("#contact-form");
const formSuccess = document.querySelector("#form-success");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  formSuccess.classList.add("show");
  contactForm.reset();

  setTimeout(() => {
    formSuccess.classList.remove("show");
  }, 6000);
});

/* ================= OPTIONAL IMAGE FALLBACK =================
   If a local image is missing, the browser will show a neutral
   placeholder instead of breaking the layout completely.
*/
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.background = "#242424";
    img.style.minHeight = "180px";
    img.alt = "Image placeholder — replace this image in /images/";
  });
});
