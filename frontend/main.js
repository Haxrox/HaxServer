// --- Links Generation ---
const hostname = window.location.hostname || 'localhost';

// Environment variables were used in next.js, but since this is static, 
// we use default ports. Adjust if necessary using backend injection or keep defaults.
const plexPort = 32400;
const jellyfinPort = 8920;
const calibrePort = 8000;

document.getElementById('link-plex').href = `https://${hostname}:${plexPort}`;
document.getElementById('link-jellyfin').href = `https://${hostname}:${jellyfinPort}`;
document.getElementById('link-calibre').href = `https://${hostname}:${calibrePort}`;

// --- Menu Logic ---
const menuTrigger = document.getElementById('menu-trigger');
const menuPopover = document.getElementById('menu-popover');

menuTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isExpanded = menuTrigger.getAttribute('aria-expanded') === 'true';
  menuTrigger.setAttribute('aria-expanded', !isExpanded);
  menuPopover.classList.toggle('show');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuTrigger.contains(e.target) && !menuPopover.contains(e.target)) {
    menuPopover.classList.remove('show');
    menuTrigger.setAttribute('aria-expanded', 'false');
  }
});

// --- Visit Counter ---
function getVisitCount() {
  fetch('/api/visit-count')
    .then(response => response.json())
    .then(data => {
      document.getElementById('visit-counter').innerText = `Total visit count: ${data.count || 0}`;
    })
    .catch(error => {
      console.error('Error fetching visit count:', error);
      document.getElementById('visit-counter').innerText = 'Total visit count: 0';
    });
}

// Call visit count on load
getVisitCount();

// --- Logging Logic ---
const startTime = new Date();
console.log('HaxTech started at ' + startTime);

window.addEventListener('beforeunload', function (evt) {
  const endTime = new Date();
  const duration = (endTime.valueOf() - startTime.valueOf()) / 1000;

  // Note: `fetch` in `beforeunload` may not complete successfully. 
  // navigator.sendBeacon is preferred for unload events, but replicating original logic.
  const endpoint = '/api/log';
  const data = {
    tag: "HaxTech",
    log: `Duration: ${duration}s`
  };
  
  console.log(`${endpoint} | data: `, data);
  
  // Attempting standard fetch as in original code
  fetch(endpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    keepalive: true // Added keepalive to improve reliability during unload
  }).then(response => {
    console.log('Close request sent | response: ', response);
  }).catch(error => {
    console.error('Error sending close request:', error);
  });
});
