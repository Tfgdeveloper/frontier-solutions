import { useState } from "react";

export default function GradientButton({
  text = "Get Started",
  className = "",
  padding = "px-[25px] py-[15px]",
  onClick,
}) {

  return (
    <button
      onClick={onClick}
      className={`
        button-font group relative overflow-hidden rounded-full 
        ${padding}
        font-semibold text-white
        transition-all duration-300

        /* 3-stop gradient matching the logo's full transition */
        bg-[linear-gradient(135deg,_#1F1A4A_0%,_#8C4343_50%,_#E0531A_100%)]

        /* Shadow matched to the logo's vibrant orange accent */
        shadow-[0_10px_25px_rgba(224,83,26,0.25)]
        hover:shadow-[0_15px_35px_rgba(224,83,26,0.45)]

        hover:-translate-y-0.5
        active:scale-[0.98]

        ${className}
      `}
    >
      {/* Soft Top Highlight */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2),transparent_50%)]
          opacity-80
        "
      />

      {/* Shine Animation */}
      <div
        className="
          absolute top-0 -left-24 h-full w-20
          rotate-12
          bg-white/30 blur-xl
          transition-all duration-700
          group-hover:left-[120%]
        "
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {text}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="
            h-5 w-5
            transition-transform duration-300
            group-hover:translate-x-1
          "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </button>
  );
}