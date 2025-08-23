import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchBooks } from "../services/apiService";

export default function BookDetails() {
  const { id } = useParams(); // book id from URL
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        setError("");
        setLoading(true);
        // OpenLibrary: we search by work ID
        const data = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!data.ok) throw new Error("Failed to fetch");
        const bookData = await data.json();
        setBook(bookData);
      } catch (e) {
        setError("Could not load book details. Try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <p className="p-4 text-sm text-gray-500">Loading book…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      {book.description && (
        <p className="text-gray-700 mb-4">
          {typeof book.description === "string"
            ? book.description
            : book.description.value}
        </p>
      )}
      <p className="text-sm text-gray-600">
        First published: {book.first_publish_date || "N/A"}
      </p>
    </div>
  );
}
