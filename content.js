// Function to remove ad elements
function removeAds() {
  // Video ads
  const videoAds = document.querySelectorAll('.video-ads, .ytp-ad-overlay-container, .ytp-ad-skip-button-container, .ytp-ad-preview-container');
  videoAds.forEach(ad => ad.remove());

  // Skip ad if possible
  const skipButton = document.querySelector('.ytp-ad-skip-button');
  if (skipButton) {
    skipButton.click();
  }

  // Remove sidebar ads
  const sidebarAds = document.querySelectorAll('ytd-promoted-video-renderer, ytd-compact-promoted-video-renderer, ytd-display-ad-renderer');
  sidebarAds.forEach(ad => ad.remove());

  // Remove masthead ads
  const mastheadAd = document.querySelector('div#masthead-ad');
  if (mastheadAd) {
    mastheadAd.remove();
  }

  // Remove in-feed ads
  const feedAds = document.querySelectorAll('ytd-ad-slot-renderer');
  feedAds.forEach(ad => ad.remove());

  // Handle video player ads
  const player = document.getElementById('movie_player');
  if (player && player.classList.contains('ad-showing')) {
    // Try to skip the ad
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = video.duration;
    }
    
    // Remove ad overlay
    const adOverlay = document.querySelector('.ytp-ad-overlay-container');
    if (adOverlay) {
      adOverlay.remove();
    }
  }
}

// Create a mutation observer to watch for new ad elements
const observer = new MutationObserver(() => {
  removeAds();
});

// Function to initialize the ad blocker
function initializeAdBlocker() {
  if (document.body) {
    // Start observing the document with the configured parameters
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial cleanup
    removeAds();

    // Run cleanup periodically
    setInterval(removeAds, 1000);
  } else {
    // If body is not available yet, wait and try again
    setTimeout(initializeAdBlocker, 100);
  }
}

// Start the ad blocker
initializeAdBlocker();

// Additional event listeners for dynamic content
document.addEventListener('yt-navigate-finish', removeAds);
document.addEventListener('spfdone', removeAds);

// Handle video player directly
function handleVideoPlayer() {
  const player = document.getElementById('movie_player');
  if (player) {
    if (player.classList.contains('ad-showing')) {
      const video = document.querySelector('video');
      if (video) {
        video.currentTime = video.duration;
      }
    }
  }
}

// Check for ads periodically
setInterval(handleVideoPlayer, 500); 