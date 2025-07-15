"use client";
import React, { useEffect, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Performance() {
  const textStyles = useMemo(() => (
    "text-white translate-x-[15%] performance-text text-[8vw] max-sm:text-[12vw] w-[80%] max-sm:uppercase max-sm:w-[90%] font-light font-sans leading-none text-center"
  ), []);

  useEffect(() => {
    const texts = document.querySelectorAll(".performance-text");
    
    gsap.set(texts, { opacity: 0 });

    const animation = gsap.to(texts, {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".performance-container",
        start: "top center",    
        end: "bottom center",
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="flex flex-col justify-center items-center h-screen w-full performance-container">
      <p className={textStyles}>Strong Film</p>
      <p className={textStyles}>Performance</p>
    </section>
  );
}
