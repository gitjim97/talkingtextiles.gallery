// This script sets a random favicon from the gallery images on each page load
(function() {
  const galleryImages = [
    '/images/Angela_Davis.jpg',
    '/images/Copy_of_Gravey.jpg',
    '/images/Copy_of_Lillia_s_mom.jpg',
    '/images/Copy_of_pam_mom_2.jpg',
    '/images/Cynthia.jpg',
    '/images/daddy.jpg',
    '/images/Frans_grand_mother.jpg',
    '/images/Jeanneta_art.jpg',
    '/images/Kamala.jpg',
    '/images/Malcom_X.jpg',
    '/images/mama.jpg',
    '/images/Mrs_Annies_Nience.jpg',
    '/images/Nigel.jpg',
    '/images/Untitled-1.jpg',
    '/images/Page 30.jpg'
  ];
  const pick = galleryImages[Math.floor(Math.random() * galleryImages.length)];
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/jpeg';
  link.sizes = '48x48';
  link.href = pick;
  // Remove any existing favicons
  document.querySelectorAll('link[rel="icon"]').forEach(el => el.remove());
  document.head.appendChild(link);
})();
