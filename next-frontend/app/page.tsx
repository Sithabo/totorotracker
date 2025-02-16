"use client";
import BarStacked from "@/components/BarChart";
import ProgressBar from "@/components/ProgressBar";
import Tab from "@/components/Tab";
import Image from "next/image";

export default function Home() {
  const percentage = 66;

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

  return (
    <div>
      <div className="flex justify-center items-center">
        <ProgressBar value={percentage} text="Productivity Score" />
      </div>
      <div className="mx-5">
        <Tab
          items={[
            {
              title: "Usage",
              content: (
                <div className="flex justify-center items-center opacity-85">
                  <BarStacked data={data} />
                </div>
              ),
            },
            {
              title: "Analysis",
              content: <div>Tab 2 content</div>,
            },
          ]}
        />
      </div>
    </div>
  );
}
