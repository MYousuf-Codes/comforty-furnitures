import React from "react";
import Image from "next/image";

const AboutPage = () => {
    return (
        <div className="w-4/5 h-auto mx-auto">
            <div className="w-full h-auto mt-2.5 flex justify-between flex-wrap md:flex-nowrap">
                <div className="h-100 w-120 bg-[#007580] rounded-sm p-1.25">
                    <h1 className="text-2xl text-white pl-10 font-bold mt-10">About Us - Comforty</h1>
                    <p className="text-sm text-white text-justify p-2.5">At Comforty, we believe that the right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials,
                        and modern aesthetics, we craft chairs that seamlessly blend style with functionality.</p>
                    <button className="w-42.5 h-14 bg-[#16919c] text-white mt-20 ml-2.5">View Collection</button>
                </div>
                <Image
                    src="/images/new chair.png"
                    alt="logo"
                    width={480}
                    height={400}
                    className="w-125 h-100"
                />
            </div>
            <h1 className="text-2xl font-medium text-center pt-2.5">What Makes Our Brand Different</h1>
            <div className="w-full h-61 flex flex-wrap justify-center md:justify-start">
                <div className="h-55 w-62.5 bg-[#e8e9ea] m-2.5">
                    <i className="fa-solid fa-truck pl-3.5 pt-5 text-[#007580]"></i>
                    <h1 className="text-base pl-3.5 pt-2.5 text-[#007580]">Next Day as Standards</h1>
                    <p className="text-xs pl-3.5 pt-2.5 text-[#007580]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione pariatur inventore e</p>
                </div>
                <div className="h-55 w-62.5 bg-[#e8e9ea] m-2.5">
                    <i className="fa-solid fa-circle-check pl-3.5 pt-5 text-[#007580]"></i>
                    <h1 className="text-base pl-3.5 pt-2.5 text-[#007580]">Made by True Artisans</h1>
                    <p className="text-xs pl-3.5 pt-2.5 text-[#007580]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione pariatur inventore e</p>
                </div>
                <div className="h-55 w-62.5 bg-[#e8e9ea] m-2.5">
                    <i className="fa-solid fa-folder pl-3.5 pt-5 text-[#007580]"></i>
                    <h1 className="text-base pl-3.5 pt-2.5 text-[#007580]">Unbeatable Prices</h1>
                    <p className="text-xs pl-3.5 pt-2.5 text-[#007580]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione pariatur inventore e</p>
                </div>
                <div className="h-55 w-62.5 bg-[#e8e9ea] m-2.5">
                    <i className="fa-solid fa-seedling pl-3.5 pt-5 text-[#007580]"></i>
                    <h1 className="text-base pl-3.5 pt-2.5 text-[#007580]">Recycled Packaging</h1>
                    <p className="text-xs pl-3.5 pt-2.5 text-[#007580]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione pariatur inventore e</p>
                </div>
            </div>
            <h1 className="text-2xl font-medium mt-5">Our Popular Products</h1>
            <div className="w-full h-115 flex flex-wrap justify-center md:justify-start">
                <div className="m-2.5">
                    <Image
                        src="/images/Large.png"
                        alt="logo"
                        width={480}
                        height={500}
                        className="w-125 h-125"
                    />
                    <p>The Popular Siuted Sofa <br /> $99.00</p>
                </div>
                <div className="m-2.5">
                    <Image
                        src="/images/black chair.png"
                        alt="logo"
                        width={245}
                        height={200}
                        className="w-61.25 h-50"
                    />
                    <p>The Popular Siuted Sofa <br /> $99.00</p>
                </div>
                <div className="m-2.5">
                    <Image
                        src="/images/black.png"
                        alt="logo"
                        width={245}
                        height={200}
                        className="w-61.25 h-50"
                    />
                    <p>The Popular Siuted Sofa <br /> $99.00</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
