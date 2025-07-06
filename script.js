// ===== Sidebar Toggle =====
const navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close"),
      sidebar = document.getElementById("sidebar");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    sidebar.classList.add("show-sidebar");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    sidebar.classList.remove("show-sidebar");
  });
}

// ===== Remove sidebar on link click (Mobile) =====
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link =>
  link.addEventListener("click", () => {
    sidebar.classList.remove("show-sidebar");
  })
);

// ===== Active section on scroll =====
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// ===== Skills Accordion =====
const skillsHeaders = document.querySelectorAll(".skills-header");

skillsHeaders.forEach(header => {
  header.addEventListener("click", function () {
    const currentlyOpen = document.querySelector(".skills-active");
    if (currentlyOpen && currentlyOpen !== this) {
      currentlyOpen.classList.remove("skills-active");
    }
    this.classList.toggle("skills-active");
  });
});

// ===== MixItUp Filtering for Projects (optional) =====
let mixer = mixitup(".work-container", {
  selectors: {
    target: ".work-card",
  },
  animation: {
    duration: 300,
  },
});

// ===== Swiper for Testimonials (optional) =====
var swiper = new Swiper(".testimonial-container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});
