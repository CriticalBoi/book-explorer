export const coverUrl = (id, size) => `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`;

/**
 * Presentational card for a single book.
 * Props:
 *  - book: the Open Library doc object
 *  - onSelect(book): called when the card is clicked
 */
export default function BookCard({ book, onSelect }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="book-card" onClick={() => onSelect(book)}>
        {book.cover_i ? (
          <img
            className="book-cover"
            src={coverUrl(book.cover_i, "M")}
            alt={`Cover of ${book.title}`}
            loading="lazy"
          />
        ) : (
          <div className="book-cover-placeholder">{book.title}</div>
        )}
        <div className="p-3">
          <div className="book-title mb-1">{book.title}</div>
          <div className="text-muted small mb-1">
            {book.author_name ? book.author_name.join(", ") : "Unknown author"}
          </div>
          <div className="text-muted small">
            {book.first_publish_year
              ? `First published ${book.first_publish_year}`
              : "Publish year unknown"}
          </div>
        </div>
      </div>
    </div>
  );
}
