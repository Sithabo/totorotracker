"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "./AuthProvider";

export default function NavBarPanel({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}) {
  const { isAuthenticated } = useAuth();

  if (toggle)
    return (
      <AnimatePresence>
        <motion.div
          initial={{ right: "-100%" }}
          animate={{ right: toggle ? "2%" : "-100%" }}
          exit={{ right: "-100%" }}
          className="flex justify-between items-center absolute bg-green-400 h-[40vh] rounded-2xl p-24 z-50"
        >
          <motion.ul>
            <Link href="/" onClick={() => setToggle(false)}>
              <motion.li>Home</motion.li>
            </Link>
            <Link href="/settings" onClick={() => setToggle(false)}>
              <motion.li>Relax</motion.li>
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard" onClick={() => setToggle(false)}>
                <motion.li>Dashboard</motion.li>
              </Link>
            ) : (
              <Link href="/login" onClick={() => setToggle(false)}>
                <motion.li>Login</motion.li>
              </Link>
            )}
          </motion.ul>
        </motion.div>
      </AnimatePresence>
    );
}
