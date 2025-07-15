'use client'
import React, { useEffect, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewTechnology() {
  const textStyles = useMemo(() => ({
    container: "flex justify-center items-center h-screen w-full technology-container",
    heading: "text-white text-center translate-x-[15vw] -translate-y-[15vh] leading-none font-light max-sm:uppercase max-sm:text-[12vw] font-sans text-[7vw] w-[70%] new-technology-text"
  }), []);

  useEffect(() => {
    const animation = gsap.timeline()
      .set(".new-technology-text", { opacity: 0 })
      .to(".new-technology-text", {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".technology-container",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

    return () => animation.kill();
  }, []);

  return (
    <section className={textStyles.container} id="technology">
      <h1 className={textStyles.heading}>New Technology</h1>
    </section>
  );
}
