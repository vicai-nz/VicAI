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
