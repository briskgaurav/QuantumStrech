'use client'
import React, { useEffect, useMemo } from "react";
import { createScrollAnimation } from "@/app/Animation";

export default function PunctureResitance() {
  const styles = useMemo(() => ({
    section: "flex relative py-[5%] h-screen w-full px-[5%] md:px-[7%] puncture-resitance-container",
    heading: "text-white puncture-resitance-text leading-none font-normal font-sans text-[8vw] max-sm:text-[12vw] max-sm:uppercase max-sm:mt-[40%] md:text-[4vw] max-sm:text-center w-full",
    textContainer: "absolute bg-white/5 backdrop-blur-sm rounded-lg bottom-[5%] right-[5%] w-[90%] md:w-[50%] p-[3%]",
    paragraph: "text-white puncture-text-animation text-[4vw] max-sm:text-center md:text-[1.5vw] tracking-wide font-light"
  }), []);

  useEffect(() => {
    const animation = createScrollAnimation(
      [".puncture-resitance-text", ".puncture-text-animation"],
      ".puncture-resitance-container", 
      "15%",
      0.2
    );

    return () => tl.kill();
  }, []);

  return (
    <section className={styles.section} id="puncture-resitance">
      <p className={styles.heading}>Puncture Resitance</p>
      <div className={styles.textContainer}>
        <p className={styles.paragraph}>
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
