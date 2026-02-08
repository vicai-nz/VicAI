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
