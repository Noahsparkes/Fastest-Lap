import { dummyLapData } from "../data/dummyLapData";

export default function Dashboard() {
  const {
    trackName,
    car,
    bestLapTime,
    sectors,
    topSpeed,
    gearShifts,
    averageThrottle,
    brakeUsage,
  } = dummyLapData;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <h1 className="text-xl font-bold mb-4">{trackName} - {car}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Best Lap" value={bestLapTime} />
        <Card title="Top Speed" value={topSpeed} />
        <Card title="Gear Shifts" value={gearShifts.toString()} />
        <Card title="Throttle Avg" value={averageThrottle} />
        <Card title="Brake Usage" value={brakeUsage} />
        <Card title="Sector Times" value={
          <ul className="space-y-1 text-sm">
            <li>S1: {sectors.S1}</li>
            <li>S2: {sectors.S2}</li>
            <li>S3: {sectors.S3}</li>
          </ul>
        } />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
      <h2 className="text-sm text-gray-400 mb-1">{title}</h2>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
