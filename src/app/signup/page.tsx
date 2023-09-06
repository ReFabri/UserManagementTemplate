"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import Button from "../_components/Button";
import LabelAndInput from "../_components/LabelAndInput";
import FormContainer from "../_components/FormContainer";
import LoadingSpinner from "../_components/LoadingSpinner";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, username: e.target.value };
    });
  };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };

  //TODO Improve validation for username, email and password fields.

  return (
    <FormContainer formName="Signup">
      <Toaster />
      {isLoading && <LoadingSpinner />}

      <LabelAndInput
        id="username"
        type="text"
        value={user.username}
        onChange={usernameHandler}
        placeholder="username"
      >
        Username
      </LabelAndInput>

      <LabelAndInput
        id="email"
        type="email"
        value={user.email}
        onChange={emailHandler}
        placeholder="email"
      >
        Email
      </LabelAndInput>

      <LabelAndInput
        id="password"
        type="password"
        value={user.password}
        onChange={passwordHandler}
        placeholder="password"
      >
        Password
      </LabelAndInput>

      <Button onClick={onSignup} disabled={isDisabled}>
        Signup
      </Button>
      <Link href="/login">Login page</Link>
    </FormContainer>
  );
}
