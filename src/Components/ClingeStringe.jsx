import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export default function ClingeStringe() {
  useEffect(() => {
    gsap.set(".clinge-stringe-text", { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".clingestringe-container",
        start: "top top",
        end: "bottom center",
        scrub: true,
        // markers: true,
        pin: true,
      },
    });

    tl.to(".clinge-stringe-text", {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    tl.to(".clinge-text-animation", {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <section
      className=" p-20 h-screen w-full relative clingestringe-container"
      id="clingestringe"
    >
      {" "}
      <h1 className="text-white clinge-stringe-text leading-none font-normal font-sans text-[4vw] w-full">
        Clinge Stringe
      </h1>
      <div className="absolute  bg-white/5 backdrop-blur-sm rounded-lg bottom-10 right-10 w-[50%]  p-4">
        <p className="text-white clinge-text-animation text-md tracking-wide font-light">
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
