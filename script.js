// Configuration
const CONFIG = {
    minDisplayDuration: 4000, // Increased for better performance
    maxDisplayDuration: 12000, // Increased for better performance
    minHideDuration: 200, // Increased for better performance
    maxHideDuration: 3000, // Increased for better performance
    minSize: 200, // Reduced for better performance
    maxSize: 350, // Reduced for better performance
    maxRotation: 360 // Maximum rotation in degrees - full rotation
};

// Performance monitoring
let performanceMode = 'normal';
let frameCount = 0;
let lastTime = performance.now();
let fps = 60;

// Monitor performance and adjust quality
function monitorPerformance() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Adjust performance mode based on FPS
        if (fps < 30) {
            performanceMode = 'low';
            console.log('Switching to low performance mode (FPS:', fps, ')');
        } else if (fps < 45) {
            performanceMode = 'medium';
            console.log('Switching to medium performance mode (FPS:', fps, ')');
        } else {
            performanceMode = 'normal';
        }
    }
    
    requestAnimationFrame(monitorPerformance);
}

// Array of image filenames - will be populated dynamically
let imageFiles = [];

// Get the container element
const imageContainer = document.getElementById('imageContainer');

// Nan's birthday - defined once globally
const NAN_BIRTHDAY = new Date(1995, 10, 23); // November 23, 1995 (month is 0-indexed)

// Calculate Nan's age dynamically based on her actual birthday
function calculateAge() {
    const today = new Date();
    
    let age = today.getFullYear() - NAN_BIRTHDAY.getFullYear();
    const monthDiff = today.getMonth() - NAN_BIRTHDAY.getMonth();
    
    // If birthday hasn't occurred this year yet, subtract 1 from age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < NAN_BIRTHDAY.getDate())) {
        age--;
    }
    
    return age;
}

// Check if today is Nan's birthday
function isBirthday() {
    const today = new Date();
    
    return today.getMonth() === NAN_BIRTHDAY.getMonth() && 
           today.getDate() === NAN_BIRTHDAY.getDate();
}

// Update birthday text with dynamic age
function updateBirthdayText() {
    const age = calculateAge();
    const birthdayText = document.getElementById('birthdayText');
    if (birthdayText) {
        birthdayText.textContent = `Happy ${age}${getOrdinalSuffix(age)} Birthday Nan!`;
        console.log(`Updated birthday text to: Happy ${age}${getOrdinalSuffix(age)} Birthday Nan!`);
    } else {
        console.log('Birthday text element not found');
    }
}

