(function () {
  const animateCounter = (el, target, duration) => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * easeOut).toLocaleString();
      if (p < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("vis");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const staggerItems = document.querySelectorAll("[data-stagger-item]");
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        const delay = parseInt(item.dataset.staggerItem || "0", 10) * 110;
        item.style.transitionDelay = delay + "ms";
        item.classList.add("is-visible");
        staggerObserver.unobserve(item);
      });
    },
    { threshold: 0.2 }
  );
  staggerItems.forEach((item) => staggerObserver.observe(item));

  const counterSections = document.querySelectorAll("[data-counter-section]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counters = entry.target.querySelectorAll(".count-up");
        counters.forEach((el) => {
          const target = parseInt(el.dataset.target || "0", 10);
          animateCounter(el, target, 1600);
        });
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );
  counterSections.forEach((section) => counterObserver.observe(section));

  const ratingWrap = document.getElementById("overallRating");
  if (ratingWrap) {
    const ratingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const bars = ratingWrap.querySelectorAll(".r-bar-fill");
          bars.forEach((bar, idx) => {
            const width = bar.dataset.width || "0%";
            const ratio = Math.min(Math.max(parseFloat(width) / 100, 0), 1);
            window.setTimeout(() => {
              bar.style.transform = "scaleX(" + ratio + ")";
            }, idx * 120);
          });
          ratingObserver.unobserve(ratingWrap);
        });
      },
      { threshold: 0.35 }
    );
    ratingObserver.observe(ratingWrap);
  }

  const trackWrap = document.getElementById("testiTrackWrap");
  const track = document.getElementById("testiTrack");
  const prevBtn = document.getElementById("testiPrev");
  const nextBtn = document.getElementById("testiNext");
  const dotsWrap = document.getElementById("testiDots");
  if (trackWrap && track && prevBtn && nextBtn && dotsWrap && track.children.length > 0) {
    const cards = Array.from(track.children);
    let index = 0;
    let autoplay;
    let cachedCardWidth = 0;
    let cachedGap = 0;
    let cachedVisible = 3;

    const measureLayout = () => {
      if (window.innerWidth <= 768) cachedVisible = 1;
      else if (window.innerWidth <= 1100) cachedVisible = 2;
      else cachedVisible = 3;

      const card = cards[0];
      if (!card) return;
      const cardStyles = window.getComputedStyle(track);
      cachedGap = parseFloat(cardStyles.columnGap || cardStyles.gap || "0") || 0;
      cachedCardWidth = card.getBoundingClientRect().width;
    };

    const getPageCount = () => Math.max(cards.length - cachedVisible + 1, 1);

    const renderDots = () => {
      dotsWrap.innerHTML = "";
      for (let i = 0; i < getPageCount(); i += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "testi-dot" + (i === index ? " is-active" : "");
        dot.setAttribute("aria-label", "Go to testimonial set " + (i + 1));
        dot.addEventListener("click", () => {
          index = i;
          update();
          restartAutoplay();
        });
        dotsWrap.appendChild(dot);
      }
    };

    const update = () => {
      const maxIndex = getPageCount() - 1;
      index = Math.max(0, Math.min(index, maxIndex));
      if (!cachedCardWidth) measureLayout();
      const shift = index * (cachedCardWidth + cachedGap);
      track.style.transform = "translateX(-" + shift + "px)";
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === maxIndex;

      Array.from(dotsWrap.children).forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
      });
    };

    const stopAutoplay = () => {
      if (autoplay) window.clearInterval(autoplay);
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplay = window.setInterval(() => {
        const maxIndex = getPageCount() - 1;
        index = index >= maxIndex ? 0 : index + 1;
        update();
      }, 4200);
    };

    const restartAutoplay = () => {
      startAutoplay();
    };

    prevBtn.addEventListener("click", () => {
      index -= 1;
      update();
      restartAutoplay();
    });

    nextBtn.addEventListener("click", () => {
      index += 1;
      update();
      restartAutoplay();
    });

    trackWrap.addEventListener("mouseenter", stopAutoplay);
    trackWrap.addEventListener("mouseleave", startAutoplay);

    window.addEventListener("resize", () => {
      measureLayout();
      renderDots();
      update();
    }, { passive: true });

    measureLayout();
    renderDots();
    update();
    startAutoplay();
  }
})();
