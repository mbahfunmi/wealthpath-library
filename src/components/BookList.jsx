import { Link } from "react-router-dom";

export default function BookList({ docs }) {
  if (!docs.length) {
    return <p className="text-sm text-gray-500">No books found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {docs.map((book) => (
        <div
          key={book.key}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          {/* Book Title links to BookPage */}
          <h3 className="font-semibold text-lg mb-2">
            <Link
              to={`/book/${book.key.replace("/works/", "")}`}
              className="text-blue-600 hover:underline"
            >
              {book.title}
            </Link>
          </h3>

          {/* Author */}
          <p className="text-sm text-gray-600 mb-1">
            {book.author_name?.join(", ") || "Unknown Author"}
          </p>

          {/* Year */}
          <p className="text-xs text-gray-500">
            First published: {book.first_publish_year || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}
