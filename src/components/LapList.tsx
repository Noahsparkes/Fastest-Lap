import { useState } from "react";
import { LapEntry } from "../types/LapEntry";

interface Props {
  laps: LapEntry[];
  onDelete: (id: string) => void;
  onEdit: (updatedLap: LapEntry) => void;
}

export default function LapList({ laps, onDelete, onEdit }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<LapEntry>>({});

  const sortedLaps = [...laps].sort((a, b) => timeToMs(a.lapTime) - timeToMs(b.lapTime));

  const handleEditChange = (field: keyof LapEntry, value: string) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleEditSubmit = (id: string) => {
    onEdit({ ...editData, id, sim: "forza", date: new Date().toISOString() } as LapEntry);
    setEditingId(null);
    setEditData({});
  };

  if (laps.length === 0) {
    return (
      <div className="text-center text-gray-500 p-10 border border-gray-700 rounded-xl mt-6">
        <p className="text-lg mb-4">No laps yet.</p>
        <p className="text-sm">Add your first one above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {sortedLaps.map((lap) => (
        <div key={lap.id} className="bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow relative">
          {editingId === lap.id ? (
            <>
              <input
                className="w-full mb-2 p-2 bg-gray-700 text-white rounded text-sm"
                placeholder="Track name"
                value={editData.trackName || lap.trackName}
                onChange={(e) => handleEditChange("trackName", e.target.value)}
              />
              <input
                className="w-full mb-2 p-2 bg-gray-700 text-white rounded text-sm"
                placeholder="Car name"
                value={editData.carName || lap.carName}
                onChange={(e) => handleEditChange("carName", e.target.value)}
              />
              <input
                className="w-full mb-2 p-2 bg-gray-700 text-white rounded text-sm"
                placeholder="Lap time"
                value={editData.lapTime || lap.lapTime}
                onChange={(e) => handleEditChange("lapTime", e.target.value)}
              />
              <input
                className="w-full mb-2 p-2 bg-gray-700 text-white rounded text-sm"
                placeholder="Top speed"
                value={editData.topSpeed || lap.topSpeed}
                onChange={(e) => handleEditChange("topSpeed", e.target.value)}
              />
              <input
                className="w-full mb-2 p-2 bg-gray-700 text-white rounded text-sm"
                placeholder="Throttle avg %"
                value={editData.throttleAvg || lap.throttleAvg || ""}
                onChange={(e) => handleEditChange("throttleAvg", e.target.value)}
              />
              <input
                className="w-full mb-2 p-2 bg-gray-700 text-white rounded text-sm"
                placeholder="Brake usage %"
                value={editData.brakeUsage || lap.brakeUsage || ""}
                onChange={(e) => handleEditChange("brakeUsage", e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditSubmit(lap.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-1 rounded text-white text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditData({});
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-1 rounded text-white text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{lap.trackName}</span>
                <span>{lap.date.split("T")[0]}</span>
              </div>
              <div className="text-2xl font-bold">{lap.lapTime}</div>
              <div className="text-sm text-gray-300 mt-1">
                {lap.carName} • {lap.topSpeed}
              </div>
              {(lap.throttleAvg || lap.brakeUsage) && (
                <div className="text-xs text-gray-400 mt-2">
                  Throttle: {lap.throttleAvg || "N/A"} | Brakes: {lap.brakeUsage || "N/A"}
                </div>
              )}
              <div className="flex justify-end gap-2 mt-4 text-xs">
                <button
                  onClick={() => {
                    setEditingId(lap.id);
                    setEditData(lap);
                  }}
                  className="text-yellow-400 hover:text-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(lap.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function timeToMs(time: string): number {
  const [mins, rest] = time.split(":");
  const [secs, millis] = rest.split(".");
  return (
    parseInt(mins) * 60 * 1000 +
    parseInt(secs) * 1000 +
    parseInt(millis.padEnd(3, "0"))
  );
}

