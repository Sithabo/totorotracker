"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import { deleteUser } from "@/api/user";
import { motion } from "motion/react";
import image from "@/public/Character4.png";

function Dashboard() {
  const { isAuthenticated, setIsAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading]); // Wait for `loading` to be false

  if (loading) {
    return <div className="text-center text-white">Loading...</div>; // Show a loader while checking authentication
  }

  const handleDeleteAccount = async () => {
    if (user.id) {
      const response = await deleteUser(user.id);
      if (response) {
        localStorage.clear();
        setIsAuthenticated(false);
      }
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto my-4 bg-green-400 opacity-85 rounded-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-extrabold text-4xl md:text-5xl text-center">
        <span className="text-tertiary">TUTURO DASHBOARD</span>
      </h1>
      <div className="text-center mt-2 mb-5">
        <p className="">
          From here you can{" "}
          <span className="text-green-500">track your account details</span> and also{" "}
          <span className="text-blue-500">change your passwords</span>.
        </p>
      </div>
      <div className="w-96 md:w-[600px] bg-foreground p-4 rounded-md mx-auto">
        <div className="mb-4 text-xl text-white">
          <h2>Stats</h2>
          <div className="grid grid-cols-2 mt-2">
            <div className=" text-secondary font-bold text-xl sm:text-3xl rounded-md">
              <Image src={image} alt="level" />
            </div>
            <div className="">
              <div className="flex items-end font-bold text-xl sm:text-3xl rounded-md text-center">
                <p className="text-2xl flex flex-row whitespace-nowrap">
                  Welcome:
                </p>
                <p className="pl-1 text-2xl flex flex-row whitespace-nowrap">
                  {" "}
                  {user.fullName}
                </p>
              </div>
              <div className=" rounded-md mt-4">
                <h3 className="text-xl font-bold text-white">Weekly Summary</h3>
                <div className="mt-2">
                  <p className="text-2xl flex flex-row whitespace-nowrap text-green-500">
                    Productive Hours: 5 hours
                  </p>
                  <p className="text-2xl flex flex-row whitespace-nowrap text-red-500 mt-2">
                    Unproductive Hours: 19 hours
                  </p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <Button
              className="w-full mt-4 mr-4"
              onClick={() => {
                localStorage.clear();
                setIsAuthenticated(false);
              }}
            >
              Logout
            </Button>
            <Button
              className="w-full mt-4 bg-red-500"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
