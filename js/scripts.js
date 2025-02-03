// scripts.js
// This script handles any additional custom behaviors including debug logging.
window.addEventListener('load', () => {
  const debugLogEl = document.getElementById('debuglog');
  const logMessage = (msg) => {
    console.log(msg);
    if (debugLogEl) {
      debugLogEl.innerHTML += `<div>${msg}</div>`;
    }
  };

  logMessage('Initializing AR.js GPS application...');

  // Check for geolocation support
  if (!navigator.geolocation) {
    const errorMsg = 'Error: Geolocation is not supported by your browser.';
    logMessage(errorMsg);
    alert('Geolocation is not supported. Try a different browser.');
  } else {
    logMessage('Geolocation supported.');
    // Request the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        logMessage(`Current position acquired: Latitude ${position.coords.latitude}, Longitude ${position.coords.longitude}`);
      },
      (error) => {
        logMessage(`Error retrieving location: ${error.message}`);
      }
    );
  }

  // Monitor A-Frame scene loading
  const scene = document.querySelector('a-scene');
  if (scene) {
    scene.addEventListener('loaded', () => {
      logMessage('A-Frame scene is fully loaded and initialized.');
    });
  } else {
    logMessage('Error: A-Frame scene not found!');
  }
});