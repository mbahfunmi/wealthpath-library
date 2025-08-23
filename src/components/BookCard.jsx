import { Link } from "react-router-dom";
import { coverUrlFromId } from "../services/apiService";

export default function BookCard({ book }) {
  const cover = coverUrlFromId(book.cover_i, "M");
  const authors = book.author_name?.join(", ") || "Unknown author";
  const workId = book.key?.split("/").pop(); // e.g., 'OL45883W'

  if (!workId) {
    return null; // Don't render if there's no valid ID
  }

  return (
    <Link to={`/book/${workId}`} className="block">
      <article className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
        <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
          {cover ? (
            <img src={cover} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-neutral-500">No cover</span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold line-clamp-2">{book.title}</h3>
          <p className="text-sm text-neutral-600">{authors}</p>
          <p className="text-xs text-neutral-500 mt-1">
            First published: {book.first_publish_year || "N/A"}
          </p>
        </div>
      </article>
    </Link>
  );
}