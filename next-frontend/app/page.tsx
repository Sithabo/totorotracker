import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";

export default function Home() {
  const percentage = 66;

  return (
    <div>
      <div className="flex justify-center items-center">
        <ProgressBar value={percentage} text="Productivity Score" />
      </div>
    </div>
  );
}
