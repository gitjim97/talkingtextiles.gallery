// Artist page navigation
const artistPages = [
  'Angela_Davis',
  'Copy_of_Gravey', 
  'copy_of_pam_mom_2',
  'Cynthia',
  'Daddy',
  'frans_grand_mother',
  'Jeanneta_art',
  'Kamala',
  'lillia_s_mom',
  'Malcom_X',
  'Mama',
  'mrs_annies_nience',
  'Nigel',
  'Page_30',
  'Untitled-1'
];

function getCurrentArtistIndex() {
  const path = window.location.pathname;
  const match = path.match(/\/artist_pages\/([^\/]+)\/?$/);
  if (match) {
    const currentArtist = match[1];
    return artistPages.indexOf(currentArtist);
  }
  return -1;
}

function navigateToArtist(direction) {
  const currentIndex = getCurrentArtistIndex();
  if (currentIndex === -1) return;

  let nextIndex;
  if (direction === 'next') {
    nextIndex = (currentIndex + 1) % artistPages.length;
  } else {
    nextIndex = (currentIndex - 1 + artistPages.length) % artistPages.length;
  }

  window.location.href = `/artist_pages/${artistPages[nextIndex]}/`;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    navigateToArtist('prev');
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    navigateToArtist('next');
  }
});

// Initialize navigation buttons
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('prev-artist');
  const nextBtn = document.getElementById('next-artist');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateToArtist('prev'));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateToArtist('next'));
  }

  // Update button text with artist names
  const currentIndex = getCurrentArtistIndex();
  if (currentIndex !== -1) {
    const prevIndex = (currentIndex - 1 + artistPages.length) % artistPages.length;
    const nextIndex = (currentIndex + 1) % artistPages.length;
    
    const prevName = artistPages[prevIndex].replace(/_/g, ' ').replace('Copy of ', '');
    const nextName = artistPages[nextIndex].replace(/_/g, ' ').replace('Copy of ', '');
    
    if (prevBtn) {
      prevBtn.innerHTML = `← ${prevName}`;
      prevBtn.title = `Previous: ${prevName}`;
    }
    if (nextBtn) {
      nextBtn.innerHTML = `${nextName} →`;
      nextBtn.title = `Next: ${nextName}`;
    }
  }
});
