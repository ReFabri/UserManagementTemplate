"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import FormContainer from "@/app/_components/FormContainer";

export default function ProfileIdPage({ params }: any) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get("/api/users/me");
      setUser(response.data);
    };
    getUserDetails();
  }, []);

  return (
    <FormContainer formName="Profile">
      <p className="text-xl mb-4">
        Profile Id:
        <span className="p-2 ml-6 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </FormContainer>
  );
}
