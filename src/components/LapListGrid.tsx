
import { LapEntry } from "../types/LapEntry";

interface Props {
  laps: LapEntry[];
  filterTrack: string;
}

export default function LapListGrid({ laps, filterTrack }: Props) {
  const filtered = filterTrack === "All"
    ? laps
    : laps.filter((lap) => lap.trackName === filterTrack);

  if (filtered.length === 0)
    return <p className="text-center text-gray-600">No laps match this track.</p>;

  const sorted = [...filtered].sort(
    (a, b) => timeToMs(a.lapTime) - timeToMs(b.lapTime)
  );

  return (
    <div className="grid gap-4">
      {sorted.map((lap) => (
        <div key={lap.id} className="bg-gray-800 text-white p-4 rounded-xl">
          <div className="text-lg font-semibold">{lap.lapTime}</div>
          <div className="text-sm">{lap.trackName} — {lap.carName}</div>
          <div className="text-xs text-gray-400">{lap.date.split("T")[0]}</div>
        </div>
      ))}
    </div>
  );
}

function timeToMs(time: string): number {
  const [min, rest] = time.split(":");
  const [sec, ms] = rest.split(".");
  return parseInt(min) * 60000 + parseInt(sec) * 1000 + parseInt(ms);
}


