import React, { useState, useEffect } from "react";

const socialMediaTips = [
  {
    tip: "Set Time Limits: Use app timers or screen time tracking tools to limit daily social media use.",
    study:
      "A 2020 study in JMIR Mental Health found that reducing social media use to 30 minutes per day improved mood and focus.",
  },
  {
    tip: "Engage Actively: Focus on meaningful interactions rather than passive scrolling. Comment, message, or share content that aligns with your interests.",
    study:
      "A 2021 study in Computers in Human Behavior found that active engagement on social media is associated with higher life satisfaction.",
  },
  {
    tip: "Curate Your Feed: Unfollow accounts that make you feel inadequate or stressed, and follow accounts that inspire or educate you.",
    study:
      "A 2022 study in Cyberpsychology, Behavior, and Social Networking found that curating a positive social media feed can reduce anxiety and improve self-esteem.",
  },
  {
    tip: "Be Aware of Social Comparison: Remember that people tend to share highlights, not everyday struggles.",
    study:
      "A 2018 study in the Journal of Social and Clinical Psychology found that limiting social media use to 30 minutes per day significantly reduced feelings of loneliness and depression.",
  },
  {
    tip: "Limit Passive Scrolling: Try to avoid endless scrolling without engaging meaningfully with content.",
    study:
      "A 2020 study in Computers in Human Behavior found that excessive social media use exacerbates symptoms of anxiety and depression.",
  },
  {
    tip: "Use Social Media for Learning: Follow educational accounts or join communities that promote growth and knowledge.",
    study:
      "A 2021 study in Educational Psychology Review found that 65% of students used social media to supplement their learning, particularly during the COVID-19 pandemic.",
  },
];

const BeMindfulTip = () => {
  const [tip, setTip] = useState({ tip: "", study: "" });

  useEffect(() => {
    getRandomTip();
  }, []);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * socialMediaTips.length);
    setTip(socialMediaTips[randomIndex]);
  };

  return (
    <div className="max-w-md mx-auto my-5 p-5 rounded-lg shadow-lg text-center border-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Be Mindful with Social Media</h2>
      <p className="text-lg text-gray-800 mb-2">
        <strong>Tip:</strong> {tip.tip}
      </p>
      <p className="text-md text-gray-200 italic mb-4">
        <strong>Research Insight:</strong> {tip.study}
      </p>
      <button
        onClick={getRandomTip}
        className="mt-2 px-4 py-2 text-lg cursor-pointer border-none rounded bg-blue-500 text-white"
      >
        Get Another Tip
      </button>
    </div>
  );
};

export default BeMindfulTip;
