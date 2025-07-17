import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LapEntry } from "../types/LapEntry";

type Props = {
  laps: LapEntry[];
};

export default function LapTimeChart({ laps }: Props) {
  const toMs = (timeStr: string): number => {
    const [min, rest] = timeStr.split(":");
    const [sec, ms] = rest.split(".");
    return parseInt(min) * 60000 + parseInt(sec) * 1000 + parseInt(ms);
  };

  const chartData = [...laps]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((lap, index) => ({
      name: `Lap ${index + 1}`,
      lapTimeMs: toMs(lap.lapTime),
      date: new Date(lap.date).toLocaleDateString(),
    }));

  return (
    <div className="w-full h-[300px]">
      {chartData.length === 0 ? (
        <p className="text-center text-gray-600 mt-4">No lap data for graph.</p>
      ) : (
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
                domain={[
                  (dataMin: number) => Number((dataMin - 0.2).toFixed(3)),
                  (dataMax: number) => Number((dataMax + 0.2).toFixed(3)),
                ]}
                tickFormatter={(tick) => tick.toFixed(3)}
                reversed={true}
              />
            <Tooltip
              formatter={(value: number) => `${(value / 1000).toFixed(2)}s`}
            />
            <Line
              type="monotone"
              dataKey="lapTimeMs"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
