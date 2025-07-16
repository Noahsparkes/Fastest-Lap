import { useState } from "react";
import { LapEntry } from "../types/LapEntry";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onAddLap: (lap: LapEntry) => void;
}

export default function LapFormTile({ onAddLap }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [carName, setCarName] = useState("");
  const [lapTime, setLapTime] = useState("");
  const [topSpeed, setTopSpeed] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackName || !carName || !lapTime || !topSpeed) return;

    const newLap: LapEntry = {
      id: uuidv4(),
      sim: "forza",
      trackName,
      carName,
      lapTime,
      topSpeed,
      date: new Date().toISOString(),
    };

    onAddLap(newLap);
    setTrackName(""); setCarName(""); setLapTime(""); setTopSpeed("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-6 flex justify-center items-center text-4xl font-bold"
      >
        +
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-gray-900 p-4 rounded-2xl">
      <input className="w-full p-2 rounded bg-gray-800 text-white" placeholder="Track" value={trackName} onChange={(e) => setTrackName(e.target.value)} />
      <input className="w-full p-2 rounded bg-gray-800 text-white" placeholder="Car" value={carName} onChange={(e) => setCarName(e.target.value)} />
      <input className="w-full p-2 rounded bg-gray-800 text-white" placeholder="Lap Time (e.g. 02:14.038)" value={lapTime} onChange={(e) => setLapTime(e.target.value)} />
      <input className="w-full p-2 rounded bg-gray-800 text-white" placeholder="Top Speed (e.g. 268 km/h)" value={topSpeed} onChange={(e) => setTopSpeed(e.target.value)} />
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white">Save Lap</button>
    </form>
  );
}