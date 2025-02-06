"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLocationDot, FaPhone, FaClock } from "react-icons/fa6";
import emailjs from "emailjs-com" // Import EmailJS

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    subject: z.string().optional(),
    message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

const ContactPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const serviceId = process.env.EMAIL_SERVICE_ID as string;
    const templateId = process.env.EMAIL_TEMPLATE_ID as string;
    const userId = process.env.EMAIL_USER_ID as string;
    
    const onSubmit = (data: FormData) => {
        // Send email using EmailJS
        emailjs
            .send(
                serviceId, // Your service ID
                templateId, // Your template ID
                data, // Form data will be sent to the email template
                userId // Your EmailJS user ID
            )
            .then(
                (response) => {
                    console.log("Success:", response);
                    alert("Your message has been sent!");
                },
                (error) => {
                    console.error("Error:", error);
                    alert("There was an error sending your message. Please try again.");
                }
            );
    };

    return (
        <main className="bg-white">
            <div className="container mx-auto px-4 py-10">

                <div className="text-center max-w-xl mx-auto mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Get In Touch with Us</h1>
                    <p className="text-gray-600 mt-4">
                        {`We are committed to providing exceptional service and support. 
                        If you have any questions or need further assistance, please reach out to us. 
                        Our dedicated team is here to ensure your experience with us is seamless and satisfactory.`}
                    </p>
                </div>

                <div className="max-w-8xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-50 rounded-lg p-8">
                    {/* Contact Info  */}
                    <div className="space-y-10 pt-8">
                        <div className="flex items-center gap-5">
                            <FaLocationDot className="text-2xl" />
                            <div>
                                <h3 className="font-semibold text-black text-xl">Address</h3>
                                <p className="text-gray-600">Furniture Market, Suparco Road, near Sohni Chalet</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <FaPhone className="text-2xl" />
                            <div>
                                <h3 className="font-semibold text-black text-xl">Phone</h3>
                                <p className="text-gray-600">Mobile: 0314 2209326</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <FaClock className="text-2xl" />
                            <div>
                                <h3 className="font-semibold text-black text-xl">Working Hours</h3>
                                <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="Your Name"
                                    className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="you@example.com"
                                    className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    {...register("subject")}
                                    placeholder="Optional"
                                    className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    {...register("message")}
                                    rows={5}
                                    placeholder="Type your message here..."
                                    className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
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
            </div>
        </main>
    );
};

export default ContactPage;
