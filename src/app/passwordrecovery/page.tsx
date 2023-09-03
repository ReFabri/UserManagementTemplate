"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function PasswordRecoveryPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetPassButtonHandler = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/passrecovery", { email });
      toast.success("An email has been sent to recover your password");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Recover your password.</h1>
      <label htmlFor="email">Enter your email</label>
      <input
        className="text-black p-2"
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="p-2 border border-gray-300 rounded"
        onClick={resetPassButtonHandler}
      >
        Reset password
      </button>
    </div>
  );
}
