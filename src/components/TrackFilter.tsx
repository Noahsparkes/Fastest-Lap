interface TrackFilterProps {
  tracks: string[];
  selected: string;
  onChange: (track: string) => void;
}

export default function TrackFilter({ tracks, selected, onChange }: TrackFilterProps) {
  return (
    <div className="relative">
      <label htmlFor="track" className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Track
      </label>
      <select
        id="track"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      >
        <option value="">All Tracks</option>
        {tracks.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
      </select>
    </div>
  );
}
