// src/pages/Home.jsx

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { searchBooks } from "../services/apiService";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    async function fetchBooks() {
      if (!query) {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await searchBooks(query);
        setBooks(data.docs || []);
      } catch (err) {
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [query]);

  // Static Featured Books data for the initial display
  const featuredBooks = [
    { key: "OL45883W", title: "Your Financial Freedom", author_name: ["Dr. Jane Doe"], cover_i: "123456" },
    { key: "OL45884W", title: "Rich Dad Poor Dad", author_name: ["Robert Kiyosaki"], cover_i: "9451998" },
    { key: "OL45885W", title: "Think and Grow Rich", author_name: ["Napoleon Hill"], cover_i: "8267215" },
  ];

  const quotes = [
    `"If a rich gives you money, he has cheated you. What you need is access." – Dr. Cosmas Maduka`,
    `"Information is the key to financial freedom."`,
    `"Wealth is not built in a day, but daily habits build wealth."`,
  ];
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Header and Search */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Search for books on wealth creation
        </h1>
        <p className="text-gray-600 mb-6">
          Search for books on wealth creation...
        </p>
        <SearchBar />
      </div>

      {/* Featured Books Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Books</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </section>

      {/* Quote of the Day */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 mb-12 shadow-sm rounded-r-lg">
        <p className="italic text-lg md:text-xl">{quote}</p>
      </div>

      {/* Search Results Section */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading books...</p>}
      {error && <p className="text-center text-red-600 mt-4">{error}</p>}
      {books.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* No Results Message */}
      {!loading && !error && !query && (
        <p className="text-center text-gray-500">
          Start by searching for books on financial literacy, investing, and more.
        </p>
      )}
      {!loading && !error && query && books.length === 0 && (
        <p className="text-center text-gray-500">
          No books found for your search query.
        </p>
      )}

    </div>
  );
}