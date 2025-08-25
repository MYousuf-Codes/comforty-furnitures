"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.success) {
      setIsSubscribed(true);
      setEmail("");
    } else {
      setMessage("Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="bg-white w-full border-t border-gray-200 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        
        {/* Brand Info */}
        <div>
          <Link href="/" className="flex items-center font-bold">
            <Image src="/images/chair.png" alt="Logo" width={40} height={40} className="mr-2" />
            <p className="text-lg">Comforty</p>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Discover our premium furniture collection designed to bring style
            and comfort to your interiors.
          </p>
          <div className="flex space-x-4 mt-6 text-gray-500 text-xl">
            <FaFacebook className="hover:text-[#029FAE] cursor-pointer transition" />
            <FaLinkedin className="hover:text-[#029FAE] cursor-pointer transition" />
            <FaTwitter className="hover:text-[#029FAE] cursor-pointer transition" />
            <FaGithub className="hover:text-[#029FAE] cursor-pointer transition" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <p className="text-gray-700 font-semibold mb-4">Category</p>
          <ul className="space-y-2 text-sm text-gray-600">
            {["Sofa", "Armchair", "Wing Chair", "Desk Chair", "Wooden Chair", "Park Chair"].map((item, index) => (
              <li key={index} className="hover:text-[#029FAE] transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-gray-700 font-semibold mb-4">Support</p>
          <ul className="space-y-2 text-sm text-gray-600">
            {["Help and Support", "Terms and Conditions", "Privacy Policy", "FAQ"].map((item, index) => (
              <li key={index} className="hover:text-[#029FAE] transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-gray-700 font-semibold mb-4">Newsletter</p>
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-grow"
            />
            <Button type="submit">Subscribe</Button>
          </form>
          {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
          <p className="text-sm text-gray-500 mt-4">
            Subscribe to our newsletter for the latest updates and exclusive offers.
          </p>
        </div>
      </div>

      <Separator className="mt-8" />

      {/* Footer Bottom */}
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-6 py-4 text-sm text-gray-500">
        <Link href="https://linkedin.com/in/myousuf-codes" target="blank" className="mb-4 lg:mb-0">
          <p>
            Developed by <span className="text-black font-semibold cursor-pointer">Muhammad Yousuf</span>
          </p>
        </Link>
        <Image src="/images/logo.png" alt="Footer Logo" width={120} height={120} />
      </div>

      {/* Subscription Success Popup */}
      <Dialog open={isSubscribed} onOpenChange={setIsSubscribed}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">🎉 Subscription Successful!</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-sm">
            Thank you for subscribing! You will now receive the latest updates and exclusive offers straight to your inbox.
          </p>
          <p className="text-gray-600 text-sm">
            Stay tuned for exciting news and promotions from our team!
          </p>
          <Button onClick={() => setIsSubscribed(false)} className="mt-4 w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
