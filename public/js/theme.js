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
        subtitle: "A few quick questions to match you with the right session from our full offer.",
        ctaLabel: (resultKey) => {
          switch (resultKey) {
            case "crisis":
              return "View Crisis-Prevention Sessions";
            case "early_help":
              return "View Early-Help Sessions";
            case "couples":
              return "Book Couples AINT Session";
            case "children":
              return "Book Hypnotherapy for Children";
            case "group":
              return "View Group Options";
            case "men":
              return "View Men’s Mental Health";
            case "trauma":
              return "View Childhood Trauma Sessions";
            case "dv_sa":
              return "View DV/SA Support";
            case "specialist":
              return "View Specialist Support";
            case "hypnotherapy":
              return "View Hypnotherapy Services";
            case "timed":
              return "View Timed Exposure Cycle";
            default:
              return "Book Private AINT Session";
          }
        },
        ctaHref: (resultKey) => {
          switch (resultKey) {
            case "crisis":
              return "/private-therapy#crisis-early-help";
            case "early_help":
              return "/private-therapy#crisis-early-help";
            case "couples":
              return "/private-therapy#core-sessions";
            case "children":
              return "/private-therapy#hypnotherapy";
            case "group":
              return "/private-therapy#group-programmes";
            case "men":
              return "/private-therapy#mens-mental-health";
            case "trauma":
              return "/private-therapy#childhood-trauma";
            case "dv_sa":
              return "/private-therapy#specialist-support";
            case "specialist":
              return "/private-therapy#specialist-support";
            case "hypnotherapy":
              return "/private-therapy#hypnotherapy";
            case "timed":
              return "/private-therapy#timed-exposure";
            default:
              return "/private-therapy#core-sessions";
          }
        },
        steps: [
          {
            id: "who",
            question: "Who is the support for?",
            options: [
              { label: "Myself (adult)", value: "me" },
              { label: "Myself and my partner / couple", value: "couple" },
              { label: "A child (hypnotherapy only)", value: "child" },
              { label: "Men’s-focused support", value: "men" },
              { label: "A small group / programme", value: "group" },
            ],
          },
          {
            id: "need",
            question: "What do you most need support with right now?",
            options: [
              { label: "General private therapy / emotional support", value: "general" },
              { label: "Crisis, overwhelm, or urgent stabilisation", value: "crisis" },
              { label: "Early help / getting steadier quickly", value: "early" },
              { label: "Domestic violence or sexual abuse recovery", value: "dv_sa" },
              { label: "Stress, anxiety, grief, or self-esteem", value: "specialist" },
              { label: "Childhood trauma (as an adult)", value: "trauma" },
              { label: "Starting therapy / feeling unsure about beginning", value: "starting" },
              { label: "Hypnotherapy (adults / couples / trauma)", value: "hypno" },
              { label: "AINT Timed Exposure Cycle", value: "timed" },
            ],
          },
          {
            id: "urgency",
            question: "How urgently do you need support?",
            options: [
              { label: "As soon as possible / today", value: "asap" },
              { label: "Within a few days", value: "soon" },
              { label: "I’m okay to wait for the right fit", value: "wait" },
            ],
          },
          {
            id: "format",
            question: "What format feels most comfortable?",
            options: [
              { label: "One-to-one private session", value: "one_to_one" },
              { label: "Couples session", value: "couple" },
              { label: "Shared group or multi-week programme", value: "shared" },
            ],
          },
        ],
        decide: (answers) => {
          const who = answers.who;
          const need = answers.need;
          const urgency = answers.urgency;
          const format = answers.format;

          if (who === "child") return "children";
          if (need === "crisis" || urgency === "asap") return "crisis";
          if (who === "men") return "men";
          if (who === "couple" || format === "couple") return "couples";
          if (who === "group" || format === "shared") return "group";
          if (need === "dv_sa") return "dv_sa";
          if (need === "trauma") return "trauma";
          if (need === "early") return "early_help";
          if (need === "specialist" || need === "starting") return "specialist";
          if (need === "hypno") return "hypnotherapy";
          if (need === "timed") return "timed";
          return "individual";
        },
        resultCopy: (resultKey) => {
          switch (resultKey) {
            case "crisis":
              return {
                title: "Recommended: Crisis-Prevention / Early-Help",
                body: "Based on your answers, a Crisis-Prevention Session (£75 · 90 minutes) or Early-Help Stabilisation (£50 · 60 minutes) is likely the best fit for rapid, safe support (not emergency services).",
              };
            case "early_help":
              return {
                title: "Recommended: Early-Help Stabilisation Session",
                body: "Based on your answers, Early-Help Stabilisation (£50 · 60 minutes) can help you feel safer and more regulated without waiting for a longer pathway.",
              };
            case "couples":
              return {
                title: "Recommended: Couples AINT Session",
                body: "Based on your answers, Couples AINT Session (£75 · 60 minutes) — or Hypnotherapy for Couples (£90) — is likely the most helpful next step.",
              };
            case "children":
              return {
                title: "Recommended: Hypnotherapy for Children",
                body: "Based on your answers, Hypnotherapy for Children (£60 · 45–60 minutes) is the suitable child-focused option. We do not offer counselling for children — only specialist hypnotherapy.",
              };
            case "group":
              return {
                title: "Recommended: Group Session or Programme",
                body: "Based on your answers, a Private Group Session (£10 per person) or a multi-week group programme (Emotional Regulation, Men’s Mental Health, or Trauma-Safe Communication) may be the best fit.",
              };
            case "men":
              return {
                title: "Recommended: Men’s Mental Health Sessions",
                body: "Based on your answers, Men’s Early-Help (£50) or Men’s Crisis-Prevention (£75 · 90 minutes) is likely the most suitable pathway.",
              };
            case "trauma":
              return {
                title: "Recommended: Childhood Trauma Support",
                body: "Based on your answers, Childhood Trauma Support (£50) or Trauma Exploration (£75 · 90 minutes) offers paced, dignity-first support for adults.",
              };
            case "dv_sa":
              return {
                title: "Recommended: Private DV/SA Support Session",
                body: "Based on your answers, Private DV/SA Support (£50 · 60 minutes) provides safe, paced support for survivors of domestic violence and sexual abuse.",
              };
            case "specialist":
              return {
                title: "Recommended: Specialist Support Sessions",
                body: "Based on your answers, Stress, Anxiety, Grief, Self-Esteem, or Starting Therapy Support sessions (£50 each) are likely the best fit.",
              };
            case "hypnotherapy":
              return {
                title: "Recommended: Hypnotherapy Services",
                body: "Based on your answers, explore Hypnotherapy for Couples (£90) or Hypnotherapy for Trauma (£70 per person).",
              };
            case "timed":
              return {
                title: "Recommended: AINT Timed Exposure Cycle",
                body: "Based on your answers, the AINT Timed Exposure Cycle Session (£70 · 60 minutes) is the matching specialist method session.",
              };
            default:
              return {
                title: "Recommended: Private AINT Session",
                body: "Based on your answers, a Private AINT Session (£50 · 60 minutes) is the best starting point for personalised one-to-one support.",
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
              title: "Recommended: Community Session Group 1 — Free",
              body: "Based on your answers, you may be eligible for funded Community Session Group 1 sessions (free). Submit a request and we’ll match you based on availability.",
            };
          }
          return {
            title: "Recommended: Community Session Group 2",
            body: "Based on your answers, Community Session Group 2 is likely the best fit (£20 first session, then £10). Submit a request and we’ll match you based on availability.",
          };
        },
        ctaLabel: (resultKey) => (resultKey === "private" ? "Explore Private Therapy" : "Request Community Support"),
        ctaHref: (resultKey) => (resultKey === "private" ? "/private-therapy/" : "/community-access/"),
      },

      training: {
        title: "Training Programme Selector",
        subtitle: "A few quick questions to choose between Level 1 and Level 2 CPD training.",
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
            question: "Which course sounds right?",
            options: [
              { label: "Level 1 CPD Early-Help Awareness (£115)", value: "foundation_time" },
              { label: "Level 2 Practitioner Training (£135 · 4 hours)", value: "practitioner_time" },
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
              title: "Recommended: Level 2 Practitioner Training (£135)",
              body: "Based on your answers, AINT Level 2 Practitioner Training (4 hours) is the best fit for developing practical AINT skills.",
            };
          }
          return {
            title: "Recommended: Level 1 CPD Early-Help Awareness (£115)",
            body: "Based on your answers, AINT Level 1 CPD — Early-Help Awareness Course is the best fit — a clear introduction with immediate practical value.",
          };
        },
        ctaLabel: (resultKey) => {
          if (resultKey === "practitioner") return "Go to Level 2";
          return "Go to Level 1";
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

