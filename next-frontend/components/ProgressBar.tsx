"use client";
import React from "react";
import CountUp from "react-countup";

interface CardProps {
  value: number;
  text: string;
}

const ProgressBar: React.FC<CardProps> = ({ value, text }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <div className="text-4xl font-bold text-gray-800">
        <CountUp end={value} duration={2} /> %
      </div>
      <div className="text-lg text-gray-600 mt-2">{text}</div>
    </div>
  );
};

export default ProgressBar;