// Show birthday celebration or waiting message
function showBirthdayContent() {
    const container = document.querySelector('.container');
    
    if (isBirthday()) {
        // It's her birthday - show full celebration (no overlay needed)
        container.style.display = 'block';
        updateBirthdayText();
    } else {
        // Not her birthday - add black overlay on top of existing content
        const overlay = document.createElement('div');
        overlay.id = 'birthdayOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: black;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        overlay.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                z-index: 10001;
                white-space: nowrap;
            ">
                <div style="
                    color: white;
                    font-family: Arial, sans-serif;
                    font-size: 1.5rem;
                    margin: 0 0 30px 0;
                    font-weight: normal;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                ">Today is not Nan's birthday</div>
                <div id="countdownText" style="
                    color: white;
                    font-family: Arial, sans-serif;
                    font-size: 1.1rem;
                    font-weight: normal;
                    text-align: center;
                    background: rgba(0, 0, 0, 0.3);
                    padding: 15px 30px;
                    border-radius: 10px;
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                ">Loading countdown...</div>
            </div>
            <button id="celebrateAnyway" style="
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #333;
                color: white;
                border: 1px solid #666;
                padding: 10px 20px;
                font-size: 1rem;
                font-family: Arial, sans-serif;
                cursor: pointer;
                border-radius: 5px;
                transition: background 0.3s ease;
                z-index: 10000;
            " onmouseover="this.style.background='#555'" onmouseout="this.style.background='#333'">
                I want to celebrate anyway
            </button>
        `;
        
        document.body.appendChild(overlay);
        
        // Add event listener for the celebration button
        setTimeout(() => {
            const celebrateButton = document.getElementById('celebrateAnyway');
            if (celebrateButton) {
                celebrateButton.addEventListener('click', () => {
                    hideBirthdayOverlay();
                });
            }
        }, 100);
    }
}

// Hide the birthday overlay when button is clicked
function hideBirthdayOverlay() {
    const overlay = document.getElementById('birthdayOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Countdown timer to Nan's next birthday
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Get next birthday (November 23rd)
    let nextBirthday = new Date(currentYear, NAN_BIRTHDAY.getMonth(), NAN_BIRTHDAY.getDate());
    
    // If birthday has passed this year, get next year's birthday
    if (now > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, NAN_BIRTHDAY.getMonth(), NAN_BIRTHDAY.getDate());
    }
    
    const timeDiff = nextBirthday - now;
    
    if (timeDiff <= 0) {
        // It's her birthday! Force refresh the page
        document.getElementById('countdownText').innerHTML = `
            <div style="color: #ffd700; font-weight: bold;">🎉 IT'S HER BIRTHDAY! 🎉</div>
        `;
        // Force refresh the page after 2 seconds to show the birthday celebration
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        return;
    }
    
    // Calculate time components
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Update countdown display - just show the time
    const countdownElement = document.getElementById('countdownText');
    if (countdownElement) {
        countdownElement.textContent = `${days} days, ${hours}h ${minutes}m ${seconds}s`;
    }
}

// Start countdown timer
function startCountdown() {
    updateCountdown(); // Initial update
    setInterval(updateCountdown, 1000); // Update every second
}


// Get ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
function getOrdinalSuffix(num) {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
}

// Track active image controllers
const imageControllers = new Map(); // filename -> controller
let currentQuadrant = 0; // Track current quadrant for rotation (0-3)

// Function to get random value between min and max
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get random float between min and max
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to get next quadrant for rotation
function getNextQuadrant() {
    currentQuadrant = (currentQuadrant + 1) % 4;
    return currentQuadrant;
}

// Function to get quadrant boundaries
function getQuadrantBounds(quadrant) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // 15% gap from screen edges for better containment
    const isMobile = window.innerWidth <= 768;
    const baseGap = Math.min(window.innerWidth * 0.15, window.innerHeight * 0.15);
    // Add extra margin on mobile for better containment
    const edgeGap = isMobile ? Math.max(baseGap, 80) : baseGap;
    const minX = edgeGap;
    const maxX = window.innerWidth - edgeGap;
    const minY = edgeGap;
    const maxY = window.innerHeight - edgeGap;
    
    switch (quadrant) {
        case 0: // Top-left
            return {
                minX: minX,
                maxX: centerX,
                minY: minY,
                maxY: centerY
            };
        case 1: // Top-right
            return {
                minX: centerX,
                maxX: maxX,
                minY: minY,
                maxY: centerY
            };
        case 2: // Bottom-left
            return {
                minX: minX,
                maxX: centerX,
                minY: centerY,
                maxY: maxY
            };
        case 3: // Bottom-right
            return {
                minX: centerX,
                maxX: maxX,
                minY: centerY,
                maxY: maxY
            };
        default:
            return {
                minX: minX,
                maxX: maxX,
                minY: minY,
                maxY: maxY
            };
    }
}

// Image Controller Class - Simplified approach
class ImageController {
    constructor(filename) {
        this.filename = filename;
        this.img = null;
        this.isVisible = false;
        this.timeoutId = null;
        this.start();
    }
    
    start() {
        // Biased initial delay - most images appear in first 2 seconds
        let initialDelay;
        const random = Math.random();
        
        if (random < 0.7) {
            // 70% of images appear in first 2 seconds
            initialDelay = Math.random() * 2000;
        } else if (random < 0.9) {
            // 20% of images appear in 2-5 seconds
            initialDelay = 2000 + Math.random() * 3000;
        } else {
            // 10% of images appear in 5-8 seconds (for variety)
            initialDelay = 5000 + Math.random() * 3000;
        }
        
        setTimeout(() => {
            this.scheduleNext();
        }, initialDelay);
    }
    
    scheduleNext() {
        // Don't schedule if page is not visible
        if (!isPageVisible) {
            return;
        }
        
        // Clear any existing timeout
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        
        if (this.isVisible) {
            // Currently visible, schedule hide
            const displayDuration = getRandomValue(CONFIG.minDisplayDuration, CONFIG.maxDisplayDuration);
            this.timeoutId = setTimeout(() => {
                this.hide();
            }, displayDuration);
        } else {
            // Currently hidden, schedule show
            const hideDuration = getRandomValue(CONFIG.minHideDuration, CONFIG.maxHideDuration);
            this.timeoutId = setTimeout(() => {
                this.show();
            }, hideDuration);
        }
    }
    
    show() {
        if (this.isVisible || !isPageVisible) return;
        
        this.isVisible = true;
        this.createImage();
        
        // Schedule hide after fade-in completes
        setTimeout(() => {
            this.scheduleNext();
        }, 1000); // Wait for fade-in + a bit more
    }
    
    hide() {
        if (!this.isVisible) return;
        
        this.isVisible = false;
        
        if (this.img && this.img.parentNode) {
            // Add fade-out animation class
            this.img.style.animation = 'fadeOutScale 0.8s ease-in-out forwards';
            
            // Remove element after animation completes
            setTimeout(() => {
                if (this.img && this.img.parentNode) {
                    this.img.parentNode.removeChild(this.img);
                    this.img = null;
                }
                
                // Schedule next after fade-out completes
                setTimeout(() => {
                    this.scheduleNext();
                }, 200); // Small delay after removal
            }, 800); // Wait for fade-out animation to complete
        } else {
            // If no image, schedule next immediately
            this.scheduleNext();
        }
    }
    
    createImage() {
        // Create image element
        this.img = document.createElement('img');
        this.img.src = `images/${this.filename}`;
        this.img.className = 'floating-image';
        this.img.alt = 'Birthday image';
        
        // Use quadrant rotation system to prevent clustering
        const targetQuadrant = getNextQuadrant();
        const bounds = getQuadrantBounds(targetQuadrant);
        const isMobile = window.innerWidth <= 768;
        const minDistanceFromOthers = isMobile ? 100 : 150; // Smaller distance on mobile
        
        let randomX, randomY;
        let attempts = 0;
        const maxAttempts = 10; // Reduced attempts since we removed center constraint
        
        do {
            // Generate position within the target quadrant
            randomX = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
            randomY = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);
            
            // Check if position is too close to other images
            let tooCloseToOthers = false;
            const allImages = document.querySelectorAll('.floating-image');
            for (let img of allImages) {
                const imgRect = img.getBoundingClientRect();
                const imgCenterX = imgRect.left + imgRect.width / 2;
                const imgCenterY = imgRect.top + imgRect.height / 2;
                
                const distanceFromImg = Math.sqrt(
                    Math.pow(randomX - imgCenterX, 2) + Math.pow(randomY - imgCenterY, 2)
                );
                
                if (distanceFromImg < minDistanceFromOthers) {
                    tooCloseToOthers = true;
                    break;
                }
            }
            
            if (!tooCloseToOthers) {
                break;
            }
            
            attempts++;
        } while (attempts < maxAttempts);
        
        // If we couldn't find a good position after max attempts, use the last generated position
        if (attempts >= maxAttempts) {
            console.log(`Warning: Could not find optimal position for ${this.filename} in quadrant ${targetQuadrant} after ${maxAttempts} attempts`);
        }
        
        // Set position
        this.img.style.left = `${randomX}px`;
        this.img.style.top = `${randomY}px`;
        
        // Random size - MASSIVE for GIF files (5x to 10x larger)
        let randomSize;
        const isGif = this.filename.toLowerCase().endsWith('.gif');
        
        if (isGif) {
            // GIF files get MASSIVE size range (5x to 10x larger)
            randomSize = getRandomValue(200, 800); // Much larger range for GIFs
        } else {
            // Other images use normal size range
            randomSize = getRandomValue(CONFIG.minSize, CONFIG.maxSize);
        }
        this.img.style.width = `${randomSize}px`;
        this.img.style.height = `${randomSize}px`;
        
        // Override CSS max-width/max-height for GIF files
        if (isGif) {
            this.img.style.maxWidth = 'none';
            this.img.style.maxHeight = 'none';
        }
        
        // Random rotation for more variation
        const randomRotation = getRandomFloat(-CONFIG.maxRotation, CONFIG.maxRotation);
        this.img.style.transform = `rotate(${randomRotation}deg)`;
        
        // Add to container - CSS animation will handle fade-in
        imageContainer.appendChild(this.img);
    }
    
    destroy() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.img && this.img.parentNode) {
            // Force immediate removal to prevent snap-back
            this.img.style.transition = 'none';
            this.img.style.opacity = '0';
            this.img.parentNode.removeChild(this.img);
        }
        this.isVisible = false;
    }
}

// Function to fetch all images from the images folder dynamically
async function fetchImageFiles() {
    // Use the comprehensive list of known images directly
    // This is more reliable than trying to detect dynamically
    imageFiles = [
        '000000857889_25744415_b360_40ba_8e98_e4fa5f11b2d3.png',
        '1756372944.png',
        '525ce9b544e67a8d21.png',
        'a-festive-partying-emoji-face-with-a-party-hat-and-blowing-confetti-expressing-joy-and-celebration-with-bright-yellow-colors-png.png',
        'edcddb_f0f6e13f25024513bf6b2bbebe48ce6f~mv2.png',
        'image.png',
        'shutterstock_2121261509.webp',
        'the-cactus-cartoon-so-cute-png.webp',
        'unlock-happiness-house-key-keychain-silhouettes-free-png.webp'
    ];
    
    // Test which images actually exist by trying to load them
    const imagePromises = imageFiles.map(filename => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                console.log(`✓ Found: ${filename}`);
                resolve(filename);
            };
            img.onerror = () => {
                console.log(`✗ Missing: ${filename}`);
                resolve(null);
            };
            img.src = `images/${filename}`;
        });
    });
    
    const results = await Promise.all(imagePromises);
    imageFiles = results.filter(result => result !== null);
    
    console.log(`Successfully loaded ${imageFiles.length} images:`, imageFiles);
    return imageFiles;
}

// Function to initialize all image controllers with random start times
function initializeImageControllers() {
    imageFiles.forEach((filename, index) => {
        // Add random delay for each controller's first appearance
        const randomDelay = Math.random() * 3000; // 0-3 seconds random delay
        
        setTimeout(() => {
            const controller = new ImageController(filename);
            imageControllers.set(filename, controller);
        }, randomDelay);
    });
}

// Function to handle window resize
function handleResize() {
    // Update positions for all visible images using quadrant system
    imageControllers.forEach(controller => {
        if (controller.isVisible && controller.img) {
            // Get a random quadrant for repositioning
            const randomQuadrant = Math.floor(Math.random() * 4);
            const bounds = getQuadrantBounds(randomQuadrant);
            
            const randomX = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
            const randomY = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);
            
            controller.img.style.left = `${randomX}px`;
            controller.img.style.top = `${randomY}px`;
        }
    });
}

// Handle window resize
window.addEventListener('resize', handleResize);

// Track if page is visible
let isPageVisible = true;

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    
        if (isPageVisible) {
            // Resume all controllers
            imageControllers.forEach(controller => {
                if (!controller.isVisible) {
                    controller.scheduleNext();
                }
            });
        } else {
            // Pause all controllers by clearing their timeouts and removing visible images
            imageControllers.forEach(controller => {
                if (controller.timeoutId) {
                    clearTimeout(controller.timeoutId);
                    controller.timeoutId = null;
                }
                // Force remove any visible images to prevent stuck images
                if (controller.isVisible && controller.img && controller.img.parentNode) {
                    controller.img.parentNode.removeChild(controller.img);
                    controller.isVisible = false;
                }
            });
        }
});

// 🎉 EXCITING NEW FEATURES 🎉

// Celebration state management - Always on!
let celebrationMode = true;
let confettiEngine = null;
let fireworksEngine = null;

// 🎵 Audio Management
let birthdayAudio = null;
let isMuted = false;
let wasPlayingBeforeBlur = false;

// 🎂 Birthday Wishes
const birthdayWishes = [
    "Welcome to the 30s club! Happy Birthday! May the year of 2026 be your best one yet! 🌟 ✨ -- Jame",
    "Happy Birthday Nan! Wishing you the best of 2026 and more years ahead 💕 Lets hang out again in 2026 na 😊 -- Lily",
    "Wish you a stable career and successful life!! -- Benny",
    "Happy Birthday! May your badminton duels with James be legendary! -- Tin Tin",
    "Happy birthday! Wishing you lots of promotions. Let's hang out soon! -- Darun",
    "Happy Birthday, Nan! Wish you eternal youth, money raining down, and lots of happiness. -- Mind",
    "Happy birthday jaa ❤️ my bacs fwend -- Mae"
];

let currentWishIndex = 0;
let spawnInterval = null;
let activeWishes = [];

// Initialize tsParticles
async function initializeParticles() {
    try {
        // Initialize confetti
        confettiEngine = await tsParticles.load("confetti-canvas", {
            particles: {
                number: { value: 0 },
                color: { value: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ffd700"] },
                shape: { type: ["circle", "square", "star"] },
                size: { value: { min: 1, max: 5 } },
                move: {
                    enable: true,
                    speed: { min: 1, max: 3 },
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push"
                    }
                }
            }
        });

        // Initialize fireworks
        fireworksEngine = await tsParticles.load("fireworks-canvas", {
            particles: {
                number: { value: 0 },
                color: { value: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"] },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
                move: {
                    enable: true,
                    speed: { min: 2, max: 5 },
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            }
        });
    } catch (error) {
        console.warn("Particles initialization failed:", error);
    }
}

// 🎊 Confetti Burst Function - LARGER!
function triggerConfettiBurst(x = 0.5, y = 0.5) {
    if (!confettiEngine) return;
    
    // Create multiple larger confetti particles
    for (let i = 0; i < 15; i++) {
        confettiEngine.particles.addParticle({
            x: x * window.innerWidth,
            y: y * window.innerHeight,
            vx: (Math.random() - 0.5) * 20, // Increased velocity
            vy: -Math.random() * 15 - 8, // Increased upward velocity
            size: Math.random() * 8 + 3 // Larger size range
        });
    }
}

// 🎆 Fireworks Display
function triggerFireworks() {
    if (!fireworksEngine) return;
    
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5;
    
    for (let i = 0; i < 50; i++) {
        fireworksEngine.particles.addParticle({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

// 🎈 Balloon function removed

// 🎵 Create Musical Notes
function createMusicalNote() {
    const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
    const note = document.createElement('div');
    note.className = 'musical-note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    note.style.top = Math.random() * (window.innerHeight - 50) + 'px';
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        if (note.parentNode) {
            note.parentNode.removeChild(note);
        }
    }, 3000);
}

// 🌟 Create Sparkles
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500);
}

// 🎊 Create Party Poppers
function createPartyPopper(x, y) {
    for (let i = 0; i < 10; i++) {
        const popper = document.createElement('div');
        popper.className = 'party-popper';
        popper.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
        popper.style.top = (y + (Math.random() - 0.5) * 100) + 'px';
        popper.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        
        document.body.appendChild(popper);
        
        setTimeout(() => {
            if (popper.parentNode) {
                popper.parentNode.removeChild(popper);
            }
        }, 1000);
    }
}

// 🎯 Create Click Effects
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 600);
}

// 🎪 Always-On Celebration Mode (Mobile Optimized)
function startCelebrationEffects() {
    const intervals = optimizeForMobile();
    
    // Balloons removed
    
    // Musical notes with mobile-optimized interval
    setInterval(() => {
        createMusicalNote();
    }, intervals.noteInterval);
    
    // Sparkles with mobile-optimized interval
    setInterval(() => {
        createSparkle();
    }, intervals.sparkleInterval);
    
    // Fireworks with mobile-optimized interval
    setInterval(() => {
        triggerFireworks();
    }, intervals.fireworkInterval);
}

// 🎨 Rainbow Text Effect
function addRainbowText() {
    const birthdayText = document.getElementById('birthdayText');
    if (birthdayText) {
        birthdayText.classList.add('rainbow-text');
    }
}

// 🎵 Sound wave function removed

// 🎊 Interactive Click Handler
function handleInteractiveClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    
    // Create click effect
    createClickEffect(x, y);
    
    // Trigger confetti burst
    triggerConfettiBurst(x / window.innerWidth, y / window.innerHeight);
    
    // Create party poppers
    createPartyPopper(x, y);
    
    // Add some randomness
    if (Math.random() < 0.3) {
        createMusicalNote();
    }
    // Balloons removed
}

// 🎂 Enhanced Birthday Text Click
function handleBirthdayTextClick() {
    // Massive confetti burst
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            triggerConfettiBurst(0.5, 0.5);
        }, i * 200);
    }
    
    // Fireworks show
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            triggerFireworks();
        }, i * 500);
    }
    
    // Party poppers
    createPartyPopper(window.innerWidth / 2, window.innerHeight / 2);
    
    // Add rainbow effect
    addRainbowText();
}

// 🎈 Enhanced Image Click
function handleImageClick(event) {
    event.stopPropagation();
    
    const x = event.clientX;
    const y = event.clientY;
    
    // Start audio on first image click
    if (birthdayAudio && birthdayAudio.paused) {
        birthdayAudio.play().catch(error => {
            console.log('Audio play failed on image click:', error);
        });
        console.log('Audio started on image click');
    }
    
    // Create effects around the image
    createClickEffect(x, y);
    triggerConfettiBurst(x / window.innerWidth, y / window.innerHeight);
    createPartyPopper(x, y);
    
    // Animation disabled - no bounce effect on click
}

// 📱 Mobile Performance Optimizations
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768);
}

function optimizeForMobile() {
    if (isMobileDevice()) {
        // Reduce particle count on mobile
        CONFIG.minSize = 50;
        CONFIG.maxSize = 200;
        
        // Reduce animation frequency
        if (window.innerWidth <= 480) {
            // Very small screens - minimal effects
            return {
                noteInterval: 4000,
                sparkleInterval: 2000,
                fireworkInterval: 8000
            };
        } else {
            // Regular mobile - reduced effects
            return {
                noteInterval: 3000,
                sparkleInterval: 1500,
                fireworkInterval: 6000
            };
        }
    }
    return {
        noteInterval: 2000,
        sparkleInterval: 1000,
        fireworkInterval: 5000
    };
}

// 🎵 Audio Functions
function initializeAudio() {
    birthdayAudio = document.getElementById('birthdayAudio');
    if (birthdayAudio) {
        birthdayAudio.volume = 0.3; // Set volume to 30%
        birthdayAudio.loop = false;
        
        // Load audio in background on mobile to avoid blocking
        if (isMobileDevice()) {
            birthdayAudio.load();
        }
        
        // Don't start audio automatically - wait for image click
        console.log('Audio initialized but not started - waiting for image click');
    }
}

// Audio will only start when a floating image is clicked

// Function to handle tab focus/blur for mobile audio management
function handleTabFocus() {
    console.log('Tab focused - wasPlayingBeforeBlur:', wasPlayingBeforeBlur, 'isMuted:', isMuted);
    if (birthdayAudio && !isMuted && wasPlayingBeforeBlur) {
        birthdayAudio.play().catch(error => {
            console.log('Audio play failed on focus:', error);
        });
    }
    // Reset the flag after attempting to resume
    wasPlayingBeforeBlur = false;
}

function handleTabBlur() {
    console.log('Tab blurred - audio paused:', birthdayAudio ? birthdayAudio.paused : 'no audio');
    if (birthdayAudio && !birthdayAudio.paused) {
        wasPlayingBeforeBlur = true;
        birthdayAudio.pause();
        console.log('Audio paused due to tab blur');
    } else {
        wasPlayingBeforeBlur = false;
    }
}

function toggleMute() {
    if (!birthdayAudio) return;
    
    isMuted = !isMuted;
    const muteButton = document.getElementById('muteToggle');
    const muteIcon = document.getElementById('muteIcon');
    
    if (isMuted) {
        birthdayAudio.pause();
        muteButton.classList.add('muted');
        muteIcon.textContent = '🔇';
    } else {
        birthdayAudio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
        muteButton.classList.remove('muted');
        muteIcon.textContent = '🔊';
    }
}

// 🎂 Birthday Wishes Functions
function startBirthdayWishes() {
    // Spawn fewer wishes initially
    for (let i = 0; i < 1; i++) {
        setTimeout(() => spawnWish(), i * 1000); // Stagger initial spawns
    }
    // Start spawning wishes less frequently (every 3-8 seconds)
    spawnWish();
    spawnInterval = setInterval(spawnWish, getRandomSpawnDelay(2000, 6000));
}

function getRandomSpawnDelay(minDelay = 2000, maxDelay = 6000) {
    // Random delay between minDelay and maxDelay (in milliseconds)
    return Math.random() * (maxDelay - minDelay) + minDelay;
}

function spawnWish() {
    const container = document.getElementById('birthdayWishes');
    if (!container) return;
    
    // Create new wish element
    const wishElement = document.createElement('div');
    wishElement.className = 'wish-text';
    
    // Get wish sequentially from the list
    const wish = birthdayWishes[currentWishIndex];
    wishElement.textContent = wish;
    
    // Move to next wish, wrapping around when reaching the end
    currentWishIndex = (currentWishIndex + 1) % birthdayWishes.length;
    
    // Mobile-friendly Y position calculation with overlap prevention
    const isMobile = window.innerWidth <= 768;
    const minY = isMobile ? 10 : 20; // Smaller margin on mobile
    const maxY = isMobile ? window.innerHeight * 0.85 : window.innerHeight * 0.9; // Less coverage on mobile
    const minSpacing = isMobile ? 60 : 80; // Minimum vertical spacing between wishes (px)
    
    let randomY;
    
    // If there are no active wishes, use a random position
    if (activeWishes.length === 0) {
        randomY = Math.random() * (maxY - minY) + minY;
    } else {
        // Get Y positions of all currently active wishes
        const activeYPositions = activeWishes.map(wish => {
            const rect = wish.getBoundingClientRect();
            return {
                top: rect.top,
                bottom: rect.bottom,
                center: rect.top + rect.height / 2
            };
        });
        
        // Try to find a non-overlapping Y position
        let attempts = 0;
        const maxAttempts = 50; // Maximum attempts to find a non-overlapping position
        
        do {
            randomY = Math.random() * (maxY - minY) + minY;
            attempts++;
            
            // Check if this position overlaps with any active wish
            const overlaps = activeYPositions.some(pos => {
                const wishCenter = pos.center;
                const distance = Math.abs(randomY - wishCenter);
                return distance < minSpacing;
            });
            
            if (!overlaps) {
                break; // Found a good position
            }
            
            // If we've tried many times, find the best available position
            if (attempts >= maxAttempts) {
                // Find the position with maximum distance from all active wishes
                let bestY = minY;
                let maxMinDistance = 0;
                
                // Test several candidate positions
                for (let testY = minY; testY <= maxY; testY += 20) {
                    const minDistance = Math.min(...activeYPositions.map(pos => 
                        Math.abs(testY - pos.center)
                    ));
                    
                    if (minDistance > maxMinDistance) {
                        maxMinDistance = minDistance;
                        bestY = testY;
                    }
                }
                
                randomY = bestY;
                break;
            }
        } while (attempts < maxAttempts);
    }
    
    wishElement.style.top = randomY + 'px';
    
    // Debug: log the Y position to see if it's working (remove in production)
    // console.log('Wish Y position:', randomY, 'Max Y:', maxY, 'Screen height:', window.innerHeight, 'Mobile:', isMobile);
    
    // Random scroll speed (10-25 seconds)
    const randomSpeed = Math.random() * 15 + 10;
    wishElement.style.animation = `scrollRightToLeft ${randomSpeed}s linear forwards`;
    
    // Add stable styling to prevent resizing
    wishElement.style.fontSize = '1.6rem';
    wishElement.style.fontWeight = 'bold';
    wishElement.style.whiteSpace = 'nowrap';
    wishElement.style.willChange = 'transform';
    
    // Add to container
    container.appendChild(wishElement);
    activeWishes.push(wishElement);
    
    // Remove element after animation completes
    setTimeout(() => {
        if (wishElement.parentNode) {
            wishElement.parentNode.removeChild(wishElement);
        }
        // Remove from active wishes array
        const index = activeWishes.indexOf(wishElement);
        if (index > -1) {
            activeWishes.splice(index, 1);
        }
    }, randomSpeed * 1000);
    
    // Schedule next spawn
    if (spawnInterval) {
        clearInterval(spawnInterval);
        spawnInterval = setInterval(spawnWish, getRandomSpawnDelay(2000, 6000));
    }
}

function stopBirthdayWishes() {
    if (spawnInterval) {
        clearInterval(spawnInterval);
        spawnInterval = null;
    }
    
    // Remove all active wishes
    activeWishes.forEach(wish => {
        if (wish.parentNode) {
            wish.parentNode.removeChild(wish);
        }
    });
    activeWishes = [];
}

// Initialize all image controllers when page loads
window.addEventListener('load', async () => {
    // Update birthday text first (fastest)
    updateBirthdayText();
    
    // Start countdown timer (fast)
    startCountdown();
    
    // Check if it's Nan's birthday and show appropriate content (fast)
    showBirthdayContent();
    
    // Initialize audio (lightweight)
    initializeAudio();
    
    // Start celebration effects immediately (always on!)
    startCelebrationEffects();
    
    // Load heavy assets after initial render
    setTimeout(async () => {
        // Load images in background
        await fetchImageFiles();
        initializeImageControllers();
        
        // Initialize particles (heavy)
        await initializeParticles();
    }, 1000); // Delay heavy loading by 1 second
    
    // Add interactive click handlers
    document.addEventListener('click', handleInteractiveClick);
    
    // Birthday text click handler removed
    
    // Add image click handlers
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('floating-image')) {
            handleImageClick(event);
        }
    });
    
    // Add mute toggle event listener
    const muteButton = document.getElementById('muteToggle');
    if (muteButton) {
        muteButton.addEventListener('click', toggleMute);
    }
    
    // Audio will only start when a floating image is clicked
    
    // Add tab focus/blur listeners for mobile audio management
    window.addEventListener('focus', handleTabFocus);
    window.addEventListener('blur', handleTabBlur);
    
    // Also handle page visibility changes for better mobile support
    document.addEventListener('visibilitychange', () => {
        console.log('Visibility changed - hidden:', document.hidden);
        if (document.hidden) {
            handleTabBlur();
        } else {
            handleTabFocus();
        }
    });
    
    // Sound waves removed
    
    // Start some ambient effects immediately
    setTimeout(() => {
        // Balloons removed
        createMusicalNote();
        createSparkle();
    }, 1000);
    
    // Start birthday wishes
    startBirthdayWishes();
    
    // Start performance monitoring
    monitorPerformance();
});

// Optional: Pause/resume functionality (uncomment if needed)
/*
let isPaused = false;

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        isPaused = !isPaused;
        
        if (isPaused) {
            clearInterval(imageInterval);
        } else {
            imageInterval = setInterval(showRandomImage, 1000);
        }
    }
});
*/
