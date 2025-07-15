'use client'
import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Performance2() {
  useEffect(() => {
    gsap.set(".performance2-text", { opacity: 0 });

    gsap.to(".performance2-text", {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".performance-container2",
        start: "top center",
        end: "bottom center",
        scrub: true,
        // markers: true,
      },
    });
  }, []);

  return (
    <section className="flex justify-center flex-col items-center min-h-screen w-full performance-container2 py-[5%]">
      <h1 className="text-white translate-x-[15%] performance2-text text-center leading-none font-light font-sans text-[1.8vw] max-sm:text-[6vw] w-[70%] max-sm:w-[90%] max-md:text-[4vw] max-sm:translate-x-[5%]">
        In the world of packaging, every detail counts. Quantum emerges at the{" "}
        <br className="max-sm:hidden" />
        intersection of innovation and necessity, designed for those who seek
        the best.
      </h1>
      <div className="w-[65%]  max-sm:w-[90%] py-[5%] flex flex-col md:flex-row justify-between max-sm:gap-[5vw] max-md:gap-[10vw] gap-[5%]">
        <div className="md:w-[47.5%] max-md:text-[2.5vw] w-full performance2-text translate-x-[15%] max-sm:translate-x-[5%] text-[1vw] max-sm:text-[4vw] text-zinc-500">
          Traditional wraps have set a standard; Quantum redefines it. Every
          inch is engineered for optimal performance, embracing products with
          unmatched resilience. While many films promise protection, Quantum
          delivers it consistently, adapting to diverse challenges with grace
          and tenacity.
        </div>
        <div className="md:w-[47.5%] w-full max-md:text-[2.5vw] performance2-text translate-x-[15%] max-sm:translate-x-[5%]  text-[1vw] max-sm:text-[4vw]  text-zinc-500">
          Beyond just wrapping, Quantum is a testament to advanced material
          science. Its properties, meticulously enhanced, work in harmony to
          safeguard every package. From the initial stretch to long-term
          retention, experience the peace of mind that only Quantum's superior
          design can provide.
        </div>
      </div>
    </section>
  );
}
