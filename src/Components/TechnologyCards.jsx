import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyCards() {
  useEffect(() => {
    gsap.set(".technologyCards-text", { opacity: 1 });

    gsap.from(".technologyCards-text", {
    
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
  }, []);
  return (
    <section className=" flex justify-center items-center technologyCards-container h-screen w-full ">
      <div className="w-[80%]  h-[100%] grid grid-cols-2 gap-8">
        {[
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
        ].map((card, index) => (
          <div
            key={index}
            className="w-full md:w-80 lg:w-96 h-fit bg-white/5 backdrop-blur-sm rounded-lg shadow-lg hover:scale-105 transition-transform -translate-x-[-150px] duration-300 technologyCards-text"
          >
            <div className="w-full bg-white/10 rounded-t-lg">
              <h3 className="text-white text-base md:text-lg lg:text-xl font-light p-3 md:p-4">
                {card.title}
              </h3>
            </div>
            <div className="p-[2px] bg-gradient-to-r from-[#B2883E] via-[#E0B54D] to-[#FEF2BD] "></div>
            <div>
              <p className="text-white text-[10px] md:text-xs lg:text-sm py-6 md:py-8 font-light p-3 md:p-4">
                {card.para}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
