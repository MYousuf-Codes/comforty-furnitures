import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowRoundForward } from "react-icons/io";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full bg-white overflow-hidden pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute -bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-ping"></div>
      </div>

      {/* Hero Section */}
      <div className="relative w-11/12 md:w-4/5 xl:w-3/4 2xl:w-2/3 min-h-[65vh] xl:min-h-[60vh] mx-auto bg-gradient-to-br from-white/80 to-gray-50/60 backdrop-blur-sm rounded-b-3xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 xl:gap-8 px-4 md:px-6 xl:px-8 py-6 md:py-8 xl:py-10 shadow-2xl border border-white/20">
        {/* Left Section */}
        <div className="w-full md:w-[45%] text-center md:text-left flex flex-col justify-center items-center md:items-start z-10 md:ml-4 xl:ml-8">
          <div className="inline-flex items-center px-3 py-1.5 bg-cyan-50 rounded-full border border-cyan-200 mb-3">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
            <p className="text-xs md:text-sm text-cyan-700 font-medium">Welcome To Comforty</p>
          </div>
          
          <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight mt-2 md:mt-3 text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Best Furniture <br />
            Collection For Your <br />
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Interior.</span>
          </h1>
          
          <p className="text-gray-600 mt-3 md:mt-4 xl:mt-5 text-sm md:text-sm xl:text-base max-w-sm xl:max-w-md leading-relaxed">
            Transform your space with our premium furniture collection. Modern designs, unmatched comfort.
          </p>
          
          <Link href="/products">
            <button className="group mt-4 md:mt-5 xl:mt-6 px-5 xl:px-6 py-2.5 xl:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-semibold text-sm xl:text-base flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Shop Now 
              <IoMdArrowRoundForward className="ml-2 transition-transform group-hover:translate-x-1" /> 
            </button>
          </Link>
          
          {/* Stats */}
          <div className="flex items-center gap-4 xl:gap-6 mt-5 md:mt-6 xl:mt-8">
            <div className="text-center">
              <div className="text-lg md:text-xl xl:text-2xl font-bold text-gray-800">1000+</div>
              <div className="text-xs text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl xl:text-2xl font-bold text-gray-800">50+</div>
              <div className="text-xs text-gray-600">Premium Products</div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[45%] relative flex justify-center mt-4 md:mt-0 md:mr-4 xl:mr-8">
          {/* Background Effects for Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 xl:w-56 h-48 xl:h-56 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 xl:top-6 left-4 xl:left-6 w-2.5 xl:w-3 h-2.5 xl:h-3 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="absolute top-8 xl:top-12 right-8 xl:right-10 w-2 xl:w-2.5 h-2 xl:h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 xl:bottom-10 left-8 xl:left-10 w-1.5 xl:w-2 h-1.5 xl:h-2 bg-purple-400 rounded-full animate-ping"></div>
          
          {/* Main Image Container */}
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
            <div className="absolute -inset-2 xl:-inset-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl xl:rounded-2xl blur-lg"></div>
            <div className="relative bg-white/40 backdrop-blur-sm rounded-xl xl:rounded-2xl p-3 xl:p-5 shadow-2xl border border-white/30">
              <Image
                src="/images/Chair large.png"
                alt="Premium Furniture"
                width={200}
                height={250}
                className="xl:w-[240px] xl:h-[300px] object-contain max-w-full drop-shadow-2xl filter brightness-110"
              />
            </div>
          </div>
          
          {/* Decorative Badge */}
          <div className="absolute top-1 xl:top-2 right-1 xl:right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 xl:px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-20">
            🔥 Best Seller
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;