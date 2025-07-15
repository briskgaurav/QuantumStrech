'use client'
import React, { useEffect, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyCards() {
  const cards = useMemo(() => [
    {
      title: "Advanced Polymer Technology",
      para: "Quantum's elasticity truly stands out. Designed to stretch further without breaking, it most-efficiently wraps diverse shapes, ensuring minimal waste and optimal coverage.",
    },
    {
      title: "Enhanced Load Stability", 
      para: "Quantum's stretch film is designed to maintain its shape and elasticity, providing consistent performance and protection for a wide range of products.",
    },
    {
      title: "Superior Film Strength",
      para: "Quantum's stretch film is designed to maintain its shape and elasticity, providing consistent performance and protection for a wide range of products.",
    },
    {
      title: "Optimized Stretch Memory",
      para: "Quantum's stretch film is designed to maintain its shape and elasticity, providing consistent performance and protection for a wide range of products.",
    },
  ], []);

  const styles = useMemo(() => ({
    container: "flex justify-center items-center technologyCards-container min-h-screen w-full py-[5vh]",
    grid: "w-[90%] max-w-[1400px] max-md:grid-cols-2 max-sm:grid-cols-2 grid grid-cols-1 md:grid-cols-2 gap-[4vw] md:gap-[3vw]",
    card: "w-full h-fit max-sm:w-[100%] bg-white/5 backdrop-blur-sm rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 technologyCards-text",
    cardHeader: "w-full bg-white/10 rounded-t-lg",
    title: "text-white text-[3vw] md:text-[1.8vw] lg:text-[1.4vw] font-light p-[3vw] md:p-[2vw]",
    divider: "p-[2px] bg-gradient-to-r from-[#B2883E] via-[#E0B54D] to-[#FEF2BD]",
    paragraph: "text-white text-[2.5vw] md:text-[1.4vw] lg:text-[1vw] py-[3vw] md:py-[2vw] font-light px-[3vw] md:px-[2vw]"
  }), []);

  useEffect(() => {
    const animation = gsap.timeline()
      .set(".technologyCards-text", { opacity: 1 })
      .from(".technologyCards-text", {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".technologyCards-container",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

    return () => animation.kill();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>{card.title}</h3>
            </div>
            <div className={styles.divider}></div>
            <div>
              <p className={styles.paragraph}>{card.para}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
