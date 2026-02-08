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
