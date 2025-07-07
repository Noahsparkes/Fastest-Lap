import { useState } from "react";
import { LapEntry } from "./types/LapEntry";
import LapForm from "./components/LapFormTile";
import LapListGrid from "./components/LapListGrid";

export default function App() {
  const [laps, setLaps] = useState<LapEntry[]>([]);

  const handleAddLap = (lap: LapEntry) => setLaps((prev) => [...prev, lap]);

  return (
    <div className="bg-gray-50 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base font-semibold text-indigo-600">Fastest Lap Tracker</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          Log and Visualize Your Laps
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Tile 1: Add Lap */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Add Lap Data
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center">
                  Input your lap times and car info after each Forza session.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm px-4 py-2">
                <LapForm onAddLap={handleAddLap} />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </div>

          {/* Tile 2: Placeholder */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Coming Soon</p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center">
                  Placeholder for future track comparison graphs.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <span className="text-6xl">📊</span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </div>

          {/* Tile 3: Placeholder */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Lap Filters</p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center">
                  In the future, filter by car, track, or lap range.
                </p>
              </div>
              <div className="@container flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
                <span className="text-5xl">🔍</span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* Tile 4: Saved Laps */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Saved Laps
                </p>
                <p className="mt-2 max-w-lg text-sm text-gray-600 max-lg:text-center">
                  View and compare all your recorded laps.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow px-6 py-4 overflow-y-auto">
                <LapListGrid laps={laps} />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import { LapEntry } from "./types/LapEntry";
// import LapFormTile from "./components/LapFormTile";
// import LapListGrid from "./components/LapListGrid";

// export default function App() {
//   const [laps, setLaps] = useState<LapEntry[]>([]);

//   const handleAddLap = (lap: LapEntry) => setLaps((prev) => [...prev, lap]);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-4 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6">Fastest Laps</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         <LapFormTile onAddLap={handleAddLap} />
//         <LapListGrid laps={laps} />
//       </div>
//     </div>
//   );
// }