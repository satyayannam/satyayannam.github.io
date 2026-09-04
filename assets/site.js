(function () {
  const root = document.documentElement;
  const body = document.body;
  const storedTheme = localStorage.getItem("satya-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = storedTheme || (prefersLight ? "light" : "dark");
  body.dataset.theme = initialTheme;

  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  const year = document.querySelector("[data-year]");
  const copyEmail = document.querySelector("[data-copy-email]");

  if (year) year.textContent = new Date().getFullYear();

  function setTheme(theme) {
    body.dataset.theme = theme;
    localStorage.setItem("satya-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(body.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const open = !body.classList.contains("menu-open");
      body.classList.toggle("menu-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 6, 5) * 45}ms`;
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if ("IntersectionObserver" in window && navLinks.length) {
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

    sections.forEach((section) => navObserver.observe(section));
  }

  if (copyEmail) {
    copyEmail.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("syannam2024@fau.edu");
        const original = copyEmail.textContent;
        copyEmail.textContent = "Copied";
        window.setTimeout(() => {
          copyEmail.textContent = original;
        }, 1400);
      } catch {
        window.location.href = "mailto:syannam2024@fau.edu";
      }
    });
  }

  root.classList.add("js-ready");
})();
