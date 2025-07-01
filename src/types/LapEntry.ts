// Forza-specific lap data structure

export type LapEntry = {
  id: string; // unique ID
  sim: "forza"; // hardcoded for now
  trackName: string;
  carName: string;
  lapTime: string; // e.g. "02:14.038"
  topSpeed: string; // e.g. "272 km/h"
  throttleAvg?: string;
  brakeUsage?: string;
  date: string; // ISO string
};
