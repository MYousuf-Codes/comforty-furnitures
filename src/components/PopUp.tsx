import React from 'react';
import Link from 'next/link';

const PopUp: React.FC = () => {
    return (
        // Top Header
        <div className="top-header bg-[#272343] w-full h-[45px] flex justify-center items-center">
            <div className="inner w-[80%] h-[20px] text-white flex justify-between items-center">
                <p className="left text-sm  pt-[5px] pr-[10px] ">
                    <i className="fa-solid fa-check" aria-hidden="true"></i> Free Shipping On All Orders Over $50
                </p>
                <div className="right">
                    <ul className="hmm flex space-x-2">
                        <li className="px-[5px] text-xs">Eng <i className="fa-solid fa-angle-down" aria-hidden="true"></i></li>
                        <Link href="/Faq">  <li className="px-[5px] text-xs">Faqs</li></Link>
                        <li className="px-[5px] text-xs">
                            <i className="fa-solid fa-circle-info" aria-hidden="true"></i> Need Help
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PopUp;