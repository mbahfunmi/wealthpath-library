// src/components/BookCard.jsx
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  if (!book) return null;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      {/* Book Cover */}
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-full h-64 object-cover"
      />

      {/* Book Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {book.title || "Untitled"}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {book.author || "Unknown Author"}
        </p>
        <p className="text-xs text-gray-500">
          First Published: {book.firstPublishYear || "N/A"}
        </p>

        {/* Link to Book Details */}
        <Link
          to={`/book/${book.key.replace("/works/", "")}`}
          className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}