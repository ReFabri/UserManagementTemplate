"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import FormContainer from "@/app/_components/FormContainer";
import Button from "@/app/_components/Button";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfileIdPage({ params }: any) {
  const router = useRouter();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    isVerified: false,
  });

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get("/api/users/me");
      setUser((prevData) => {
        return {
          ...prevData,
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          isVerified: response.data.isVerified,
        };
      });
    };
    getUserDetails();
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success(res.data.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const verifyEmailHandler = async () => {
    try {
      const userData = {
        email: user.email,
        emailType: "VERIFY",
        userId: user._id,
      };

      const res = await axios.post("/api/users/emailverification", {
        userData,
      });
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const itemStyle = {
    item: "text-xl m-2",
    value: "p-2 m-2 ml-6 rounded bg-orange-500 text-black text-center text-xl",
  };

  return (
    <FormContainer formName="Profile">
      <Toaster />
      <div className="grid grid-cols-2">
        <h2 className={itemStyle.item}>Username</h2>
        <h2 className={itemStyle.value}>{user.username}</h2>

        <h2 className={itemStyle.item}>Email</h2>
        <h2 className={itemStyle.value}>{user.email}</h2>

        <h2 className={itemStyle.item}>Is Verified ?</h2>
        <h2 className={itemStyle.value}>{user.isVerified ? "Yes" : "No"}</h2>
      </div>
      <div className="mt-8">
        {!user.isVerified && (
          <Button className="mr-3" onClick={verifyEmailHandler}>
            Send verification email
          </Button>
        )}
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </FormContainer>
  );
}
