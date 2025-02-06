"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../../lib/stripe";
import CheckoutForm from "@/components/CheckoutForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import CheckoutPage from "@/components/CheckoutPage"; // Import the CheckoutPage component
import { FaCircle } from "react-icons/fa";

export default function CheckoutPageWrapper() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);

  return (
    <main>
      <div className="container mx-auto bg-white p-6 md:p-8 lg:px-24 lg:py-12 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
          <div className="w-full lg:w-3/5 mx-auto p-5 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-left">Checkout</h1>
              <div className="flex items-center text-left mt-2">
                <FaCircle className="text-orange-300 font-light text-sm mr-2" />
                <p className="text-sm text-gray-400 sm:text-base font-light">This is a test mode. Your payment will not be processed.</p>
              </div>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-lg md:shadow-xl">
              {/* Call CheckoutPage to fetch clientSecret */}
              <CheckoutPage total={total} setClientSecret={setClientSecret} />

              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <p className="text-center text-lg text-gray-500">Loading payment details...</p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col justify-start items-start gap-6 bg-white shadow-md rounded-lg p-6 sticky top-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Order Summary</h1>
            <div className="w-full space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-lg object-cover" />
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold">{item.name}</h2>
                    <p className="text-xs sm:text-sm text-gray-600">{item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-lg sm:text-xl font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <hr/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
