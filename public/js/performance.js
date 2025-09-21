// Intersection Observer for lazy loading optimization
const createIntersectionObserver = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Preload next page images when hovering over gallery links
const preloadOnHover = () => {
  document.querySelectorAll('.gallery a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href && href.includes('/artist_pages/')) {
        // Preload the artist page image
        const imageName = href.split('/').pop();
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'prefetch';
        preloadLink.href = `/images/${imageName}.webp`;
        document.head.appendChild(preloadLink);
      }
    }, { once: true });
  });
};

// Initialize optimizations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createIntersectionObserver();
    preloadOnHover();
  });
} else {
  createIntersectionObserver();
  preloadOnHover();
}
