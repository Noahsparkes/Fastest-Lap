import { useState } from "react";
import LapForm from "./components/LapForm";
import LapList from "./components/LapList";
import { LapEntry } from "./types/LapEntry";

export default function App() {
  const [laps, setLaps] = useState<LapEntry[]>([]);
  const [editingLap, setEditingLap] = useState<LapEntry | null>(null);

  const handleAddOrUpdateLap = (lap: LapEntry) => {
    if (editingLap) {
      setLaps((prev) =>
        prev.map((l) => (l.id === lap.id ? lap : l))
      );
      setEditingLap(null);
    } else {
      setLaps((prev) => [...prev, lap]);
    }
  };

  const handleEditLap = (lap: LapEntry) => {
    setEditingLap(lap);
  };

  const handleDeleteLap = (id: string) => {
    setLaps((prev) => prev.filter((lap) => lap.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Fastest Laps</h1>
      <LapForm onSubmit={handleAddOrUpdateLap} lapToEdit={editingLap} />
      <LapList laps={laps} onEdit={handleEditLap} onDelete={handleDeleteLap} />
    </div>
  );
}
