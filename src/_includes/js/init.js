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
