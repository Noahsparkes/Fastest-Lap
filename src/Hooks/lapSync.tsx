import { useEffect, useState } from "react";
import { fetchLaps, insertLap } from "../../utils/supabaseAPI-utility";
import { LapEntry } from "../types/LapEntry";

const LAPS_KEY = "laps";
const UNSYNCED_KEY = "unsyncedLaps";

function getLocalLaps(): LapEntry[] {
  try {
    const stored = localStorage.getItem(LAPS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getUnsyncedLaps(): LapEntry[] {
  try {
    const stored = localStorage.getItem(UNSYNCED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalLaps(laps: LapEntry[]) {
  localStorage.setItem(LAPS_KEY, JSON.stringify(laps));
}

function saveUnsyncedLaps(laps: LapEntry[]) {
  localStorage.setItem(UNSYNCED_KEY, JSON.stringify(laps));
}

// Merge laps by id, preferring the first array (remote) and adding any unique from the second (unsynced)
function mergeLaps(remote: LapEntry[], unsynced: LapEntry[]): LapEntry[] {
  const map = new Map(remote.map(lap => [lap.id, lap]));
  for (const lap of unsynced) {
    if (!map.has(lap.id)) map.set(lap.id, lap);
  }
  return Array.from(map.values());
}

export function useLapSync() {
  const [laps, setLaps] = useState<LapEntry[]>(() => {
    // On first load, merge local and unsynced for display
    return mergeLaps(getLocalLaps(), getUnsyncedLaps());
  });
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // On mount, always merge local and unsynced for display
  useEffect(() => {
    setLaps(mergeLaps(getLocalLaps(), getUnsyncedLaps()));
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // When online, sync unsynced laps and fetch latest from Supabase
  useEffect(() => {
    async function syncAndFetch() {
      if (isOnline) {
        // Sync unsynced laps
        const unsynced = getUnsyncedLaps();
        let allSynced = true;
        if (unsynced.length > 0) {
          for (const lap of unsynced) {
            try {
              await insertLap(lap);
            } catch {
              allSynced = false;
              // If any fail, keep them in unsynced
            }
          }
          // If all synced, clear unsynced
          if (allSynced) saveUnsyncedLaps([]);
        }
        // Fetch latest from Supabase
        try {
          const remoteLaps = await fetchLaps();
          // Always merge remote with unsynced, and save that to localStorage
          const merged = mergeLaps(remoteLaps, getUnsyncedLaps());
          saveLocalLaps(merged);
          setLaps(merged);
        } catch {
          // fallback to merged local + unsynced
          setLaps(mergeLaps(getLocalLaps(), getUnsyncedLaps()));
        }
      } else {
        setLaps(mergeLaps(getLocalLaps(), getUnsyncedLaps()));
      }
    }
    syncAndFetch();
  }, [isOnline]);

  // Add a new lap (handles both online and offline)
  const addLap = async (lap: LapEntry) => {
    // Always update local state and storage immediately
    const updatedLaps = [...getLocalLaps(), lap];
    const updatedUnsynced = [...getUnsyncedLaps(), lap];
    setLaps(mergeLaps(updatedLaps, updatedUnsynced));
    saveLocalLaps(updatedLaps);

    if (isOnline) {
      try {
        await insertLap(lap);
        // Remove from unsynced if it was there
        const stillUnsynced = getUnsyncedLaps().filter(l => l.id !== lap.id);
        saveUnsyncedLaps(stillUnsynced);
      } catch {
        // If failed to sync, add to unsynced
        saveUnsyncedLaps(updatedUnsynced);
      }
    } else {
      // Offline: store in unsynced
      saveUnsyncedLaps(updatedUnsynced);
    }
  };

  // Allow manual update of laps (e.g. for deletion)
  const updateLaps = (newLaps: LapEntry[]) => {
    setLaps(mergeLaps(newLaps, getUnsyncedLaps()));
    saveLocalLaps(newLaps);
  };

  return { laps, addLap, isOnline, setLaps: updateLaps };
}





// sync with DB after adding a lap

// import { useEffect, useState } from "react";
// import { fetchLaps, insertLap } from "../../utils/supabaseAPI-utility";
// import { LapEntry } from "../types/LapEntry";

// const LAPS_KEY = "laps";
// const UNSYNCED_KEY = "unsyncedLaps";

// function getLocalLaps(): LapEntry[] {
//   try {
//     const stored = localStorage.getItem(LAPS_KEY);
//     return stored ? JSON.parse(stored) : [];
//   } catch {
//     return [];
//   }
// }

// function getUnsyncedLaps(): LapEntry[] {
//   try {
//     const stored = localStorage.getItem(UNSYNCED_KEY);
//     return stored ? JSON.parse(stored) : [];
//   } catch {
//     return [];
//   }
// }

// function saveLocalLaps(laps: LapEntry[]) {
//   localStorage.setItem(LAPS_KEY, JSON.stringify(laps));
// }

// function saveUnsyncedLaps(laps: LapEntry[]) {
//   localStorage.setItem(UNSYNCED_KEY, JSON.stringify(laps));
// }

// // Merge laps by id, preferring the first array (remote) and adding any unique from the second (unsynced)
// function mergeLaps(remote: LapEntry[], unsynced: LapEntry[]): LapEntry[] {
//   const map = new Map(remote.map(lap => [lap.id, lap]));
//   for (const lap of unsynced) {
//     if (!map.has(lap.id)) map.set(lap.id, lap);
//   }
//   return Array.from(map.values());
// }

// export function useLapSync() {
//   const [laps, setLaps] = useState<LapEntry[]>(() => {
//     // On first load, merge local and unsynced for display
//     return mergeLaps(getLocalLaps(), getUnsyncedLaps());
//   });
//   const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

//   // On mount, always merge local and unsynced for display
//   useEffect(() => {
//     setLaps(mergeLaps(getLocalLaps(), getUnsyncedLaps()));
//   }, []);

//   // Listen for online/offline events
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);
//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);
//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   // When online, sync unsynced laps and fetch latest from Supabase
//   useEffect(() => {
//     async function syncAndFetch() {
//       if (isOnline) {
//         // Sync unsynced laps
//         const unsynced = getUnsyncedLaps();
//         if (unsynced.length > 0) {
//           for (const lap of unsynced) {
//             try {
//               await insertLap(lap);
//             } catch {
//               // If any fail, keep them in unsynced
//               saveUnsyncedLaps(unsynced);
//               setLaps(mergeLaps(getLocalLaps(), unsynced));
//               return;
//             }
//           }
//           // All synced, clear unsynced
//           saveUnsyncedLaps([]);
//         }
//         // Fetch latest from Supabase
//         try {
//           const remoteLaps = await fetchLaps();
//           saveLocalLaps(remoteLaps);
//           setLaps(mergeLaps(remoteLaps, getUnsyncedLaps()));
//         } catch {
//           // fallback to merged local + unsynced
//           setLaps(mergeLaps(getLocalLaps(), getUnsyncedLaps()));
//         }
//       } else {
//         setLaps(mergeLaps(getLocalLaps(), getUnsyncedLaps()));
//       }
//     }
//     syncAndFetch();
//   }, [isOnline]);

//   // Add a new lap (handles both online and offline)
//   const addLap = async (lap: LapEntry) => {
//     // Always update local state and storage immediately
//     const updatedLaps = [...getLocalLaps(), lap];
//     setLaps(mergeLaps(updatedLaps, [...getUnsyncedLaps(), lap]));
//     saveLocalLaps(updatedLaps);

//     if (isOnline) {
//       try {
//         await insertLap(lap);
//         // Do NOT fetch remote laps here; keep local state for instant feedback
//       } catch {
//         // If failed to sync, add to unsynced
//         const unsynced = [...getUnsyncedLaps(), lap];
//         saveUnsyncedLaps(unsynced);
//         setLaps(mergeLaps(updatedLaps, unsynced));
//       }
//     } else {
//       // Offline: store in unsynced
//       const unsynced = [...getUnsyncedLaps(), lap];
//       saveUnsyncedLaps(unsynced);
//       setLaps(mergeLaps(updatedLaps, unsynced));
//     }
//   };

//   // Allow manual update of laps (e.g. for deletion)
//   const updateLaps = (newLaps: LapEntry[]) => {
//     setLaps(mergeLaps(newLaps, getUnsyncedLaps()));
//     saveLocalLaps(newLaps);
//   };

//   return { laps, addLap, isOnline, setLaps: updateLaps };
// }












