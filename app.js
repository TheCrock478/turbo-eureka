document.addEventListener("DOMContentLoaded",()=>{

  gsap.registerPlugin(ScrollTrigger);


  console.log(ScrollTrigger);

  const shapes = document.querySelectorAll(".shape");

  const texts = document.querySelectorAll(".large-text");

  const subHeadingOne = document.getElementById("sub-heading1");

  
  console.log(subHeadingOne);

      console.log(texts);

    texts.forEach(text =>{

        gsap.to(text, {

            opacity: 1,
            duration: 1,

            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "top 20%",scrub: true,
            }
        });
    });

    gsap.to(texts, {
        y:50,
        duration: 3,
        ease: "sine.inout",
        repeat: -1,
        yoyo: true,

    });
     
   shapes.forEach(shape => {
        gsap.to(shape, {
          y: 100,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 4,
        });
      });



if(subHeadingOne){

  gsap.set(subHeadingOne, {

x: 600,
  });

    gsap.to(subHeadingOne, {
        
       x: 0,
       opacity: "100%" ,

      duration: 1,
        
      ease: "sine.inOut",
      repeat: 0,
      yoyo: true,
      ease: "power3.out",
 
      });

}



});