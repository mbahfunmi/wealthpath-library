import BookCard from "./BookCard";

export default function BookList({ docs }) {
  if (!docs?.length) {
    return (
      <div className="text-center text-neutral-500 py-12">
        No results yet. Try a search!
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {docs.map((d) => (
        <BookCard key={`${d.key}-${d.cover_i || ""}`} doc={d} />
      ))}
    </div>
  );
}
