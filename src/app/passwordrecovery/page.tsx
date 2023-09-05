"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Button from "../_components/Button";
import LabelAndInput from "../_components/LabelAndInput";

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (email.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
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

      <LabelAndInput
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      >
        Enter your email
      </LabelAndInput>

      <Button onClick={resetPassButtonHandler} disabled={isDisabled}>
        Reset password
      </Button>
      {success && (
        <p className="w-1/3 p-6 mt-4 border border-green-600 rounded-lg mb-4 focus:outline-none text-center">
          An email has been sent to the email address provided, check your inbox
          for a link to recover your password.
        </p>
      )}
    </div>
  );
}
