(function () {
  const nav = document.getElementById("nav");
  const progressBar = document.getElementById("progressBar");
  const backToTop = document.getElementById("btt");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const initQuizModals = () => {
    const modal = document.getElementById("aintQuizModal");
    const root = document.querySelector("[data-aint-quiz-root]");
    if (!modal || !root) return;

    const triggers = document.querySelectorAll("[data-aint-quiz-trigger]");
    const closeEls = modal.querySelectorAll("[data-aint-quiz-close]");

    const quizzes = {
      private: {
        title: "Private Therapy Decision Quiz",
        subtitle: "A few quick questions to help you choose the most suitable session.",
        ctaLabel: (resultKey) => {
          switch (resultKey) {
            case "sos":
              return "Book SOS / Immediate Support";
            case "couples":
              return "Book Couples Therapy";
            case "children":
              return "Book Children’s Hypnotherapy";
            case "group":
              return "Book Private Group Therapy";
            default:
              return "Book Individual Therapy";
          }
        },
        ctaHref: (resultKey) => {
          switch (resultKey) {
            case "sos":
              return "/book-sos/";
            case "couples":
              return "/book-couples/";
            case "children":
              return "/book-children/";
            case "group":
              return "/book-group/";
            default:
              return "/book-individual/";
          }
        },
        steps: [
          {
            id: "situation",
            question: "What best describes your situation?",
            options: [
              { label: "I want support for myself", value: "self" },
              { label: "I’m facing relationship challenges", value: "relationship" },
              { label: "I feel overwhelmed and need urgent help", value: "urgent" },
              { label: "I prefer shared/group support", value: "group" },
              { label: "I am looking for support for a child", value: "child" },
            ],
          },
          {
            id: "speed",
            question: "How quickly do you need support?",
            options: [
              { label: "As soon as possible", value: "asap" },
              { label: "Within a few days", value: "days" },
              { label: "I’m okay to wait", value: "wait" },
            ],
          },
          {
            id: "preference",
            question: "What type of support do you prefer?",
            options: [
              { label: "One-to-one focused support", value: "one_to_one" },
              { label: "Working together as a couple", value: "couple" },
              { label: "Shared experience with others", value: "shared" },
            ],
          },
          {
            id: "who",
            question: "Who is the support for?",
            options: [
              { label: "Myself", value: "me" },
              { label: "Myself and partner", value: "partner" },
              { label: "A child", value: "child" },
            ],
          },
        ],
        decide: (answers) => {
          const situation = answers.situation;
          const speed = answers.speed;
          const preference = answers.preference;
          const who = answers.who;

          const urgencyHigh = situation === "urgent" || speed === "asap";
          const isRelationship = situation === "relationship" || preference === "couple" || who === "partner";
          const isChild = situation === "child" || who === "child";
          const isGroup = situation === "group" || speed === "wait" || preference === "shared";

          if (urgencyHigh) return "sos";
          if (isRelationship) return "couples";
          if (isChild) return "children";
          if (isGroup) return "group";
          return "individual";
        },
        resultCopy: (resultKey) => {
          switch (resultKey) {
            case "sos":
              return {
                title: "Recommended: SOS / Immediate Support",
                body: "Based on your answers, urgent support is likely the best fit right now. This option is designed for rapid stabilisation and grounding (not emergency services).",
              };
            case "couples":
              return {
                title: "Recommended: Couples Therapy",
                body: "Based on your answers, support as a couple may be the most helpful next step — focused on safety, communication, and repair.",
              };
            case "children":
              return {
                title: "Recommended: Children’s Hypnotherapy",
                body: "Based on your answers, children’s hypnotherapy is likely the most suitable option for child-focused support (confidence, anxiety, sleep, regulation).",
              };
            case "group":
              return {
                title: "Recommended: Private Group Therapy",
                body: "Based on your answers, a small guided group may be the best fit — shared support with structure and facilitation.",
              };
            default:
              return {
                title: "Recommended: Individual Therapy",
                body: "Based on your answers, one-to-one personalised support would be the best fit for your needs.",
              };
          }
        },
      },

      community: {
        title: "Community Support Quiz",
        subtitle: "A few quick questions to check eligibility and fit.",
        steps: [
          {
            id: "situation",
            question: "Which best describes your situation?",
            options: [
              { label: "I cannot afford private therapy", value: "cannot_afford" },
              { label: "I prefer low-cost support", value: "prefer_low_cost" },
              { label: "I can afford private therapy but exploring options", value: "can_afford" },
            ],
          },
          {
            id: "benefits",
            question: "Are you currently receiving benefits?",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ],
          },
          {
            id: "status",
            question: "What is your current situation?",
            options: [
              { label: "Unemployed / waiting for benefits", value: "unemployed_waiting" },
              { label: "Employed but limited budget", value: "limited_budget" },
              { label: "Stable income", value: "stable" },
            ],
          },
          {
            id: "urgency",
            question: "How urgently do you need support?",
            options: [
              { label: "Immediately", value: "immediately" },
              { label: "Flexible", value: "flexible" },
            ],
          },
        ],
        decide: (answers) => {
          if (answers.urgency === "immediately") return "private";
          if (answers.status === "unemployed_waiting") return "free";
          if (answers.benefits === "yes") return "twenty";
          if (answers.status === "stable") return "private";
          return "twenty";
        },
        resultCopy: (resultKey) => {
          if (resultKey === "private") {
            return {
              title: "Private Therapy may be more suitable",
              body: "Based on your answers, private sessions may be the best option for faster support. Community support can have limited availability.",
            };
          }
          if (resultKey === "free") {
            return {
              title: "Recommended: Community Support (Free)",
              body: "Based on your answers, you may be eligible for free community sessions. Submit a request and we’ll match you based on availability.",
            };
          }
          return {
            title: "Recommended: Community Support (£20)",
            body: "Based on your answers, the £20 community option is likely the best fit. Submit a request and we’ll match you based on availability.",
          };
        },
        ctaLabel: (resultKey) => (resultKey === "private" ? "Explore Private Therapy" : "Request Community Support"),
        ctaHref: (resultKey) => (resultKey === "private" ? "/private-therapy/" : "/community-access/"),
      },

      training: {
        title: "Training Programme Selector",
        subtitle: "A few quick questions to choose between Foundation and Practitioner Certification.",
        steps: [
          {
            id: "goal",
            question: "What is your goal?",
            options: [
              { label: "Understand the AINT Model", value: "understand" },
              { label: "Use AINT professionally in practice", value: "professional" },
              { label: "Not sure yet", value: "not_sure" },
            ],
          },
          {
            id: "experience",
            question: "Your experience level?",
            options: [
              { label: "Beginner", value: "beginner" },
              { label: "Some experience", value: "some" },
              { label: "Already practicing professionally", value: "professional" },
            ],
          },
          {
            id: "time",
            question: "How much time can you commit?",
            options: [
              { label: "6 hours", value: "foundation_time" },
              { label: "2 full days", value: "practitioner_time" },
              { label: "Either works for me", value: "either" },
            ],
          },
        ],
        decide: (answers) => {
          if (answers.goal === "professional") return "practitioner";
          if (answers.experience === "professional") return "practitioner";
          if (answers.time === "practitioner_time") return "practitioner";
          if (answers.experience === "some" && answers.time !== "foundation_time") return "practitioner";
          return "foundation";
        },
        resultCopy: (resultKey) => {
          if (resultKey === "practitioner") {
            return {
              title: "Recommended: Practitioner Certification",
              body: "Based on your answers, Practitioner Certification is the best fit for developing professional-level AINT skills for real-world work.",
            };
          }
          return {
            title: "Recommended: Foundation (CPD Course)",
            body: "Based on your answers, Foundation is the best fit — a clear introduction with immediate practical value.",
          };
        },
        ctaLabel: (resultKey) => {
          if (resultKey === "practitioner") return "Go to Practitioner";
          return "Go to Foundation";
        },
        ctaHref: (resultKey) => {
          if (resultKey === "practitioner") return "/training#practitioner";
          return "/training#foundation";
        },
      },

      home: {
        // Reuse the community one (people are usually choosing between routes from pricing)
        title: "Quick Support Quiz",
        subtitle: "A few quick questions to help you choose the right next step.",
        steps: [
          {
            id: "intent",
            question: "What are you looking for today?",
            options: [
              { label: "Support for me / my family", value: "support" },
              { label: "Low-cost / community support", value: "community" },
              { label: "Training in the AINT Model", value: "training" },
              { label: "Not sure", value: "not_sure" },
            ],
          },
          {
            id: "urgency",
            question: "How urgently do you need support?",
            options: [
              { label: "Immediately", value: "immediately" },
              { label: "Within a few days", value: "days" },
              { label: "Flexible", value: "flexible" },
            ],
          },
          {
            id: "cost",
            question: "Is cost a major factor right now?",
            options: [
              { label: "Yes — low-cost/free is important", value: "yes" },
              { label: "No — I can pay for private sessions", value: "no" },
              { label: "Unsure", value: "unsure" },
            ],
          },
          {
            id: "who",
            question: "Who is the support for?",
            options: [
              { label: "Myself", value: "me" },
              { label: "Myself and partner", value: "partner" },
              { label: "A child", value: "child" },
            ],
          },
        ],
        decide: (answers) => {
          if (answers.intent === "training") return "training";
          if (answers.urgency === "immediately") return "sos";
          if (answers.cost === "yes" || answers.intent === "community") return "community";
          if (answers.who === "partner") return "private";
          if (answers.who === "child") return "private";
          return "private";
        },
        resultCopy: (resultKey) => {
          if (resultKey === "training") {
            return { title: "Recommended: Training", body: "Based on your answers, training is the best next step to learn and apply the AINT Model." };
          }
          if (resultKey === "sos") {
            return { title: "Recommended: SOS / Immediate Support", body: "Based on your answers, urgent support is likely the best fit right now (not emergency services)." };
          }
          if (resultKey === "community") {
            return { title: "Recommended: Community Support", body: "Based on your answers, community support is likely the best fit. Submit a request and we’ll match you based on availability." };
          }
          return { title: "Recommended: Private Therapy", body: "Based on your answers, private sessions are likely the best fit. You can choose the session type that matches your needs." };
        },
        ctaLabel: (resultKey) => {
          if (resultKey === "training") return "Explore Training";
          if (resultKey === "sos") return "Book SOS Session";
          if (resultKey === "community") return "Request Community Support";
          return "Explore Private Therapy";
        },
        ctaHref: (resultKey) => {
          if (resultKey === "training") return "/training/";
          if (resultKey === "sos") return "/book-sos/";
          if (resultKey === "community") return "/community-access/";
          return "/private-therapy/";
        },
      },
    };

    let activeQuizKey = null;
    let stepIndex = 0;
    let answers = {};
    let resultKey = null;

    const openModal = (quizKey) => {
      activeQuizKey = quizKey;
      stepIndex = 0;
      answers = {};
      resultKey = null;
      modal.hidden = false;
      window.setTimeout(() => modal.classList.add("is-open"), 10);
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
      render();
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
      window.setTimeout(() => {
        modal.hidden = true;
      }, 180);
    };

    const getQuiz = () => quizzes[activeQuizKey] || null;

    const render = () => {
      const quiz = getQuiz();
      if (!quiz) return;

      const total = quiz.steps.length + 1; // + result screen
      const isResult = stepIndex >= quiz.steps.length;
      const currentStepNum = Math.min(stepIndex + 1, total);
      const pct = Math.round(((currentStepNum - 1) / (total - 1)) * 100);

      let html = "";
      html += '<div class="aint-quiz-top">';
      html +=
        '<div class="aint-quiz-progress-row"><span>Step ' +
        currentStepNum +
        " of " +
        total +
        "</span><span>" +
        (activeQuizKey === "private"
          ? "Private Therapy"
          : activeQuizKey === "community"
            ? "Community Support"
            : activeQuizKey === "training"
              ? "Training"
              : "Quiz") +
        "</span></div>";
      html += '<div class="aint-quiz-bar"><div style="width:' + pct + '%"></div></div>';
      html += "</div>";

      html += '<h2 class="aint-quiz-title">' + (quiz.title || "2-minute quiz") + "</h2>";
      html += '<p class="aint-quiz-sub">' + (quiz.subtitle || "A few quick questions.") + "</p>";

      if (!isResult) {
        const step = quiz.steps[stepIndex];
        const selected = answers[step.id] || "";
        html += '<div class="aint-quiz-q">';
        html += "<h3>" + step.question + "</h3>";
        html += '<div class="aint-quiz-options">';
        step.options.forEach((opt, idx) => {
          const isSel = selected === opt.value;
          html +=
            '<button type="button" class="aint-quiz-option-btn' +
            (isSel ? " is-selected" : "") +
            '" data-opt="' +
            opt.value +
            '">' +
            opt.label +
            "</button>";
        });
        html += "</div>";

        html += '<div class="aint-quiz-nav">';
        html +=
          '<button type="button" class="btn-p" data-nav="back" ' +
          (stepIndex === 0 ? 'style="opacity:.5" disabled' : "") +
          ">Back</button>";
        html +=
          '<button type="button" class="btn-gold" data-nav="next" ' +
          (!selected ? 'style="opacity:.5" disabled' : "") +
          ">Next</button>";
        html += "</div>";
        html += "</div>";
      } else {
        if (!resultKey) {
          resultKey = typeof quiz.decide === "function" ? quiz.decide(answers) : "default";
        }
        const copy = typeof quiz.resultCopy === "function" ? quiz.resultCopy(resultKey) : { title: "Recommended", body: "" };
        const ctaLabel = typeof quiz.ctaLabel === "function" ? quiz.ctaLabel(resultKey) : "Continue";
        const ctaHref = typeof quiz.ctaHref === "function" ? quiz.ctaHref(resultKey) : "#";

        html += '<div class="aint-quiz-result">';
        html += '<div class="aint-quiz-result-kicker">Recommendation</div>';
        html += '<h3 class="aint-quiz-result-title">' + (copy.title || "Recommended") + "</h3>";
        html += '<p class="aint-quiz-result-body">' + (copy.body || "") + "</p>";
        html += '<div class="aint-quiz-nav">';
        html += '<button type="button" class="btn-p" data-nav="restart">Restart</button>';
        html += '<a class="btn-gold" href="' + ctaHref + '">' + ctaLabel + "</a>";
        html += "</div>";
        html += '<div class="aint-quiz-disclaimer">If you are in immediate danger or at risk of harming yourself, contact emergency services now.</div>';
        html += "</div>";
      }

      root.innerHTML = html;

      // Bind option buttons
      root.querySelectorAll("[data-opt]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const quiz2 = getQuiz();
          if (!quiz2) return;
          const step = quiz2.steps[stepIndex];
          answers[step.id] = btn.getAttribute("data-opt") || "";
          render();
        });
      });

      // Bind nav buttons
      root.querySelectorAll("[data-nav]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const action = btn.getAttribute("data-nav");
          if (action === "back") {
            stepIndex = Math.max(0, stepIndex - 1);
            render();
          } else if (action === "next") {
            const quiz2 = getQuiz();
            if (!quiz2) return;
            const step = quiz2.steps[stepIndex];
            if (!answers[step.id]) return;
            stepIndex = Math.min(quiz2.steps.length, stepIndex + 1);
            render();
          } else if (action === "restart") {
            stepIndex = 0;
            answers = {};
            resultKey = null;
            render();
          }
        });
      });
    };

    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-aint-quiz-trigger") || "";
        if (!quizzes[key]) return;
        openModal(key);
      });
    });

    closeEls.forEach((el) => el.addEventListener("click", closeModal));

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  };
  const removeContactNavItem = () => {
    document.querySelectorAll(".nav-links a, .mobile-nav-links a").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href.includes("/contact/") || href.endsWith("/contact")) {
        const item = link.closest("li");
        if (item) item.remove();
      }
    });
  };

  function onScroll() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    }
    if (progressBar) {
      const max = document.body.scrollHeight - window.innerHeight;
      const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      progressBar.style.width = percent + "%";
    }
    if (backToTop) {
      backToTop.classList.toggle("vis", window.scrollY > 400);
    }
  }

  if (hamburger && mobileMenu && hamburger.getAttribute("data-react-nav") !== "true") {
    const closeMenu = function () {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    hamburger.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("menu-open", isOpen);
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  removeContactNavItem();
  initQuizModals();
  onScroll();

  // Books carousel nav
  (function () {
    const track = document.getElementById("booksTrack");
    const prevBtn = document.getElementById("booksPrev");
    const nextBtn = document.getElementById("booksNext");
    if (!track || !prevBtn || !nextBtn) return;
    const cardWidth = () => {
      const card = track.querySelector(".book-card");
      if (!card) return 288;
      return card.offsetWidth + parseInt(getComputedStyle(track).gap || "28", 10);
    };
    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: cardWidth(), behavior: "smooth" });
    });
    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -cardWidth(), behavior: "smooth" });
    });
  })();
})();

