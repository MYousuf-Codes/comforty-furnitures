import React from "react";
import Image from "next/image";
import MakesDifferent from "@/components/MakesDifferent";

const AboutPage = () => {
    return (
        <div className="container w-full h-auto mx-auto px-5 md:px-10 mb-12">
            {/* About Us Section */}
            <div className="w-full h-auto mt-5 flex flex-col md:flex-row justify-between items-center">
                {/* Text Section */}
                <div className="flex-1 bg-[#007580] rounded-lg p-6 text-white h-96">
                    <h1 className="text-3xl font-bold mb-4">About Us - Comforty</h1>
                    <p className="text-base mb-6">At Comforty, we believe that the right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials, and modern aesthetics, we craft chairs that seamlessly blend style with functionality.</p>
                    <br /><br /><br />
                    <button className="w-full md:w-auto bg-[#16919c] text-white py-3 px-6 rounded-md text-lg">
                        View Collection
                    </button>
                </div>
                {/* Image Section */}
                <div className="flex-1 mt-6 md:mt-0 md:ml-6 h-96">
                    <Image
                        src="/images/new chair.png"
                        alt="Comforty Chair"
                        width={600}
                        height={600}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>

            {/* What Makes Our Brand Different */}
            <br /><br /><br />
            <MakesDifferent />


            {/* Our Popular Products */}
            <h2 className="text-2xl font-semibold mt-12 text-center">Our Popular Products</h2>
            <div className="flex flex-wrap justify-center mt-8 gap-6">
                <div className="">
                    <Image
                        src="/images/Large.png"
                        alt="Popular Chair"
                        width={415}
                        height={150}
                        className=""
                    />
                    <p className="text-lg font-semibold">The Popular Suited Sofa</p>
                    <p className="text-sm text-[#007580]">$99.00</p>
                </div>
                <div className="">
                    <Image
                        src="/images/black chair.png"
                        alt="Black Chair"
                        width={200}
                        height={150}
                        className=""
                    />
                    <p className="text-lg font-semibold">The Popular Suited Sofa</p>
                    <p className="text-sm text-[#007580]">$99.00</p>
                </div>
                <div className="">
                    <Image
                        src="/images/black.png"
                        alt="Black Chair"
                        width={200}
                        height={150}
                        className=""
                    />
                    <p className="text-lg font-semibold">The Popular Suited Sofa</p>
                    <p className="text-sm text-[#007580]">$99.00</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
