/**
 * Shared auto-hiding sticky header
 */
(function () {
  "use strict";

  var header = document.querySelector(".header");
  if (!header) return;

  var lastScrollY = window.scrollY;
  var ticking = false;
  var downThreshold = 8;
  var upThreshold = 2;

  function showHeader() {
    header.classList.remove("is-hidden");
  }

  function hideHeader() {
    if (document.activeElement && header.contains(document.activeElement)) return;
    header.classList.add("is-hidden");
  }

  function updateHeader() {
    var currentScrollY = Math.max(window.scrollY, 0);
    var delta = currentScrollY - lastScrollY;
    var revealZone = header.offsetHeight;

    if (currentScrollY <= revealZone) {
      showHeader();
    } else if (delta > downThreshold) {
      hideHeader();
    } else if (delta < -upThreshold) {
      showHeader();
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (ticking) return;

    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }, { passive: true });

  header.addEventListener("focusin", showHeader);
})();

/**
 * Portfolio — Intelkon case-study table of contents
 */
(function () {
  "use strict";

  var tocList = document.getElementById("case-toc-list");
  if (!tocList) return;

  var sections = document.querySelectorAll(".case-section");
  var usedIds = {};

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-zа-яё0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "") || "section";
  }

  function ensureUniqueId(base) {
    var id = base;
    var index = 2;

    while (usedIds[id] || document.getElementById(id)) {
      id = base + "-" + index;
      index += 1;
    }

    usedIds[id] = true;
    return id;
  }

  sections.forEach(function (section) {
    var titleEl = section.querySelector(".case-section__title");
    var title = titleEl ? titleEl.textContent.trim() : "";
    var id;

    if (section.querySelector("#case-toc-list")) return;
    if (titleEl && titleEl.classList.contains("case-section__title--caption")) return;
    if (!title) return;

    id = section.id || ensureUniqueId(slugify(title));
    section.id = id;
    usedIds[id] = true;

    var item = document.createElement("li");
    var link = document.createElement("a");
    var arrow = document.createElement("span");
    var label = document.createElement("span");

    link.className = "case-toc__link";
    link.href = "#" + id;
    arrow.className = "arrow-135";
    arrow.textContent = "↑";
    label.textContent = title;

    link.appendChild(arrow);
    link.appendChild(label);
    item.appendChild(link);
    tocList.appendChild(item);
  });
})();

/**
 * Intelkon editorial snap carousels
 */
(function () {
  "use strict";

  var carousels = document.querySelectorAll("[data-carousel]");
  if (!carousels.length) return;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  function setupCarousel(carousel) {
    var scroller = carousel.querySelector(".case-scroller");
    var items = Array.prototype.slice.call(carousel.querySelectorAll(".case-scroller__item"));
    var prev = carousel.querySelector("[data-carousel-prev]");
    var next = carousel.querySelector("[data-carousel-next]");
    var controls = carousel.querySelector(".case-carousel__controls");
    var progress;
    var fill;
    var buttons;
    var scrollTimer;

    if (!scroller || items.length < 2 || !prev || !next || !controls) {
      if (prev) prev.hidden = true;
      if (next) next.hidden = true;
      return;
    }

    function buildControls() {
      progress = document.createElement("div");
      var track = document.createElement("span");
      fill = document.createElement("span");

      progress.className = "case-carousel__progress";
      track.className = "case-carousel__track";
      fill.className = "case-carousel__fill";

      track.appendChild(fill);
      progress.appendChild(track);

      buttons = document.createElement("div");
      buttons.className = "case-carousel__buttons";
      buttons.appendChild(prev);
      buttons.appendChild(next);

      controls.appendChild(progress);
      controls.appendChild(buttons);
    }

    function positions() {
      var first = items[0].offsetLeft;

      return items.map(function (item) {
        return item.offsetLeft - first;
      });
    }

    function currentIndex() {
      var points = positions();
      var current = scroller.scrollLeft;
      var closest = 0;

      points.forEach(function (point, index) {
        if (Math.abs(point - current) < Math.abs(points[closest] - current)) {
          closest = index;
        }
      });

      return closest;
    }

    function updateControls() {
      var index = currentIndex();
      var maxScroll = Math.max(1, scroller.scrollWidth - scroller.clientWidth);
      var progressStep = 100 / items.length;
      var progressValue = progressStep + (clamp(scroller.scrollLeft / maxScroll, 0, 1) * (100 - progressStep));

      prev.disabled = index === 0;
      next.disabled = index === items.length - 1;
      carousel.style.setProperty("--carousel-progress", progressValue + "%");

      items.forEach(function (item, itemIndex) {
        item.classList.toggle("is-active", itemIndex === index);
        item.setAttribute("aria-hidden", itemIndex === index ? "false" : "true");
      });
    }

    function goTo(index, behavior) {
      var points = positions();
      var target = clamp(index, 0, points.length - 1);

      scroller.scrollTo({
        left: points[target],
        behavior: behavior || (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth")
      });
    }

    prev.addEventListener("click", function () {
      goTo(currentIndex() - 1);
    });

    next.addEventListener("click", function () {
      goTo(currentIndex() + 1);
    });

    scroller.addEventListener("scroll", function () {
      updateControls();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(function () {
        goTo(currentIndex());
        updateControls();
      }, 120);
    }, { passive: true });

    window.addEventListener("resize", function () {
      goTo(currentIndex(), "auto");
      updateControls();
    });

    buildControls();
    updateControls();
  }

  carousels.forEach(setupCarousel);
})();
