// Audio Manager for ZENKAI Website
(function() {
    // Check if audio is enabled (default: enabled)
    const audioEnabled = localStorage.getItem('zenkaiAudioEnabled') !== 'false';
    
    // Create hidden iframe for continuous audio playback
    const iframe = document.createElement('iframe');
    iframe.src = 'audio-player.html';
    iframe.style.cssText = 'position: fixed; top: 0; left: 0; width: 1px; height: 1px; opacity: 0; pointer-events: none; border: none;';
    document.body.appendChild(iframe);
    
    // Create click sound audio element
    const clickSound = new Audio('click sound/clickingsound.mp3.wav');
    clickSound.volume = 0.3; // Moderate volume (30%)
    clickSound.preload = 'auto'; // Preload the audio
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'audio-toggle';
    toggleButton.className = 'fixed bottom-6 left-6 z-50 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105';
    toggleButton.textContent = audioEnabled ? 'Off Music' : 'On Music';
    toggleButton.style.cssText = 'cursor: pointer; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);';
    
    // Listen for status updates from iframe
    window.addEventListener('message', (event) => {
        if (event.data.type === 'audioStatus') {
            toggleButton.textContent = event.data.playing ? 'Off Music' : 'On Music';
        }
    });
    
    // Toggle audio function
    function toggleAudio() {
        iframe.contentWindow.postMessage('toggle', '*');
    }
    
    // Play click sound function - plays every time
    function playClickSound() {
        if (audioEnabled) {
            // Clone the audio to ensure it plays every time
            const soundClone = clickSound.cloneNode();
            soundClone.volume = 0.3;
            soundClone.currentTime = 0;
            soundClone.play().catch(e => console.log('Click sound play failed:', e));
            
            // Clean up the clone after it plays
            soundClone.onended = () => {
                soundClone.remove();
            };
        }
    }
    
    // Add click event to toggle button
    toggleButton.addEventListener('click', toggleAudio);
    
    // Add button to page
    document.body.appendChild(toggleButton);
    
    // Request initial status from iframe
    setTimeout(() => {
        iframe.contentWindow.postMessage('getStatus', '*');
    }, 500);
    
    // Add click sound to all buttons and links
    function addClickSounds() {
        // Target all clickable elements including buttons, links, and any element with click handlers
        const clickableElements = document.querySelectorAll(
            'button, ' +
            'a, ' +
            '.social-link, ' +
            '.nav-link, ' +
            '[role="button"], ' +
            '.contact-card, ' +
            '.service-card, ' +
            '.skill-card, ' +
            'input[type="submit"], ' +
            'input[type="button"]'
        );
        
        clickableElements.forEach(element => {
            // Remove existing listener to avoid duplicates
            element.removeEventListener('click', playClickSound);
            // Add fresh listener
            element.addEventListener('click', playClickSound);
        });
        
        // Also use event delegation for dynamically added elements
        document.body.addEventListener('click', function(e) {
            const target = e.target;
            const isClickable = target.matches('button, a, [role="button"], input[type="submit"], input[type="button"]') ||
                               target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]');
            
            if (isClickable) {
                playClickSound();
            }
        }, true); // Use capture phase to ensure it fires before other handlers
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addClickSounds);
    } else {
        addClickSounds();
    }
    
    // Expose functions globally for external use
    window.toggleZenkaiAudio = toggleAudio;
    window.playZenkaiClickSound = playClickSound;
})();
