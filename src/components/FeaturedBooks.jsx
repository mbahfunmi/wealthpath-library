// src/pages/FeaturedPage.jsx
import { useEffect, useState } from "react";
import { searchBooks } from "../services/apiService";
import BookCard from "../components/BookCard";

export default function FeaturedPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        // 👇 you can change "wealth" to any theme you want (e.g. finance, business, success)
        const results = await searchBooks("wealth");
        setBooks(results.slice(0, 12)); // show 12 featured books
      } catch (err) {
        console.error("Error fetching featured books:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) return <p className="text-center p-6">Loading Featured Books...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Featured Books</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-600">No featured books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
