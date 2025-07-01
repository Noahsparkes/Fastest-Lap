import { useState } from "react";
import LapForm from "./components/LapForm";
import LapList from "./components/LapList";
import { LapEntry } from "./types/LapEntry";

export default function App() {
  const [laps, setLaps] = useState<LapEntry[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddLap = (lap: LapEntry) => {
    setLaps((prev) => [...prev, lap]);
    setShowForm(false); // collapse form after submission
  };

  const handleDeleteLap = (id: string) => {
    setLaps((prev) => prev.filter((lap) => lap.id !== id));
  };

  const handleEditLap = (updated: LapEntry) => {
    setLaps((prev) =>
      prev.map((lap) => (lap.id === updated.id ? updated : lap))
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">Fastest Laps</h1>

      {!showForm ? (
        <div
          onClick={() => setShowForm(true)}
          className="cursor-pointer bg-gray-800 hover:bg-gray-700 flex items-center justify-center h-32 rounded-2xl text-4xl font-bold text-white transition"
        >
          +
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-2xl">
          <LapForm onAddLap={handleAddLap} />
          <button
            onClick={() => setShowForm(false)}
            className="mt-4 w-full text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      )}

      <LapList laps={laps} onDelete={handleDeleteLap} onEdit={handleEditLap} />
    </div>
  );
}
