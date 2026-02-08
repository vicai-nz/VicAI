/* ----- Mobile Navigation ----- */
function initNav() {
  var toggle = document.querySelector('.nav__toggle');
  var list = document.querySelector('.nav__list');
  if (!toggle || !list) return;

  var overlay = document.createElement('div');
  overlay.className = 'nav__overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    list.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    list.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  list.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}
/* ----- Active Navigation ----- */
function initActiveNav() {
  var path = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.setAttribute('aria-current', 'page');
    }
  });
}
/* ----- FAQ Accordion ----- */
function initAccordion() {
  var questions = document.querySelectorAll('.faq-item__question');
  if (!questions.length) return;

  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = document.getElementById(btn.getAttribute('aria-controls'));
      if (!answer) return;

      questions.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          var otherAnswer = document.getElementById(otherBtn.getAttribute('aria-controls'));
          if (otherAnswer) otherAnswer.classList.remove('is-open');
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      answer.classList.toggle('is-open');
    });
  });
}
/* ----- Event Filtering ----- */
function initEventFilters() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var searchInput = document.querySelector('.filter-search');
  var eventCards = document.querySelectorAll('.event-card');
  var countEl = document.querySelector('.filter-count');
  if (!filterBtns.length || !eventCards.length) return;

  var activeFilter = 'all';
  var searchTerm = '';

  function filterEvents() {
    var visibleCount = 0;
    eventCards.forEach(function (card) {
      var category = card.getAttribute('data-category');
      var title = card.getAttribute('data-title') || '';
      var matchesFilter = activeFilter === 'all' || category === activeFilter;
      var matchesSearch = !searchTerm || title.includes(searchTerm.toLowerCase());

      if (matchesFilter && matchesSearch) {
        card.classList.remove('is-hidden');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
      }
    });

    if (countEl) {
      countEl.textContent = visibleCount + ' event' + (visibleCount !== 1 ? 's' : '') + ' shown';
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      activeFilter = btn.getAttribute('data-filter');
      filterEvents();
    });
  });

  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        searchTerm = searchInput.value;
        filterEvents();
      }, 200);
    });
  }
}
/* ----- Form Validation ----- */
function validateField(input) {
  var errorEl = input.parentElement.querySelector('.form-error');
  var isValid = true;

  if (input.type === 'checkbox' && input.required) {
    isValid = input.checked;
  } else if (input.required && !input.value.trim()) {
    isValid = false;
  } else if (input.type === 'email' && input.value) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailPattern.test(input.value);
  }

  // For checkboxes, the error element is a sibling of the parent label
  if (input.type === 'checkbox') {
    errorEl = input.closest('.form-group').querySelector('.form-error');
  }

  if (isValid) {
    input.classList.remove('is-error');
    if (errorEl) errorEl.classList.remove('is-visible');
  } else {
    input.classList.add('is-error');
    if (errorEl) errorEl.classList.add('is-visible');
  }

  return isValid;
}

function initForms() {
  var forms = document.querySelectorAll('[data-validate]');
  forms.forEach(function (form) {
    var successEl = form.parentElement.querySelector('.form-success');

    form.querySelectorAll('[required]').forEach(function (input) {
      input.addEventListener('blur', function () {
        validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      form.querySelectorAll('[required]').forEach(function (input) {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        var data = {};
        new FormData(form).forEach(function (value, key) {
          if (data[key]) {
            if (!Array.isArray(data[key])) data[key] = [data[key]];
            data[key].push(value);
          } else {
            data[key] = value;
          }
        });

        var storageKey = form.getAttribute('data-validate');
        var existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        data.timestamp = new Date().toISOString();
        existing.push(data);
        localStorage.setItem(storageKey, JSON.stringify(existing));

        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('is-visible');
          successEl.focus();
        }
      }
    });
  });
}
/* ----- Newsletter Form ----- */
function initNewsletter() {
  var form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
      var emails = JSON.parse(localStorage.getItem('vicai-newsletter') || '[]');
      emails.push({ email: emailInput.value, date: new Date().toISOString() });
      localStorage.setItem('vicai-newsletter', JSON.stringify(emails));
      emailInput.value = '';

      var btn = form.querySelector('.btn');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = 'var(--color-accent)';
        setTimeout(function () {
          btn.textContent = original;
          btn.style.background = '';
        }, 2000);
      }
    }
  });
}
/* ----- Copy URL to Clipboard ----- */
function initCopyUrl() {
  document.querySelectorAll('[data-copy-url]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () {
          btn.textContent = original;
        }, 2000);
      });
    });
  });
}
/* ----- Membership Class Toggle ----- */
function initMembership() {
  var classSelect = document.getElementById('join-class');
  if (!classSelect) return;

  var studentFields = document.getElementById('student-fields');
  var publicFields = document.getElementById('public-fields');

  function setRequired(container, isRequired) {
    container.querySelectorAll('input, select').forEach(function (el) {
      if (el.type === 'checkbox' || el.type === 'radio') return;
      if (isRequired && el.closest('.form-conditional') === container) {
        el.setAttribute('required', '');
        el.setAttribute('aria-required', 'true');
      } else {
        el.removeAttribute('required');
        el.removeAttribute('aria-required');
        el.classList.remove('is-error');
        var errorEl = el.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.classList.remove('is-visible');
      }
    });
  }

  function setCheckboxRequired(id, isRequired) {
    var checkbox = document.getElementById(id);
    if (!checkbox) return;
    if (isRequired) {
      checkbox.setAttribute('required', '');
      checkbox.setAttribute('aria-required', 'true');
    } else {
      checkbox.removeAttribute('required');
      checkbox.removeAttribute('aria-required');
      checkbox.classList.remove('is-error');
      var errorEl = checkbox.parentElement.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.classList.remove('is-visible');
    }
  }

  function showSection(el) {
    el.style.display = '';
    el.setAttribute('aria-hidden', 'false');
  }

  function hideSection(el) {
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');
  }

  classSelect.addEventListener('change', function () {
    var value = classSelect.value;

    // Hide all conditional sections and clear required
    hideSection(studentFields);
    hideSection(publicFields);
    setRequired(studentFields, false);
    setRequired(publicFields, false);
    setCheckboxRequired('join-confirm-student', false);
    setCheckboxRequired('join-confirm-public', false);

    if (value === 'student') {
      showSection(studentFields);
      setRequired(studentFields, true);
      setCheckboxRequired('join-confirm-student', true);
    } else if (value === 'public') {
      showSection(publicFields);
      setRequired(publicFields, true);
      setCheckboxRequired('join-confirm-public', true);
    }
  });
}
/* ----- Initialize everything ----- */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  initNav();
  initActiveNav();
  initAccordion();
  initEventFilters();
  initForms();
  initNewsletter();
  initCopyUrl();
  initMembership();
});