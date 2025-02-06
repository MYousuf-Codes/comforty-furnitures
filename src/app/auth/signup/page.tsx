"use client"; // Ensure it's a client-side component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // This is the NextAuth method to sign in

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error || "Error creating user. Please try again.");
        return;
      }

      router.push("/auth/signin"); // Redirect to the sign-in page after successful registration
    } catch (err) {
      setError("Error creating user. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl">Sign Up</h2>
        {error && <div className="text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Sign Up
        </button>
        <div className="flex flex-col items-center space-y-2 mt-4">
          <button
            type="button"
            onClick={() => signIn("google")}
            className="bg-red-500 text-white p-2 w-full"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("github")}
            className="bg-black text-white p-2 w-full"
          >
            Continue with GitHub
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
