import { supabase } from "../supabaseClient";
import { LapEntry } from "../src/types/LapEntry";
export async function fetchLaps(): Promise<LapEntry[]> {
  const { data, error } = await supabase
    .from("laps")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw error;
  return data as LapEntry[];
}

export async function insertLap(lap: LapEntry): Promise<void> {
  const { error } = await supabase.from("laps").insert([lap]);
  if (error) throw error;

}

