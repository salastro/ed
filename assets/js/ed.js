// 'Back to top' logic
function setupBackToTop() {
  const intersectionObserver = new IntersectionObserver(function(entries) {
    const topBtn = document.querySelector('.top-of-site-link');
    if (topBtn === null) return;

    topBtn.dataset.visible = entries[0].boundingClientRect.y < 0;
  });

  const topAnchor = document.querySelector('#top-of-site-anchor');
  if (topAnchor !== null) {
    intersectionObserver.observe(topAnchor);
  }
}

// Annotation support
function setupHypothes() {
  const hypothesisContainer = document.querySelector('.hypothesis-container');
  const sidebarCheckbox = document.querySelector('#sidebar-checkbox');
  if (hypothesisContainer !== null) {
    hypothesisContainer.addEventListener('click', e => {
      e.preventDefault();

      let script = document.createElement('script');
      script.setAttribute('src', 'https://cdn.hypothes.is/hypothesis');
      script.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(script);

      // Close the sidebar by unchecking the checkbox
      if (sidebarCheckbox && sidebarCheckbox.checked) {
        sidebarCheckbox.checked = false;
      }
    });
  }

  const hypothesisLink = document.querySelector('#hypothesis-link');
  if (hypothesisLink !== null) {
    hypothesisContainer.addEventListener('click', e => e.preventDefault());
  }
}

// Dark mode toggle logic (inversion-based)
function setupDarkMode() {
  const checkbox = document.getElementById('darkmode-checkbox');
  const root = document.body;

  if (!checkbox) return;

  // Restore theme on page load
  if (localStorage.getItem('darkmode') === 'true') {
    checkbox.checked = true;
    root.classList.add('darkmode');
  }

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      root.classList.add('darkmode');
      localStorage.setItem('darkmode', 'true');
    } else {
      root.classList.remove('darkmode');
      localStorage.setItem('darkmode', 'false');
    }
  });
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
  setupBackToTop();
  setupHypothes();
  setupDarkMode(); // <- add this
});
