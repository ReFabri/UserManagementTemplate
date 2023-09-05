"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Button from "../_components/Button";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("successfully logged out");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setUser(response.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Profile</h1>
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {user === null ? (
          "No user"
        ) : (
          <Link href={`/profile/${user}`}>Go to user profile</Link>
        )}
      </h2>
      <Button className="mt-6" onClick={logoutHandler}>
        Logout
      </Button>
      <Button onClick={getUserDetails}>Get user details</Button>
    </div>
  );
}
