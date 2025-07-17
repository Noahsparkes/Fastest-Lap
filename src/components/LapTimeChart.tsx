import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LapEntry } from "../types/LapEntry";

type Props = {
  laps: LapEntry[];
  selectedTrack?: string;
};

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ff7300",
  "#0088FE",
  "#FF8042",
  "#00C49F",
];

function toMs(timeStr: string): number {
  // Handles mm:ss.SSS or m:ss.SSS
  const [min, rest] = timeStr.split(":");
  const [sec, ms] = rest.split(".");
  return parseInt(min) * 60000 + parseInt(sec) * 1000 + parseInt(ms);
}

export default function LapTimeChart({ laps, selectedTrack }: Props) {
  const isAllTracks =
    !selectedTrack ||
    selectedTrack === "All" ||
    selectedTrack === "All Tracks" ||
    selectedTrack.trim() === "";

  // Group laps by trackName
  const grouped = laps.reduce((acc, lap) => {
    if (!acc[lap.trackName]) acc[lap.trackName] = [];
    acc[lap.trackName].push(lap);
    return acc;
  }, {} as Record<string, LapEntry[]>);

  // For single track, sort by date
  let chartData: { date: string; lapTimeMs: number; lapTime: number; carName: string; name: string }[] = [];
  if (!isAllTracks && grouped[selectedTrack]) {
    chartData = [...grouped[selectedTrack]]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((lap, idx) => ({
        date: new Date(lap.date).toLocaleDateString(),
        lapTimeMs: toMs(lap.lapTime),
        lapTime: Number((toMs(lap.lapTime) / 1000).toFixed(3)),
        carName: lap.carName,
        name: `Lap ${idx + 1}`,
      }));
  }

  // For all tracks, build a map of trackName -> chartData[]
  const allTracksData = Object.entries(grouped).reduce(
    (acc, [trackName, laps]) => {
      acc[trackName] = laps
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((lap, idx) => ({
          date: new Date(lap.date).toLocaleDateString(),
          lapTime: Number((toMs(lap.lapTime) / 1000).toFixed(3)),
          name: `Lap ${idx + 1}`,
        }));
      return acc;
    },
    {} as Record<string, { date: string; lapTime: number; name: string }[]>
  );

  // If no data, show message
  if (laps.length === 0) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <p className="text-center text-gray-600">No lap data for graph.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={isAllTracks ? undefined : chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          domain={[
            (dataMin: number) => Math.max(0, dataMin - 0.2),
            (dataMax: number) => dataMax + 0.2,
          ]}
          tickFormatter={(tick) => tick.toFixed(2) + "s"}
          reversed
        />
        <Tooltip
          formatter={(value: number) => `${value.toFixed(3)}s`}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        {isAllTracks
          ? Object.entries(allTracksData).map(([trackName, data], idx) => (
              <Line
                key={trackName}
                data={data}
                type="monotone"
                dataKey="lapTime"
                name={trackName}
                stroke={colors[idx % colors.length]}
                dot={{ r: 3 }}
                isAnimationActive={false}
              />
            ))
          : (
            <Line
              type="monotone"
              dataKey="lapTime"
              name={selectedTrack}
              stroke={colors[0]}
              dot={{ r: 3 }}
              isAnimationActive={false}
            />
          )}
      </LineChart>
    </ResponsiveContainer>
  );
}