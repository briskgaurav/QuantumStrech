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
    <section className=" flex justify-center flex-col items-center h-screen w-full performance-container2 ">
      <h1 className="text-white translate-x-[150px] performance2-text text-center leading-none font-light font-sans text-[1.8vw] w-[70%]">
        In the world of packaging, every detail counts. Quantum emerges at the{" "}
        <br />
        intersection of innovation and necessity, designed for those who seek
        the best.
      </h1>
      <div className="w-[65%] py-10 flex justify-between gap-30">
        <div className="w-[50%] performance2-text  translate-x-[150px] text-sm text-zinc-500">
          Traditional wraps have set a standard; Quantum redefines it. Every
          inch is engineered for optimal performance, embracing products with
          unmatched resilience. While many films promise protection, Quantum
          delivers it consistently, adapting to diverse challenges with grace
          and tenacity.
        </div>
        <div className="w-[50%] performance2-text  translate-x-[150px] text-sm text-zinc-500">
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
