// Configuration
const CONFIG = {
    minDisplayDuration: 2000, // Minimum display duration (in milliseconds) - 1 second
    maxDisplayDuration: 5000, // Maximum display duration (in milliseconds)
    minHideDuration: 500, // Minimum time hidden (in milliseconds)
    maxHideDuration: 2000, // Maximum time hidden (in milliseconds)
    minSize: 100, // Minimum image size (px) - much smaller
    maxSize: 400, // Maximum image size (px) - much larger
    maxRotation: 360 // Maximum rotation in degrees - full rotation
};

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
            <div id="countdownText" style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-family: Arial, sans-serif;
                font-size: 1.2rem;
                font-weight: normal;
                z-index: 10001;
                text-align: center;
            ">Loading countdown...</div>
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                text-align: center;
            ">
                <h1 style="
                    color: white;
                    font-family: Arial, sans-serif;
                    font-size: 2rem;
                    margin: 0;
                    font-weight: normal;
                    animation: none;
                ">Today is not Nan's birthday</h1>
            </div>
            <button id="celebrateAnyway" style="
                position: fixed;
                bottom: 20px;
                left: 20px;
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

// Function to get random value between min and max
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get random float between min and max
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
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
        
        // Generate random position avoiding center text area and other images
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const textAreaSize = 300; // Size of area to avoid around center text
        const minDistanceFromOthers = 150; // Minimum distance from other images
        
        let randomX, randomY;
        let attempts = 0;
        const maxAttempts = 20; // Increased attempts for better distribution
        
        do {
            // Generate position with more variation and better distribution
            // Increased border margin to avoid edge placement
            const borderMargin = 200; // Increased from 100 to 200
            const maxX = window.innerWidth - borderMargin;
            const maxY = window.innerHeight - borderMargin;
            
            // Use different distribution strategies to avoid clustering
            if (attempts % 3 === 0) {
                // Strategy 1: Pure random
                randomX = Math.random() * Math.max(0, maxX);
                randomY = Math.random() * Math.max(0, maxY);
            } else if (attempts % 3 === 1) {
                // Strategy 2: Edge-biased (favor edges but not borders)
                const edgeBias = 0.3; // 30% chance to be near edges
                if (Math.random() < edgeBias) {
                    // Position near edges but with margin from borders
                    const edgeMargin = 100; // Distance from actual edge
                    randomX = Math.random() < 0.5 ? 
                        edgeMargin + Math.random() * 200 : // Near left edge but not at border
                        maxX - edgeMargin - Math.random() * 200; // Near right edge but not at border
                    randomY = Math.random() < 0.5 ? 
                        edgeMargin + Math.random() * 200 : // Near top edge but not at border
                        maxY - edgeMargin - Math.random() * 200; // Near bottom edge but not at border
                } else {
                    randomX = Math.random() * Math.max(0, maxX);
                    randomY = Math.random() * Math.max(0, maxY);
                }
            } else {
                // Strategy 3: Corner-biased (but avoid borders)
                const cornerBias = 0.4; // 40% chance to be in corners
                if (Math.random() < cornerBias) {
                    const corner = Math.floor(Math.random() * 4);
                    const cornerMargin = 150; // Distance from actual corners
                    switch (corner) {
                        case 0: // Top-left
                            randomX = cornerMargin + Math.random() * (maxX * 0.3 - cornerMargin);
                            randomY = cornerMargin + Math.random() * (maxY * 0.3 - cornerMargin);
                            break;
                        case 1: // Top-right
                            randomX = maxX * 0.7 + Math.random() * (maxX * 0.3 - cornerMargin);
                            randomY = cornerMargin + Math.random() * (maxY * 0.3 - cornerMargin);
                            break;
                        case 2: // Bottom-left
                            randomX = cornerMargin + Math.random() * (maxX * 0.3 - cornerMargin);
                            randomY = maxY * 0.7 + Math.random() * (maxY * 0.3 - cornerMargin);
                            break;
                        case 3: // Bottom-right
                            randomX = maxX * 0.7 + Math.random() * (maxX * 0.3 - cornerMargin);
                            randomY = maxY * 0.7 + Math.random() * (maxY * 0.3 - cornerMargin);
                            break;
                    }
                } else {
                    randomX = Math.random() * Math.max(0, maxX);
                    randomY = Math.random() * Math.max(0, maxY);
                }
            }
            
            // Check if position is too close to center text
            const distanceFromCenter = Math.sqrt(
                Math.pow(randomX - centerX, 2) + Math.pow(randomY - centerY, 2)
            );
            
            // Check distance from other visible images
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
            
            // If far enough from center and other images, or max attempts reached, use this position
            if ((distanceFromCenter > textAreaSize && !tooCloseToOthers) || attempts >= maxAttempts) {
                break;
            }
            
            attempts++;
        } while (attempts < maxAttempts);
        
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
        '000000857889_25744415_b360_40ba_8e98_e4fa5f11b2d3.jpeg',
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
    // Update positions for all visible images
    imageControllers.forEach(controller => {
        if (controller.isVisible && controller.img) {
            // Generate new random position
            const maxX = window.innerWidth - 200;
            const maxY = window.innerHeight - 200;
            
            const randomX = Math.random() * Math.max(0, maxX);
            const randomY = Math.random() * Math.max(0, maxY);
            
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

// Initialize all image controllers when page loads
window.addEventListener('load', async () => {
    // Always load everything in the background
    await fetchImageFiles();
    initializeImageControllers();
    
    // Update birthday text first
    updateBirthdayText();
    
    // Start countdown timer
    startCountdown();
    
    // Then check if it's Nan's birthday and show appropriate content
    showBirthdayContent();
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
