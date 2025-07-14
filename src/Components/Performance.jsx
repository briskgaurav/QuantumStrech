"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Performance() {
  useEffect(() => {
    gsap.set(".performance-text", { opacity: 0 }); 

    gsap.to(".performance-text", {
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
  }, []);

  return (
    <section className="flex flex-col justify-center items-center h-screen w-full performance-container">
      <p className="text-white translate-x-[150px] performance-text text-8xl w-[50%] font-light font-sans leading-none text-center">
        Strong Film 
      </p>
      <p className="text-white translate-x-[150px] performance-text text-8xl w-[50%] font-light font-sans leading-none text-center">
        Performance
      </p>
    </section>
  );
}
