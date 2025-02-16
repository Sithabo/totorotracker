"use client";
import { FloatingLabel } from "flowbite-react";
import Logo from "@/public/star.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { login } from "@/api/user";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleSubmit = async () => {
    const response = await login(user.email, user.password);
    if (response instanceof Error) {
      setError("Invalid credentials");
    } else {
      if (setIsAuthenticated) setIsAuthenticated(true);
      router.replace("/dashboard");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="max-w-96 md:w-96 bg-green-400 opacity-85 p-4 rounded-md">
        <div className="mb-4">
          <Image src={Logo} alt="banner" className="w-10" />
          <h2>Welcome to Triviad</h2>

          <p className="text-xs text-red-500">{error}</p>
        </div>
        <FloatingLabel
          variant="filled"
          label="email"
          name="email"
          required
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="filled"
          label="password"
          name="password"
          required
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <span className="float-end text-xs">
          don't have an account?{" "}
          <Link href="/register">
            <span className="text-blue-500 underline">
              Create Triviad account
            </span>
          </Link>
        </span>

        <Button className="w-full mt-4" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
