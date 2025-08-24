// src/services/apiService.js
import axios from "axios";

const API_BASE_URL = "https://openlibrary.org";

export function coverUrlFromId(coverId, size = "M") {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover";
}

export async function searchBooks(query) {
  const url = `${API_BASE_URL}/search.json?q=${encodeURIComponent(query)}`;
  const { data } = await axios.get(url);

  return data.docs.map((book) => ({
    key: book.key,
    title: book.title,
    author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
    firstPublishYear: book.first_publish_year || "N/A",
    coverUrl: coverUrlFromId(book.cover_i, "L"),
  }));
}

export async function getWork(workId) {
  const { data } = await axios.get(`${API_BASE_URL}/works/${workId}.json`);
  return data;
}

export async function getBookEdition(workId) {
  const { data } = await axios.get(
    `${API_BASE_URL}/works/${workId}/editions.json`
  );
  return data.entries?.[0] || null;
}