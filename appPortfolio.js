document.addEventListener("DOMContentLoaded", () => {
    // 1. Element Selections
    const graphic = document.querySelector(".graphic-wrapper");
    const opArtContainer = document.getElementById("opArtContainer");
    
    const spinLayer = document.querySelector(".rotation-spin-layer"); 
    
    const bottomCircle1 = document.querySelector(".circle-button1");
    const bottomCircle2 = document.querySelector(".circle-button2");
    const bottomCircle3 = document.querySelector(".circle-button3");

    if (!graphic || !opArtContainer || !spinLayer) {
         console.error("One or more critical elements are missing. Check HTML structure/IDs.");
         return; 
    }

    // =========================================================
    // CONTINUOUS, INDEPENDENT ROTATION
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

    gsap.ticker.add(updateButtonPosition);
    // ----------------------------------------------------------------------------------


    --- OP ART LINES GENERATION & CONTINUOUS ANIMATION ---
    function generateOpArtLines(container, count) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        
        const containerHeight = window.innerHeight; 
        const spacing = window.innerWidth / count; 

        for (let i = 0; i < count; i++) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const xPos = i * spacing;
            
            line.setAttribute("x1", xPos);
            line.setAttribute("y1", 0);
            line.setAttribute("x2", xPos);
            line.setAttribute("y2", containerHeight);
            line.setAttribute("stroke", "black");
            line.setAttribute("stroke-width", 1); 
            line.classList.add("op-line");

            svg.appendChild(line);
        }
        container.appendChild(svg);
    }
    
    generateOpArtLines(opArtContainer, 200); 
    const opLines = gsap.utils.toArray(".op-line");

    // Op Art Continuous Animation
    gsap.to(opLines, {
        y: (i) => { return i % 2 === 0 ? 50 : -50; },
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1, 
        yoyo: true, 
        stagger: {
            each: 0.05,
            from: "center",
        }
    });

    // --- BUTTON CLICK LISTENERS ---
    if (bottomCircle1) bottomCircle1.addEventListener("click", () => { console.log("Circle 1 Clicked"); });
    if (bottomCircle2) bottomCircle2.addEventListener("click", () => { console.log("Circle 2 Clicked"); });
    if (bottomCircle3) bottomCircle3.addEventListener("click", () => { console.log("Circle 3 Clicked"); });
});