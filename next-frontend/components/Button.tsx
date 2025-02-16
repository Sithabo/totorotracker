"use client";
import React from "react";
import { ForwardRefComponent, HTMLMotionProps, motion } from "motion/react";

type ButtonProps = {
  children?: React.ReactNode;
  animated?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className, animated, ...otherProps }: ButtonProps) {
  if (!animated) {
    return (
      <button
        {...otherProps}
        className={`${className} border-2 border-white rounded-md p-2 px-8 bg-secondary text-white font-bold`}
      >
        {children}
      </button>
    );
  }
  return (
    <motion.button
      animate={{
        scale: [1, 1.2, 1, 1.2, 1, 1.2, 1],
        transition: { duration: 10 },
      }}
      className={`${className} border-2 border-white rounded-md p-2 px-8 bg-secondary text-white font-bold`}
    >
      {children}
    </motion.button>
  );
}

export default Button;
