// scripts.js
// This script handles any additional custom behaviors including debug logging and tap-to-place functionality.
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
    // Request the initial current position
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

    // Add tap event to place a new GPS marker at the current location.
    scene.addEventListener('click', () => {
      // Obtain the current geolocation at tap.
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          logMessage(`Placing marker at your location: Latitude ${latitude}, Longitude ${longitude}`);

          // Create a new marker entity! Using an a-box as the marker.
          const marker = document.createElement('a-box');
          marker.setAttribute('color', 'blue');
          marker.setAttribute('depth', '5');
          marker.setAttribute('height', '5');
          marker.setAttribute('width', '5');
          marker.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
          marker.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true');
          
          scene.appendChild(marker);
        },
        (error) => {
          logMessage(`Unable to get current location for marker: ${error.message}`);
        }
      );
    });
  } else {
    logMessage('Error: A-Frame scene not found!');
  }
});