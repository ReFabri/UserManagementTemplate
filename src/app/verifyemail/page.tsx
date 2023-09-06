"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import FormContainer from "../_components/FormContainer";
import LoadingSpinner from "../_components/LoadingSpinner";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/users/emailverification", {
        token,
      });
      setVerified(true);
    } catch (error: any) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <FormContainer formName="Verify Email">
      {isLoading && <LoadingSpinner />}
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">
            An error has ocurred
          </h2>
        </div>
      )}
    </FormContainer>
  );
}
