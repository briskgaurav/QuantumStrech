import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
    
export const createScrollAnimation = (
  elementClass,
  triggerClass,
  initialX = "15%",
  staggerDelay = 0.3
) => {
  return gsap.fromTo(
    elementClass,
    {
      opacity: 0,
      x: initialX
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: staggerDelay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggerClass,
        start: "top center",
        end: "bottom center", 
        scrub: true,
      },
    }
  );
};

