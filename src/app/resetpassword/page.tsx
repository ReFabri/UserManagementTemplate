"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import Button from "../_components/Button";
import LabelAndInput from "../_components/LabelAndInput";
import FormContainer from "../_components/FormContainer";
import LoadingSpinner from "../_components/LoadingSpinner";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const userInitialState = { password: "", confirmPassword: "" };
  const [user, setUser] = useState(userInitialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (
      user.password.length <= 0 ||
      !(user.password === user.confirmPassword)
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [user]);

  const changePasswordHandler = async () => {
    try {
      if (
        user.password.length <= 0 ||
        !(user.password === user.confirmPassword)
      ) {
        return toast.error("Insert the same password in both fields");
      }
      setIsLoading(true);
      const request = await axios.post("/api/users/passrecovery", {
        token,
        password: user.password,
      });
      setSuccess(true);
      toast.success("password changed successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };

  const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, confirmPassword: e.target.value };
    });
  };

  return (
    <FormContainer formName="Create new password">
      <Toaster toastOptions={{ duration: 10000 }} />
      {isLoading && <LoadingSpinner />}
      <LabelAndInput
        id="password"
        type="password"
        value={user.password}
        onChange={passwordHandler}
        placeholder="password"
      >
        Password
      </LabelAndInput>

      <LabelAndInput
        id="confirmPassword"
        type="password"
        value={user.confirmPassword}
        onChange={confirmPasswordHandler}
        placeholder="confirm password"
      >
        Confirm password
      </LabelAndInput>

      <Button onClick={changePasswordHandler} disabled={isDisabled}>
        Create new password
      </Button>

      {success && (
        <p className="w-1/3 p-6 mt-4 border border-green-600 rounded-lg mb-4 focus:outline-none text-center">
          Your password has been changed successfully, go to{" "}
          <Link className="underline text-cyan-500" href="/login">
            login
          </Link>{" "}
          page to access your account.
        </p>
      )}
    </FormContainer>
  );
}
