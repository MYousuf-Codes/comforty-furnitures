"use client"
import React from 'react';
import { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const ContactPage: React.FC = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        const newErrors: { [key: string]: string } = {};

        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!message) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            // Handle form submission logic here
            console.log({ name, email, subject, message });
        }
    };

    return (
        <main className='bg-white'>
            <div className="container mx-auto px-4 py-10 ">
                {/* Header Section */}
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Get In Touch with Us</h1>
                    <p className="text-gray-600 mt-4">
                        {`For more information about our products and services, feel free to ask.
                    Our team is always here to help you out. Don’t hesitate!`}
                    </p>
                </div>

                <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-50 rounded-lg p-8">
                    {/* Contact Info Section */}
                    <div className="space-y-10 pt-8">
                        <div className="flex items-center gap-5">
                            <i className="fa-solid fa-location-dot text-black text-xl"></i>
                            <div>
                                <h3 className="font-semibold text-black flex gap-2 text-xl">
                                    <FaLocationDot className='text-2xl' />
                                    Address</h3>
                                <p className="text-gray-600">Furniture Market, Suparco Road, near Sohni Chalet</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <i className="fa-solid fa-phone text-black text-xl"></i>
                            <div>
                                <h3 className="font-semibold text-black flex gap-2 text-xl">
                                    <FaPhoneAlt className='text-2xl' />
                                    Phone</h3>
                                <p className="text-gray-600">
                                    Mobile: 0314 2209326 <br />
                                    Phone: 0314 2209326
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <i className="fa-solid fa-clock text-black text-xl"></i>
                            <div>
                                <h3 className="font-semibold text-black flex gap-2 text-xl">
                                    <FaClock className='text-2xl' />
                                    Working Hours</h3>
                                <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Optional"
                                    className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="Type your message here..."
                                    className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                        <i className="fa-solid fa-trophy text-[#029FAE] text-3xl"></i>
                        <div>
                            <h3 className="font-semibold text-gray-800">High Quality</h3>
                            <p className="text-gray-600">Crafted from top materials</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <i className="fa-solid fa-shield-alt text-[#029FAE] text-3xl"></i>
                        <div>
                            <h3 className="font-semibold text-gray-800">Warranty Protection</h3>
                            <p className="text-gray-600">Over 2 Years</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <i className="fa-regular fa-face-smile text-[#029FAE] text-3xl"></i>
                        <div>
                            <h3 className="font-semibold text-gray-800">24/7 Support</h3>
                            <p className="text-gray-600">Dedicated support team</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;