// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize particles
    createParticles();
    
    // Add parallax effect on mouse move
    addParallaxEffect();
    
    // Add button click handler
    setupButtonHandler();
    
    // Setup fullscreen toggle
    setupFullscreenToggle();
    
    // Setup video handlers
    setupVideoHandlers();
    
    // Setup journey button
    setupJourneyButton();
    
    // Add eerie sound effects (optional)
    setupAudio();
    
    // Create floating spooky elements
    createFloatingElements();
    
    // Add screen shake on certain intervals
    addScreenShake();
});

// Create floating particles (ash/spores effect)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random starting position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay and duration
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    
    container.appendChild(particle);
    
    // Recreate particle when animation ends
    particle.addEventListener('animationiteration', () => {
        particle.style.left = `${Math.random() * 100}%`;
    });
}

// Parallax effect on mouse movement
function addParallaxEffect() {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        // Apply parallax to background
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            parallaxBg.style.transform = `translate(${currentX * 30}px, ${currentY * 30}px) scale(1.1)`;
        }
        
        // Apply to fog layer
        const parallaxFog = document.querySelector('.parallax-fog');
        if (parallaxFog) {
            parallaxFog.style.transform = `translate(${currentX * 15}px, ${currentY * 15}px)`;
        }
        
        // Apply to shadows
        const shadows = document.querySelectorAll('.demogorgon-shadow');
        shadows.forEach((shadow, index) => {
            const multiplier = (index + 1) * 10;
            shadow.style.transform += ` translate(${currentX * multiplier}px, ${currentY * multiplier}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Setup button handler
function setupButtonHandler() {
    const beginBtn = document.getElementById('beginBtn');
    
    beginBtn.addEventListener('click', function() {
        // Add click effect
        this.style.transform = 'scale(0.95)';
        
        // Create screen flash effect
        createFlashEffect();
        
        // Play sound effect if available
        playClickSound();
        
        // Transition to video section after animation
        setTimeout(() => {
            showVideoSection();
        }, 500);
    });
    
    // Hover sound effect
    beginBtn.addEventListener('mouseenter', function() {
        playHoverSound();
    });
}

// Show video section
function showVideoSection() {
    const landingContainer = document.querySelector('.landing-container');
    const videoSection = document.getElementById('videoSection');
    const introVideo = document.getElementById('introVideo');
    
    // Hide landing page
    landingContainer.style.display = 'none';
    
    // Show video section
    videoSection.classList.add('active');
    
    // Play video
    introVideo.play().catch(e => console.log('Video autoplay prevented:', e));
}

// Setup fullscreen toggle
function setupFullscreenToggle() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
    
    // Update button appearance on fullscreen change
    document.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement) {
            fullscreenBtn.style.background = 'rgba(255, 0, 0, 0.9)';
        } else {
            fullscreenBtn.style.background = 'rgba(139, 0, 0, 0.8)';
        }
    });
}

// Setup video handlers
function setupVideoHandlers() {
    const introVideo = document.getElementById('introVideo');
    const skipVideoBtn = document.getElementById('skipVideoBtn');
    
    // When video ends, show post-video screen
    introVideo.addEventListener('ended', function() {
        showPostVideoSection();
    });
    
    // Skip button
    skipVideoBtn.addEventListener('click', function() {
        showPostVideoSection();
    });
}

// Show post-video section
function showPostVideoSection() {
    const videoSection = document.getElementById('videoSection');
    const postVideoSection = document.getElementById('postVideoSection');
    const introVideo = document.getElementById('introVideo');
    
    // Pause and hide video
    introVideo.pause();
    videoSection.classList.remove('active');
    
    // Create fade transition
    setTimeout(() => {
        videoSection.style.display = 'none';
        postVideoSection.classList.add('active');
        
        // Create particles for post-video screen
        createPostVideoParticles();
    }, 500);
}

// Create particles for post-video screen
function createPostVideoParticles() {
    const container = document.getElementById('postVideoParticles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
}

// Setup journey button
function setupJourneyButton() {
    const journeyBtn = document.getElementById('journeyBtn');
    
    journeyBtn.addEventListener('click', function() {
        // Add click effect
        this.style.transform = 'scale(0.95)';
        
        // Create screen flash effect
        createFlashEffect();
        
        // Play sound effect if available
        playClickSound();
        
        // Transition to story section after animation
        setTimeout(() => {
            showStorySection();
        }, 500);
    });
    
    // Hover sound effect
    journeyBtn.addEventListener('mouseenter', function() {
        playHoverSound();
    });
}

// Show story section
let currentSlide = 1;
const totalSlides = 5;

function showStorySection() {
    const postVideoSection = document.getElementById('postVideoSection');
    const storySection = document.getElementById('storySection');
    
    // Hide post-video section
    postVideoSection.classList.remove('active');
    
    // Show story section
    setTimeout(() => {
        postVideoSection.style.display = 'none';
        storySection.classList.add('active');
        
        // Create spores for story section
        createStorySpores();
        
        // Setup story navigation
        setupStoryNavigation();
        
        // Play walkie-talkie sound (optional)
        playWalkieTalkieSound();
    }, 500);
}

// Create spores for story section
function createStorySpores() {
    const container = document.getElementById('storySpores');
    const sporeCount = 30;
    
    for (let i = 0; i < sporeCount; i++) {
        const spore = document.createElement('div');
        spore.style.position = 'absolute';
        spore.style.width = `${Math.random() * 6 + 3}px`;
        spore.style.height = spore.style.width;
        spore.style.borderRadius = '50%';
        spore.style.background = 'rgba(255, 255, 255, 0.4)';
        spore.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.6)';
        spore.style.left = `${Math.random() * 100}%`;
        spore.style.top = `${Math.random() * 100}%`;
        spore.style.animation = `float ${Math.random() * 15 + 15}s infinite ease-in-out`;
        spore.style.animationDelay = `${Math.random() * 5}s`;
        spore.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(spore);
    }
}

// Setup story navigation
function setupStoryNavigation() {
    const storySection = document.getElementById('storySection');
    const proceedBtn = document.getElementById('proceedBtn');
    const skipBtn = document.getElementById('skipStoryBtn');
    const navIndicator = document.getElementById('storyNavIndicator');
    
    // Click anywhere or press space to advance
    storySection.addEventListener('click', advanceStory);
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && storySection.classList.contains('active')) {
            e.preventDefault();
            advanceStory();
        }
    });
    
    // Dot navigation
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            goToSlide(index + 1);
        });
    });
    
    // Proceed button
    proceedBtn.addEventListener('click', function() {
        createFlashEffect();
        playClickSound();
        setTimeout(() => {
            console.log('Proceeding to Level 1...');
            showLevel1();
        }, 500);
    });
    
    // Skip story button
    skipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        skipToEnd();
    });
}

// Advance to next story slide
function advanceStory() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        goToSlide(currentSlide);
        playWalkieTalkieSound();
    } else {
        // Story complete - show proceed button
        showProceedButton();
    }
}

// Go to specific slide
function goToSlide(slideNumber) {
    const slides = document.querySelectorAll('.story-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active from all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active to current
    const currentSlideEl = document.querySelector(`[data-slide="${slideNumber}"]`);
    const currentDot = document.querySelector(`[data-dot="${slideNumber}"]`);
    
    if (currentSlideEl) currentSlideEl.classList.add('active');
    if (currentDot) currentDot.classList.add('active');
    
    currentSlide = slideNumber;
    
    // If last slide, prepare to show proceed button
    if (currentSlide === totalSlides) {
        setTimeout(showProceedButton, 6000); // Show after 6 seconds on last slide
    }
}

// Show proceed button
function showProceedButton() {
    const proceedBtn = document.getElementById('proceedBtn');
    const skipBtn = document.getElementById('skipStoryBtn');
    const navIndicator = document.getElementById('storyNavIndicator');
    
    navIndicator.style.display = 'none';
    skipBtn.classList.add('hidden');
    proceedBtn.style.display = 'block';
    
    // Animate button appearance
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of story
function skipToEnd() {
    createFlashEffect();
    goToSlide(totalSlides);
    setTimeout(showProceedButton, 1000);
}

// Play walkie-talkie sound effect
function playWalkieTalkieSound() {
    // Optional: Add walkie-talkie sound effect
    const audio = new Audio('assets/walkie-talkie.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Sound play prevented'));
}

// ========================================
// LEVEL 1 FUNCTIONS
// ========================================

// Show Level 1
function showLevel1() {
    const storySection = document.getElementById('storySection');
    const level1Section = document.getElementById('level1Section');
    
    // Hide story section
    storySection.classList.remove('active');
    
    setTimeout(() => {
        storySection.style.display = 'none';
        level1Section.classList.add('active');
        
        // Create spores for level 1
        createLevel1Spores();
        
        // Setup level 1 story navigation
        setupLevel1StoryNavigation();
        
        // Setup level 1 puzzle
        setupLevel1Puzzle();
        
        playWalkieTalkieSound();
    }, 500);
}

// Create spores for Level 1
function createLevel1Spores() {
    const container = document.getElementById('level1Spores');
    const sporeCount = 30;
    
    for (let i = 0; i < sporeCount; i++) {
        const spore = document.createElement('div');
        spore.style.position = 'absolute';
        spore.style.width = `${Math.random() * 6 + 3}px`;
        spore.style.height = spore.style.width;
        spore.style.borderRadius = '50%';
        spore.style.background = 'rgba(255, 255, 255, 0.4)';
        spore.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.6)';
        spore.style.left = `${Math.random() * 100}%`;
        spore.style.top = `${Math.random() * 100}%`;
        spore.style.animation = `float ${Math.random() * 15 + 15}s infinite ease-in-out`;
        spore.style.animationDelay = `${Math.random() * 5}s`;
        spore.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(spore);
    }
}

// Setup Level 1 Story Navigation
let level1CurrentSlide = 1;
const level1TotalSlides = 5;

function setupLevel1StoryNavigation() {
    const level1Section = document.getElementById('level1Section');
    const proceedBtn = document.getElementById('proceedToLevel1PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel1StoryBtn');
    const navIndicator = document.getElementById('level1NavIndicator');
    
    // Show first slide immediately
    const slides = document.querySelectorAll('#level1StorySlides .story-slide');
    const dots = document.querySelectorAll('#level1NavIndicator .dot');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');
    }
    
    // Click anywhere or press space to advance
    level1Section.addEventListener('click', advanceLevel1Story);
    
    // Spacebar to advance
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && level1Section.classList.contains('active')) {
            e.preventDefault();
            advanceLevel1Story();
        }
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            goToLevel1Slide(index + 1);
        });
    });
    
    // Proceed button - show puzzle
    proceedBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showLevel1Puzzle();
    });
    
    // Skip story button
    skipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        skipToLevel1End();
    });
}

// Advance Level 1 story
function advanceLevel1Story() {
    if (level1CurrentSlide < level1TotalSlides) {
        level1CurrentSlide++;
        goToLevel1Slide(level1CurrentSlide);
        playWalkieTalkieSound();
    } else {
        showLevel1ProceedButton();
    }
}

// Go to specific Level 1 slide
function goToLevel1Slide(slideNumber) {
    const slides = document.querySelectorAll('#level1StorySlides .story-slide');
    const dots = document.querySelectorAll('#level1NavIndicator .dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    const currentSlideEl = slides[slideNumber - 1];
    const currentDot = dots[slideNumber - 1];
    
    if (currentSlideEl) currentSlideEl.classList.add('active');
    if (currentDot) currentDot.classList.add('active');
    
    level1CurrentSlide = slideNumber;
    
    if (level1CurrentSlide === level1TotalSlides) {
        setTimeout(showLevel1ProceedButton, 6000);
    }
}

// Show proceed button for Level 1
function showLevel1ProceedButton() {
    const proceedBtn = document.getElementById('proceedToLevel1PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel1StoryBtn');
    const navIndicator = document.getElementById('level1NavIndicator');
    
    navIndicator.style.display = 'none';
    skipBtn.classList.add('hidden');
    proceedBtn.style.display = 'block';
    
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of Level 1 story
function skipToLevel1End() {
    createFlashEffect();
    goToLevel1Slide(level1TotalSlides);
    setTimeout(showLevel1ProceedButton, 1000);
}

// Show Level 1 Puzzle
function showLevel1Puzzle() {
    const storySlides = document.getElementById('level1StorySlides');
    const puzzle = document.getElementById('level1Puzzle');
    const proceedBtn = document.getElementById('proceedToLevel1PuzzleBtn');
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    
    createFlashEffect();
    
    setTimeout(() => {
        storySlides.style.display = 'none';
        proceedBtn.style.display = 'none';
        puzzle.style.display = 'block';
        nextLevelBtn.style.display = 'block';
        
        // Start the flicker animation
        startBulbFlicker();
    }, 500);
}

// Setup Level 1 Puzzle
function setupLevel1Puzzle() {
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    
    nextLevelBtn.addEventListener('click', function() {
        openTerminalModal();
    });
}

// Bulb flicker animation for AWAKE - sequential A K E A W
const answerSequence = ['A', 'W', 'A', 'K', 'E'];
const flickerSequence = ['A', 'K', 'E', 'A', 'W']; // Sequential order
let flickerInterval;
let currentFlickerIndex = 0;

function startBulbFlicker() {
    // Flicker AWAKE letters in sequence: A K E A W
    function flickerNextLetter() {
        // Get the next letter in sequence
        const letter = flickerSequence[currentFlickerIndex];
        
        // Get all bulbs for this letter (since A appears twice)
        const letterBulbs = document.querySelectorAll(`[data-letter="${letter}"] .bulb`);
        
        letterBulbs.forEach(bulb => {
            bulb.classList.add('flicker');
            setTimeout(() => {
                bulb.classList.remove('flicker');
            }, 800);
        });
        
        // Move to next letter in sequence
        currentFlickerIndex = (currentFlickerIndex + 1) % flickerSequence.length;
    }
    
    // Start with immediate flicker
    flickerNextLetter();
    
    // Continue flickering in sequence (faster timing)
    flickerInterval = setInterval(() => {
        flickerNextLetter();
    }, 300);
}

// Terminal Modal Functions
function openTerminalModal() {
    const modal = document.getElementById('terminalModal');
    const input = document.getElementById('passwordInput');
    const errorDiv = document.getElementById('terminalError');
    const successDiv = document.getElementById('terminalSuccess');
    
    // Force show the modal
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.classList.add('active');
    
    input.value = '';
    input.focus();
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Setup terminal controls
    setupTerminalControls();
}

function closeTerminalModal() {
    const modal = document.getElementById('terminalModal');
    modal.classList.remove('active');
    
    // Force hide the modal
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
    }, 300);
}

function setupTerminalControls() {
    const closeBtn = document.getElementById('terminalCloseBtn');
    const submitBtn = document.getElementById('terminalSubmitBtn');
    const input = document.getElementById('passwordInput');
    
    // Close button
    closeBtn.onclick = closeTerminalModal;
    
    // Submit button
    submitBtn.onclick = checkPassword;
    
    // Enter key to submit
    input.onkeypress = function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    };
    
    // Click outside to close
    const modal = document.getElementById('terminalModal');
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeTerminalModal();
        }
    };
}

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const password = input.value.trim().toUpperCase();
    const errorDiv = document.getElementById('terminalError');
    const successDiv = document.getElementById('terminalSuccess');
    const currentLevel = document.querySelector('.level-section.active') ? 
                         document.querySelector('.level-section.active').id : 'level1Section';
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Level 1 password check
    if (currentLevel === 'level1Section' && password === 'AWAKE') {
        // Correct password
        successDiv.style.display = 'block';
        playClickSound();
        
        setTimeout(() => {
            closeTerminalModal();
            createFlashEffect();
            
            // Navigate to Level 2
            setTimeout(() => {
                showLevel2();
            }, 500);
        }, 2000);
    }
    // Level 2 password check
    else if (currentLevel === 'level2Section' && password === 'NEVERENDINGSTORY') {
        // Correct password
        successDiv.style.display = 'block';
        playClickSound();
        
        setTimeout(() => {
            closeTerminalModal();
            createFlashEffect();
            
            // Navigate to Level 3
            setTimeout(() => {
                showLevel3();
            }, 500);
        }, 2000);
    }
    // Level 3 password check
    else if (currentLevel === 'level3Section' && password === '011') {
        // Correct password
        successDiv.style.display = 'block';
        playClickSound();
        
        setTimeout(() => {
            closeTerminalModal();
            createFlashEffect();
            
            // Navigate to Level 4
            setTimeout(() => {
                showLevel4();
            }, 500);
        }, 2000);
    }
    // Level 4 password check
    else if (currentLevel === 'level4Section' && password === 'E') {
        // Correct password
        successDiv.style.display = 'block';
        playClickSound();
        
        setTimeout(() => {
            closeTerminalModal();
            createFlashEffect();
            
            // Navigate to Level 5
            setTimeout(() => {
                showLevel5();
            }, 500);
        }, 2000);
    }
    // Level 5 password check
    else if (currentLevel === 'level5Section' && password === 'STABILIZE') {
        // Correct password
        successDiv.style.display = 'block';
        playClickSound();
        
        setTimeout(() => {
            closeTerminalModal();
            createFlashEffect();
            
            // Navigate to Level 6
            setTimeout(() => {
                showLevel6();
            }, 500);
        }, 2000);
    }
    // Level 6 password check
    else if (currentLevel === 'level6Section' && (password === 'NOUTURN' || password === 'NO U TURN')) {
        // Correct password
        successDiv.style.display = 'block';
        playClickSound();
        
        setTimeout(() => {
            closeTerminalModal();
            createFlashEffect();
            
            // Navigate to Level 7
            setTimeout(() => {
                showLevel7();
            }, 500);
        }, 2000);
    }
    // Level 7 password check
    else if (currentLevel === 'level7Section' && password === 'CRITICALSITUATION') {
        // Correct password
        successDiv.style.display = 'block';
        playClickSound();
        
        setTimeout(() => {
            closeTerminalModal();
            createFlashEffect();
            
            // Navigate to Level 8
            setTimeout(() => {
                showLevel8();
            }, 500);
        }, 2000);
    }
    else {
        // Wrong password
        errorDiv.style.display = 'block';
        input.value = '';
        input.focus();
        
        // Level 2 specific hint
        if (currentLevel === 'level2Section') {
            errorDiv.innerHTML = '<span class="error-text">❌ INVALID FREQUENCY<br>💡 Hint: Reverse the song to find the Core Rhythm<br>🔗 Tool: <a href="https://audioalter.com/" target="_blank" style="color: #00ff00;">audioalter.com</a></span>';
        }
        // Level 3 specific hint
        else if (currentLevel === 'level3Section') {
            errorDiv.innerHTML = '<span class="error-text">❌ INVALID BYPASS CODE<br>💡 Hint: Watch the CCTV footage carefully... The code appears in the glitch</span>';
        }
        // Level 4 specific hint
        else if (currentLevel === 'level4Section') {
            errorDiv.innerHTML = '<span class="error-text">❌ INVALID SPECTRAL KEY<br>💡 Hint: Convert the audio to spectrogram image... What Sentence do you see?</span>';
        }
        // Level 5 specific hint
        else if (currentLevel === 'level5Section') {
            errorDiv.innerHTML = '<span class="error-text">❌ INVALID STABILIZING CODE<br>💡 Hint: Check the internal data of the Image... The truth is in the raw data</span>';
        }
        // Level 6 specific hint
        else if (currentLevel === 'level6Section') {
            errorDiv.innerHTML = '<span class="error-text">❌ INVALID VOID COMMAND<br>💡 Hint: Decode the image, explore the bytes. The Shadow Entity has left co-ordinates</span>';
        }
        // Level 7 specific hint
        else if (currentLevel === 'level7Section') {
            errorDiv.innerHTML = '<span class="error-text">❌ INVALID HANDSHAKE CODE<br>💡 Hint: Two signals. Light flickers (count them). Radio speaks in rhythm. Combine the two words.</span>';
        }
        
        // Shake animation
        const terminalContainer = document.querySelector('.terminal-container');
        terminalContainer.style.animation = 'shake 0.5s';
        setTimeout(() => {
            terminalContainer.style.animation = '';
        }, 500);
    }
}

// Create flash effect
function createFlashEffect() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = '#fff';
    flash.style.zIndex = '9999';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.3s';
    flash.style.pointerEvents = 'none';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0.8';
    }, 10);
    
    setTimeout(() => {
        flash.style.opacity = '0';
    }, 200);
    
    setTimeout(() => {
        document.body.removeChild(flash);
    }, 500);
}

// Audio setup (optional)
function setupAudio() {
    // You can add ambient sounds here
    const ambientSound = document.getElementById('ambientSound');
    ambientSound.volume = 0.5;
    ambientSound.play().catch(e => console.log('Audio autoplay prevented'));
}

function playClickSound() {
    // Play a click/zap sound effect
    const audio = new Audio('assets/retro-blip.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Sound play prevented'));
}

function playHoverSound() {
    // Play a subtle hover sound
    const audio = new Audio('assets/retro-blip.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Sound play prevented'));
}

// Create additional floating elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create random floating orbs
    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.style.position = 'absolute';
        orb.style.width = `${Math.random() * 30 + 20}px`;
        orb.style.height = orb.style.width;
        orb.style.borderRadius = '50%';
        orb.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 100, 100, 0.4), transparent)';
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.filter = 'blur(15px)';
        orb.style.animation = `float ${Math.random() * 20 + 15}s infinite ease-in-out`;
        orb.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(orb);
    }
}

// Add occasional screen shake for intensity
function addScreenShake() {
    setInterval(() => {
        // Random chance of shake
        if (Math.random() > 0.7) {
            const body = document.body;
            body.style.animation = 'shake 0.5s';
            
            setTimeout(() => {
                body.style.animation = '';
            }, 500);
        }
    }, 10000); // Check every 10 seconds
}

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(0, 0); }
        10%, 30%, 50%, 70%, 90% { transform: translate(-2px, 2px); }
        20%, 40%, 60%, 80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(style);

// Add typewriter effect enhancement
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Easter egg: Upside down effect
    document.body.style.transition = 'transform 2s';
    document.body.style.transform = 'rotate(180deg)';
    
    setTimeout(() => {
        document.body.style.transform = 'rotate(0deg)';
    }, 3000);
    
    console.log('Welcome to the Upside Down...');
}

// ========================================
// LEVEL 2: THE FREQUENCY OF THE VOID
// ========================================

function showLevel2() {
    const level1Section = document.getElementById('level1Section');
    const level2Section = document.getElementById('level2Section');
    
    // Stop Level 1 flicker
    if (flickerInterval) {
        clearInterval(flickerInterval);
    }
    
    // Hide Level 1
    level1Section.classList.remove('active');
    
    setTimeout(() => {
        level1Section.style.display = 'none';
        level2Section.style.display = 'block';
        
        setTimeout(() => {
            level2Section.classList.add('active');
            
            // Create spores for level 2
            createLevel2Spores();
            
            // Setup level 2 story navigation
            setupLevel2StoryNavigation();
            
            // Setup level 2 puzzle
            setupLevel2Puzzle();
            
            playWalkieTalkieSound();
        }, 100);
    }, 500);
}

// Create spores for Level 2
function createLevel2Spores() {
    const container = document.getElementById('level2Spores');
    const sporeCount = 30;
    
    for (let i = 0; i < sporeCount; i++) {
        const spore = document.createElement('div');
        spore.style.position = 'absolute';
        spore.style.width = `${Math.random() * 6 + 3}px`;
        spore.style.height = spore.style.width;
        spore.style.borderRadius = '50%';
        spore.style.background = 'rgba(0, 255, 0, 0.3)';
        spore.style.boxShadow = '0 0 8px rgba(0, 255, 0, 0.6)';
        spore.style.left = `${Math.random() * 100}%`;
        spore.style.top = `${Math.random() * 100}%`;
        spore.style.animation = `float ${Math.random() * 15 + 15}s infinite ease-in-out`;
        spore.style.animationDelay = `${Math.random() * 5}s`;
        spore.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(spore);
    }
}

// Setup Level 2 Story Navigation
let level2CurrentSlide = 1;
const level2TotalSlides = 5;

function setupLevel2StoryNavigation() {
    const level2Section = document.getElementById('level2Section');
    const proceedBtn = document.getElementById('proceedToLevel2PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel2StoryBtn');
    const navIndicator = document.getElementById('level2NavIndicator');
    
    if (!level2Section || !proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 2 story elements not found');
        return;
    }
    
    // Show first slide immediately
    const slides = document.querySelectorAll('#level2StorySlides .story-slide');
    const dots = document.querySelectorAll('#level2NavIndicator .dot');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');
    }
    
    // Click anywhere to advance
    level2Section.addEventListener('click', advanceLevel2Story);
    
    // Spacebar to advance
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && level2Section.classList.contains('active')) {
            e.preventDefault();
            advanceLevel2Story();
        }
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            goToLevel2Slide(index + 1);
        });
    });
    
    // Proceed button - show puzzle
    proceedBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showLevel2Puzzle();
    });
    
    // Skip story button
    skipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        skipToLevel2End();
    });
}

// Advance Level 2 story
function advanceLevel2Story() {
    if (level2CurrentSlide < level2TotalSlides) {
        level2CurrentSlide++;
        goToLevel2Slide(level2CurrentSlide);
        playWalkieTalkieSound();
    } else {
        showLevel2ProceedButton();
    }
}

// Go to specific Level 2 slide
function goToLevel2Slide(slideNumber) {
    const slides = document.querySelectorAll('#level2StorySlides .story-slide');
    const dots = document.querySelectorAll('#level2NavIndicator .dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    const currentSlideEl = slides[slideNumber - 1];
    const currentDot = dots[slideNumber - 1];
    
    if (currentSlideEl) currentSlideEl.classList.add('active');
    if (currentDot) currentDot.classList.add('active');
    
    level2CurrentSlide = slideNumber;
    
    if (level2CurrentSlide === level2TotalSlides) {
        setTimeout(showLevel2ProceedButton, 6000);
    }
}

// Show proceed button for Level 2
function showLevel2ProceedButton() {
    const proceedBtn = document.getElementById('proceedToLevel2PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel2StoryBtn');
    const navIndicator = document.getElementById('level2NavIndicator');
    
    if (!proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 2 button elements not found');
        return;
    }
    
    navIndicator.style.display = 'none';
    skipBtn.classList.add('hidden');
    proceedBtn.style.display = 'block';
    
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of Level 2 story
function skipToLevel2End() {
    goToLevel2Slide(level2TotalSlides);
    showLevel2ProceedButton();
}

// Show Level 2 Puzzle
function showLevel2Puzzle() {
    const storySlides = document.getElementById('level2StorySlides');
    const puzzle = document.getElementById('level2Puzzle');
    const proceedBtn = document.getElementById('proceedToLevel2PuzzleBtn');
    const unlockBtn = document.getElementById('level2UnlockBtn');
    
    createFlashEffect();
    
    setTimeout(() => {
        storySlides.style.display = 'none';
        proceedBtn.style.display = 'none';
        puzzle.style.display = 'block';
        unlockBtn.style.display = 'block';
        
        // Initialize oscilloscope
        initOscilloscope();
        
        // Setup audio controls
        setupAudioControls();
    }, 500);
}

// Setup Level 2 Puzzle
function setupLevel2Puzzle() {
    const unlockBtn = document.getElementById('level2UnlockBtn');
    
    unlockBtn.addEventListener('click', function() {
        openTerminalModal();
    });
}

// Initialize Oscilloscope
let oscilloscopeAnimationId;
let oscilloscopeActive = false;

function initOscilloscope() {
    const canvas = document.getElementById('oscilloscopeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    let phase = 0;
    let amplitude = 30;
    let frequency = 0.05;
    
    function drawWave() {
        ctx.fillStyle = '#001a00';
        ctx.fillRect(0, 0, width, height);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
        ctx.lineWidth = 1;
        
        // Horizontal lines
        for (let i = 0; i <= 4; i++) {
            ctx.beginPath();
            ctx.moveTo(0, (height / 4) * i);
            ctx.lineTo(width, (height / 4) * i);
            ctx.stroke();
        }
        
        // Vertical lines
        for (let i = 0; i <= 10; i++) {
            ctx.beginPath();
            ctx.moveTo((width / 10) * i, 0);
            ctx.lineTo((width / 10) * i, height);
            ctx.stroke();
        }
        
        // Oscillating wave
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff00';
        ctx.beginPath();
        
        for (let x = 0; x < width; x++) {
            const y = height / 2 + 
                      Math.sin((x + phase) * frequency) * amplitude +
                      Math.sin((x + phase) * frequency * 2.3) * (amplitude * 0.5) +
                      Math.random() * 5;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        phase += 2;
        
        if (oscilloscopeActive) {
            amplitude = 40 + Math.random() * 20;
            frequency = 0.05 + Math.random() * 0.02;
        } else {
            amplitude = 30;
            frequency = 0.05;
        }
        
        oscilloscopeAnimationId = requestAnimationFrame(drawWave);
    }
    
    drawWave();
}

// Setup Audio Controls
function setupAudioControls() {
    const audio = document.getElementById('level2Audio');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!audio || !playBtn || !pauseBtn || !downloadBtn) {
        console.error('Audio controls not found');
        return;
    }
    
    playBtn.addEventListener('click', function() {
        audio.play().then(() => {
            oscilloscopeActive = true;
            console.log('Audio playing');
        }).catch(err => {
            console.error('Error playing audio:', err);
            alert('Error playing audio. Please check if the file exists at: assets/nes-new.mp3');
        });
    });
    
    pauseBtn.addEventListener('click', function() {
        audio.pause();
        oscilloscopeActive = false;
        console.log('Audio paused');
    });
    
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'assets/nes.mp3';
        link.download = 'intercepted_transmission.mp3';
        link.click();
    });
    
    // When audio ends
    audio.addEventListener('ended', function() {
        oscilloscopeActive = false;
    });
    
    // Error handling
    audio.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        alert('Failed to load audio file. Please ensure assets/nes-new.mp3 exists.');
    });
}

// Preload optimization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add visibility change handler to pause animations when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations
        document.querySelectorAll('.particle').forEach(p => {
            p.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        document.querySelectorAll('.particle').forEach(p => {
            p.style.animationPlayState = 'running';
        });
    }
});

// ========================================
// LEVEL 3: THE WATCHER IN THE STATIC
// ========================================

function showLevel3() {
    const level2Section = document.getElementById('level2Section');
    const level3Section = document.getElementById('level3Section');
    
    // Stop Level 2 animations
    if (oscilloscopeAnimationId) {
        cancelAnimationFrame(oscilloscopeAnimationId);
    }
    
    // Hide Level 2
    level2Section.classList.remove('active');
    
    setTimeout(() => {
        level2Section.style.display = 'none';
        level3Section.style.display = 'block';
        
        setTimeout(() => {
            level3Section.classList.add('active');
            
            // Create spores for level 3
            createLevel3Spores();
            
            // Setup level 3 story navigation
            setupLevel3StoryNavigation();
            
            // Setup level 3 puzzle
            setupLevel3Puzzle();
            
            playWalkieTalkieSound();
        }, 100);
    }, 500);
}

// Create spores for Level 3
function createLevel3Spores() {
    const container = document.getElementById('level3Spores');
    const sporeCount = 30;
    
    for (let i = 0; i < sporeCount; i++) {
        const spore = document.createElement('div');
        spore.style.position = 'absolute';
        spore.style.width = `${Math.random() * 6 + 3}px`;
        spore.style.height = spore.style.width;
        spore.style.borderRadius = '50%';
        spore.style.background = 'rgba(0, 255, 0, 0.2)';
        spore.style.boxShadow = '0 0 8px rgba(0, 255, 0, 0.4)';
        spore.style.left = `${Math.random() * 100}%`;
        spore.style.top = `${Math.random() * 100}%`;
        spore.style.animation = `float ${Math.random() * 15 + 15}s infinite ease-in-out`;
        spore.style.animationDelay = `${Math.random() * 5}s`;
        spore.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(spore);
    }
}

// Setup Level 3 Story Navigation
let level3CurrentSlide = 1;
const level3TotalSlides = 5;

function setupLevel3StoryNavigation() {
    const level3Section = document.getElementById('level3Section');
    const proceedBtn = document.getElementById('proceedToLevel3PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel3StoryBtn');
    const navIndicator = document.getElementById('level3NavIndicator');
    
    if (!level3Section || !proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 3 story elements not found');
        return;
    }
    
    // Show first slide immediately
    const slides = document.querySelectorAll('#level3StorySlides .story-slide');
    const dots = document.querySelectorAll('#level3NavIndicator .dot');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');
    }
    
    // Click anywhere to advance
    level3Section.addEventListener('click', advanceLevel3Story);
    
    // Spacebar to advance
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && level3Section.classList.contains('active')) {
            e.preventDefault();
            advanceLevel3Story();
        }
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            goToLevel3Slide(index + 1);
        });
    });
    
    // Proceed button - show puzzle
    proceedBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showLevel3Puzzle();
    });
    
    // Skip story button
    skipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        skipToLevel3End();
    });
}

// Advance Level 3 story
function advanceLevel3Story() {
    if (level3CurrentSlide < level3TotalSlides) {
        level3CurrentSlide++;
        goToLevel3Slide(level3CurrentSlide);
        playWalkieTalkieSound();
    } else {
        showLevel3ProceedButton();
    }
}

// Go to specific Level 3 slide
function goToLevel3Slide(slideNumber) {
    const slides = document.querySelectorAll('#level3StorySlides .story-slide');
    const dots = document.querySelectorAll('#level3NavIndicator .dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    const currentSlideEl = slides[slideNumber - 1];
    const currentDot = dots[slideNumber - 1];
    
    if (currentSlideEl) currentSlideEl.classList.add('active');
    if (currentDot) currentDot.classList.add('active');
    
    level3CurrentSlide = slideNumber;
    
    if (level3CurrentSlide === level3TotalSlides) {
        setTimeout(showLevel3ProceedButton, 6000);
    }
}

// Show proceed button for Level 3
function showLevel3ProceedButton() {
    const proceedBtn = document.getElementById('proceedToLevel3PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel3StoryBtn');
    const navIndicator = document.getElementById('level3NavIndicator');
    
    if (!proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 3 button elements not found');
        return;
    }
    
    navIndicator.style.display = 'none';
    skipBtn.classList.add('hidden');
    proceedBtn.style.display = 'block';
    
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of Level 3 story
function skipToLevel3End() {
    goToLevel3Slide(level3TotalSlides);
    showLevel3ProceedButton();
}

// Show Level 3 Puzzle
function showLevel3Puzzle() {
    const storySlides = document.getElementById('level3StorySlides');
    const puzzle = document.getElementById('level3Puzzle');
    const proceedBtn = document.getElementById('proceedToLevel3PuzzleBtn');
    const unlockBtn = document.getElementById('level3UnlockBtn');
    
    createFlashEffect();
    
    setTimeout(() => {
        storySlides.style.display = 'none';
        proceedBtn.style.display = 'none';
        puzzle.style.display = 'block';
        unlockBtn.style.display = 'block';
        
        // Update timestamp animation
        updateCCTVTimestamp();
    }, 500);
}

// Setup Level 3 Puzzle
function setupLevel3Puzzle() {
    const unlockBtn = document.getElementById('level3UnlockBtn');
    
    unlockBtn.addEventListener('click', function() {
        openTerminalModal();
    });
}

// Update CCTV Timestamp
function updateCCTVTimestamp() {
    const timestamp = document.getElementById('cctvTimestamp');
    if (!timestamp) return;
    
    setInterval(() => {
        const now = new Date();
        const formatted = `01/01/2026 - ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        timestamp.textContent = formatted;
    }, 1000);
}

