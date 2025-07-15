"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const textRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
   
    const split = new SplitText(textRef.current, { type: "words" });


    const animateText = () => {
      gsap.from(split.words, {
        opacity: 0,
        duration: 2,
        stagger: 0.5,
        ease: "power4.out",
      });
    };

    animateText();

    return () => {
      split.revert();
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <section className="flex justify-center items-center h-screen w-screen" id="hero">
      <audio ref={audioRef} src="/intro.mp3" preload="auto" />
      <p 
        ref={textRef}
        className="text-white text-center leading-none font-light font-sans text-[2.5vw] max-sm:text-[8vw] max-md:text-[5vw] max-sm:w-[90%] max-sm:leading-[1.2] w-[80%]"
      >
        Discover Quantum, revolutionizing the packaging industry with
        unparalleled elasticity and durability. Where traditional wraps falter,
        Quantum stands firm.
      </p>
    </section>
  );
}
