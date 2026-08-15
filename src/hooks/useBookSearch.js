import { useEffect, useRef, useState } from "react";

const FIELDS =
  "key,title,author_name,first_publish_year,cover_i,edition_count,subject,ratings_average";

/**
 * Owns the search term + fetch lifecycle for the book search app.
 * Returns everything a page needs to render loading/error/empty/results states.
 */
export function useBookSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | done
  const [errorMsg, setErrorMsg] = useState("");
  const requestId = useRef(0);

  useEffect(() => {
    if (!searchTerm) return;

    const currentRequest = ++requestId.current;
    setStatus("loading");
    setErrorMsg("");

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      searchTerm
    )}&fields=${FIELDS}&limit=24`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (status ${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (currentRequest !== requestId.current) return; // ignore stale responses
        setBooks(data.docs || []);
        setStatus("done");
      })
      .catch((err) => {
        if (currentRequest !== requestId.current) return;
        setErrorMsg(err.message || "Something went wrong while fetching books.");
        setStatus("error");
      });
  }, [searchTerm]);

  return { books, status, errorMsg, search: setSearchTerm, searchTerm };
}
