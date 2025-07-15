"use client";
import React, { useEffect, useMemo } from "react";
import { createScrollAnimation } from "@/app/Animation";

export default function Performance() {
  const textStyles = useMemo(() => (
    "text-white translate-x-[15%] performance-text text-[8vw] max-sm:text-[12vw] w-[80%] max-sm:uppercase max-sm:w-[90%] font-light font-sans leading-none text-center"
  ), []);

  useEffect(() => {
    const animation = createScrollAnimation(
      ".performance-text",
      ".performance-container",
      "15%",
      0.2
    );

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
