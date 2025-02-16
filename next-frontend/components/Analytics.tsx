import React from "react";
import { motion } from "motion/react";
import slack from "@/public/slack.png";

export interface AppUsage {
  name: string;
  screenTime: number;
  icon: React.ReactNode; // Add icon property
  productive: boolean; // Add productive property
}

export interface AnalyticsProps {
  apps: AppUsage[];
}

const Analytics: React.FC<AnalyticsProps> = ({ apps }) => {
  const totalScreenTime = apps.reduce(
    (total, app) => total + app.screenTime,
    0
  );

  return (
    <div className="flex flex-wrap gap-4 px-4 p-2.5">
      {apps.map((app, index) => {
        const percentage = ((app.screenTime / totalScreenTime) * 100).toFixed(
          2
        );
        const delay = index * 0.1; // Creates a staggered effect

        return (
          <motion.div
            key={app.name}
            className="flex items-center mr-2.5 p-1.5 rounded-full bg-transparent border border-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
          >
            {app.icon}
            <span className="mr-1.5">{app.name}</span>
            <span>{percentage}%</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Analytics;
