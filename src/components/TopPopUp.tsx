"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaAngleDown, FaAngleUp, FaCircle, FaCheck } from "react-icons/fa";

function  TopPopUp  () {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="top-header bg-[#272343] w-full h-[45px] flex justify-center items-center text-white text-sm">
      <div className="w-[90%] md:w-[80%] flex justify-between items-center">

        <p className="flex items-center">
          <FaCheck className="mr-2" /> Free Shipping On All Orders Over $50
        </p>

        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-xs focus:outline-none"
          >
            More {isExpanded ? <FaAngleUp className="ml-1" /> : <FaAngleDown className="ml-1" />}
          </button>

          {isExpanded && (
            <ul className="absolute right-0 z-10 top-6 bg-[#272343] shadow-lg p-2 rounded-md w-32 text-white text-xs">
              <li className="py-1 cursor-pointer">Eng</li>
              <Link href="/Faq"><li className="py-1 cursor-pointer">FAQs</li></Link>
              <li className="py-1 cursor-pointer flex items-center">
                <FaCircle className="mr-1" /> Need Help
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPopUp;
