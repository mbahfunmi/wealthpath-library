import { useState } from "react";

export default function SearchBar({ onSearch, initial = "" }) {
  const [q, setQ] = useState(initial);

  function submit(e) {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search books, authors, keywords…"
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
      />
      <button className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800">
        Search
      </button>
    </form>
  );
}
