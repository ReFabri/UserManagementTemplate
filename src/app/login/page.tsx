"use client";
import React from "react";
import Link from "next/link";
import { axios } from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={user.email}
        onChange={emailHandler}
        placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={passwordHandler}
        placeholder="password"
      />

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup">Signup page</Link>
    </div>
  );
}
