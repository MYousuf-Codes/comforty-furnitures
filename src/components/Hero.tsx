import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full bg-white">
      {/* Hero Section */}
      <div className="w-11/12 md:w-4/5 min-h-[80vh] mx-auto bg-[#F0F2F3] rounded-b-3xl flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-6 md:py-10">
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <p className="text-sm md:text-lg text-gray-600">Welcome To Chairy</p>
          <h1 className="text-2xl md:text-5xl font-bold leading-snug md:leading-tight mt-3 md:mt-4 text-gray-800">
            Best Furniture <br />
            Collection For Your <br />
            Interior.
          </h1>
          <Link href="/products">
            <button className="mt-5 md:mt-6 w-40 md:w-44 h-10 md:h-12 bg-[#029FAE] rounded-lg text-white font-bold text-base md:text-lg flex items-center justify-center hover:bg-[#028d89] transition-all">
              Shop Now <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <Image
            src="/images/Chair large.png"
            alt="Furniture"
            width={320}
            height={400}
            className="object-contain max-w-[90%] md:max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
