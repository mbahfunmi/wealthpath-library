import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWork, getBookEdition } from "../services/apiService";
import DiscussionBoard from "../components/DiscussionBoard";

export default function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [edition, setEdition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      setLoading(true);
      setError(null);
      try {
        const [workData, editionData] = await Promise.all([
          getWork(id),
          getBookEdition(id),
        ]);
        setBook(workData);
        setEdition(editionData);
      } catch (err) {
        setError("Could not load book details. Try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [id]);

  if (loading) return <p className="p-4 text-sm text-gray-500">Loading book details...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!book) return <p className="p-4 text-gray-600">No book found with this ID.</p>;

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available.";

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{book.title || "Untitled"}</h1>
      <p className="text-gray-700 mb-4">{description}</p>
      
      {/* Displaying detailed edition info */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          First published: {book.first_publish_date || "N/A"}
        </p>
        {edition && (
          <>
            <p>
              ISBN: {edition.isbn_13?.[0] || edition.isbn_10?.[0] || "N/A"}
            </p>
            <p>
              Number of Pages: {edition.number_of_pages || "N/A"}
            </p>
            <p>
              Subjects: {edition.subjects?.join(", ") || "N/A"}
            </p>
          </>
        )}
      </div>

      <DiscussionBoard workId={id} />
    </div>
  );
}