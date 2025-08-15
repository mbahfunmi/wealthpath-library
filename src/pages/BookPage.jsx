import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getWork,
  getWorkEditions,
  chooseBestEdition,
  coverUrlFromId,
} from "../services/apiService";

export default function BookPage() {
  const { workId } = useParams();
  const [work, setWork] = useState(null);
  const [edition, setEdition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErr("");
        const w = await getWork(workId);
        setWork(w);

        const editionsResp = await getWorkEditions(workId, 20);
        const best = chooseBestEdition(editionsResp?.entries || []);
        setEdition(best || null);
      } catch {
        setErr("Unable to load book details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [workId]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-8">Loading…</div>;
  }
  if (err) {
    return <div className="max-w-4xl mx-auto px-4 py-8 text-red-600">{err}</div>;
  }

  const title = work?.title || "Untitled";
  const authors = (work?.authors || [])
    .map((a) => a.name || a.author?.key || "Unknown")
    .join(", ");

  const coverId =
    work?.covers?.[0] || edition?.covers?.[0];
  const cover = coverUrlFromId(coverId, "L");

  const description =
    typeof work?.description === "string"
      ? work.description
      : work?.description?.value || "No description available.";

  const subjects = work?.subjects || [];
  const pages = edition?.number_of_pages;
  const publishDate = edition?.publish_date;
  const publishers = edition?.publishers?.join(", ");
  const isbn =
    edition?.isbn_13?.[0] ||
    edition?.isbn_10?.[0] ||
    null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/" className="text-green-700">
        &larr; Back to search
      </Link>

      <div className="mt-4 grid md:grid-cols-[240px,1fr] gap-6">
        <div className="rounded-xl overflow-hidden bg-neutral-100 aspect-[3/4]">
          {cover ? (
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-neutral-500">
              No cover
            </div>
          )}
        </div>

        <section>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {authors && <p className="text-neutral-600 mt-1">By {authors}</p>}
          {publishers && (
            <p className="text-sm text-neutral-600 mt-1">
              Publisher: {publishers}
            </p>
          )}

          <div className="mt-4 space-y-2 text-sm">
            {publishDate && (
              <p>
                <span className="font-medium">Publication Date:</span>{" "}
                {publishDate}
              </p>
            )}
            {isbn && (
              <p>
                <span className="font-medium">ISBN:</span> {isbn}
              </p>
            )}
            {pages && (
              <p>
                <span className="font-medium">Number of Pages:</span> {pages}
              </p>
            )}
          </div>

          <div className="mt-5">
            <h2 className="font-medium mb-2">Description</h2>
            <p className="text-sm leading-6 text-neutral-700">{description}</p>
          </div>

          {subjects.length > 0 && (
            <div className="mt-5">
              <h2 className="font-medium mb-2">Subjects</h2>
              <div className="flex flex-wrap gap-2">
                {subjects.slice(0, 15).map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full border border-green-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
