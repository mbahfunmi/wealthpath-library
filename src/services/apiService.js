import axios from "axios";

// Build a cover URL from a cover id
export function coverUrlFromId(coverId, size = "M") {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export async function searchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`;
  const { data } = await axios.get(url);
  return data; // has .docs array
}

export async function getWork(workId) {
  // workId like "OL45883W"
  const { data } = await axios.get(`https://openlibrary.org/works/${workId}.json`);
  return data; // description, subjects, covers[], etc.
}

export async function getWorkEditions(workId, limit = 10) {
  const { data } = await axios.get(
    `https://openlibrary.org/works/${workId}/editions.json?limit=${limit}`
  );
  return data; // { entries: [...] }
}

// Pick the "best" edition (with pages / isbn if possible)
export function chooseBestEdition(editions) {
  if (!editions?.length) return null;
  // prefer edition with number_of_pages, then with isbn_13/10
  const withPages = editions.find(e => e.number_of_pages);
  if (withPages) return withPages;
  const withIsbn = editions.find(e => (e.isbn_13 && e.isbn_13.length) || (e.isbn_10 && e.isbn_10.length));
  return withIsbn || editions[0];
}
