"use client";
import React from "react";
import CountUp from "react-countup";

interface CardProps {
  value: number;
  text: string;
}

const ProgressBar: React.FC<CardProps> = ({ value, text }) => {
  return (
    <div className="p-6 text-center">
      <div className="text-5xl font-bold">
        <CountUp end={value} duration={2} />%
      </div>
      <div className="text-lg mt-2">{text}</div>
    </div>
  );
};

export default ProgressBar;