// ========================================
// LEVEL 4: THE RESONANCE OF THE VOID
// ========================================

function showLevel4() {
    const level3Section = document.getElementById('level3Section');
    const level4Section = document.getElementById('level4Section');
    
    // Hide Level 3
    level3Section.classList.remove('active');
    
    setTimeout(() => {
        level3Section.style.display = 'none';
        level4Section.style.display = 'block';
        
        setTimeout(() => {
            level4Section.classList.add('active');
            
            // Create spores for level 4
            createLevel4Spores();
            
            // Setup level 4 story navigation
            setupLevel4StoryNavigation();
            
            // Setup level 4 puzzle
            setupLevel4Puzzle();
            
            playWalkieTalkieSound();
        }, 100);
    }, 500);
}

// Create spores for Level 4
function createLevel4Spores() {
    const container = document.getElementById('level4Spores');
    const sporeCount = 30;
    
    for (let i = 0; i < sporeCount; i++) {
        const spore = document.createElement('div');
        spore.style.position = 'absolute';
        spore.style.width = `${Math.random() * 6 + 3}px`;
        spore.style.height = spore.style.width;
        spore.style.borderRadius = '50%';
        spore.style.background = 'rgba(0, 255, 100, 0.3)';
        spore.style.boxShadow = '0 0 8px rgba(0, 255, 100, 0.5)';
        spore.style.left = `${Math.random() * 100}%`;
        spore.style.top = `${Math.random() * 100}%`;
        spore.style.animation = `float ${Math.random() * 15 + 15}s infinite ease-in-out`;
        spore.style.animationDelay = `${Math.random() * 5}s`;
        spore.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(spore);
    }
}

