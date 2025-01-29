import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white w-full border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto flex flex-wrap justify-between py-10 px-6 space-y-8 lg:space-y-0">
        {/* Column 1: Brand Info */}
        <div className="w-full lg:w-1/4">
          <div className="flex items-center font-bold">
            <Image
              src="/images/chair.png"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <p className="text-lg">Comforty</p>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Discover our premium furniture collection designed to bring style
            and comfort to your interiors.
          </p>
          <div className="flex space-x-4 mt-6 text-gray-500 text-xl">
            <i className="fa-brands fa-facebook hover:text-[#029FAE] transition" aria-hidden="true"></i>
            <i className="fa-brands fa-linkedin hover:text-[#029FAE] transition" aria-hidden="true"></i>
            <i className="fa-brands fa-twitter hover:text-[#029FAE] transition" aria-hidden="true"></i>
            <i className="fa-brands fa-github hover:text-[#029FAE] transition" aria-hidden="true"></i>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="w-full lg:w-1/4">
          <p className="text-gray-700 font-semibold mb-4">Category</p>
          <ul className="space-y-2">
            {["Sofa", "Armchair", "Wing Chair", "Desk Chair", "Wooden Chair", "Park Chair"].map(
              (item, index) => (
                <li key={index} className="text-sm text-gray-600 hover:text-[#029FAE] transition">
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="w-full lg:w-1/4">
          <p className="text-gray-700 font-semibold mb-4">Support</p>
          <ul className="space-y-2">
            {["Help and Support", "Terms and Conditions", "Privacy Policy", "FAQ"].map(
              (item, index) => (
                <li key={index} className="text-sm text-gray-600 hover:text-[#029FAE] transition">
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="w-full lg:w-1/4">
          <p className="text-gray-700 font-semibold mb-4">Newsletter</p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-md p-2 flex-grow placeholder-gray-500 text-sm"
            />
            <button className="ml-2 bg-[#029FAE] text-white rounded-md px-4 py-2 hover:bg-[#027d89] transition">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Footer Bottom */}
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6 py-4 text-sm text-gray-500">
        <p className="w-full lg:w-auto text-center lg:text-left mb-4 lg:mb-0">
          Developed by <span className="text-black font-semibold">Muhammad Yousuf</span>
        </p>
        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
          <Image
            src="/images/logo.png"
            alt="Footer Logo"
            width={120}
            height={120}
            className="w-28"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
