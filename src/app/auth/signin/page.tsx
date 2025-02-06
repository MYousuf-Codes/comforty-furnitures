"use client"; // Ensure it's a client-side component

import { useState } from "react";
import { signIn } from "next-auth/react"; // This is the NextAuth method to sign in

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl">Sign In</h2>
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
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Sign In
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

export default SignInPage;
