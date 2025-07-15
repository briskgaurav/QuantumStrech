"use client";
import React, { useEffect, useMemo } from "react";
import { createScrollAnimation } from "@/app/Animation";


export default function Performance3() {
  const cards = useMemo(
    () => [
      {
        title: "100% from renewable energy sources",
        description:
          "Quantum is the only stretch film produced using 100% renewable energy sources from its own production, offering an eco-friendly and efficient product.",
      },
      {
        title: "Reduced carbon footprint",
        description:
          "Our innovative manufacturing process significantly reduces carbon emissions while maintaining superior product quality and performance.",
      },
      {
        title: "Sustainable packaging solution",
        description:
          "Quantum represents the future of sustainable packaging, combining environmental responsibility with unmatched strength and reliability.",
      },
    ],
    []
  );

  useEffect(() => {
    const animation = createScrollAnimation(
      ".performance3-text",
      ".performance-container3",
      "15%",
      0.3
    );

    return () => animation.kill();
  }, []);

  const cardStyles = useMemo(
    () => ({
      container:
        "w-full max-sm:w-[80%] max-md:w-[70%] h-full performance3-text translate-x-[15%] bg-white/5 backdrop-blur-sm rounded-lg p-[3%] shadow-lg",
      logo: "logo flex items-center justify-center h-[40%] max-sm:h-fit w-full",
      content: "flex flex-col pt-[10vw] max-sm:gap-[5vw] gap-[3%]",
      title:
        "text-[1.2vw] max-sm:text-[5vw] max-sm:text-center uppercase pt-[5%] max-md:text-[4vw] max-md:text-center font-medium text-zinc-300",
      description:
        "text-[1vw] max-md:text-[2.5vw] max-md:text-center max-sm:text-[3vw] max-sm:text-center text-zinc-100",
    }),
    []
  );

  return (
    <section
      className="flex justify-center py-[5%] items-center min-h-screen w-full performance-container3"
      id="performance3"
    >
      <div className="w-[90%] h-full flex flex-col md:flex-row items-center max-sm:gap-[5vw] gap-[2%] max-md:gap-[10vw] py-[3%]">
        {cards.map((card, index) => (
          <div key={index} className={cardStyles.container}>
            <div className={cardStyles.logo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 41 40"
                fill="none"
                className="w-[30%] h-[30%]"
              >
                <path
                  d="M40.5 31.6084V40H20.4303C20.2436 40 20.0582 39.9972 19.8728 39.9916C9.123 39.6965 0.5 30.8587 0.5 20C0.5 9.1416 9.42265 0.203488 20.4338 0.203488C31.4438 0.203488 40.606 8.95385 40.3606 20C40.3666 22.9977 39.7028 25.8392 38.5526 28.3916C28.4108 26.2769 31.9983 23.2979 31.9983 20C31.9983 13.5986 26.8094 8.39161 20.4303 8.39161C14.0512 8.39161 8.86237 13.5986 8.86237 20C8.86237 26.4014 13.5986 31.5287 20.2909 31.6042V31.6084H40.5Z"
                  fill="url(#paint0_linear_834_516)"
                />
                <defs>
                  <linearGradient
                    xmlns="http://www.w3.org/2000/svg"
                    id="paint0_linear_834_516"
                    x1="10.5561"
                    y1="5.80756"
                    x2="24.5442"
                    y2="38.4678"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#B2883E" />
                    <stop offset="0.132936" stopColor="#E0B54D" />
                    <stop offset="0.186698" stopColor="#ECD799" />
                    <stop offset="0.325922" stopColor="#AB8C40" />
                    <stop offset="0.558973" stopColor="#E0B54D" />
                    <stop offset="0.682701" stopColor="#C29743" />
                    <stop offset="1" stopColor="#FEF2BD" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={cardStyles.content}>
              <p className={cardStyles.title}>{card.title}</p>
              <p className={cardStyles.description}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
