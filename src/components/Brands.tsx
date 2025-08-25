"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface Brand {
  src: string;
  alt: string;
}

interface Stat {
  number: string;
  label: string;
}

const Brands: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current && isMounted) {
      scrollRef.current.style.animationPlayState = isHovered ? "paused" : "running";
    }
  }, [isHovered, isMounted]);

  const brands: Brand[] = [
    { src: "/images/zapier.png", alt: "Zapier" },
    { src: "/images/pipe.png", alt: "Pipe" },
    { src: "/images/cib.png", alt: "CIB" },
    { src: "/images/zz.png", alt: "ZZ" },
    { src: "/images/burn.png", alt: "Burn" },
    { src: "/images/pando.png", alt: "Pando" },
  ];

  const stats: Stat[] = [
    { number: "500+", label: "Global Partners" },
    { number: "99.9%", label: "Uptime SLA" },
    { number: "24/7", label: "Support" }
  ];

  // Prevent rendering on server to avoid hydration issues
  if (!isMounted) {
    return (
      <section className="relative w-full min-h-[200px] overflow-hidden flex items-center">
        <div className="relative w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/20 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">Trusted Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-4">
              Powering Innovation Together
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the world's leading brands who trust our platform to drive their digital transformation
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[200px] overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-gradient-radial from-purple-400/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-pink-400/10 via-transparent to-transparent" />
      </div>

      {/* Floating Orbs - Using Tailwind classes only */}
      <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" 
           style={{ animationDelay: '1000ms' }} />

      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/20 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Powering Innovation Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the world's leading brands who trust our platform to drive their digital transformation
          </p>
        </div>

        {/* Brands Carousel Container */}
        <div className="relative">
          {/* Glassmorphism Container */}
          <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 p-8 shadow-xl">
            {/* Gradient Overlays for Seamless Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />

            {/* Infinite Scrolling Container */}
            <div className="overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-12 md:gap-16 items-center"
                style={{
                  animation: 'scroll 20s linear infinite',
                  willChange: 'transform'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Triple the brands for seamless infinite scroll */}
                {[...brands, ...brands, ...brands].map((brand: Brand, index: number) => (
                  <div 
                    key={`${brand.alt}-${index}`}
                    className="group min-w-[120px] sm:min-w-[140px] md:min-w-[160px] flex justify-center"
                  >
                    <div className="relative p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 hover:bg-white/70">
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                      
                      <Image 
                        src={brand.src} 
                        alt={brand.alt} 
                        width={100} 
                        height={60} 
                        className="object-contain relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500" 
                        priority={index < 6} // Prioritize first set of images
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-bounce" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-60 animate-bounce" 
               style={{ animationDelay: '500ms' }} />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          {stats.map((stat: Stat, index: number) => (
            <div key={`stat-${index}`} className="text-center group">
              <div className="relative p-6 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 transition-all duration-500">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations - moved to global CSS or add to tailwind.config.js */}
      <style jsx>{`
        @keyframes scroll {
          from { 
            transform: translateX(0); 
          }
          to { 
            transform: translateX(-33.33%); 
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] {
            animation-duration: 40s !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Brands;