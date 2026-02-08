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
