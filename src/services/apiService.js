import axios from "axios";

// Base URL for the Open Library API
const API_BASE_URL = "https://openlibrary.org";

export function coverUrlFromId(coverId, size = "M") {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export async function searchBooks(query) {
  const url = `${API_BASE_URL}/search.json?q=${encodeURIComponent(query)}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getWork(workId) {
  const { data } = await axios.get(`${API_BASE_URL}/works/${workId}.json`);
  return data;
}

export async function getBookEdition(workId) {
  const { data } = await axios.get(`${API_BASE_URL}/works/${workId}/editions.json`);
  return data.entries?.[0] || null;
}