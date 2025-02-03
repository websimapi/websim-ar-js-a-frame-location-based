// scripts.js
// This script handles any additional custom behaviors or error logging.
// For example, we can monitor if GPS is available, although AR.js handles most of it.
window.addEventListener('load', () => {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser');
    alert('Geolocation is not supported. Try a different browser.');
  } else {
    console.log('Geolocation supported.');
    // Optionally, you can request the location permission at this point.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Current position:', position.coords);
      },
      (error) => {
        console.error('Error retrieving location:', error);
      }
    );
  }
});