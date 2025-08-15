import { Link } from "react-router-dom";
import { coverUrlFromId } from "../services/apiService";

export default function BookCard({ doc }) {
  const cover = coverUrlFromId(doc.cover_i, "M");
  const authors = doc.author_name?.join(", ") || "Unknown author";
  const publisher = doc.publisher?.[0];

  // doc.key is like "/works/OL45883W"
  const workId = doc.key?.split("/").pop();

  return (
    <Link to={`/book/${workId}`} className="block">
      <article className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
        <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
          {cover ? (
            <img src={cover} alt={doc.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-neutral-500">No cover</span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold line-clamp-2">{doc.title}</h3>
          <p className="text-sm text-neutral-600">{authors}</p>
          {publisher && <p className="text-xs text-neutral-500 mt-1">{publisher}</p>}
        </div>
      </article>
    </Link>
  );
}
