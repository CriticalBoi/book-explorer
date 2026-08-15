import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchStatus from "./components/SearchStatus";
import BookList from "./components/BookList";
import BookDetailsModal from "./components/BookDetailsModal";
import { useBookSearch } from "./hooks/useBookSearch";
import "./App.css";

export default function App() {
  const { books, status, errorMsg, search, searchTerm } = useBookSearch();
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-books py-3 mb-4">
        <div className="container-fluid px-3 px-md-5 d-flex justify-content-between align-items-center flex-wrap">
          <span className="navbar-brand fs-3 mb-0">📚 Book Finder</span>
          <span className="text-white-50 small d-none d-sm-inline">Powered by Open Library</span>
        </div>
      </nav>

      <div className="container flex-grow-1 pb-5">
        <SearchBar onSearch={search} disabled={status === "loading"} />

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
