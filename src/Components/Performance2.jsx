'use client'
import React, { useEffect, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Performance2() {
  const textStyles = useMemo(() => ({
    base: "performance2-text translate-x-[15%] max-sm:translate-x-[5%]",
    heading: "text-white text-center leading-none font-light font-sans text-[1.8vw] max-sm:text-[6vw] w-[70%] max-sm:w-[90%] max-md:text-[4vw]",
    paragraph: "text-[1vw] max-sm:text-[4vw] max-md:text-[2.5vw] text-zinc-500"
  }), []);

  useEffect(() => {
    const animation = gsap.timeline()
      .set(".performance2-text", { opacity: 0 })
      .to(".performance2-text", {
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
        },
      });

    return () => animation.kill();
  }, []);

  return (
    <section className="flex justify-center flex-col items-center min-h-screen w-full performance-container2 py-[5%]">
      <h1 className={`${textStyles.base} ${textStyles.heading}`}>
        In the world of packaging, every detail counts. Quantum emerges at the{" "}
        <br className="max-sm:hidden" />
        intersection of innovation and necessity, designed for those who seek
        the best.
      </h1>
      <div className="w-[65%] max-sm:w-[90%] py-[5%] flex flex-col md:flex-row justify-between max-sm:gap-[5vw] max-md:gap-[10vw] gap-[5%]">
        <div className={`md:w-[47.5%] w-full ${textStyles.base} ${textStyles.paragraph}`}>
          Traditional wraps have set a standard; Quantum redefines it. Every
          inch is engineered for optimal performance, embracing products with
          unmatched resilience. While many films promise protection, Quantum
          delivers it consistently, adapting to diverse challenges with grace
          and tenacity.
        </div>
        <div className={`md:w-[47.5%] w-full ${textStyles.base} ${textStyles.paragraph}`}>
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