// Setup Level 4 Story Navigation
let level4CurrentSlide = 1;
const level4TotalSlides = 5;

function setupLevel4StoryNavigation() {
    const level4Section = document.getElementById('level4Section');
    const proceedBtn = document.getElementById('proceedToLevel4PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel4StoryBtn');
    const navIndicator = document.getElementById('level4NavIndicator');
    
    if (!level4Section || !proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 4 story elements not found');
        return;
    }
    
    // Show first slide immediately
    const slides = document.querySelectorAll('#level4StorySlides .story-slide');
    const dots = document.querySelectorAll('#level4NavIndicator .dot');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');
    }
    
    // Click anywhere to advance
    level4Section.addEventListener('click', advanceLevel4Story);
    
    // Spacebar to advance
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && level4Section.classList.contains('active')) {
            e.preventDefault();
            advanceLevel4Story();
        }
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            goToLevel4Slide(index + 1);
        });
    });
    
    // Proceed button - show puzzle
    proceedBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showLevel4Puzzle();
    });
    
    // Skip story button
    skipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        skipToLevel4End();
    });
}

// Advance Level 4 story
function advanceLevel4Story() {
    if (level4CurrentSlide < level4TotalSlides) {
        level4CurrentSlide++;
        goToLevel4Slide(level4CurrentSlide);
        playWalkieTalkieSound();
    } else {
        showLevel4ProceedButton();
    }
}

// Go to specific Level 4 slide
function goToLevel4Slide(slideNumber) {
    const slides = document.querySelectorAll('#level4StorySlides .story-slide');
    const dots = document.querySelectorAll('#level4NavIndicator .dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    const currentSlideEl = slides[slideNumber - 1];
    const currentDot = dots[slideNumber - 1];
    
    if (currentSlideEl) currentSlideEl.classList.add('active');
    if (currentDot) currentDot.classList.add('active');
    
    level4CurrentSlide = slideNumber;
    
    if (level4CurrentSlide === level4TotalSlides) {
        setTimeout(showLevel4ProceedButton, 6000);
    }
}

// Show proceed button for Level 4
function showLevel4ProceedButton() {
    const proceedBtn = document.getElementById('proceedToLevel4PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel4StoryBtn');
    const navIndicator = document.getElementById('level4NavIndicator');
    
    if (!proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 4 button elements not found');
        return;
    }
    
    navIndicator.style.display = 'none';
    skipBtn.classList.add('hidden');
    proceedBtn.style.display = 'block';
    
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of Level 4 story
function skipToLevel4End() {
    goToLevel4Slide(level4TotalSlides);
    showLevel4ProceedButton();
}

// Show Level 4 Puzzle
function showLevel4Puzzle() {
    const storySlides = document.getElementById('level4StorySlides');
    const puzzle = document.getElementById('level4Puzzle');
    const proceedBtn = document.getElementById('proceedToLevel4PuzzleBtn');
    const unlockBtn = document.getElementById('level4UnlockBtn');
    
    createFlashEffect();
    
    setTimeout(() => {
        storySlides.style.display = 'none';
        proceedBtn.style.display = 'none';
        puzzle.style.display = 'block';
        unlockBtn.style.display = 'block';
    }, 500);
}

// Setup Level 4 Puzzle
function setupLevel4Puzzle() {
    const unlockBtn = document.getElementById('level4UnlockBtn');
    const scanBtn = document.getElementById('initiateScanBtn');
    const riddleModal = document.getElementById('riddleModal');
    const riddleCloseBtn = document.getElementById('riddleCloseBtn');
    const downloadBtn = document.getElementById('downloadAudioBtn');
    
    // Unlock button
    unlockBtn.addEventListener('click', function() {
        openTerminalModal();
    });
    
    // Scanner button
    scanBtn.addEventListener('click', function() {
        riddleModal.style.display = 'flex';
    });
    
    // Close riddle modal
    riddleCloseBtn.addEventListener('click', function() {
        riddleModal.style.display = 'none';
    });
    
    // Close on outside click
    riddleModal.addEventListener('click', function(e) {
        if (e.target === riddleModal) {
            riddleModal.style.display = 'none';
        }
    });
    
    // Download audio button
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'assets/l4audio.wav';
        link.download = 'deep_audio_transmission.wav';
        link.click();
    });
}

// ========================================
// LEVEL 5: THE DNA OF THE HORIZON
// ========================================

