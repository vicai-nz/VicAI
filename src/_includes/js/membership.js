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
