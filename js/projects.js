/* ============================================
   Projects page — domain filtering & card expand
   ============================================ */
(function () {
  'use strict';

  var filterBar = document.getElementById('filterBar');
  var grid = document.getElementById('projectGrid');
  if (!filterBar || !grid) return;

  var cards = grid.querySelectorAll('.project-card');
  var buttons = filterBar.querySelectorAll('.filter-btn');

  /* ---------- Domain Filtering ---------- */
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      // Update active state
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Collapse all cards first
      cards.forEach(function (card) { card.classList.remove('expanded'); });

      // Filter cards
      cards.forEach(function (card) {
        var domains = card.getAttribute('data-domains').split(',');
        if (filter === 'all' || domains.indexOf(filter) !== -1) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- Card Expand/Collapse ---------- */
  cards.forEach(function (card) {
    var header = card.querySelector('.project-card-header');
    var summary = card.querySelector('.project-summary');

    function toggle() {
      var wasExpanded = card.classList.contains('expanded');
      // Collapse all others
      cards.forEach(function (c) { c.classList.remove('expanded'); });
      // Toggle this one
      if (!wasExpanded) {
        card.classList.add('expanded');
        // Smooth scroll to card
        setTimeout(function () {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    }

    header.addEventListener('click', toggle);
    summary.addEventListener('click', toggle);
  });
})();
