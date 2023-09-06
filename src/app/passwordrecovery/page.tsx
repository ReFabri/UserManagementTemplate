"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Button from "../_components/Button";
import LabelAndInput from "../_components/LabelAndInput";
import FormContainer from "../_components/FormContainer";
import LoadingSpinner from "../_components/LoadingSpinner";

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      await axios.post("/api/users/passrecovery", { email });
      toast.success("An email has been sent to recover your password");
      setSuccess(true);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer formName="Recover your password">
      <Toaster toastOptions={{ duration: 10000 }} />
      {isLoading && <LoadingSpinner />}
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
    </FormContainer>
  );
}
