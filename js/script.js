$(document).ready(function () {
  // Initialize AOS scroll animations
  AOS.init({
    duration: 800,
    once: true
  });

  // Smooth scroll navigation
  $('.top-right-buttons .btn').on('click', function (e) {
    const target = $(this).attr('href');
    if (target && target.startsWith("#")) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(target).offset().top - 60
      }, 600);
    }
  });

  // Fade transition setup for background videos
  const videoList = [
    'videos/video1.mp4',
    'videos/video2.mp4',
    'videos/video3.mp4'
  ];

  let current = 0;
  const videoEl = document.getElementById('heroVideo');

  function fadeOutIn(callback) {
    $(videoEl).fadeOut(500, function () {
      callback();
      $(videoEl).fadeIn(500);
    });
  }

  function switchToNextVideo() {
    current = (current + 1) % videoList.length;
    fadeOutIn(() => {
      while (videoEl.firstChild) {
        videoEl.removeChild(videoEl.firstChild);
      }
      const newSource = document.createElement('source');
      newSource.src = videoList[current];
      newSource.type = 'video/mp4';
      videoEl.appendChild(newSource);

      videoEl.load();
      videoEl.play().catch((err) => {
        console.error('Autoplay error:', err);
      });
    });
  }

  if (videoEl) {
    videoEl.addEventListener('ended', switchToNextVideo);
  }

  // Update footer CTA
  const footerText = document.querySelector('.footer p');
  if (footerText) {
    footerText.textContent = "Looking forward to hearing your thoughts, Triumph Tech";
  }
});
