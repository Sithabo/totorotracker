"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Logo from "@/public/star.png";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import NavBarPanel from "./NavBarPanel";
import Button from "./Button";
import { useAuth } from "./AuthProvider";

// export default Navbar;
import { motion } from "framer-motion";

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
    },
  }),
};

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const { isAuthenticated } = useAuth();

  const onToggleNav = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold hidden md:block">
            Tuturo
          </h1>
        </Link>
        {/* <Link href="/">
          <Image src={Logo} alt="logo" width={50} height={50} />
        </Link> */}
        <motion.ul
          className="space-x-4 font-medium hidden md:flex items-center"
          initial="hidden"
          animate="visible"
        >
          <Link href="/settings">
            <motion.li custom={0} variants={staggerVariants}>
              Settings
            </motion.li>
          </Link>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <motion.div custom={2} variants={staggerVariants}>
                <Button>Dashboard</Button>
              </motion.div>
            </Link>
          ) : (
            <Link href="/login">
              <motion.div custom={2} variants={staggerVariants}>
                <Button>Login</Button>
              </motion.div>
            </Link>
          )}
        </motion.ul>

        {/* hamburger menu when view small */}
        <CiMenuFries className="text-2xl md:hidden" onClick={onToggleNav} />
      </div>
      <NavBarPanel toggle={toggle} setToggle={setToggle} />
    </>
  );
}

export default Navbar;