function showLevel5() {
    const level4Section = document.getElementById('level4Section');
    const level5Section = document.getElementById('level5Section');
    
    // Hide Level 4
    level4Section.classList.remove('active');
    
    setTimeout(() => {
        level4Section.style.display = 'none';
        level5Section.style.display = 'block';
        
        setTimeout(() => {
            level5Section.classList.add('active');
            
            // Create spores for level 5
            createLevel5Spores();
            
            // Setup level 5 story navigation
            setupLevel5StoryNavigation();
            
            // Setup level 5 puzzle
            setupLevel5Puzzle();
            
            playWalkieTalkieSound();
        }, 100);
    }, 500);
}

// Create spores for Level 5
function createLevel5Spores() {
    const container = document.getElementById('level5Spores');
    const sporeCount = 30;
    
    for (let i = 0; i < sporeCount; i++) {
        const spore = document.createElement('div');
        spore.style.position = 'absolute';
        spore.style.width = `${Math.random() * 6 + 3}px`;
        spore.style.height = spore.style.width;
        spore.style.borderRadius = '50%';
        spore.style.background = 'rgba(0, 212, 255, 0.3)';
        spore.style.boxShadow = '0 0 8px rgba(0, 212, 255, 0.5)';
        spore.style.left = `${Math.random() * 100}%`;
        spore.style.top = `${Math.random() * 100}%`;
        spore.style.animation = `float ${Math.random() * 15 + 15}s infinite ease-in-out`;
        spore.style.animationDelay = `${Math.random() * 5}s`;
        spore.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(spore);
    }
}

// Setup Level 5 Story Navigation
let level5CurrentSlide = 1;
const level5TotalSlides = 5;

function setupLevel5StoryNavigation() {
    const level5Section = document.getElementById('level5Section');
    const proceedBtn = document.getElementById('proceedToLevel5PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel5StoryBtn');
    const navIndicator = document.getElementById('level5NavIndicator');
    
    if (!level5Section || !proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 5 story elements not found');
        return;
    }
    
    // Show first slide immediately
    const slides = document.querySelectorAll('#level5StorySlides .story-slide');
    const dots = document.querySelectorAll('#level5NavIndicator .dot');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');
    }
    
    // Click anywhere to advance
    level5Section.addEventListener('click', advanceLevel5Story);
    
    // Spacebar to advance
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && level5Section.classList.contains('active')) {
            e.preventDefault();
            advanceLevel5Story();
        }
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            goToLevel5Slide(index + 1);
        });
    });
    
    // Proceed button - show puzzle
    proceedBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showLevel5Puzzle();
    });
    
    // Skip story button
    skipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        skipToLevel5End();
    });
}

// Advance Level 5 story
function advanceLevel5Story() {
    if (level5CurrentSlide < level5TotalSlides) {
        level5CurrentSlide++;
        goToLevel5Slide(level5CurrentSlide);
        playWalkieTalkieSound();
    } else {
        showLevel5ProceedButton();
    }
}

// Go to specific Level 5 slide
function goToLevel5Slide(slideNumber) {
    const slides = document.querySelectorAll('#level5StorySlides .story-slide');
    const dots = document.querySelectorAll('#level5NavIndicator .dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    const currentSlideEl = slides[slideNumber - 1];
    const currentDot = dots[slideNumber - 1];
    
    if (currentSlideEl) currentSlideEl.classList.add('active');
    if (currentDot) currentDot.classList.add('active');
    
    level5CurrentSlide = slideNumber;
    
    if (level5CurrentSlide === level5TotalSlides) {
        setTimeout(showLevel5ProceedButton, 6000);
    }
}

// Show proceed button for Level 5
function showLevel5ProceedButton() {
    const proceedBtn = document.getElementById('proceedToLevel5PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel5StoryBtn');
    const navIndicator = document.getElementById('level5NavIndicator');
    
    if (!proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 5 button elements not found');
        return;
    }
    
    navIndicator.style.display = 'none';
    skipBtn.classList.add('hidden');
    proceedBtn.style.display = 'block';
    
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of Level 5 story
function skipToLevel5End() {
    goToLevel5Slide(level5TotalSlides);
    showLevel5ProceedButton();
}

// Show Level 5 Puzzle
function showLevel5Puzzle() {
    const storySlides = document.getElementById('level5StorySlides');
    const puzzle = document.getElementById('level5Puzzle');
    const proceedBtn = document.getElementById('proceedToLevel5PuzzleBtn');
    const unlockBtn = document.getElementById('level5UnlockBtn');
    
    createFlashEffect();
    
    setTimeout(() => {
        storySlides.style.display = 'none';
        proceedBtn.style.display = 'none';
        puzzle.style.display = 'block';
        unlockBtn.style.display = 'block';
    }, 500);
}

// Setup Level 5 Puzzle
function setupLevel5Puzzle() {
    const unlockBtn = document.getElementById('level5UnlockBtn');
    const downloadImageBtn = document.getElementById('downloadImageBtn');
    
    // Unlock button
    unlockBtn.addEventListener('click', function() {
        openTerminalModal();
    });
    
    // Download image button
    downloadImageBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'assets/l5-img.png';
        link.download = 'hawkins_blueprint.png';
        link.click();
    });
}

// ========================================
// LEVEL 6: THE SIGNAL IN THE VOID
// ========================================

// Level 6 state
let level6CurrentSlide = 1;
const level6TotalSlides = 5;

// Show Level 6
function showLevel6() {
    console.log('Showing Level 6...');
    const level5Section = document.getElementById('level5Section');
    const level6Section = document.getElementById('level6Section');
    
    // Hide Level 5
    level5Section.classList.remove('active');
    
    createFlashEffect();
    
    setTimeout(() => {
        level5Section.style.display = 'none';
        level6Section.style.display = 'block';
        
        setTimeout(() => {
            level6Section.classList.add('active');
            
            // Create void spores
            createLevel6Spores();
            
            // Setup navigation
            setupLevel6StoryNavigation();
            
            // Setup puzzle
            setupLevel6Puzzle();
            
            // Start with first slide
            goToLevel6Slide(1);
            
            playWalkieTalkieSound();
        }, 100);
    }, 500);
}

// Create Level 6 spores (purple/void colored)
function createLevel6Spores() {
    const sporesContainer = document.getElementById('level6Spores');
    if (!sporesContainer) return;
    
    sporesContainer.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const spore = document.createElement('div');
        spore.className = 'spore';
        spore.style.left = Math.random() * 100 + '%';
        spore.style.animationDelay = Math.random() * 10 + 's';
        spore.style.animationDuration = (15 + Math.random() * 20) + 's';
        
        // Purple/void colors
        const voidColors = ['#8b00ff', '#9932cc', '#4b0082', '#6a0dad'];
        spore.style.background = voidColors[Math.floor(Math.random() * voidColors.length)];
        
        sporesContainer.appendChild(spore);
    }
}

// Setup Level 6 Story Navigation
function setupLevel6StoryNavigation() {
    const skipBtn = document.getElementById('skipLevel6StoryBtn');
    const proceedBtn = document.getElementById('proceedToLevel6PuzzleBtn');
    const navIndicator = document.getElementById('level6NavIndicator');
    
    if (skipBtn) {
        skipBtn.addEventListener('click', skipToLevel6End);
    }
    
    if (proceedBtn) {
        proceedBtn.addEventListener('click', showLevel6Puzzle);
    }
    
    // Keyboard navigation (spacebar or arrow keys)
    function handleLevel6KeyPress(e) {
        const level6Section = document.getElementById('level6Section');
        if (level6Section.style.display !== 'block') return;
        
        const puzzle = document.getElementById('level6Puzzle');
        if (puzzle && puzzle.style.display === 'block') return;
        
        if (e.code === 'Space' || e.code === 'ArrowRight') {
            e.preventDefault();
            advanceLevel6Story();
        }
    }
    
    document.addEventListener('keydown', handleLevel6KeyPress);
    
    // Click anywhere to advance
    document.addEventListener('click', function(e) {
        const level6Section = document.getElementById('level6Section');
        if (level6Section.style.display !== 'block') return;
        
        const puzzle = document.getElementById('level6Puzzle');
        if (puzzle && puzzle.style.display === 'block') return;
        
        if (!e.target.closest('button') && !e.target.closest('.terminal-modal')) {
            advanceLevel6Story();
        }
    });
}

// Advance Level 6 Story
function advanceLevel6Story() {
    if (level6CurrentSlide < level6TotalSlides) {
        level6CurrentSlide++;
        goToLevel6Slide(level6CurrentSlide);
    } else if (level6CurrentSlide === level6TotalSlides) {
        showLevel6ProceedButton();
    }
}

// Go to specific Level 6 slide
function goToLevel6Slide(slideNumber) {
    const slides = document.querySelectorAll('#level6StorySlides .story-slide');
    const dots = document.querySelectorAll('#level6NavIndicator .dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideNumber - 1]) {
        slides[slideNumber - 1].classList.add('active');
    }
    if (dots[slideNumber - 1]) {
        dots[slideNumber - 1].classList.add('active');
    }
    
    level6CurrentSlide = slideNumber;
}

// Show Level 6 Proceed Button
function showLevel6ProceedButton() {
    const proceedBtn = document.getElementById('proceedToLevel6PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel6StoryBtn');
    const navIndicator = document.getElementById('level6NavIndicator');
    
    if (!proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 6 button elements not found');
        return;
    }
    
    navIndicator.style.display = 'none';
    skipBtn.classList.add('hidden');
    proceedBtn.style.display = 'block';
    
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of Level 6 story
function skipToLevel6End() {
    goToLevel6Slide(level6TotalSlides);
    showLevel6ProceedButton();
}

// Show Level 6 Puzzle
function showLevel6Puzzle() {
    const storySlides = document.getElementById('level6StorySlides');
    const puzzle = document.getElementById('level6Puzzle');
    const proceedBtn = document.getElementById('proceedToLevel6PuzzleBtn');
    const unlockBtn = document.getElementById('level6UnlockBtn');
    
    createFlashEffect();
    
    setTimeout(() => {
        storySlides.style.display = 'none';
        proceedBtn.style.display = 'none';
        puzzle.style.display = 'block';
        unlockBtn.style.display = 'block';
    }, 500);
}

// Setup Level 6 Puzzle
function setupLevel6Puzzle() {
    const unlockBtn = document.getElementById('level6UnlockBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const downloadMapBtn = document.getElementById('downloadMapBtn');
    const decoderModal = document.getElementById('decoderModal');
    const decoderCloseBtn = document.getElementById('decoderCloseBtn');
    
    // Unlock button
    if (unlockBtn) {
        unlockBtn.addEventListener('click', function() {
            openTerminalModal();
        });
    }
    
    // Download map button
    if (downloadMapBtn) {
        downloadMapBtn.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = 'assets/hk-map-l6.png';
            link.download = 'void_map_scrubbed.png';
            link.click();
        });
    }
    
    // Decode button (hidden trigger)
    if (decodeBtn) {
        decodeBtn.addEventListener('click', function() {
            if (decoderModal) {
                decoderModal.style.display = 'flex';
            }
        });
    }
    
    // Close decoder modal
    if (decoderCloseBtn) {
        decoderCloseBtn.addEventListener('click', function() {
            if (decoderModal) {
                decoderModal.style.display = 'none';
            }
        });
    }
    
    // Close modal on outside click
    if (decoderModal) {
        decoderModal.addEventListener('click', function(e) {
            if (e.target === decoderModal) {
                decoderModal.style.display = 'none';
            }
        });
    }
}

// ========================================
// LEVEL 7: THE SENSORY STATIC
// ========================================

// Level 7 state
let level7CurrentSlide = 1;
const level7TotalSlides = 5;
let level7AudioPlayCount = 0;
let level7FlickerTimeout = null;

// Binary code for "CRITICAL"
const binaryCode = [
    '01000011', // C
    '01010010', // R
    '01001001', // I
    '01010100', // T
    '01001001', // I
    '01000011', // C
    '01000001', // A
    '01001100'  // L
];

// Show Level 7
function showLevel7() {
    console.log('Showing Level 7...');
    const level6Section = document.getElementById('level6Section');
    const level7Section = document.getElementById('level7Section');
    
    // Hide Level 6
    level6Section.classList.remove('active');
    
    createFlashEffect();
    
    setTimeout(() => {
        level6Section.style.display = 'none';
        level7Section.style.display = 'block';
        
        setTimeout(() => {
            level7Section.classList.add('active');
            
            // Create spores
            createLevel7Spores();
            
            // Setup navigation
            setupLevel7StoryNavigation();
            
            // Setup puzzle
            setupLevel7Puzzle();
            
            // Start with first slide
            goToLevel7Slide(1);
            
            playWalkieTalkieSound();
        }, 100);
    }, 500);
}

// Create Level 7 spores (dark red/emergency colored)
function createLevel7Spores() {
    const sporesContainer = document.getElementById('level7Spores');
    if (!sporesContainer) return;
    
    sporesContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const spore = document.createElement('div');
        spore.className = 'spore';
        spore.style.left = Math.random() * 100 + '%';
        spore.style.animationDelay = Math.random() * 10 + 's';
        spore.style.animationDuration = (15 + Math.random() * 20) + 's';
        
        // Dark red/emergency colors
        const emergencyColors = ['#ff3333', '#cc0000', '#990000', '#660000'];
        spore.style.background = emergencyColors[Math.floor(Math.random() * emergencyColors.length)];
        spore.style.opacity = '0.3';
        
        sporesContainer.appendChild(spore);
    }
}

// Setup Level 7 Story Navigation
function setupLevel7StoryNavigation() {
    const skipBtn = document.getElementById('skipLevel7StoryBtn');
    const proceedBtn = document.getElementById('proceedToLevel7PuzzleBtn');
    const navIndicator = document.getElementById('level7NavIndicator');
    
    if (skipBtn) {
        skipBtn.addEventListener('click', skipToLevel7End);
    }
    
    if (proceedBtn) {
        proceedBtn.addEventListener('click', showLevel7Puzzle);
    }
    
    // Keyboard navigation
    function handleLevel7KeyPress(e) {
        const level7Section = document.getElementById('level7Section');
        if (level7Section.style.display !== 'block') return;
        
        const puzzle = document.getElementById('level7Puzzle');
        if (puzzle && puzzle.style.display === 'block') return;
        
        if (e.code === 'Space' || e.code === 'ArrowRight') {
            e.preventDefault();
            advanceLevel7Story();
        }
    }
    
    document.addEventListener('keydown', handleLevel7KeyPress);
    
    // Click anywhere to advance
    document.addEventListener('click', function(e) {
        const level7Section = document.getElementById('level7Section');
        if (level7Section.style.display !== 'block') return;
        
        const puzzle = document.getElementById('level7Puzzle');
        if (puzzle && puzzle.style.display === 'block') return;
        
        if (!e.target.closest('button') && !e.target.closest('.terminal-modal')) {
            advanceLevel7Story();
        }
    });
}

