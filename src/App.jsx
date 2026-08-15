import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchStatus from "./components/SearchStatus";
import BookList from "./components/BookList";
import BookDetailsModal from "./components/BookDetailsModal";
import { useBookSearch } from "./hooks/useBookSearch";
import "./App.css";

export default function App() {
  const { books, status, errorMsg, search, searchTerm, reset } = useBookSearch();
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchBarKey, setSearchBarKey] = useState(0);

  const handleGoHome = () => {
    reset();
    setSelectedBook(null);
    setSearchBarKey((k) => k + 1); // remounts SearchBar so its typed text clears too
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-books py-3 mb-4">
        <div className="container-fluid px-3 px-md-5 d-flex justify-content-between align-items-center flex-wrap">
          <button
            type="button"
            className="navbar-brand fs-3 mb-0 btn btn-link p-0 text-decoration-none"
            onClick={handleGoHome}
          >
            📚 Book Explorer
          </button>
          <span className="text-white-50 small d-none d-sm-inline">Powered by Open Library</span>
        </div>
      </nav>

      <div className="container flex-grow-1 pb-5">
        <SearchBar key={searchBarKey} onSearch={search} disabled={status === "loading"} />

        {status !== "done" && (
          <SearchStatus status={status} searchTerm={searchTerm} errorMsg={errorMsg} />
        )}

        {status === "done" && (
          <BookList books={books} searchTerm={searchTerm} onSelectBook={setSelectedBook} />
        )}
      </div>

      <BookDetailsModal book={selectedBook} onClose={() => setSelectedBook(null)} />

      <footer className="text-center text-muted small py-3 border-top">
        Data from the Open Library Search API — no API key required.
      </footer>
    </div>
  );
}