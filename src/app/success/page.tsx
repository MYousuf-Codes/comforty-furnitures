"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti"; // Import the confetti library

const SuccessPage = () => {
    const [isConfettiActive, setIsConfettiActive] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    // Update window dimensions on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial dimensions

        // Logic to stop confetti after a few seconds
        const timer = setTimeout(() => {
            setIsConfettiActive(false);
        }, 10000); // Confetti stops after 10 seconds

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {/* Confetti effect */}
            {isConfettiActive && (
                <div className="absolute top-0 left-0 w-full h-full z-10">
                    <Confetti width={windowWidth} height={windowHeight} />
                </div>
            )}

            <div className="absolute top-1/3 transform -translate-y-1/2 text-center z-20 px-4 sm:px-6 md:px-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
                    🎉 Payment Successful! 🎉
                </h1>
                <p className="text-lg sm:text-xl mb-6 text-gray-600">
                    Thank you for your purchase! Your order is being processed.
                </p>

                {/* Track Your Order Button */}
                <button
                    onClick={() => window.location.href = '/order-status'} // Replace with your order tracking page link
                    className="px-6 py-3 text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition transform hover:scale-105 duration-500"
                >
                    Track Your Order
                </button>
            </div>

            {/* Background styling */}
            <style jsx>{`
                .confetti-wrapper {
                    transition: opacity 1s ease-in-out;
                }
                .fade-in {
                    opacity: 1;
                }
                .fade-out {
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default SuccessPage;
