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
