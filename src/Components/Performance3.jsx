"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Performance3() {
  useEffect(() => {
    gsap.set(".performance3-text", { opacity: 0 });

    gsap.to(".performance3-text", {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".performance-container3",
        start: "top center",
        end: "bottom center",
        scrub: true,
        // markers: true,
      },
    });
  }, []);

  return (
    <section
      className="flex justify-center py-10 md:py-20 items-center min-h-screen w-full performance-container3"
      id="performance3"
    >
      <div className="w-[90%] md:w-[80%] lg:w-[70%] h-full md:h-[80%] flex flex-col md:flex-row items-center gap-6 py-10">
        {[
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
        ].map((card, index) => (
          <div
            key={index}
            className="cards w-full h-full performance3-text translate-x-[150px] bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg"
          >
            <div className="logo flex items-center justify-center h-[40%] md:h-[60%] w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 41 40"
                fill="none"
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
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
            <div className="flex flex-col gap-3 md:gap-5">
              <p className="text-[10px] md:text-xs uppercase pt-5 md:pt-10 font-medium text-zinc-300">
                {card.title}
              </p>
              <p className="text-xs md:text-sm text-zinc-100">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