// Advance Level 7 Story
function advanceLevel7Story() {
    if (level7CurrentSlide < level7TotalSlides) {
        level7CurrentSlide++;
        goToLevel7Slide(level7CurrentSlide);
    } else if (level7CurrentSlide === level7TotalSlides) {
        showLevel7ProceedButton();
    }
}

// Go to specific Level 7 slide
function goToLevel7Slide(slideNumber) {
    const slides = document.querySelectorAll('#level7StorySlides .story-slide');
    const dots = document.querySelectorAll('#level7NavIndicator .dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideNumber - 1]) {
        slides[slideNumber - 1].classList.add('active');
    }
    if (dots[slideNumber - 1]) {
        dots[slideNumber - 1].classList.add('active');
    }
    
    level7CurrentSlide = slideNumber;
}

// Show Level 7 Proceed Button
function showLevel7ProceedButton() {
    const proceedBtn = document.getElementById('proceedToLevel7PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel7StoryBtn');
    const navIndicator = document.getElementById('level7NavIndicator');
    
    if (!proceedBtn || !skipBtn || !navIndicator) {
        console.error('Level 7 button elements not found');
        return;
    }
    
    navIndicator.style.display = 'none';
    skipBtn.classList.add('hidden');
    proceedBtn.style.display = 'block';
    
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of Level 7 story
function skipToLevel7End() {
    goToLevel7Slide(level7TotalSlides);
    showLevel7ProceedButton();
}

// Show Level 7 Puzzle
function showLevel7Puzzle() {
    const storySlides = document.getElementById('level7StorySlides');
    const puzzle = document.getElementById('level7Puzzle');
    const proceedBtn = document.getElementById('proceedToLevel7PuzzleBtn');
    const unlockBtn = document.getElementById('level7UnlockBtn');
    const level7Audio = document.getElementById('level7Audio');
    
    createFlashEffect();
    
    setTimeout(() => {
        storySlides.style.display = 'none';
        proceedBtn.style.display = 'none';
        puzzle.style.display = 'block';
        unlockBtn.style.display = 'block';
        
        // Start binary flicker animation
        startBinaryFlicker();
        
        // Start audio automatically when puzzle loads
        if (level7Audio) {
            setTimeout(() => {
                level7Audio.play().catch(err => console.log('Autoplay prevented:', err));
            }, 1000);
        }
    }, 500);
}

// Start Binary Flicker Animation (8-bulb display)
function startBinaryFlicker() {
    // Get all 8 bulbs
    const bulbs = [];
    for (let i = 0; i < 8; i++) {
        const bulb = document.getElementById(`bulb${i}`);
        if (bulb) bulbs.push(bulb);
    }
    
    if (bulbs.length !== 8) {
        console.error('Could not find all 8 bulbs');
        return;
    }
    
    let charIndex = 0;
    
    function showNextCharacter() {
        if (charIndex >= binaryCode.length) {
            // Restart from beginning after pause
            setTimeout(() => {
                charIndex = 0;
                showNextCharacter();
            }, 600);
            return;
        }
        
        const currentChar = binaryCode[charIndex];
        
        // Turn off all bulbs first
        bulbs.forEach(bulb => bulb.classList.remove('lit'));
        
        // Small delay before lighting up
        setTimeout(() => {
            // Light up bulbs based on binary pattern
            for (let i = 0; i < 8; i++) {
                const bit = currentChar[i];
                if (bit === '1') {
                    bulbs[i].classList.add('lit');
                }
                // 0 stays dark (no class added)
            }
            
            // Move to next character after 1 second
            charIndex++;
            setTimeout(showNextCharacter, 600);
        }, 200);
    }
    
    // Start showing characters
    setTimeout(showNextCharacter, 1000);
}

// Setup Level 7 Puzzle
function setupLevel7Puzzle() {
    const unlockBtn = document.getElementById('level7UnlockBtn');
    const dustinNote = document.getElementById('dustinNote');
    const level7DecoderModal = document.getElementById('level7DecoderModal');
    const level7DecoderCloseBtn = document.getElementById('level7DecoderCloseBtn');
    const playRadioBtn = document.getElementById('playRadioBtn');
    const pauseRadioBtn = document.getElementById('pauseRadioBtn');
    const level7Audio = document.getElementById('level7Audio');
    const playCountDisplay = document.getElementById('playCount');
    
    // Unlock button
    if (unlockBtn) {
        unlockBtn.addEventListener('click', function() {
            openTerminalModal();
        });
    }
    
    // Dustin's note (click to open decoder modal)
    if (dustinNote) {
        dustinNote.addEventListener('click', function() {
            if (level7DecoderModal) {
                level7DecoderModal.style.display = 'flex';
            }
        });
    }
    
    // Close decoder modal
    if (level7DecoderCloseBtn) {
        level7DecoderCloseBtn.addEventListener('click', function() {
            if (level7DecoderModal) {
                level7DecoderModal.style.display = 'none';
            }
        });
    }
    
    // Close modal on outside click
    if (level7DecoderModal) {
        level7DecoderModal.addEventListener('click', function(e) {
            if (e.target === level7DecoderModal) {
                level7DecoderModal.style.display = 'none';
            }
        });
    }
    
    // Audio controls
    if (playRadioBtn && level7Audio) {
        playRadioBtn.addEventListener('click', function() {
            level7Audio.play();
        });
    }
    
    if (pauseRadioBtn && level7Audio) {
        pauseRadioBtn.addEventListener('click', function() {
            level7Audio.pause();
        });
    }
    
    // Track play count (max 3 loops)
    if (level7Audio && playCountDisplay) {
        level7Audio.addEventListener('ended', function() {
            level7AudioPlayCount++;
            playCountDisplay.textContent = `Loops: ${level7AudioPlayCount}/3`;
            
            if (level7AudioPlayCount < 3) {
                level7Audio.currentTime = 0;
                level7Audio.play();
            }
        });
    }
}


// ========================================
// LEVEL 8: THE GATEKEEPER'S GAMBIT
// ========================================

// Level 8 state
let level8CurrentSlide = 1;
const level8TotalSlides = 5;
let level8RollCount = 0;
let level8TotalDamage = 0;
let level8AttemptNumber = 1; // Start at attempt 1 and increment after each trivia
let level8TriviaTimer = null;

// 20 Trivia Questions (The Archives)
const level8TriviaQuestions = [
    // 80s Questions
    {
        question: "Before we had USB drives or Cloud storage, we used \"Floppy Disks.\" What was the standard physical size (in inches) of the most iconic, hard-shell floppy disk used in the late 80s?",
        options: ["A) 3.5 inches", "B) 5.25 inches", "C) 8 inches"],
        correct: 0
    },
    {
        question: "Invented in 1974 but becoming a global craze in the 80s, this 3D puzzle has 43 quintillion possible combinations but only one solution. What is it?",
        options: ["A) The Tetris Block", "B) The Rubik's Cube", "C) The Perplexus Ball"],
        correct: 1
    },
    {
        question: "In the 1985 film Back to the Future, what speed (in miles per hour) did the DeLorean need to reach to trigger time travel?",
        options: ["A) 66 mph", "B) 77 mph", "C) 88 mph"],
        correct: 2
    },
    {
        question: "Which legendary artist released Thriller in 1982, which remains the best-selling album of all time?",
        options: ["A) Prince", "B) Michael Jackson", "C) David Bowie"],
        correct: 1
    },
    {
        question: "Which yellow, circular character debuted in an arcade game in 1980 and became the highest-grossing arcade game of all time?",
        options: ["A) Pac-Man", "B) Q*bert", "C) Donkey Kong"],
        correct: 0
    },
    // 90s Questions
    {
        question: "In the mid-90s, if you wanted to get online, you had to listen to a series of beeps and hisses over your phone line. What was this type of internet connection called?",
        options: ["A) Broadband", "B) Dial-up", "C) Fiber Optic"],
        correct: 1
    },
    {
        question: "In 1996, we were introduced to a \"Tomb Raider\" who became one of the most iconic action heroes in gaming history. What is her name?",
        options: ["A) Samus Aran", "B) Lara Croft", "C) Jill Valentine"],
        correct: 1
    },
    {
        question: "Which girl group told us what they \"really, really want\" in their 1996 hit debut single \"Wannabe\"?",
        options: ["A) Destiny's Child", "B) TLC", "C) The Spice Girls"],
        correct: 2
    },
    {
        question: "In the 1993 blockbuster Jurassic Park, what substance was the dinosaur DNA extracted from?",
        options: ["A) Tree Bark", "B) Fossilized Bone", "C) Amber (Fossilized Resin)"],
        correct: 2
    },
    {
        question: "Which handheld digital pet required you to feed, clean, and play with it, or else it would \"pass away\" on a tiny LCD screen?",
        options: ["A) Furby", "B) Tamagotchi", "C) Giga Pet"],
        correct: 1
    },
    {
        question: "In the classic 90s sitcom Friends, what is the name of the coffee shop where the six main characters always hung out?",
        options: ["A) Central Perk", "B) Monk's Diner", "C) The Daily Grind"],
        correct: 0
    },
    {
        question: "Before the DVD took over in the late 90s, we watched movies on large black plastic rectangles. What were these called?",
        options: ["A) LaserDiscs", "B) Betamax", "C) VHS Tapes"],
        correct: 2
    },
    {
        question: "Which style of music, originating in Seattle with bands like Nirvana and Pearl Jam, made flannel shirts and ripped jeans a massive 90s fashion trend?",
        options: ["A) Grunge", "B) Britpop", "C) Glam Rock"],
        correct: 0
    },
    {
        question: "Before Google became the king of the internet in 1998, which \"exclamation point\" branded site was the most popular way to search the web?",
        options: ["A) Ask Jeeves", "B) Yahoo!", "C) AltaVista"],
        correct: 1
    },
    {
        question: "Which 1994 Disney movie features a lion prince named Simba and the famous phrase \"Hakuna Matata\"?",
        options: ["A) Aladdin", "B) The Lion King", "C) Tarzan"],
        correct: 1
    },
    {
        question: "In 1995, Sony entered the console war with a device that used discs instead of cartridges. What was it called?",
        options: ["A) The Sega Saturn", "B) The Nintendo 64", "C) The PlayStation"],
        correct: 2
    },
    {
        question: "In 1997, the first book of a famous series about a \"Boy Who Lived\" was published. Who is the author of Harry Potter?",
        options: ["A) J.R.R. Tolkien", "B) J.K. Rowling", "C) Roald Dahl"],
        correct: 1
    },
    {
        question: "Which lunch-box staple allowed 90s kids to build their own \"cracker stackers\" with meat and cheese?",
        options: ["A) Lunchables", "B) Dunkaroos", "C) Fruit Roll-Ups"],
        correct: 0
    },
    {
        question: "Which 90s sci-fi show featured FBI agents Mulder and Scully investigating paranormal activity?",
        options: ["A) Twin Peaks", "B) The X-Files", "C) Buffy the Vampire Slayer"],
        correct: 1
    },
    {
        question: "On the night of December 31, 1999, the world was terrified of a computer bug that people feared would crash all global systems. What was this bug called?",
        options: ["A) The LoveBug", "B) The Millennium Falcon", "C) Y2K"],
        correct: 2
    }
];

// Show Level 8
function showLevel8() {
    console.log('Showing Level 8...');
    const level7Section = document.getElementById('level7Section');
    const level8Section = document.getElementById('level8Section');
    const level8StorySlides = document.getElementById('level8StorySlides');
    const level8Puzzle = document.getElementById('level8Puzzle');
    const level7Audio = document.getElementById('level7Audio');
    
    console.log('Level 8 Section:', level8Section);
    console.log('Level 8 Story Slides:', level8StorySlides);
    console.log('Level 8 Puzzle:', level8Puzzle);
    
    // Stop Level 7 audio
    if (level7Audio) {
        level7Audio.pause();
        level7Audio.currentTime = 0;
    }
    
    // Hide Level 7
    if (level7Section) {
        level7Section.classList.remove('active');
    }
    
    createFlashEffect();
    
    setTimeout(() => {
        if (level7Section) {
            level7Section.style.display = 'none';
        }
        if (level8Section) {
            level8Section.style.display = 'block';
        }
        
        // Ensure story is visible and puzzle is hidden
        if (level8StorySlides) {
            level8StorySlides.style.display = 'block';
        }
        if (level8Puzzle) {
            level8Puzzle.style.display = 'none';
        }
        
        setTimeout(() => {
            if (level8Section) {
                level8Section.classList.add('active');
            }
            
            // Create dramatic spores
            createLevel8Spores();
            
            // Setup navigation
            setupLevel8StoryNavigation();
            
            console.log('Level 8 initialized');
        }, 100);
    }, 500);
}

// Create Level 8 Spores (Crimson particles)
function createLevel8Spores() {
    const sporeContainer = document.createElement('div');
    sporeContainer.className = 'spore-container';
    sporeContainer.id = 'level8Spores';
    
    const level8Section = document.getElementById('level8Section');
    if (level8Section) {
        level8Section.appendChild(sporeContainer);
    }
    
    // Create 40 crimson spores for dramatic effect
    for (let i = 0; i < 40; i++) {
        const spore = document.createElement('div');
        spore.className = 'spore';
        spore.style.left = Math.random() * 100 + '%';
        spore.style.animationDelay = Math.random() * 5 + 's';
        spore.style.animationDuration = (Math.random() * 10 + 15) + 's';
        spore.style.width = (Math.random() * 3 + 2) + 'px';
        spore.style.height = spore.style.width;
        spore.style.background = `rgba(${Math.random() * 50 + 200}, 0, 0, ${Math.random() * 0.5 + 0.3})`;
        sporeContainer.appendChild(spore);
    }
}

// Setup Level 8 Story Navigation
function setupLevel8StoryNavigation() {
    const proceedBtn = document.getElementById('proceedToLevel8PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel8StoryBtn');
    
    // Initialize first slide
    goToLevel8Slide(1);
    
    // Proceed button
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function() {
            showLevel8Puzzle();
        });
    }
    
    // Skip button
    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            skipToLevel8End();
        });
    }
    
    // Keyboard navigation
    function handleLevel8KeyPress(e) {
        const level8Section = document.getElementById('level8Section');
        if (level8Section.style.display !== 'block') return;
        
        const puzzle = document.getElementById('level8Puzzle');
        if (puzzle && puzzle.style.display === 'block') return;
        
        if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight') {
            e.preventDefault();
            advanceLevel8Story();
        }
    }
    
    document.addEventListener('keydown', handleLevel8KeyPress);
    
    // Click anywhere to advance
    document.addEventListener('click', function(e) {
        const level8Section = document.getElementById('level8Section');
        if (level8Section.style.display !== 'block') return;
        
        const puzzle = document.getElementById('level8Puzzle');
        if (puzzle && puzzle.style.display === 'block') return;
        
        if (!e.target.closest('button')) {
            advanceLevel8Story();
        }
    });
}

