"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        payment_method_data: {
          billing_details: {
            name: data.name,
            email: data.email,
          },
        },
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Name" className="w-full p-2 border rounded" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Email" className="w-full p-2 border rounded" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <PaymentElement />
        <Button type="submit" disabled={!stripe} className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
          Pay Now
        </Button>
      </form>
    </Form>
  );
}
