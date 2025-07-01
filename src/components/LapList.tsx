import { LapEntry } from "../types/LapEntry";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Props {
  laps: LapEntry[];
  onEdit: (lap: LapEntry) => void;
  onDelete: (id: string) => void;
}

export default function LapList({ laps, onEdit, onDelete }: Props) {
  if (laps.length === 0) return <p className="text-gray-400">No laps logged yet.</p>;

  const sortedLaps = [...laps].sort((a, b) => {
    return timeToMs(a.lapTime) - timeToMs(b.lapTime);
  });

  return (
    <div className="mt-6 space-y-4">
      {sortedLaps.map((lap) => (
        <div key={lap.id} className="bg-gray-800 p-4 rounded-2xl relative">
          <div className="absolute right-4 top-4 flex gap-3 text-sm text-gray-500">
            <button onClick={() => onEdit(lap)}><FaEdit /></button>
            <button onClick={() => onDelete(lap.id)}><FaTrash /></button>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{lap.trackName}</span>
            <span>{lap.date.split("T")[0]}</span>
          </div>
          <div className="text-lg font-bold">{lap.lapTime}</div>
          <div className="text-sm text-gray-300">
            {lap.carName} | {lap.topSpeed}
          </div>
          {(lap.throttleAvg || lap.brakeUsage) && (
            <div className="text-xs text-gray-400 mt-1">
              Throttle: {lap.throttleAvg || "N/A"} | Brakes: {lap.brakeUsage || "N/A"}
            </div>
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
