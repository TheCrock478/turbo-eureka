// opArt.js

// NOTE: This file is completely independent of appPortfolio.js.

// --- OP ART ANIMATION MODULE (Minimal & Isolated) ---

// Function to start the animation
function initOpArtAnimation() {
    const stripes = document.querySelector(".op-art-stripes");

    if (!stripes) {
        console.error("The .op-art-stripes element is missing. Check index.html and styles.css.");
        return;
    }

    // 1. Horizontal Slide Animation (The stable base movement)
    // Moves the stripes left and right repeatedly
    gsap.fromTo(stripes, 
        { 
            x: 0 
        }, 
        {
            x: -100, // Move 100px left
            duration: 4, 
            ease: "none",
            repeat: -1, 
            yoyo: true 
        }
    );
    
    // 2. Skew/Warp Animation (Creates the illusion of bending/waves)
    // Runs concurrently with the slide, applying a subtle vertical skew
    gsap.fromTo(stripes, 
        { 
            skewY: 0 // Start with no skew
        }, 
        {
            skewY: 0.5, // Subtle vertical skew
            duration: 2, // Runs at half the speed of the horizontal slide
            ease: "sine.inOut",
            repeat: -1, 
            yoyo: true 
        }
    );
}

// Function to show/hide the Op Art section and manage the animation lifecycle
function toggleOpArtSection(show) {
    // Uses the class name defined in our initial plan
    const opArtSection = document.querySelector(".op-art-container"); 
    
    if (!opArtSection) {
        console.error("The .op-art-container is missing.");
        return;
    }

    if (show) {
        opArtSection.style.display = 'block';
        initOpArtAnimation(); // Start the animation when shown
    } else {
        opArtSection.style.display = 'none';
        
        // Kill any GSAP animations on the stripes when hidden for optimization
        const stripes = document.querySelector(".op-art-stripes");
        if (stripes) {
            gsap.killTweensOf(stripes);
        }
    }
}