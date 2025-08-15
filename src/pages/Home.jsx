import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { searchBooks } from "../services/apiService";

export default function Home() {
  const [query, setQuery] = useState("financial freedom");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runSearch(q) {
    try {
      setLoading(true);
      setError("");
      const data = await searchBooks(q);
      setDocs(data.docs || []);
    } catch (err) {
      console.error(err); // now 'err' is used
      setError("We couldn’t fetch books right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { runSearch(query); }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <SearchBar
        onSearch={(q) => {
          setQuery(q);
        }}
        initial={query}
      />
      {loading && <p className="text-sm text-neutral-500">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && <BookList docs={docs} />}
    </div>
  );
}
