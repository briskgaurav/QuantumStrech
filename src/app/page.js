'use client'
import Blob from "@/Components/Blob";
import Hero from "@/Components/Hero";
import Performance from "@/Components/Performance";
import Performance2 from "@/Components/Performance2";
import Performance3 from "@/Components/Performance3";
import NewTechnology from "@/Components/NewTechnology";
import TechnologyCards from "@/Components/TechnologyCards";
import PunctureResitance from "@/Components/PunctureResitance";
import ClingeStringe from "@/Components/ClingeStringe";
import TechnicalSpecifications from "@/Components/TechnicalSpecifications";
import React from "react";
import Form from "@/Components/Form";
export default function page() {
  return (
    <>
      <Blob />
      <div className="h-screen  w-screen model-container z-50 left-0 flex flex-col justify-center items-center ">
        <div className="h-full pointer-events-none z-0 w-full">
          <Hero />
          <Performance />
          <Performance2 />
          <Performance3 />
          <NewTechnology />
          <TechnologyCards />
          <PunctureResitance />
          <ClingeStringe />
          <TechnicalSpecifications />
          <Form />
        </div>
      </div>
      <div className="h-fit w-screen p-10 max-sm:p-[5vw] fixed inset-0 z-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 41 40"
          fill="none"
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
              <stop stop-color="#B2883E" />
              <stop offset="0.132936" stop-color="#E0B54D" />
              <stop offset="0.186698" stop-color="#ECD799" />
              <stop offset="0.325922" stop-color="#AB8C40" />
              <stop offset="0.558973" stop-color="#E0B54D" />
              <stop offset="0.682701" stop-color="#C29743" />
              <stop offset="1" stop-color="#FEF2BD" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
