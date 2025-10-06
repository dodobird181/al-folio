// Page Loader - Wait for all images to load before showing the site
(function() {
  'use strict';

  // Function to hide the loader
  function hideLoader() {
    var loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('loaded');
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
  } else {
    initLoader();
  }

  function initLoader() {
    // Check if imagesLoaded library is available
    if (typeof imagesLoaded !== 'undefined') {
      // Use imagesLoaded to detect when all images are loaded
      imagesLoaded(document.body, { background: true }, function() {
        hideLoader();
      });
    } else {
      // Fallback to window.load if imagesLoaded is not available
      if (document.readyState === 'complete') {
        hideLoader();
      } else {
        window.addEventListener('load', hideLoader);
      }
    }
  }
})();
