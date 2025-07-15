'use client'
import React, { useEffect, useMemo } from "react";
import { createScrollAnimation } from "@/app/Animation";


export default function NewTechnology() {
  const textStyles = useMemo(() => ({
    container: "flex justify-center items-center h-screen w-full technology-container",
    heading: "text-white text-center translate-x-[15vw] -translate-y-[15vw] leading-none font-light max-sm:uppercase max-sm:text-[12vw] font-sans text-[7vw] w-[70%] new-technology-text"
  }), []);

  useEffect(() => {
   const animation = createScrollAnimation(
    ".new-technology-text",
    ".technology-container",
    "15%",
    0.3
   );

    return () => animation.kill();
  }, []);

  return (
    <section className={textStyles.container} id="technology">
      <p className={textStyles.heading}>New Technology</p>
    </section>
  );
}
