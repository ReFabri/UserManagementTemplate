"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Button from "../_components/Button";
import LabelAndInput from "../_components/LabelAndInput";
import FormContainer from "../_components/FormContainer";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

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

  return (
    <FormContainer formName="Login">
      <Toaster />

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
        password
      </LabelAndInput>

      <p className="text-center text-sm pb-4">
        <Link href="/passwordrecovery">forgot password</Link>
      </p>
      <Button onClick={onLogin} disabled={isDisabled}>
        {isDisabled ? "Enter data" : "Login"}
      </Button>
      <Link href="/signup">Signup page</Link>
    </FormContainer>
  );
}
