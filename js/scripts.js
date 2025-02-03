// scripts.js
// This script implements initialization using the gps-new-camera update event,
// displays a debug log, and adds functionality for tap-to-place a huge GPS marker.

window.addEventListener('load', () => {
  const debugLogEl = document.getElementById('debuglog');

  // Utility function to log messages to both console and debug overlay.
  const logMessage = (msg) => {
    console.log(msg);
    if (debugLogEl) {
      debugLogEl.innerHTML += `<div>${msg}</div>`;
      // Auto-scroll to the bottom
      debugLogEl.scrollTop = debugLogEl.scrollHeight;
    }
  };

  logMessage('Initializing AR.js GPS application...');

  // Use the gps-new-camera element (instead of directly using navigator.geolocation)
  const cameraEl = document.querySelector('[gps-new-camera]');
  if (!cameraEl) {
    logMessage('Error: gps-new-camera element not found!');
    return;
  }

  let initialPositionReceived = false;
  cameraEl.addEventListener('gps-camera-update-position', (e) => {
    const pos = e.detail.position;
    if (!initialPositionReceived) {
      initialPositionReceived = true;
      logMessage(`Got first GPS position: Latitude ${pos.latitude}, Longitude ${pos.longitude}`);
      // As per the documentation, add an initial POI slightly to the north
      const marker = document.createElement('a-box');
      marker.setAttribute('scale', '20 20 20');
      marker.setAttribute('material', 'color: red');
      // Offset latitude by +0.001 to place the marker to the north
      marker.setAttribute('gps-new-entity-place', `latitude: ${pos.latitude + 0.001}; longitude: ${pos.longitude}`);
      marker.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true');
      document.querySelector('a-scene').appendChild(marker);
      logMessage('Initial AR marker placed to the north of your current location.');
    }
  });

  // Add tap-to-place functionality: On tap, the app will retrieve the current location
  // and place a huge, blue GPS marker. We use the regular geolocation API here on tap.
  const scene = document.querySelector('a-scene');
  if (scene) {
    scene.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          logMessage(`Placing marker at your current location: Latitude ${latitude}, Longitude ${longitude}`);
          const marker = document.createElement('a-box');
          marker.setAttribute('material', 'color: blue');
          // Marker is set huge to ensure visibility in AR (50 units each dimension)
          marker.setAttribute('scale', '50 50 50');
          marker.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
          marker.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true');
          scene.appendChild(marker);
        },
        (error) => {
          logMessage(`Error retrieving location on tap: ${error.message}`);
        }
      );
    });
  } else {
    logMessage('Error: A-Frame scene not found!');
  }
});