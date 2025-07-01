import { useState } from "react";
import { LapEntry } from "../types/LapEntry";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onAddLap: (lap: LapEntry) => void;
}

export default function LapForm({ onAddLap }: Props) {
  const [trackName, setTrackName] = useState("");
  const [carName, setCarName] = useState("");
  const [lapTime, setLapTime] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [throttleAvg, setThrottleAvg] = useState("");
  const [brakeUsage, setBrakeUsage] = useState("");

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
      throttleAvg,
      brakeUsage,
      date: new Date().toISOString(),
    };

    onAddLap(newLap);

    // Reset form
    setTrackName("");
    setCarName("");
    setLapTime("");
    setTopSpeed("");
    setThrottleAvg("");
    setBrakeUsage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-4 sm:p-6 rounded-2xl w-full">
      <input
        type="text"
        placeholder="Track name"
        value={trackName}
        onChange={(e) => setTrackName(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white text-sm sm:text-base"
        required
      />
      <input
        type="text"
        placeholder="Car name"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white text-sm sm:text-base"
        required
      />
      <input
        type="text"
        placeholder="Lap time (e.g. 02:14.038)"
        value={lapTime}
        onChange={(e) => setLapTime(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white text-sm sm:text-base"
        required
      />
      <input
        type="text"
        placeholder="Top speed (e.g. 272 km/h)"
        value={topSpeed}
        onChange={(e) => setTopSpeed(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white text-sm sm:text-base"
        required
      />
      <input
        type="text"
        placeholder="Throttle avg % (optional)"
        value={throttleAvg}
        onChange={(e) => setThrottleAvg(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white text-sm sm:text-base"
      />
      <input
        type="text"
        placeholder="Brake usage % (optional)"
        value={brakeUsage}
        onChange={(e) => setBrakeUsage(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white text-sm sm:text-base"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold text-sm sm:text-base"
      >
        Save Lap
      </button>
    </form>
  );
}