// Advance Level 8 Story
function advanceLevel8Story() {
    if (level8CurrentSlide < level8TotalSlides) {
        level8CurrentSlide++;
        goToLevel8Slide(level8CurrentSlide);
    } else if (level8CurrentSlide === level8TotalSlides) {
        showLevel8ProceedButton();
    }
}

// Go to specific Level 8 slide
function goToLevel8Slide(slideNumber) {
    const slides = document.querySelectorAll('#level8StorySlides .story-slide');
    const dots = document.querySelectorAll('#level8NavIndicator .dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideNumber - 1]) {
        slides[slideNumber - 1].classList.add('active');
    }
    if (dots[slideNumber - 1]) {
        dots[slideNumber - 1].classList.add('active');
    }
    
    playClickSound();
}

// Show proceed button
function showLevel8ProceedButton() {
    const proceedBtn = document.getElementById('proceedToLevel8PuzzleBtn');
    if (!proceedBtn) return;
    
    proceedBtn.style.display = 'block';
    
    setTimeout(() => {
        proceedBtn.style.opacity = '1';
        proceedBtn.style.transform = 'scale(1)';
    }, 100);
}

// Skip to end of Level 8 story
function skipToLevel8End() {
    goToLevel8Slide(level8TotalSlides);
    showLevel8ProceedButton();
}

// Show Level 8 Puzzle
function showLevel8Puzzle() {
    const storySlides = document.getElementById('level8StorySlides');
    const puzzle = document.getElementById('level8Puzzle');
    const proceedBtn = document.getElementById('proceedToLevel8PuzzleBtn');
    const skipBtn = document.getElementById('skipLevel8StoryBtn');
    const navIndicator = document.getElementById('level8NavIndicator');
    const rollBtn = document.getElementById('rollDiceBtn');
    
    console.log('Showing Level 8 Puzzle');
    console.log('Story Slides:', storySlides);
    console.log('Puzzle:', puzzle);
    console.log('Roll Button:', rollBtn);
    
    // Dramatic entry effects
    createDemogorgonAttack();
    createScreenShake();
    
    setTimeout(() => {
        if (storySlides) {
            storySlides.style.display = 'none';
        }
        if (proceedBtn) {
            proceedBtn.style.display = 'none';
        }
        if (skipBtn) {
            skipBtn.style.display = 'none';
        }
        if (navIndicator) {
            navIndicator.style.display = 'none';
        }
        if (puzzle) {
            puzzle.style.display = 'block';
            puzzle.style.visibility = 'visible';
            puzzle.style.opacity = '1';
        }
        if (rollBtn) {
            rollBtn.style.display = 'flex';
            rollBtn.style.visibility = 'visible';
            rollBtn.style.opacity = '1';
        }
        
        // Setup dice mechanics
        setupLevel8Dice();
        
        // Start atmospheric effects
        startLevel8AtmosphericEffects();
        
        console.log('Level 8 puzzle displayed');
    }, 500);
}

// Setup Level 8 Dice Mechanics
function setupLevel8Dice() {
    const rollBtn = document.getElementById('rollDiceBtn');
    
    console.log('Setting up Level 8 dice, button:', rollBtn);
    
    if (rollBtn) {
        // Remove any existing listeners to prevent duplicates
        const newBtn = rollBtn.cloneNode(true);
        rollBtn.parentNode.replaceChild(newBtn, rollBtn);
        
        newBtn.addEventListener('click', function() {
            console.log('Roll button clicked!');
            rollD20();
        });
        
        console.log('Roll button event listener attached');
    } else {
        console.error('Roll button not found!');
    }
}

// Roll D20 Dice
function rollD20() {
    if (level8RollCount >= 3) return;
    
    const dice = document.getElementById('d20Dice');
    const rollBtn = document.getElementById('rollDiceBtn');
    const diceFace = dice.querySelector('.dice-face');
    
    // Disable button during roll
    rollBtn.disabled = true;
    dice.classList.add('rolling');
    
    // Play sword slash sound
    playClickSound();
    
    // Animate dice for 1 second
    let animationCount = 0;
    const animationInterval = setInterval(() => {
        diceFace.textContent = Math.floor(Math.random() * 20) + 1;
        animationCount++;
        
        if (animationCount > 10) {
            clearInterval(animationInterval);
            
            // Get rigged roll result
            const rollValue = generateRiggedRoll();
            diceFace.textContent = rollValue;
            
            // Update state
            level8RollCount++;
            level8TotalDamage += rollValue;
            
            // Update UI
            updateLevel8UI(rollValue);
            
            // Check if attempt is complete
            setTimeout(() => {
                checkLevel8Progress();
                dice.classList.remove('rolling');
                rollBtn.disabled = false;
            }, 500);
        }
    }, 100);
}

// Generate Rigged Roll (first 4 attempts fail, 5th succeeds)
function generateRiggedRoll() {
    // Use the persistent attempt counter
    // Which roll in the current attempt (0, 1, or 2)
    const rollInCurrentAttempt = level8RollCount % 3;
    const remainingRolls = 3 - rollInCurrentAttempt;
    
    console.log(`=== ATTEMPT ${level8AttemptNumber}, Roll ${rollInCurrentAttempt + 1}/3 ===`);
    console.log(`Current Total Damage: ${level8TotalDamage}`);
    
    // First 4 attempts (attempts 1, 2, 3, 4): Make sure total < 42
    if (level8AttemptNumber <= 4) {
        if (remainingRolls === 1) {
            // Last roll of attempt - ensure we DON'T reach 42
            const maxAllowed = Math.min(41 - level8TotalDamage, 15);
            const roll = Math.max(3, Math.floor(Math.random() * maxAllowed));
            console.log(`Attempt ${level8AttemptNumber} - Last roll, keeping total < 42: ${roll}`);
            console.log(`After this roll, total will be: ${level8TotalDamage + roll}`);
            return roll;
        } else {
            // Not last roll - moderate values
            const roll = Math.floor(Math.random() * 10) + 5; // 5-14
            console.log(`Attempt ${level8AttemptNumber} - Roll ${rollInCurrentAttempt + 1}: ${roll}`);
            return roll;
        }
    }
    // 5th attempt: Guarantee success
    else {
        if (remainingRolls === 1) {
            // Last roll - ensure we reach 42+
            const needed = Math.max(42 - level8TotalDamage + 1, 15);
            console.log(`*** ATTEMPT 5 - FINAL ROLL - ENSURING VICTORY: ${needed} ***`);
            console.log(`After this roll, total will be: ${level8TotalDamage + needed}`);
            return needed;
        } else {
            // Not last roll - give high values
            const roll = Math.floor(Math.random() * 6) + 15; // 15-20
            console.log(`*** ATTEMPT 5 - Roll ${rollInCurrentAttempt + 1}: ${roll} ***`);
            return roll;
        }
    }
}

// Update Level 8 UI
function updateLevel8UI(rollValue) {
    // Update roll count
    const rollCount = document.getElementById('rollCount');
    rollCount.textContent = `Rolls: ${level8RollCount} / 3`;
    
    // Update total damage
    const rollTotal = document.getElementById('rollTotal');
    rollTotal.textContent = `Total Damage: ${level8TotalDamage}`;
    
    // Add to roll history
    const rollHistory = document.getElementById('rollHistory');
    const rollResult = document.createElement('div');
    rollResult.className = 'roll-result';
    rollResult.textContent = `⚔️ ${rollValue}`;
    rollHistory.appendChild(rollResult);
    
    // Update health bar
    updateHealthBar();
}

// Update Gatekeeper Health Bar
function updateHealthBar() {
    const healthBar = document.getElementById('gatekeeperHealth');
    const healthText = document.getElementById('healthText');
    
    const remainingHP = Math.max(0, 42 - level8TotalDamage);
    const percentage = Math.max(0, (remainingHP / 42) * 100);
    
    healthBar.style.width = percentage + '%';
    healthText.textContent = `${remainingHP} / 42 HP`;
    
    console.log(`Health updated: ${remainingHP}/42 HP (${percentage.toFixed(1)}%)`);
    
    // Change color when low
    if (percentage < 30 && percentage > 0) {
        healthBar.classList.add('low-health');
    } else if (percentage === 0) {
        healthBar.classList.add('low-health');
    }
}

// Check Level 8 Progress
function checkLevel8Progress() {
    if (level8RollCount >= 3) {
        // Completed 3 rolls
        if (level8TotalDamage >= 42) {
            // Victory! Show 42-second synchronization challenge
            setTimeout(() => {
                show42SecondSync();
            }, 1000);
        } else {
            // Failed - show trivia
            setTimeout(() => {
                showTriviaModal();
            }, 1000);
        }
    }
}

// Show Trivia Modal (The Archives)
function showTriviaModal() {
    const triviaModal = document.getElementById('triviaModal');
    const triviaQuestion = document.getElementById('triviaQuestion');
    const triviaOptions = document.getElementById('triviaOptions');
    const triviaTimer = document.getElementById('triviaTimer');
    const triviaFeedback = document.getElementById('triviaFeedback');
    
    // Select 5 random questions from the pool of 20
    const randomIndices = [...Array(level8TriviaQuestions.length).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
    const shuffledQuestions = randomIndices.map(index => ({
        question: level8TriviaQuestions[index],
        index: index
    }));
    
    let currentQuestionIndex = 0;
    
    function showQuestion() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            // All questions answered - Reset for new attempt
            triviaModal.style.display = 'none';
            
            // Increment attempt number for next round
            level8AttemptNumber++;
            console.log(`\n====== TRIVIA COMPLETE! Moving to ATTEMPT ${level8AttemptNumber} ======\n`);
            
            // Reset everything for new attempt
            level8RollCount = 0;
            level8TotalDamage = 0;
            
            // Clear roll history
            const rollHistory = document.getElementById('rollHistory');
            rollHistory.innerHTML = '';
            
            // Reset health bar to full
            const healthBar = document.getElementById('gatekeeperHealth');
            const healthText = document.getElementById('healthText');
            healthBar.style.width = '100%';
            healthText.textContent = '42 / 42 HP';
            healthBar.classList.remove('low-health');
            
            // Reset roll count display
            const rollCount = document.getElementById('rollCount');
            rollCount.textContent = 'Rolls: 0 / 3';
            
            // Reset total damage display
            const rollTotal = document.getElementById('rollTotal');
            rollTotal.textContent = 'Total Damage: 0';
            
            return;
        }
        
        const questionData = shuffledQuestions[currentQuestionIndex];
        const question = questionData.question;
        
        triviaQuestion.textContent = question.question;
        triviaOptions.innerHTML = '';
        triviaFeedback.style.display = 'none';
        
        // Create option buttons
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'trivia-option';
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => handleTriviaAnswer(index, question.correct, optionBtn));
            triviaOptions.appendChild(optionBtn);
        });
        
        // Start 15 second timer
        let timeLeft = 15;
        triviaTimer.textContent = timeLeft;
        triviaTimer.classList.remove('critical');
        
        if (level8TriviaTimer) clearInterval(level8TriviaTimer);
        
        level8TriviaTimer = setInterval(() => {
            timeLeft--;
            triviaTimer.textContent = timeLeft;
            
            if (timeLeft <= 5) {
                triviaTimer.classList.add('critical');
            }
            
            if (timeLeft <= 0) {
                clearInterval(level8TriviaTimer);
                handleTriviaTimeout();
            }
        }, 1000);
    }
    
    function handleTriviaAnswer(selectedIndex, correctIndex, optionBtn) {
        clearInterval(level8TriviaTimer);
        
        // Disable all options
        const allOptions = document.querySelectorAll('.trivia-option');
        allOptions.forEach(opt => opt.style.pointerEvents = 'none');
        
        if (selectedIndex === correctIndex) {
            // Correct!
            optionBtn.classList.add('correct');
            triviaFeedback.className = 'trivia-feedback correct';
            triviaFeedback.textContent = '✅ CORRECT! You earned an extra roll!';
            triviaFeedback.style.display = 'block';
            
            // Move to next question
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 2000);
        } else {
            // Wrong! Restart from question 1
            optionBtn.classList.add('wrong');
            allOptions[correctIndex].classList.add('correct');
            triviaFeedback.className = 'trivia-feedback wrong';
            triviaFeedback.textContent = '❌ WRONG! Starting from Question 1 again!';
            triviaFeedback.style.display = 'block';
            
            // Screen flicker effect
            createDemogorgonAttack();
            createScreenShake();
            
            // Restart from question 1
            setTimeout(() => {
                currentQuestionIndex = 0;
                showQuestion();
            }, 2500);
        }
    }
    
    function handleTriviaTimeout() {
        triviaFeedback.className = 'trivia-feedback wrong';
        triviaFeedback.textContent = '⏰ TIME OUT! Starting from Question 1 again!';
        triviaFeedback.style.display = 'block';
        
        createDemogorgonAttack();
        createScreenShake();
        
        setTimeout(() => {
            currentQuestionIndex = 0;
            showQuestion();
        }, 2500);
    }
    
    // Show modal and first question
    triviaModal.style.display = 'flex';
    showQuestion();
}

