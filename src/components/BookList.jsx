import BookCard from "./BookCard";

/**
 * Renders a grid of BookCards, or an empty-state message.
 * Props:
 *  - books: array of Open Library doc objects
 *  - searchTerm: the term that produced this list (for messaging)
 *  - onSelectBook(book): forwarded to each BookCard
 */
export default function BookList({ books, searchTerm, onSelectBook }) {
  if (books.length === 0) {
    return (
      <div className="empty-state text-muted">
        <div className="display-6 mb-2">📭</div>
        <p>No books found.</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-muted small mb-3">
        Showing {books.length} result{books.length !== 1 ? "s" : ""} for "{searchTerm}"
      </p>
      <div className="row">
        {books.map((book) => (
          <BookCard key={book.key} book={book} onSelect={onSelectBook} />
        ))}
      </div>
    </>
  );
}
