import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" });

export async function POST(request: Request) {
  try {
    // incoming request body
    const { amount } = await request.json();

    // amount received for debugging purposes
    console.log('Amount received:', amount);

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

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create Payment Intent' },
      { status: 500 }
    );
  }
}
