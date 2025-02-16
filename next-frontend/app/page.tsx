import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";

export default function Home() {
  const percentage = 66;

  return (
    <div style={{ width: 200, height: 200 }}>
      <ProgressBar value={percentage} text="Productive" />
    </div>
  );
}
