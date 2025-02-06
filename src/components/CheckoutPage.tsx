import { useEffect } from "react";

interface CheckoutPageProps {
  total: number;
  setClientSecret: (clientSecret: string | null) => void;
}

const CheckoutPage = ({ total, setClientSecret }: CheckoutPageProps) => {
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total * 100 }), // amount in cents
        });

        // Log the status code and response body for debugging
        console.log("Response Status:", response.status);
        const responseBody = await response.json();
        console.log("Response Body:", responseBody);

        // If the response is not okay, handle the error
        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        // Extract client secret and set it
        const { clientSecret } = responseBody;
        setClientSecret(clientSecret);
      } catch (err) {
        console.error("Error fetching client secret:", err);
      }
    };

    // Fetch the client secret when the component mounts or total changes
    fetchClientSecret();
  }, [total, setClientSecret]);

  return null; // No need to render anything here, just handles the logic
};

export default CheckoutPage;