// Demogorgon Attack Effect (Red Flicker)
function createDemogorgonAttack() {
    const level8Section = document.getElementById('level8Section');
    if (level8Section) {
        level8Section.style.animation = 'demogorgonFlicker 0.6s ease-in-out';
        setTimeout(() => {
            level8Section.style.animation = '';
        }, 600);
    }
}

// Show Victory Screen
function showVictoryScreen() {
    const victoryScreen = document.getElementById('victoryScreen');
    
    // Glass shatter effect
    createGlassShatterEffect();
    
    setTimeout(() => {
        victoryScreen.style.display = 'flex';
    }, 1000);
}

// Create Glass Shatter Effect
function createGlassShatterEffect() {
    const shatterOverlay = document.createElement('div');
    shatterOverlay.style.position = 'fixed';
    shatterOverlay.style.top = '0';
    shatterOverlay.style.left = '0';
    shatterOverlay.style.width = '100%';
    shatterOverlay.style.height = '100%';
    shatterOverlay.style.background = 'rgba(255, 255, 255, 1)';
    shatterOverlay.style.zIndex = '24000';
    shatterOverlay.style.animation = 'glassShatter 1s ease-out forwards';
    
    document.body.appendChild(shatterOverlay);
    
    // Add shatter animation to CSS dynamically
    if (!document.getElementById('shatterAnimation')) {
        const style = document.createElement('style');
        style.id = 'shatterAnimation';
        style.textContent = `
            @keyframes glassShatter {
                0% { opacity: 1; }
                50% { opacity: 1; transform: scale(1.2); }
                100% { opacity: 0; transform: scale(2); }
            }
            @keyframes demogorgonFlicker {
                0%, 100% { filter: brightness(1); }
                20% { filter: brightness(0.3) hue-rotate(180deg); }
                40% { filter: brightness(1.5) hue-rotate(90deg); }
                60% { filter: brightness(0.5) hue-rotate(270deg); }
                80% { filter: brightness(1.2); }
            }
            @keyframes screenShake {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                10% { transform: translate(-10px, 5px) rotate(-1deg); }
                20% { transform: translate(10px, -5px) rotate(1deg); }
                30% { transform: translate(-8px, -8px) rotate(-1deg); }
                40% { transform: translate(8px, 8px) rotate(1deg); }
                50% { transform: translate(-10px, 2px) rotate(-0.5deg); }
                60% { transform: translate(10px, -2px) rotate(0.5deg); }
                70% { transform: translate(-6px, 6px) rotate(-0.5deg); }
                80% { transform: translate(6px, -6px) rotate(0.5deg); }
                90% { transform: translate(-3px, 3px) rotate(-0.25deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        document.body.removeChild(shatterOverlay);
    }, 1000);
}

// Demogorgon Attack Effect (Red Flicker)
function createDemogorgonAttack() {
    // Create red flicker overlay
    const flicker = document.createElement('div');
    flicker.style.position = 'fixed';
    flicker.style.top = '0';
    flicker.style.left = '0';
    flicker.style.width = '100%';
    flicker.style.height = '100%';
    flicker.style.zIndex = '9998';
    flicker.style.pointerEvents = 'none';
    flicker.style.background = '#ff0000';
    flicker.style.opacity = '0';
    flicker.style.transition = 'opacity 0.1s';
    
    document.body.appendChild(flicker);
    
    // Flicker sequence
    setTimeout(() => flicker.style.opacity = '0.6', 10);
    setTimeout(() => flicker.style.opacity = '0', 100);
    setTimeout(() => flicker.style.opacity = '0.8', 200);
    setTimeout(() => flicker.style.opacity = '0', 300);
    setTimeout(() => flicker.style.opacity = '0.5', 400);
    setTimeout(() => flicker.style.opacity = '0', 500);
    
    setTimeout(() => {
        document.body.removeChild(flicker);
    }, 600);
}

// Screen Shake Effect
function createScreenShake() {
    const body = document.body;
    body.style.animation = 'screenShake 0.5s ease-in-out';
    setTimeout(() => {
        body.style.animation = '';
    }, 500);
}

// Level 8 Atmospheric Effects
let level8AtmosphereInterval;

function startLevel8AtmosphericEffects() {
    // Clear any existing interval
    if (level8AtmosphereInterval) {
        clearInterval(level8AtmosphereInterval);
    }
    
    // Random red flickers every 8-15 seconds
    level8AtmosphereInterval = setInterval(() => {
        if (document.getElementById('level8Section').style.display === 'block') {
            const random = Math.random();
            if (random < 0.3) {
                createDemogorgonAttack();
            } else if (random < 0.5) {
                createRedFlash();
            }
        } else {
            clearInterval(level8AtmosphereInterval);
        }
    }, Math.random() * 7000 + 8000); // Random between 8-15 seconds
}

// Red Flash Effect
function createRedFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = '#ff0000';
    flash.style.zIndex = '9999';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.15s';
    flash.style.pointerEvents = 'none';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0.4';
    }, 10);
    
    setTimeout(() => {
        flash.style.opacity = '0';
    }, 150);
    
    setTimeout(() => {
        document.body.removeChild(flash);
    }, 300);
}

// ========================================
// 42-SECOND SYNCHRONIZATION CHALLENGE
// ========================================

let syncCountdownTimer = null;
let syncElapsedSeconds = 0;
let syncAudio = null;

// Show 42-Second Synchronization Story
function show42SecondSync() {
    console.log('=== SHOWING 42-SECOND SYNC ===');
    
    // Hide Level 8 puzzle
    const level8Puzzle = document.getElementById('level8Puzzle');
    if (level8Puzzle) {
        level8Puzzle.style.display = 'none';
        console.log('✓ Level 8 puzzle hidden');
    }
    
    // Hide story slides
    const level8StorySlides = document.getElementById('level8StorySlides');
    if (level8StorySlides) {
        level8StorySlides.style.display = 'none';
        console.log('✓ Story slides hidden');
    }
    
    // Hide trivia modal
    const triviaModal = document.getElementById('triviaModal');
    if (triviaModal) {
        triviaModal.style.display = 'none';
        console.log('✓ Trivia modal hidden');
    }
    
    // Show sync story container
    const syncStoryContainer = document.getElementById('syncStoryContainer');
    if (syncStoryContainer) {
        syncStoryContainer.style.display = 'flex';
        console.log('✓ Sync story container displayed');
        console.log('Container computed style:', window.getComputedStyle(syncStoryContainer).display);
        console.log('Container position:', window.getComputedStyle(syncStoryContainer).position);
        console.log('Container z-index:', window.getComputedStyle(syncStoryContainer).zIndex);
        
        // Show proceed button after delay
        setTimeout(() => {
            const proceedBtn = document.getElementById('proceedToCountdownBtn');
            if (proceedBtn) {
                proceedBtn.style.display = 'block';
                // Clone to remove old listeners
                const newBtn = proceedBtn.cloneNode(true);
                proceedBtn.parentNode.replaceChild(newBtn, proceedBtn);
                document.getElementById('proceedToCountdownBtn').addEventListener('click', startCountdownSequence);
                console.log('✓ Proceed button ready');
            } else {
                console.error('✗ Proceed button not found!');
            }
        }, 6000);
    } else {
        console.error('✗ syncStoryContainer not found!');
    }
    
    console.log('=== END SHOW 42-SECOND SYNC ===');
}

// Start Countdown Sequence (3, 2, 1)
function startCountdownSequence() {
    console.log('Starting countdown sequence...');
    
    // Hide sync story
    const syncStoryContainer = document.getElementById('syncStoryContainer');
    if (syncStoryContainer) {
        syncStoryContainer.style.display = 'none';
    }
    
    // Show countdown screen
    const countdownScreen = document.getElementById('countdownScreen');
    const countdownNumber = document.getElementById('countdownNumber');
    
    if (countdownScreen && countdownNumber) {
        countdownScreen.style.display = 'flex';
        console.log('Countdown screen displayed');
        
        let count = 3;
        countdownNumber.textContent = count;
        
        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNumber.textContent = count;
                console.log(`Countdown: ${count}`);
                // Restart animation
                countdownNumber.style.animation = 'none';
                setTimeout(() => {
                    countdownNumber.style.animation = 'countdownPulse 1s ease-in-out';
                }, 10);
            } else {
                clearInterval(countdownInterval);
                console.log('Countdown complete, showing gate challenge');
                countdownScreen.style.display = 'none';
                showGateChallenge();
            }
        }, 1000);
    } else {
        console.error('Countdown elements not found!');
    }
}

// Show Gate Closing Challenge
function showGateChallenge() {
    console.log('Showing gate challenge...');
    
    const gateChallengeContainer = document.getElementById('gateChallengeContainer');
    
    if (gateChallengeContainer) {
        gateChallengeContainer.style.display = 'flex';
        console.log('Gate challenge container displayed');
        
        // Play Vecna music in loop
        syncAudio = new Audio('assets/vecna.mp3');
        syncAudio.volume = 0.5;
        syncAudio.loop = true;
        syncAudio.play().catch(e => console.log('Audio play prevented:', e));
        console.log('Vecna audio started');
        
        // Start hidden countdown
        syncElapsedSeconds = 0;
        syncCountdownTimer = setInterval(() => {
            syncElapsedSeconds++;
        }, 1000);
        
        // Setup button click handler (remove old listener first)
        const closeGateBtn = document.getElementById('closeGateBtn');
        if (closeGateBtn) {
            // Clone to remove all event listeners
            const newBtn = closeGateBtn.cloneNode(true);
            closeGateBtn.parentNode.replaceChild(newBtn, closeGateBtn);
            newBtn.addEventListener('click', handleGateClose);
            console.log('Close gate button ready');
        } else {
            console.error('Close gate button not found!');
        }
    } else {
        console.error('Gate challenge container not found!');
    }
}

// Handle Gate Close Button Click
function handleGateClose() {
    // Stop countdown
    if (syncCountdownTimer) {
        clearInterval(syncCountdownTimer);
        syncCountdownTimer = null;
    }
    
    console.log(`Button pressed at ${syncElapsedSeconds} seconds`);
    
    // Check if within 41-43 seconds range
    if (syncElapsedSeconds >= 41 && syncElapsedSeconds <= 43) {
        // Success! Move to Vecna defeat
        console.log('SUCCESS! Perfect timing!');
        
        // Stop music
        if (syncAudio) {
            syncAudio.pause();
            syncAudio = null;
        }
        
        // Hide gate challenge
        const gateChallengeContainer = document.getElementById('gateChallengeContainer');
        if (gateChallengeContainer) {
            gateChallengeContainer.style.display = 'none';
        }
        
        // Show Vecna defeat
        setTimeout(() => {
            showVecnaDefeat();
        }, 500);
    } else {
        // Failed! Show sync trivia
        console.log(`FAILED! Pressed at ${syncElapsedSeconds} seconds (need 41-43)`);
        showSyncTrivia();
    }
}

// Show Sync Trivia (2 Questions)
function showSyncTrivia() {
    console.log('Showing sync trivia...');
    
    // Stop countdown timer if running
    if (syncCountdownTimer) {
        clearInterval(syncCountdownTimer);
        syncCountdownTimer = null;
        console.log('✓ Countdown timer stopped');
    }
    
    // Stop audio if playing
    if (syncAudio) {
        syncAudio.pause();
        syncAudio.currentTime = 0;
        console.log('✓ Audio stopped');
    }
    
    const syncTriviaModal = document.getElementById('syncTriviaModal');
    const syncTriviaQuestion = document.getElementById('syncTriviaQuestion');
    const syncTriviaOptions = document.getElementById('syncTriviaOptions');
    const syncTriviaTimer = document.getElementById('syncTriviaTimer');
    const syncTriviaFeedback = document.getElementById('syncTriviaFeedback');
    
    if (!syncTriviaModal) {
        console.error('syncTriviaModal not found!');
        return;
    }
    
    // Select 2 random questions from the pool
    const randomIndices = [...Array(level8TriviaQuestions.length).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
    
    const selectedQuestions = randomIndices.map(index => level8TriviaQuestions[index]);
    
    let currentQuestionIndex = 0;
    let syncTriviaTimerInterval = null;
    
    function showSyncQuestion() {
        if (currentQuestionIndex >= selectedQuestions.length) {
            // All questions answered - Reset and try again
            console.log('✓ All trivia questions answered correctly!');
            syncTriviaModal.style.display = 'none';
            
            // Hide gate challenge
            const gateChallengeContainer = document.getElementById('gateChallengeContainer');
            if (gateChallengeContainer) {
                gateChallengeContainer.style.display = 'none';
                console.log('✓ Gate challenge hidden');
            }
            
            // Restart countdown sequence
            setTimeout(() => {
                console.log('➤ Restarting countdown sequence...');
                startCountdownSequence();
            }, 1000);
            
            return;
        }
        
        const question = selectedQuestions[currentQuestionIndex];
        
        syncTriviaQuestion.textContent = question.question;
        syncTriviaOptions.innerHTML = '';
        syncTriviaFeedback.style.display = 'none';
        
        // Create option buttons
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'trivia-option';
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => handleSyncTriviaAnswer(index, question.correct, optionBtn));
            syncTriviaOptions.appendChild(optionBtn);
        });
        
        // Start 15 second timer
        let timeLeft = 15;
        syncTriviaTimer.textContent = timeLeft;
        syncTriviaTimer.classList.remove('critical');
        
        if (syncTriviaTimerInterval) clearInterval(syncTriviaTimerInterval);
        
        syncTriviaTimerInterval = setInterval(() => {
            timeLeft--;
            syncTriviaTimer.textContent = timeLeft;
            
            if (timeLeft <= 5) {
                syncTriviaTimer.classList.add('critical');
            }
            
            if (timeLeft <= 0) {
                clearInterval(syncTriviaTimerInterval);
                handleSyncTriviaTimeout();
            }
        }, 1000);
    }
    
    function handleSyncTriviaAnswer(selectedIndex, correctIndex, optionBtn) {
        clearInterval(syncTriviaTimerInterval);
        
        // Disable all options
        const allOptions = document.querySelectorAll('#syncTriviaOptions .trivia-option');
        allOptions.forEach(opt => opt.style.pointerEvents = 'none');
        
        if (selectedIndex === correctIndex) {
            // Correct!
            optionBtn.classList.add('correct');
            syncTriviaFeedback.className = 'trivia-feedback correct';
            syncTriviaFeedback.textContent = `✅ CORRECT! Question ${currentQuestionIndex + 1}/2 complete!`;
            syncTriviaFeedback.style.display = 'block';
            
            // Move to next question
            setTimeout(() => {
                currentQuestionIndex++;
                showSyncQuestion();
            }, 2000);
        } else {
            // Wrong! Restart from question 1
            optionBtn.classList.add('wrong');
            allOptions[correctIndex].classList.add('correct');
            syncTriviaFeedback.className = 'trivia-feedback wrong';
            syncTriviaFeedback.textContent = '❌ WRONG! Starting from Question 1 again!';
            syncTriviaFeedback.style.display = 'block';
            
            // Screen effects
            createDemogorgonAttack();
            createScreenShake();
            
            // Restart from question 1
            setTimeout(() => {
                currentQuestionIndex = 0;
                showSyncQuestion();
            }, 2500);
        }
    }
    
    function handleSyncTriviaTimeout() {
        syncTriviaFeedback.className = 'trivia-feedback wrong';
        syncTriviaFeedback.textContent = '⏰ TIME OUT! Starting from Question 1 again!';
        syncTriviaFeedback.style.display = 'block';
        
        createDemogorgonAttack();
        createScreenShake();
        
        setTimeout(() => {
            currentQuestionIndex = 0;
            showSyncQuestion();
        }, 2500);
    }
    
    // Show modal and start first question
    syncTriviaModal.style.display = 'flex';
    console.log('Sync trivia modal displayed');
    showSyncQuestion();
}

// Vecna Defeat Sequence
function showVecnaDefeat() {
    // Hide Level 8 puzzle
    const level8Section = document.getElementById('level8Section');
    if (level8Section) {
        level8Section.style.display = 'none';
    }
    
    // Play Vecna music
    const vecnaAudio = new Audio('assets/vecna.mp3');
    vecnaAudio.volume = 0.7;
    vecnaAudio.play().catch(e => console.log('Audio play prevented:', e));
    
    // Create Vecna defeat screen
    const vecnaScreen = document.createElement('div');
    vecnaScreen.id = 'vecnaDefeatScreen';
    vecnaScreen.style.position = 'fixed';
    vecnaScreen.style.top = '0';
    vecnaScreen.style.left = '0';
    vecnaScreen.style.width = '100%';
    vecnaScreen.style.height = '100%';
    vecnaScreen.style.zIndex = '25000';
    vecnaScreen.style.background = `
        linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
        url('assets/vecna.jpg')
    `;
    vecnaScreen.style.backgroundSize = 'cover';
    vecnaScreen.style.backgroundPosition = 'center';
    vecnaScreen.style.display = 'flex';
    vecnaScreen.style.alignItems = 'center';
    vecnaScreen.style.justifyContent = 'center';
    vecnaScreen.style.overflow = 'hidden';
    
    // Create door effect container
    const doorContainer = document.createElement('div');
    doorContainer.style.position = 'absolute';
    doorContainer.style.top = '0';
    doorContainer.style.left = '0';
    doorContainer.style.width = '100%';
    doorContainer.style.height = '100%';
    doorContainer.style.zIndex = '1';
    
    // Left door
    const leftDoor = document.createElement('div');
    leftDoor.style.position = 'absolute';
    leftDoor.style.top = '0';
    leftDoor.style.left = '0';
    leftDoor.style.width = '50%';
    leftDoor.style.height = '100%';
    leftDoor.style.background = 'linear-gradient(to right, #000000, #1a0000)';
    leftDoor.style.borderRight = '5px solid #ff0000';
    leftDoor.style.boxShadow = 'inset -20px 0 50px rgba(255, 0, 0, 0.5)';
    leftDoor.style.transform = 'translateX(-100%)';
    leftDoor.style.transition = 'transform 2s ease-in-out';
    
    // Right door
    const rightDoor = document.createElement('div');
    rightDoor.style.position = 'absolute';
    rightDoor.style.top = '0';
    rightDoor.style.right = '0';
    rightDoor.style.width = '50%';
    rightDoor.style.height = '100%';
    rightDoor.style.background = 'linear-gradient(to left, #000000, #1a0000)';
    rightDoor.style.borderLeft = '5px solid #ff0000';
    rightDoor.style.boxShadow = 'inset 20px 0 50px rgba(255, 0, 0, 0.5)';
    rightDoor.style.transform = 'translateX(100%)';
    rightDoor.style.transition = 'transform 2s ease-in-out';
    
    doorContainer.appendChild(leftDoor);
    doorContainer.appendChild(rightDoor);
    vecnaScreen.appendChild(doorContainer);
    
    const title = document.createElement('h1');
    title.style.fontFamily = "'ITC Benguiat', Georgia, serif";
    title.style.fontSize = 'clamp(3rem, 8vw, 6rem)';
    title.style.color = '#ff0000';
    title.style.textShadow = '0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000';
    title.style.textAlign = 'center';
    title.style.letterSpacing = '10px';
    title.style.animation = 'titlePulse 1s ease-in-out infinite';
    title.style.position = 'relative';
    title.style.zIndex = '2';
    title.textContent = 'VECNA FALLS';
    
    vecnaScreen.appendChild(title);
    document.body.appendChild(vecnaScreen);
    
    // Animate doors closing after 1 second
    setTimeout(() => {
        leftDoor.style.transform = 'translateX(0)';
        rightDoor.style.transform = 'translateX(0)';
    }, 1000);
    
    // Start continuous earthquake, lightning, and thunder for 10 seconds
    let effectsCount = 0;
    const effectsInterval = setInterval(() => {
        createEarthquakeEffect();
        createLightningFlash();
        createThunderShake();
        
        // Add thunder bolts moving across screen
        if (Math.random() > 0.5) {
            createThunderBolt();
        }
        
        effectsCount++;
        
        if (effectsCount >= 20) { // 20 effects over 10 seconds
            clearInterval(effectsInterval);
        }
    }, 500);
    
    // After 10 seconds, show calm ending
    setTimeout(() => {
        // Stop Vecna music
        vecnaAudio.pause();
        vecnaAudio.currentTime = 0;
        
        vecnaScreen.style.transition = 'opacity 2s ease';
        vecnaScreen.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(vecnaScreen);
            showFinalEnding();
        }, 2000);
    }, 10000);
}

// Earthquake Effect
function createEarthquakeEffect() {
    const vecnaScreen = document.getElementById('vecnaDefeatScreen');
    if (vecnaScreen) {
        vecnaScreen.style.animation = 'earthquake 0.5s ease-in-out';
        setTimeout(() => {
            vecnaScreen.style.animation = 'titlePulse 1s ease-in-out infinite';
        }, 500);
    }
}

// Lightning Flash
function createLightningFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = '#ffffff';
    flash.style.zIndex = '26000';
    flash.style.opacity = '0';
    flash.style.pointerEvents = 'none';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0.9';
    }, 10);
    
    setTimeout(() => {
        flash.style.opacity = '0';
    }, 50 + Math.random() * 100);
    
    setTimeout(() => {
        document.body.removeChild(flash);
    }, 200);
}

// Thunder Shake
function createThunderShake() {
    document.body.style.animation = 'thunderShake 0.3s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 300);
}

// Thunder Bolt Effect (moving across screen)
function createThunderBolt() {
    const bolt = document.createElement('div');
    bolt.style.position = 'fixed';
    bolt.style.top = Math.random() * 30 + '%';
    bolt.style.left = '-100px';
    bolt.style.width = Math.random() * 200 + 100 + 'px';
    bolt.style.height = Math.random() * 4 + 2 + 'px';
    bolt.style.background = 'linear-gradient(90deg, transparent, #ffffff, #ffff00, #ffffff, transparent)';
    bolt.style.boxShadow = '0 0 20px #ffff00, 0 0 40px #ffffff';
    bolt.style.zIndex = '26500';
    bolt.style.opacity = '0';
    bolt.style.pointerEvents = 'none';
    bolt.style.transform = 'skewX(-20deg)';
    
    // Add jagged edges
    bolt.style.clipPath = 'polygon(0% 40%, 20% 50%, 40% 30%, 60% 60%, 80% 45%, 100% 50%, 80% 55%, 60% 70%, 40% 55%, 20% 60%)';
    
    document.body.appendChild(bolt);
    
    // Animate across screen
    let position = -100;
    const speed = Math.random() * 15 + 20; // 20-35 pixels per frame
    
    bolt.style.opacity = '0.9';
    
    const moveInterval = setInterval(() => {
        position += speed;
        bolt.style.left = position + 'px';
        
        if (position > window.innerWidth + 100) {
            clearInterval(moveInterval);
            document.body.removeChild(bolt);
        }
    }, 16); // ~60fps
    
    // Fade out quickly
    setTimeout(() => {
        bolt.style.transition = 'opacity 0.1s';
        bolt.style.opacity = '0';
    }, 300);
}

// Final Ending Screen
function showFinalEnding() {
    // Play kids music
    const kidsAudio = new Audio('assets/kids.mp3');
    kidsAudio.volume = 0.6;
    kidsAudio.play().catch(e => console.log('Audio play prevented:', e));
    
    const endingScreen = document.createElement('div');
    endingScreen.style.position = 'fixed';
    endingScreen.style.top = '0';
    endingScreen.style.left = '0';
    endingScreen.style.width = '100%';
    endingScreen.style.height = '100%';
    endingScreen.style.zIndex = '25000';
    endingScreen.style.background = 'radial-gradient(circle, #0a0a0a 0%, #000000 100%)';
    endingScreen.style.display = 'flex';
    endingScreen.style.flexDirection = 'column';
    endingScreen.style.alignItems = 'center';
    endingScreen.style.justifyContent = 'center';
    endingScreen.style.padding = '2rem';
    endingScreen.style.opacity = '0';
    endingScreen.style.transition = 'opacity 3s ease';
    
    const content = `
        <div style="text-align: center; max-width: 800px;">
            <h1 style="font-family: 'ITC Benguiat', Georgia, serif; font-size: clamp(2.5rem, 6vw, 4rem); color: #ff0000; text-shadow: 0 0 20px rgba(255, 0, 0, 0.8); margin-bottom: 2rem; letter-spacing: 8px;">
                THE RIFT IS SEALED
            </h1>
            
            <p style="font-family: 'Special Elite', monospace; font-size: clamp(1rem, 2vw, 1.3rem); color: #d4af37; line-height: 2; margin-bottom: 2rem; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);">
                The Upside Down retreats.<br>
                The lights flicker one last time...<br>
                Then steady.<br><br>
                Hawkins is safe.<br>
                For now.
            </p>
            
            <div style="border-top: 2px solid #ff0000; border-bottom: 2px solid #ff0000; padding: 2rem; margin: 2rem 0; background: rgba(255, 0, 0, 0.1);">
                <h2 style="font-family: 'ITC Benguiat', Georgia, serif; font-size: clamp(1.5rem, 3vw, 2rem); color: #ffaa00; margin-bottom: 1rem;">
                    🎉 CONGRATULATIONS! 🎉
                </h2>
                <p style="font-family: 'Special Elite', monospace; font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: #ffffff;">
                    You've navigated through the darkness,<br>
                    solved the mysteries,<br>
                    and defeated the ultimate evil.<br><br>
                    <strong style="color: #ff0000; font-size: 1.2em;">You are the hero Hawkins needed.</strong>
                </p>
            </div>
            
            <p style="font-family: 'Special Elite', monospace; font-size: clamp(0.8rem, 1.5vw, 1rem); color: #888; margin-top: 2rem; font-style: italic;">
                The adventure ends here...<br>
                But the memories will remain forever in the Upside Down.
            </p>
            
            <div style="margin-top: 3rem; font-size: 3rem;">
                ⚡✨🎮✨⚡
            </div>
        </div>
    `;
    
    endingScreen.innerHTML = content;
    document.body.appendChild(endingScreen);
    
    // Fade in
    setTimeout(() => {
        endingScreen.style.opacity = '1';
    }, 100);
    
    // Add CSS animations if not already added
    if (!document.getElementById('endingAnimations')) {
        const style = document.createElement('style');
        style.id = 'endingAnimations';
        style.textContent = `
            @keyframes earthquake {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                10% { transform: translate(-15px, 10px) rotate(-2deg); }
                20% { transform: translate(15px, -10px) rotate(2deg); }
                30% { transform: translate(-12px, -12px) rotate(-1.5deg); }
                40% { transform: translate(12px, 12px) rotate(1.5deg); }
                50% { transform: translate(-15px, 5px) rotate(-2deg); }
                60% { transform: translate(15px, -5px) rotate(2deg); }
                70% { transform: translate(-10px, 10px) rotate(-1deg); }
                80% { transform: translate(10px, -10px) rotate(1deg); }
                90% { transform: translate(-5px, 5px) rotate(-0.5deg); }
            }
            @keyframes thunderShake {
                0%, 100% { transform: translate(0, 0); }
                10% { transform: translate(-8px, 4px); }
                20% { transform: translate(8px, -4px); }
                30% { transform: translate(-6px, -6px); }
                40% { transform: translate(6px, 6px); }
                50% { transform: translate(-8px, 2px); }
                60% { transform: translate(8px, -2px); }
                70% { transform: translate(-4px, 4px); }
                80% { transform: translate(4px, -4px); }
                90% { transform: translate(-2px, 2px); }
            }
        `;
        document.head.appendChild(style);
    }
}
