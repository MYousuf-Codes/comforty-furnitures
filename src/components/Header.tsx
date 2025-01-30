"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux'; // Import useSelector to access cart state
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion for smooth animations
import { FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Access cart state using useSelector
  const cartItems = useSelector((state: any) => state.cart.items); // Assuming you have set up a cart reducer
  const cartCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0); // Calculate the total items in the cart

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="w-full h-[64px] md:h-[74px] bg-[#F0F2F3] flex justify-center items-center">
        <div className="w-11/12 md:w-4/5 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <Image src="/images/chair.png" alt="logo" width={30} height={30} />
              <h1 className="text-lg md:text-xl font-semibold pl-2">Comforty</h1>
            </div>
          </Link>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Cart */}
            <Link href="/cart">
              <div className="flex items-center bg-white px-3 py-1 rounded-lg cursor-pointer relative">
                <i className="fa-solid fa-cart-shopping text-base md:text-lg"></i>
                <span className="ml-2 flex items-center gap-2 text-xs md:text-lg"><FaShoppingCart />Cart</span>
                {/* Cart item count displayed dynamically */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-800 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-white text-xs rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Icon */}
            <button
              className="sm:hidden text-gray-700 text-2xl"
              onClick={toggleDrawer}
            >
              {isDrawerOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full h-[74px] bg-white flex justify-center items-center border-b">
        <div className="w-11/12 md:w-4/5 flex justify-between items-center">
          {/* Navigation Links */}
          <nav className="hidden sm:flex">
            <ul className="flex space-x-4 text-sm">
              <Link href="/">
                <li className="text-[#379393]">Home</li>
              </Link>
              <Link href="/contact">
                <li className="text-gray-700 hover:text-[#379393]">Contact</li>
              </Link>
              <Link href="/products">
                <li className="text-gray-700 hover:text-[#379393]">Products</li>
              </Link>
              <Link href="/about">
                <li className="text-gray-700 hover:text-[#379393]">About</li>
              </Link>
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="hidden sm:block text-sm text-gray-500">
            Contact: <span className="text-black">(808) 555-0111</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Animation */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 p-6 sm:hidden"
          >
            <nav>
              <ul className="space-y-4 text-sm">
                <Link href="/">
                  <li className="text-[#379393]" onClick={toggleDrawer}>Home</li>
                </Link>
                <Link href="/contact">
                  <li className="text-gray-700 hover:text-[#379393]" onClick={toggleDrawer}>Contact</li>
                </Link>
                <Link href="/products">
                  <li className="text-gray-700 hover:text-[#379393]" onClick={toggleDrawer}>Products</li>
                </Link>
                <Link href="/about">
                  <li className="text-gray-700 hover:text-[#379393]" onClick={toggleDrawer}>About</li>
                </Link>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
