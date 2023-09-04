"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  const resetPassButtonHandler = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/passrecovery", { email });
      toast.success("An email has been sent to recover your password");
      setSuccess(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster toastOptions={{ duration: 10000 }} />
      <h1 className="mb-3 text-xl">
        {loading ? "Loading.." : "Recover your password"}
      </h1>
      <label htmlFor="email" className="mb-2">
        Enter your email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={resetPassButtonHandler}
        disabled={disabled}
      >
        Reset password
      </button>
      {success && (
        <p className="w-1/3 p-6 mt-4 border border-green-600 rounded-lg mb-4 focus:outline-none text-center">
          An email has been sent to the email address provided, check your inbox
          for a link to recover your password.
        </p>
      )}
    </div>
  );
}
