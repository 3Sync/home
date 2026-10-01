(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  /* ---------- Mobile navigation ---------- */

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (menu.classList.contains("is-open") && !header.contains(event.target)) setMenu(false);
  });

  window.matchMedia("(min-width: 781px)").addEventListener("change", function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* ---------- Header border once the page scrolls ---------- */

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */

  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
        // Drop the stagger once revealed so hover effects respond instantly.
        if (el.style.transitionDelay) setTimeout(function () { el.style.transitionDelay = ""; }, 800);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

    revealItems.forEach(function (el, i) {
      // Small stagger for cards that appear together.
      if (el.classList.contains("product-card")) el.style.transitionDelay = (i % 3) * 70 + "ms";
      revealObserver.observe(el);
    });
  }

  /* ---------- Highlight the current section in the nav ---------- */

  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = ["models", "community"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function setCurrent(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + id;
      if (match) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var visible = {};
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      var current = sections.filter(function (s) { return visible[s.id]; }).pop();
      setCurrent(current ? current.id : "top");
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Footer year ---------- */

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
