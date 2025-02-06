import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key (server-side)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" });

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const { amount } = await request.json();

    // Log the amount received for debugging purposes
    console.log('Amount received:', amount);

    // Check if amount is provided and is a valid number
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }

    // Create the Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents (e.g., $10.00 = 1000 cents)
      currency: 'usd',
    });

    // Return the client secret for use in the client-side Stripe integration
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);

    // Return a detailed error message for debugging (optional)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create Payment Intent' },
      { status: 500 }
    );
  }
}
