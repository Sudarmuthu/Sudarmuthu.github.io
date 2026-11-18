/**
 * ============================================================
 * PORTFOLIO LINKS & PROJECT ARCHITECTURE CONFIGURATION
 * ============================================================
 */
const PORTFOLIO_CONFIG = {
  githubProfile: "https://github.com/Sudarmuthu",
  linkedinProfile: "https://www.linkedin.com/in/sudarmuthu2005",
  email: "ggopi9543@gmail.com",
  projects: {
    hrPortal: {
      title: "HR Recruitment & Employee Onboarding Portal",
      repoUrl: "https://github.com/Sudarmuthu",
      description:
        "Full-stack enterprise HR application managing recruitment workflows, candidate status tracking, and employee onboarding.",
      layers: [
        {
          name: "1. Presentation Layer (HTML5, CSS3, JavaScript)",
          detail: "Responsive forms for employee registration, recruitment stage updates, and candidate status dashboards."
        },
        {
          name: "2. Controller Layer (Spring Boot REST APIs)",
          detail: "Exposes clean REST endpoints with structured request validation and centralized exception handling."
        },
        {
          name: "3. Service Layer (Business Logic)",
          detail: "Encapsulates recruitment pipeline transitions and employee onboarding business rules."
        },
        {
          name: "4. Repository & Database (Spring Data JPA, Hibernate, MySQL)",
          detail: "Relational persistence mapping candidate and employee entities into MySQL."
        }
      ]
    },
    mobileStore: {
      title: "Mobile Store Management System",
      repoUrl: "https://github.com/Sudarmuthu",
      description:
        "Spring Boot and MySQL store inventory system supporting complete CRUD operations for mobile phone records.",
      layers: [
        {
          name: "1. Storefront UI (HTML5, CSS3, Bootstrap)",
          detail: "Responsive inventory views and forms for adding, querying, updating, and deleting mobile records."
        },
        {
          name: "2. Controller & Service Layers (Java & Spring Boot)",
          detail: "Handles HTTP requests and maintains modular separation of store business logic."
        },
        {
          name: "3. Persistence Layer (Spring Data JPA, Hibernate & MySQL)",
          detail: "Executes transactional CRUD database operations against MySQL."
        }
      ]
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sync Social & Repository Links
  document.querySelectorAll('[data-link="github"]').forEach((el) => {
    el.href = PORTFOLIO_CONFIG.githubProfile;
  });
  document.querySelectorAll('[data-link="linkedin"]').forEach((el) => {
    el.href = PORTFOLIO_CONFIG.linkedinProfile;
  });
  document.querySelectorAll("[data-project-repo]").forEach((el) => {
    const key = el.getAttribute("data-project-repo");
    if (PORTFOLIO_CONFIG.projects[key]) {
      el.href = PORTFOLIO_CONFIG.projects[key].repoUrl;
    }
  });

  // 2. Footer Year
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3. Toast Notification Helper
  const toastEl = document.getElementById("toast");
  let toastTimer;
  const showToast = (message) => {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2800);
  };

  // 4. One-Click Email Copy
  document.querySelectorAll(".copy-email-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const email = btn.getAttribute("data-email") || PORTFOLIO_CONFIG.email;
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied ${email} to clipboard`);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  // 5. Interactive Hero REST Endpoint Simulation
  const runApiBtn = document.getElementById("run-api-btn");
  const apiResponse = document.getElementById("api-response");
  if (runApiBtn && apiResponse) {
    const payloads = [
      '{"status":"READY_TO_HIRE","location":"Chennai, TN","cgpa":7.48}',
      '{"coreStack":["Java","Spring Boot","Hibernate","MySQL"],"architecture":"RESTful"}',
      '{"internship":"Soft Nexis Technology","certification":"QSpiders Java Full Stack"}'
    ];
    let payloadIdx = 0;
    runApiBtn.addEventListener("click", () => {
      payloadIdx = (payloadIdx + 1) % payloads.length;
      const ms = Math.floor(Math.random() * 11) + 8;
      apiResponse.innerHTML = `
        <div class="response-meta">
          <span class="status-200">200 OK</span>
          <span>application/json • ${ms}ms</span>
        </div>
        <pre>${payloads[payloadIdx]}</pre>
      `;
      showToast("GET /api/v1/developer/profile → 200 OK");
    });
  }

  // 6. Mouse Spotlight Effect on Cards
  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });

  // 7. Interactive Skill Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden-card");
        } else {
          card.classList.add("hidden-card");
        }
      });
    });
  });

  // 8. Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 9. Scroll Progress Bar & Active Navigation Link
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (navbar) navbar.classList.toggle("scrolled", scrollTop > 25);

    sections.forEach((sec) => {
      const top = sec.offsetTop - 135;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink && scrollTop >= top && scrollTop < top + height) {
        navLinks.forEach((l) => l.classList.remove("active"));
        activeLink.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 10. Typing Role Animation
  const typedEl = document.getElementById("typed-role");
  const roles = [
    "Java Full Stack Developer",
    "Spring Boot & REST API Engineer",
    "Hibernate & SQL Database Developer"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    if (!typedEl) return;
    const current = roles[roleIndex];
    typedEl.textContent = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex > current.length) {
      isDeleting = true;
      speed = 1700;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
      speed = 320;
    }
    setTimeout(typeLoop, speed);
  };
  typeLoop();

  // 11. Scroll Reveal Observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // 12. Project Architecture Modal
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalLayers = document.getElementById("modal-layers");
  const modalRepoLink = document.getElementById("modal-repo-link");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll(".demo-modal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-project");
      const project = PORTFOLIO_CONFIG.projects[key];
      if (!project || !modal) return;

      modalTitle.textContent = project.title;
      modalDesc.textContent = project.description;
      modalRepoLink.href = project.repoUrl;
      modalLayers.innerHTML = project.layers
        .map(
          (layer) => `
          <div class="layer-card">
            <strong>${layer.name}</strong>
            <span>${layer.detail}</span>
          </div>`
        )
        .join("");

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 13. Contact Form Handler
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      const body = encodeURIComponent(
        `Hi Sudar Muthu,\n\n${message}\n\nBest regards,\n${name} (${email})`
      );
      showToast("Opening your email client...");
      window.location.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
  }
});