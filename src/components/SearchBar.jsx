import { useState } from "react";

/**
 * Controlled search form.
 * Props:
 *  - onSearch(term: string): called with the trimmed query on submit
 *  - disabled: true while a search is in flight
 */
export default function SearchBar({ onSearch, disabled }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form className="search-panel p-3 p-md-4 mb-4" onSubmit={handleSubmit}>
      <label htmlFor="book-search-input" className="eyebrow d-block mb-2">
        Find a book
      </label>
      <div className="input-group input-group-lg">
        <input
          id="book-search-input"
          type="text"
          className="form-control"
          placeholder='Try a title or author, e.g. "dune"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <button className="btn btn-accent" type="submit" disabled={disabled || !query.trim()}>
          {disabled ? "Searching…" : "Search"}
        </button>
      </div>
    </form>
  );
}
