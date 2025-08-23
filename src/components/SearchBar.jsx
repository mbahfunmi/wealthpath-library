import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      setSearchParams({ q: trimmedQuery });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books, authors, keywords…"
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800"
      >
        Search
      </button>
    </form>
  );
}