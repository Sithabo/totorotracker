"use client";
import { CallChatAssistant } from "@/api/assistant";
import Analytics, { AppUsage } from "@/components/Analytics";
import BarStacked from "@/components/BarChart";
import ProgressBar from "@/components/ProgressBar";
import Tab from "@/components/Tab";
import Usage from "@/components/Usage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import ghibli from "@/public/Character4.png";
import BeMindfulTip from "@/components/BeMindful";
import ResearchLinks from "@/components/Resurces";

export default function Home() {
  const percentage = 66;

  const [chatData, setChatData] = useState<any | undefined>();
  const [loading, setLoading] = useState(true);
  

  const data = [
    {
      hour: 9,
      time_spent: 59,
      unproductive_time: "0",
    },
    {
      hour: 10,
      time_spent: 59,
      unproductive_time: "59",
    },
    {
      hour: 11,
      time_spent: 59,
      unproductive_time: "0",
    },
    {
      hour: 12,
      time_spent: 59,
      unproductive_time: "59",
    },
    {
      hour: 13,
      time_spent: 30,
      unproductive_time: "0",
    },
  ];

  const sampleApps: AppUsage[] = [
    {
      name: "Facebook",
      screenTime: 120,
      icon: <CiFacebook size={20} />,
      productive: false,
    },
    {
      name: "Instagram",
      screenTime: 90,
      icon: <CiInstagram size={20} />,
      productive: false,
    },
    {
      name: "Twitter",
      screenTime: 60,
      icon: <CiTwitter size={20} />,
      productive: false,
    },
    {
      name: "YouTube",
      screenTime: 150,
      icon: <CiYoutube size={20} />,
      productive: false,
    },
    {
      name: "Slack",
      screenTime: 180,
      icon: <CiFacebook size={20} />,
      productive: true,
    },
    {
      name: "VSCode",
      screenTime: 240,
      icon: <CiInstagram size={20} />,
      productive: true,
    },
    {
      name: "Jira",
      screenTime: 120,
      icon: <CiTwitter size={20} />,
      productive: true,
    },
    {
      name: "Notion",
      screenTime: 200,
      icon: <CiYoutube size={20} />,
      productive: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await CallChatAssistant(
        "im feeling down today, give me some advice to deal with anxiety"
      );
      setChatData(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Image src={ghibli} alt="Character" width={80} height={80} />
        <ProgressBar value={percentage} text="Productivity Score" />
      </div>
      <div className="my-5 max-w-5xl mx-auto bg-[#7f7f7f] opacity-90 p-5 rounded-lg shadow-lg">
        <Tab
          items={[
            {
              title: "Usage",
              content: (
                <div>
                  {/* <Analytics apps={sampleApps} /> */}
                  <Usage chatData={chatData} loading={loading} />
                </div>
              ),
            },
            {
              title: "Analysis",
              content: (
                <div className="flex flex-col justify-center items-center opacity-85">
                  <BarStacked data={data} />

                  <div className="px-5">
                    <h1 className="text-2xl font-bold text-center mt-5">
                      Todays App Usage
                    </h1>
                    <Analytics apps={sampleApps} />
                  </div>

                  <div className="px-5">
                    <h1 className="text-2xl font-bold text-center mt-5">
                      Be Mindful
                    </h1>
                    <BeMindfulTip />
                  </div>

                  <div className="px-5 w-full">
                    <h1 className="text-2xl font-bold text-center mt-5">
                      Resources
                    </h1>
                    <ResearchLinks />
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
