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
  
  // Pick a random image
  const randomImage = galleryImages[Math.floor(Math.random() * galleryImages.length)];
  
  // Create favicon link
  const faviconLink = document.createElement('link');
  faviconLink.rel = 'icon';
  faviconLink.type = 'image/jpeg';
  faviconLink.href = randomImage;
  
  // Remove any existing favicon links to avoid conflicts
  document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(el => el.remove());
  
  // Add the new random favicon
  document.head.appendChild(faviconLink);
  
  console.log('Random favicon set to:', randomImage);
})();
