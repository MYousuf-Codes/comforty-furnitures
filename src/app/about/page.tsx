import React from "react";
import Image from "next/image";
import { FaCheckCircle, FaCreditCard, FaRecycle } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const AboutPage = () => {
    return (
        <center>

            <div className="container mx-auto px-5 md:px-10 mb-12">
                <div className="w-full h-auto mt-5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-4">
                    <div className="ml-10 flex-1 bg-[#007580] rounded-lg p-6 text-white h-full flex flex-col justify-between md:h-[278px] md:w-[473px]">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">About Us - Comforty</h1>
                            <p className="text-base mb-6">
                                At Comforty, we believe that the right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials, and modern aesthetics, we craft chairs that seamlessly blend style with functionality.
                            </p>
                        </div>
                        <button className="w-full md:w-auto bg-[#16919c] text-white py-3 px-6 rounded-md text-lg">
                            View Collection
                        </button>
                    </div>
                    {/* Image Section */}
                    <div className="flex-1 h-full">
                        <Image
                            src="/images/new chair.png"
                            alt="Comforty Chair"
                            width={270}
                            height={260}
                            className="object-cover w-[473px] h-[278px] rounded-lg"
                        />
                    </div>
                </div>

                {/* What Makes Our Brand Different */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-12 px-6 md:px-10 justify-center mx-auto w-full ">
                    {[{
                        Icon: FaTruckFast,
                        title: "Next Day as Standard",
                        text: "Order before 3pm and get your order the next day as standard."
                    }, {
                        Icon: FaCheckCircle,
                        title: "Made by True Artisans",
                        text: "Handmade crafted goods made with real passion and craftsmanship."
                    }, {
                        Icon: FaCreditCard,
                        title: "Unbeatable Prices",
                        text: "For our materials and quality, you won’t find better prices anywhere."
                    }, {
                        Icon: FaRecycle,
                        title: "Recycled Packaging",
                        text: "We use 100% recycled materials to ensure our footprint is more manageable."
                    }].map(({ Icon, title, text }, index) => (
                        <div key={index} className="flex flex-col items-start bg-gray-100 p-3 sm:p-4 rounded-lg text-black shadow-md hover:shadow-xl w-[95%] mx-auto">{/* Reduced width */}
                            <Icon className="text-cyan-400 text-2xl sm:text-4xl mb-4" />
                            <h2 className="text-lg sm:text-xl mb-2">{title}</h2>
                            <p className="text-sm sm:text-base">{text}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-semibold mt-12 text-center">Our Popular Products</h2>
                <div className="flex flex-row justify-center mt-8 gap-2">
                    {[{
                        src: "/images/Large.png",
                        alt: "Popular Chair",
                        width: 600, // Wider first image
                    }, {
                        src: "/images/black chair.png",
                        alt: "Black Chair",
                        width: 200, // Same width for last two images
                    }, {
                        src: "/images/black.png",
                        alt: "Black Chair",
                        width: 200, // Same width for last two images
                    }].map(({ src, alt, width }, index) => (
                        <div key={index} className="text-center">
                            <Image
                                src={src}
                                alt={alt}
                                width={width}
                                height={200} // Ensuring all images have the same height
                                className="mx-auto object-cover rounded-lg"
                            />
                            <p className="text-lg font-semibold">The Popular Suited Sofa</p>
                            <p className="text-sm text-[#007580]">$99.00</p>
                        </div>
                    ))}
                </div>
            </div>
        </center>
    );
};

export default AboutPage;