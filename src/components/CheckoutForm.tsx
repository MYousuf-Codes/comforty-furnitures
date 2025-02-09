"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  phone: z.string().min(1, "Phone Number is required"),
  deliveryAddress: z.string().min(1, "Delivery Address is required"),
  paymentAddress: z.string().optional(),
  sameAsDelivery: z.boolean().optional(),
  paymentMethod: z.enum(["stripe", "cod"]),
});

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      deliveryAddress: "",
      paymentAddress: "",
      sameAsDelivery: false,
      paymentMethod: "stripe",
    },
  });

  const paymentMethod = useWatch({ control: form.control, name: "paymentMethod" });
  const sameAsDelivery = useWatch({ control: form.control, name: "sameAsDelivery" });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!stripe || !elements) return;
    setLoading(true);
    setErrorMessage("");

    if (data.paymentMethod === "stripe") {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
          payment_method_data: {
            billing_details: {
              name: data.name,
            },
          },
        },
      });

      if (error) setErrorMessage(error.message || "Payment failed");
    } else {
      console.log("Cash on Delivery selected", data);
      window.location.href = `${window.location.origin}/success`;
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Full Name" className="w-full p-2 border rounded" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <PhoneInput {...field} country="us" enableSearch inputStyle={{ width: "100%" }} onChange={(value) => field.onChange(value)} value={field.value} />
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="deliveryAddress" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Delivery Address" className="w-full p-2 border rounded" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="paymentMethod" render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex space-x-4">
                <Controller name="paymentMethod" control={form.control} render={({ field }) => (
                  <>
                    <label className="flex items-center">
                      <input type="radio" {...field} value="stripe" checked={field.value === "stripe"} onChange={() => field.onChange("stripe")} />
                      <span className="ml-2">Pay Online (Stripe)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" {...field} value="cod" checked={field.value === "cod"} onChange={() => field.onChange("cod")} />
                      <span className="ml-2">Cash on Delivery</span>
                    </label>
                  </>
                )} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {paymentMethod === "cod" && (
          <>
            <FormField control={form.control} name="sameAsDelivery" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label className="flex items-center">
                    <Controller name="sameAsDelivery" control={form.control} render={({ field }) => (
                      <input type="checkbox" {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                    )} />
                    <span className="ml-2">Same as Delivery Address</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {!sameAsDelivery && (
              <FormField control={form.control} name="paymentAddress" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Payment Address" className="w-full p-2 border rounded" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            )}
          </>
        )}

        {paymentMethod === "stripe" && <PaymentElement />}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <Button type="submit" disabled={!stripe || loading} className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Form>
  );
}
