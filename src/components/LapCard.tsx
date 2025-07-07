import { LapEntry } from "../types/LapEntry";

export default function LapCard({ lap }: { lap: LapEntry }) {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl text-white space-y-2">
      <div className="text-sm text-gray-400 flex justify-between">
        <span>{lap.trackName}</span>
        <span>{lap.date.split("T")[0]}</span>
      </div>
      <div className="text-xl font-bold">{lap.lapTime}</div>
      <div className="text-sm">{lap.carName} | {lap.topSpeed}</div>
    </div>
  );
}
