import { useState } from "react";
import LapForm from "./components/LapForm";
import LapList from "./components/LapList";
import { LapEntry } from "./types/LapEntry";

export default function App() {
  const [laps, setLaps] = useState<LapEntry[]>([]);

  const handleAddLap = (lap: LapEntry) => {
    setLaps((prev) => [...prev, lap]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Fastest Laps</h1>
      <LapForm onAddLap={handleAddLap} />
      <LapList laps={laps} />
    </div>
  );
}
