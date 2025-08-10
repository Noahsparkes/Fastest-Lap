import { useState } from "react";
import { LapEntry } from "./types/LapEntry";
import LapForm from "./components/LapFormTile";
import LapListGrid from "./components/LapListGrid";
import TrackFilter from "./components/TrackFilter";
import LapTimeChart from "./components/LapTimeChart";
import { useLapSync } from "./Hooks/lapSync";

export default function App() {
  const { laps, addLap, isOnline, setLaps } = useLapSync();
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  const handleAddLap = (lap: LapEntry) => {
    addLap(lap);
    setSelectedTrack("");
  };

  const handleDeleteLap = (idToDelete: string) => {
    const updatedLaps = laps.filter((lap) => lap.id !== idToDelete);
    setLaps(updatedLaps);
    localStorage.setItem("laps", JSON.stringify(updatedLaps));
    // Optionally: delete from Supabase if online
  };

  const filteredLaps =
    selectedTrack && selectedTrack.trim() !== ""
      ? laps.filter(
          (lap) =>
            lap.trackName.trim().toLowerCase() ===
            selectedTrack.trim().toLowerCase()
        )
      : laps;

  const uniqueTracks = Array.from(new Set(laps.map((lap) => lap.trackName)));

  return (
    <div className="bg-gray-50 py-24 sm:py-32 overflow-x-hidden">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">
          Fastest Lap Tracker {isOnline ? "(Online)" : "(Offline)"}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          Log and Visualize Your Best Laps
        </p>

        <div className="mt-6 max-w-sm mx-auto">
          <TrackFilter
            tracks={uniqueTracks}
            selected={selectedTrack}
            onChange={setSelectedTrack}
          />
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Form Tile */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Add Lap Data
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Input your lap time and car info manually for each session.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm px-4 py-2">
                <LapForm onAddLap={handleAddLap} />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </div>

          {/* Graph Tile */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Performance Over Time
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 py-4">
                <LapTimeChart laps={filteredLaps} />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </div>

          {/* Placeholder for future filters */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* Lap List Grid */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Saved Laps
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  View your fastest laps and sort them by track or car.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow px-6 py-4 overflow-y-auto">
                <LapListGrid
                  laps={filteredLaps}
                  filterTrack={selectedTrack}
                  onDelete={handleDeleteLap}
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { LapEntry } from "./types/LapEntry";
// import LapForm from "./components/LapFormTile";
// import LapListGrid from "./components/LapListGrid";
// import TrackFilter from "./components/TrackFilter";
// import LapTimeChart from "./components/LapTimeChart";

// export default function App() {
//   const [laps, setLaps] = useState<LapEntry[]>(() => {
//     try {
//       const storedLaps = localStorage.getItem("laps");
//       return storedLaps ? JSON.parse(storedLaps) : [];
//     } catch (err) {
//       localStorage.removeItem("laps");
//       console.error("Failed to parse laps from localStorage:", err);
//       return [];
//     }
//   });
//   const [selectedTrack, setSelectedTrack] = useState<string>("");

//   useEffect(() => {
//     localStorage.setItem("laps", JSON.stringify(laps));
//   }, [laps]);

//   const handleAddLap = (lap: LapEntry) => {
//     setLaps((prev) => [...prev, lap]);
//     setSelectedTrack("");
//   };

  
//   const handleDeleteLap = (idToDelete: string) => {
//     const updatedLaps = laps.filter((lap) => lap.id !== idToDelete);
//     setLaps(updatedLaps);
//   };

//   const filteredLaps =
//     selectedTrack && selectedTrack.trim() !== ""
//       ? laps.filter(
//           (lap) =>
//             lap.trackName.trim().toLowerCase() ===
//             selectedTrack.trim().toLowerCase()
//         )
//       : laps;

//   const uniqueTracks = Array.from(new Set(laps.map((lap) => lap.trackName)));

//   return (
//     <div className="bg-gray-50 py-24 sm:py-32 overflow-x-hidden">
//       <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
//         <h2 className="text-center text-base/7 font-semibold text-indigo-600">
//           Fastest Lap Tracker
//         </h2>
//         <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
//           Log and Visualize Your Best Laps
//         </p>

//         <div className="mt-6 max-w-sm mx-auto">
//           <TrackFilter
//             tracks={uniqueTracks}
//             selected={selectedTrack}
//             onChange={setSelectedTrack}
//           />
//         </div>

//         <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
//           {/* Form Tile */}
//           <div className="relative lg:row-span-2">
//             <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
//             <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
//               <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
//                 <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
//                   Add Lap Data
//                 </p>
//                 <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
//                   Input your lap time and car info manually for each session.
//                 </p>
//               </div>
//               <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm px-4 py-2">
//                 <LapForm onAddLap={handleAddLap} />
//               </div>
//             </div>
//             <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
//           </div>

//           {/* Graph Tile */}
//           <div className="relative max-lg:row-start-1">
//             <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
//             <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
//               <div className="px-8 pt-8 sm:px-10 sm:pt-10">
//                 <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
//                   Performance Over Time
//                 </p>
//               </div>
//               <div className="flex flex-1 items-center justify-center px-8 py-4">
//                 <LapTimeChart laps={filteredLaps} />
//               </div>
//             </div>
//             <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
//           </div>

//           {/* Placeholder for future filters */}
//           <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
//             <div className="absolute inset-px rounded-lg bg-white" />
//             <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
//           </div>

//           {/* Lap List Grid */}
//           <div className="relative lg:row-span-2">
//             <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
//             <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
//               <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
//                 <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
//                   Saved Laps
//                 </p>
//                 <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
//                   View your fastest laps and sort them by track or car.
//                 </p>
//               </div>
//               <div className="relative min-h-120 w-full grow px-6 py-4 overflow-y-auto">
//                 <LapListGrid
//                   laps={filteredLaps}
//                   filterTrack={selectedTrack}
//                   onDelete={handleDeleteLap}
//                 />
//               </div>
//             </div>
//             <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
