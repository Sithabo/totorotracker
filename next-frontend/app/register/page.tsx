"use client";
import { FloatingLabel } from "flowbite-react";
import Logo from "@/public/star.png";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { register } from "@/api/user";

function Register() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const handleSubmit = async () => {
    if (!user.fullName || !user.email || !user.password) {
      setError("All fields are required");
      return;
    }

    const response = await register(user.fullName, user.email, user.password);

    if (response instanceof Error) {
      setError("Something went wrong");
    } else {
      router.replace("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    router.replace("/dashboard");
  }

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="max-w-96 md:w-96 bg-green-400 opacity-85 p-4 mx-4 rounded-md">
        <div className="mb-4">
          <Image src={Logo} alt="banner" className="w-10" />
          <h2>Welcome to Tuturo Tracker</h2>
          <p className="text-xs text-red-500">{error}</p>
        </div>
        <FloatingLabel
          variant="filled"
          label="Full Name"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="filled"
          label="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="filled"
          label="password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <span className="float-end text-xs">
          already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 underline">Login</span>
          </Link>
        </span>
        <Button className="w-full mt-4" onClick={handleSubmit}>
          Create Triviad Account
        </Button>
      </div>
    </div>
  );
}

export default Register;
