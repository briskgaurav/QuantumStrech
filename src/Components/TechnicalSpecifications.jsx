import gsap from "gsap";
import React, { useEffect } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnicalSpecifications() {
  useEffect(() => {
    gsap.to(".specifications-text", {
      opacity: 1,
      y: "0%",
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".technical-specifications-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      className="flex justify-center items-center min-h-screen w-full py-[5vh] technical-specifications-container"
      id="technical-specifications"
    >
      <div className="flex flex-col translate-y-[300%] specifications-text bg-white/5 p-[5vw] md:p-[3vw] backdrop-blur-sm rounded-2xl items-center justify-center w-[90%] md:w-[60%] max-w-[800px]">
        <p className="text-yellow-400 text-[4vw] md:text-[1.2vw] uppercase tracking-wider">contact us for</p>
        <h1 className="text-white text-[10vw] max-sm:pt-[20%] max-sm:uppercase max-sm:leading-[1] md:text-[3vw] font-light font-sans text-center">
          Technical Specifications
        </h1>
      </div>
    </section>
  );
}
