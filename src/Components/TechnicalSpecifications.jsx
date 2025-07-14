import gsap from "gsap";
import React, { useEffect } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnicalSpecifications() {
  useEffect(() => {
    gsap.to(".specifications-text", {
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
  }, []);

  return (
    <section
      className=" flex justify-center items-center h-screen w-full technical-specifications-container"
      id="technical-specifications"
    >
      <div className="flex flex-col translate-y-[300%] specifications-text bg-teal-500/5  p-10 backdrop-blur-sm rounded-2xl  items-center justify-center">
        <p className=" text-yellow-400 text-sm uppercase">contact us for</p>
        <h1 className="text-white text-4xl font-light font-sans">
          TechnicalSpecifications
        </h1>
      </div>
    </section>
  );
}
