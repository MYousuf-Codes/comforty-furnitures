import React from 'react';
import Image from 'next/image';

const Brands: React.FC = () => {
    const brands = [
        { src: '/images/zapier.png', alt: 'logo' },
        { src: '/images/pipe.png', alt: 'logo' },
        { src: '/images/cib.png', alt: 'logo' },
        { src: '/images/zz.png', alt: 'logo' },
        { src: '/images/burn.png', alt: 'logo' },
        { src: '/images/pando.png', alt: 'logo' },
    ];

    return (
        <div className="w-full bg-white h-[139px] overflow-hidden">
            <div className="w-full lg:w-4/5 h-full mx-auto flex flex-wrap justify-between animate-scroll hover:pause-scroll">
                {brands.map((brand, index) => (
                    <div key={index} className="pt-[26px] w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/6">
                        <Image src={brand.src} alt={brand.alt} width={85} height={87} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Brands;

