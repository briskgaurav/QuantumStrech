import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export default function PunctureResitance() {
  useEffect(() => {
    gsap.set(".puncture-resitance-text", { opacity: 0 });

    const tl = gsap.timeline({scrollTrigger: {
      trigger: ".puncture-resitance-container",
      start: "top top",
      end: "bottom center",
      scrub: true,
      // markers: true,
      pin: true,
    }});

    tl.to(".puncture-resitance-text", {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    tl.to(".puncture-text-animation", {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);
  return (
    <section
      className="flex relative py-[5%] h-screen w-full px-[5%] md:px-[7%] puncture-resitance-container"
      id="puncture-resitance"
    >
      <h1 className="text-white puncture-resitance-text leading-none font-normal font-sans text-[8vw] max-sm:text-[12vw] max-sm:uppercase max-sm:mt-[40%] md:text-[4vw] max-sm:text-center w-full">
        Puncture Resitance
      </h1>
      <div className="absolute bg-white/5 backdrop-blur-sm rounded-lg bottom-[5%] right-[5%] w-[90%] md:w-[50%] p-[3%]">
        <p className="text-white puncture-text-animation text-[4vw] max-sm:text-center md:text-[1.5vw] tracking-wide font-light">
          {" "}
          Traditional wraps have set a standard; Quantum redefines it. Every
          inch is engineered for optimal performance, embracing products with
          unmatched resilience. While many films promise protection, Quantum
          delivers it consistently, adapting to diverse challenges with grace
          and tenacity.
        </p>
      </div>
    </section>
  );
}
