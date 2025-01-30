"use client"; // ✅ Mark this as a Client Component

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const Brands: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = isHovered ? "paused" : "running";
    }
  }, [isHovered]);

  const brands = [
    { src: "/images/zapier.png", alt: "Zapier" },
    { src: "/images/pipe.png", alt: "Pipe" },
    { src: "/images/cib.png", alt: "CIB" },
    { src: "/images/zz.png", alt: "ZZ" },
    { src: "/images/burn.png", alt: "Burn" },
    { src: "/images/pando.png", alt: "Pando" },
  ];

  return (
    <div className="relative w-full bg-white h-[120px] overflow-hidden flex items-center">
      <div className="w-11/12 lg:w-4/5 mx-auto overflow-hidden relative">
        {/* Infinite Scrolling Container */}
        <div
          ref={scrollRef}
          className="flex gap-8 md:gap-12 animate-scroll"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Infinite loop by duplicating items */}
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className="min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
              <Image src={brand.src} alt={brand.alt} width={85} height={87} className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Seamless Infinite Scrolling CSS */}
    <style jsx>{`
      @keyframes scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); } /* Moves half the width */
      }
      .animate-scroll {
        display: flex;
        animation: scroll 15s linear infinite; /* Adjust the duration as needed */
      }
    `}</style>
    </div>
  );
};

export default Brands;

