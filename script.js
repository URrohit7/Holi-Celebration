// Get button and container
const colorBtn = document.getElementById('colorBtn');
const confettiContainer = document.getElementById('confetti-container');

// Holi colors
const holiColors = [
    '#ff6b6b', // Red
    '#ffd93d', // Yellow
    '#6bcf7f', // Green
    '#4d96ff', // Blue
    '#ff6ec7', // Pink
    '#ff9d5c', // Orange
    '#b19fff'  // Purple
];

const emojis = ['🎨', '🎉', '💥', '✨', '🌈', '🎆', '🎇'];

// Create piano chime sound effect using Web Audio API
function playChimeSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        // Piano-like chime - use multiple frequencies for richer sound
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
        oscillator.type = 'sine';

        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);

        // Add a second harmonic for richness
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        
        osc2.frequency.setValueAtTime(1320, audioContext.currentTime); // E6 note
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.5);
    } catch (err) {
        console.log('Audio playback not available');
    }
}

// Create background music using Web Audio API
function playBackgroundMusic() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a simple piano-like melody for background
        const notes = [
            { freq: 523.25, duration: 0.4 },  // C5
            { freq: 587.33, duration: 0.4 },  // D5
            { freq: 659.25, duration: 0.4 },  // E5
            { freq: 783.99, duration: 0.8 },  // G5
            { freq: 659.25, duration: 0.4 },  // E5
            { freq: 587.33, duration: 0.4 },  // D5
            { freq: 523.25, duration: 0.8 },  // C5
        ];

        let time = audioContext.currentTime;
        notes.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.value = note.freq;
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0.1, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + note.duration);
            
            osc.start(time);
            osc.stop(time + note.duration);
            
            time += note.duration;
        });
    } catch (err) {
        console.log('Background music generation not available');
    }
}

// Create confetti burst
function createConfetti(event) {
    playChimeSound(); // Play sound effect
    
    const rect = colorBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create 50 confetti particles
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random emoji or shape
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        confetti.style.color = holiColors[Math.floor(Math.random() * holiColors.length)];
        
        // Random angle and speed
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 5 + Math.random() * 10;
        const tx = Math.cos(angle) * velocity * 100;
        const ty = Math.sin(angle) * velocity * 100;

        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.setProperty('--ty', ty + 'px');
        
        confetti.style.animation = `confettiFall ${2 + Math.random()}s ease-out forwards`;
        confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 2500);
    }

    // Flash screen with colors
    flashScreen();
}

// Flash screen with Holi colors
function flashScreen() {
    const flashes = 5;
    for (let i = 0; i < flashes; i++) {
        setTimeout(() => {
            document.body.style.backgroundColor = holiColors[Math.floor(Math.random() * holiColors.length)];
        }, i * 100);
    }

    // Restore gradient after flashing
    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, flashes * 100);
}

// Add click event to button
colorBtn.addEventListener('click', createConfetti);

// Play background music on first interaction
document.addEventListener('click', () => {
    playBackgroundMusic();
}, { once: true });

// Auto-celebration hint
window.addEventListener('load', () => {
    console.log('🎨 Happy Holi! Click the button to celebrate! 🎉');
});
