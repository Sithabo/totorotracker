import React, { useState, useEffect } from "react";
import image from "@/public/Character13.png";
import image1 from "@/public/Character1.png";
import image2 from "@/public/Character2.png";
import image3 from "@/public/Character3.png";
import image4 from "@/public/Character4.png";
import image5 from "@/public/Character5.png";
import image6 from "@/public/Character16.png";
import image7 from "@/public/Character7.png";
import image8 from "@/public/Character8.png";
import image9 from "@/public/Character9.png";
import image10 from "@/public/Character10.png";
import image11 from "@/public/Character11.png";
import Image from "next/image";
import { CiCircleCheck, CiTimer } from "react-icons/ci";
import { FaRegTimesCircle } from "react-icons/fa";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface UsageProps {
  chatData: any;
  loading: any;
}

const images = [
  image,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const staticProductivityStats = {
  totalHours: "40.00",
  productiveHours: "30.00",
  unproductiveHours: "10.00",
  productiveScore: "75.00",
};

const Usage: React.FC<UsageProps> = ({ chatData, loading }) => {
  const [randomImage, setRandomImage] = useState(getRandomImage());

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center p-6">
      <div className="flex flex-col items-center mb-4">
        <Image src={randomImage} alt="Character" className="w-20" />
        <div>
          {parseFloat(staticProductivityStats.productiveScore) >= 75 ? (
            <p className="text-green-200 text-center">You are doing great!</p>
          ) : parseFloat(staticProductivityStats.productiveScore) >= 50 ? (
            <p className="text-yellow-200 text-center">You are doing good!</p>
          ) : (
            <p className="text-red-200 text-center">You need to improve!</p>
          )}

          <div className="mt-6 *:text-tertiary flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-500">
              This Week's Productive Score
            </h2>
            <p className="text-4xl font-bold text-green-500">
              {staticProductivityStats.productiveScore}%
            </p>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold">
        <div className="mb-4">
          <div className="flex items-center *:text-tertiary">
            <CiTimer size={20} className="text-sm  mr-2" />
            <h2 className="text-xl font-bold">Total Time Spent on Screen</h2>
          </div>
          <p className="text-xl block">{staticProductivityStats.totalHours} hours</p>
        </div>
        <div className="mb-4">
          <div className="flex items-center *:text-tertiary">
            <CiCircleCheck size={20} className="mr-2" />
            <h2 className="text-xl font-bold">
              Total Number of Productive Hours
            </h2>
          </div>
          <p className="">{staticProductivityStats.productiveHours} hours</p>
        </div>
        <div className="mb-4 ">
          <div className="flex items-center *:text-tertiary">
            <FaRegTimesCircle size={20} className="mr-2" />
            <h2 className="text-xl font-bold">
              Total Number of Unproductive Hours
            </h2>
          </div>
          <p className="">{staticProductivityStats.unproductiveHours} hours</p>
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        {loading ? <div>Loading...</div> : <Markdown>{chatData}</Markdown>}
      </div>
    </div>
  );
};

export default Usage;
