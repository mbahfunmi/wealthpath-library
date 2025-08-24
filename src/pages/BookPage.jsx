// src/pages/BookPage.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWork, getBookEdition, coverUrlFromId } from "../services/apiService";
import DiscussionBoard from "../components/DiscussionBoard";

// Placeholder for the "Read with AI" component
function ReadWithAI() {
  return (
    <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between mt-6">
      <span className="font-semibold text-green-800">Read with AI</span>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
        Launch AI
      </button>
    </div>
  );
}

// Placeholder for the "Chat with Author" component
function ChatWithAuthor() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <div className="flex items-center mb-2">
        <img
          src="https://via.placeholder.com/40"
          alt="Author"
          className="rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">Author Name</p>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
      <button className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full text-sm hover:bg-gray-800">
        Chat with Author
      </button>
    </div>
  );
}

export default function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [edition, setEdition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      if (!id) {
        setError("No book ID provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const [workData, editionData] = await Promise.all([
          getWork(id),
          getBookEdition(id),
        ]);
        console.log("Fetched work:", workData);
        console.log("Fetched edition:", editionData);

        setBook(workData || {});
        setEdition(editionData || {});
      } catch (err) {
        console.error("BookPage fetch error:", err);
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

  // ✅ Safe fallbacks
  const coverId = book?.covers?.[0];
  const coverUrl = coverId
    ? coverUrlFromId(coverId, "L")
    : "https://via.placeholder.com/300x450?text=No+Cover";

  const author = book?.authors?.[0]?.name || "Unknown Author";

  const description =
    typeof book?.description === "string"
      ? book.description
      : book?.description?.value || "No description available.";

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Left Column (Book Cover and Details) */}
      <div className="flex-shrink-0 md:w-1/3">
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <img
            src={coverUrl}
            alt={book?.title || "Untitled"}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <h1 className="text-2xl font-bold mt-4">{book?.title || "Untitled"}</h1>
          <p className="text-gray-600">by {author}</p>

          <a
            href="https://books.google.com/books"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block w-full bg-yellow-400 text-yellow-900 font-bold py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Preview on Google Books
          </a>
        </div>

        {/* Missing Components from Wireframe */}
        <ReadWithAI />
        <ChatWithAuthor />
      </div>

      {/* Right Column (Description and Discussions) */}
      <div className="flex-grow">
        {/* Description */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{description}</p>
        </div>

        {/* Wealth Circle (Discussion Board) */}
        <DiscussionBoard workId={id} />
      </div>
    </div>
  );
}
