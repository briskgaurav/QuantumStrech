"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const textRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if(!audioRef.current) return;
    const audio = audioRef.current;
    console.log(audio)
    const split = new SplitText(textRef.current, {
      type: "words",
    });

    audio.volume = 0;
    audio.muted = true;
    audio.play()
      .then(() => {
        setTimeout(() => {
          audio.muted = false;
          gsap.to(audio, {
            volume: 1,
            duration: 2,
            ease: "power2.out",
          });
        }, 500);
      })
      .catch((err) => {
        console.warn("Autoplay error:", err);
      });

    gsap.from(split.words, {
      opacity: 0,
      duration: 2,
      stagger: 0.5,
      ease: "power4.out",
    });

    return () => {
      split.revert();
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <section
      className="flex justify-center items-center h-screen w-full "
      id="hero"
    >
      <audio ref={audioRef} src="/intro.mp3" preload="auto" />

      <h1
        ref={textRef}
        className="text-white text-center leading-none font-light font-sans text-[2.5vw] w-[70%]"
      >
        Discover Quantum, revolutionizing the packaging industry with
        unparalleled elasticity and durability. Where traditional wraps falter,
        Quantum stands firm.
      </h1>
    </section>
  );
}
