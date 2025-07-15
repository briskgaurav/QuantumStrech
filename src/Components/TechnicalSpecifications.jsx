'use client'
import gsap from "gsap";
import React, { useEffect, useMemo } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnicalSpecifications() {
  const styles = useMemo(() => ({
    section: "flex justify-center items-center min-h-screen w-full py-[5vh] technical-specifications-container",
    container: "flex flex-col translate-y-[300%] specifications-text bg-white/5 p-[5vw] md:p-[3vw] backdrop-blur-sm rounded-2xl items-center justify-center w-[90%] md:w-[60%] max-w-[800px]",
    paragraph: "text-yellow-400 text-[4vw] md:text-[1.2vw] uppercase tracking-wider",
    heading: "text-white text-[10vw] max-sm:pt-[20%] max-sm:uppercase max-sm:leading-[1] md:text-[3vw] font-light font-sans text-center"
  }), []);

  useEffect(() => {
    const animation = gsap.to(".specifications-text", {
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

    return () => animation.kill();
  }, []);

  return (
    <section className={styles.section} id="technical-specifications">
      <div className={styles.container}>
        <p className={styles.paragraph}>contact us for</p>
        <h1 className={styles.heading}>Technical Specifications</h1>
      </div>
    </section>
  );
}
