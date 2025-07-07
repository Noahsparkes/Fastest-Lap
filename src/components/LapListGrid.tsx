import { LapEntry } from "../types/LapEntry";
import LapCard from "./LapCard";

export default function LapListGrid({ laps }: { laps: LapEntry[] }) {
  const sortedLaps = [...laps].sort((a, b) => {
    return timeToMs(a.lapTime) - timeToMs(b.lapTime);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {sortedLaps.map((lap) => (
        <LapCard key={lap.id} lap={lap} />
      ))}
    </div>
  );
}

function timeToMs(time: string): number {
  const [mins, rest] = time.split(":");
  const [secs, millis] = rest.split(".");
  return parseInt(mins) * 60000 + parseInt(secs) * 1000 + parseInt(millis.padEnd(3, "0"));
}
