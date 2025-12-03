// appPortfolio.js

// Ensure ScrollTrigger is registered if you decide to add pinning later, 
// though it's not currently used for the spin logic here.
// gsap.registerPlugin(ScrollTrigger); 

document.addEventListener("DOMContentLoaded", () => {
    // 1. Element Selections
    const spinLayer = document.querySelector(".rotation-spin-layer"); 
    
    const bottomCircle1 = document.querySelector(".circle-button1");
    const bottomCircle2 = document.querySelector(".circle-button2");
    const bottomCircle3 = document.querySelector(".circle-button3");

    if (!spinLayer) {
        console.error("The spinning layer is missing. Check HTML structure/IDs.");
        return; 
    }

    // =========================================================
    // CONTINUOUS, INDEPENDENT ROTATION
    // This is the main spin logic that runs continuously via CSS/GSAP
    gsap.set(spinLayer, { transformOrigin: "50% 50%" }); 
    
    gsap.to(spinLayer, {
        rotation: 360,
        duration: 8, // Continuous spin speed
        ease: "none",
        repeat: -1, 
        yoyo: false,
    });
    // =========================================================

    // --- BUTTON ANIMATION LOGIC (Tied to GSAP Ticker) ---
    // Makes the buttons lift when the spinning layer rotates near the 270 degree mark
    function updateButtonPosition() {
        // Read the current rotation value of the spinning layer
        let rotation = gsap.getProperty(spinLayer, "rotation") % 360;
        if (rotation < 0) rotation += 360;

        let bottomY = 0;

        // Logic to make buttons lift when rotation is near 270 degrees
        if (rotation >= 245 && rotation <= 295) {
            const distanceFrom270 = Math.abs(270 - rotation);
            // Calculate lift amount (max lift is 60px up)
            bottomY = ((25 - distanceFrom270) / 25) * -60; 
        }

        gsap.to([bottomCircle1, bottomCircle2, bottomCircle3], {
            y: bottomY,
            duration: 0.3,
            stagger: {
                each: 0.15,
                from: "end" 
            },
            overwrite: "auto"
        });
    }

    // Add the function to the GSAP ticker for frame-by-frame updates
    gsap.ticker.add(updateButtonPosition);
    // ----------------------------------------------------------------------------------

    // --- BUTTON CLICK LISTENERS (Currently just console logging) ---
    if (bottomCircle1) bottomCircle1.addEventListener("click", () => { console.log("Circle 1 Clicked"); });
    if (bottomCircle2) bottomCircle2.addEventListener("click", () => { console.log("Circle 2 Clicked"); });
    if (bottomCircle3) bottomCircle3.addEventListener("click", () => { console.log("Circle 3 Clicked"); });

});