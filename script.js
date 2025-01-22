document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.photographs-text, .essays-text, .about-text');
    links.forEach(link => {
      link.style.pointerEvents = 'auto';
    });
  
    const fadeElements = document.querySelectorAll('.welcome-text, .photographs-text, .essays-text, .about-text');
  
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
  
      fadeElements.forEach(element => {
        const fadeFactor = Math.max(0, 1 - scrollPosition / (viewportHeight * 0.8)); // Adjust fade sensitivity
        element.style.opacity = fadeFactor.toFixed(2); // Smooth opacity
      });
    });
  });
  
  const imagePaths = [
    'images/DSCF3284.jpg',
    'images/DSCF3482.jpg',
    'images/DSCN1074.jpg',
    'images/IMG_0235.jpeg',
    'images/IMG_0984.jpeg'
  ];
  let lastScrollPositions = 0;
  
  let currentHeight = 0;
  let lastUsedImages = [];
  const innerHeight = window.innerHeight;

  function preloadImages(paths) {
    paths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }
  
  function getRandomImage() {
    const availableImages = imagePaths.filter(img => !lastUsedImages.includes(img));
    const selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)];
  
    // Update lastUsedImages to avoid immediate repetition
    lastUsedImages.push(selectedImage);
    if (lastUsedImages.length > 2) lastUsedImages.shift();
  
    return selectedImage;
  }
  
  function placeQuadrantImages() {
    const container = document.getElementById('backgroundContainer');
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const quadrantWidth = containerWidth / 2;
    const quadrantHeight = containerHeight / 2;
  
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        const img = document.createElement('img');
        img.src = getRandomImage();
        img.classList.add('background-image');
  
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.left = `${col * quadrantWidth}px`;
        img.style.top = `${row * quadrantHeight}px`;
        img.style.zIndex = 0;
  
        container.appendChild(img);
      }
    }
  }
  
  function placeRandomImages(batchSize = 10) {
    const container = document.getElementById('backgroundContainer');
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
  
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < batchSize; i++) {
      const img = document.createElement('img');
      img.src = getRandomImage();
      img.classList.add('background-image');
  
      img.style.width = `${Math.random() * (80 - 50) + 50}vw`; // 50vw to 80vw
      img.style.height = 'auto';
      img.style.left = `${Math.random() * (containerWidth * 1.2) - (containerWidth * 0.1)}px`; // Random horizontal position with edge coverage
      img.style.top = `${currentHeight + Math.random() * containerHeight - (containerHeight * 0.3)}px`; // Random vertical position, ensuring overlap to edges
      img.style.zIndex = 0; // Ensure images stay behind text
  
      fragment.appendChild(img);
    }
  
    container.appendChild(fragment);
    currentHeight += containerHeight;
    container.style.height = `${currentHeight}px`;
  }
  
  function onScroll() {
    scrollPosition = document.body.scrollHeight;
    const scrollDown = scrollPosition > lastScrollPositions ? true : false;
    console.log('scrollPosition ' + scrollPosition);
    console.log('scrollY ' + window.scrollY);
    console.log('lastpos ' + lastScrollPositions);
    const fadeElement = document.querySelector('.welcome-text');
    const screenHeight = innerHeight;
    console.log('scrollHeight ' + document.body.scrollHeight);
    console.log ('innerHeight ' + window.innerHeight);

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200) {
      requestAnimationFrame(() => placeRandomImages(10));
    }

    if (scrollDown){
        const fadeFactor = Math.max(0, 1 - (scrollPosition/2)/(screenHeight*10));
        console.log('fadeFactor ' + fadeFactor);
        fadeElement.style.opacity = fadeFactor.toFixed(2);
    } else {
        const fadeFactor = Math.min(0 + scrollPosition/(screenHeight*10), 1);
        console.log('fadeFactor ' + fadeFactor);
        fadeElement.style.opacity = fadeFactor.toFixed(2);
    }
    lastScrollPositions = scrollPosition;
    // const fadeElements = document.querySelectorAll('.welcome-text, .photographs-text, .essays-text, .about-text');
  

    //     // const fadeElement = document.querySelector('.welcome-text');
      
    //     window.addEventListener('scroll', () =>{ 
    //       const scrollPosition = window.scrollY;
    //       const viewportHeight = window.innerHeight;
      
    //       // Calculate the fade factor based on the scroll position
    //       const fadeFactor = Math.max(0, 1 - scrollPosition/viewportHeight);
    //       fadeElement.style.opacity = fadeElement.style.opacity-fadeFactor;
    //     });
      
  }
  
  // Preload all images
  preloadImages(imagePaths);
  
  // Initialize with quadrant images and a batch for overlap
  placeQuadrantImages();
  placeRandomImages(10);
  window.addEventListener('scroll', onScroll);