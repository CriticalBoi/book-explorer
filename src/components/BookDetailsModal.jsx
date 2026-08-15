import { coverUrl } from "./BookCard";

/**
 * Modal showing extended details for a selected book.
 * Props:
 *  - book: the selected Open Library doc, or null (renders nothing)
 *  - onClose(): called to dismiss the modal
 */
export default function BookDetailsModal({ book, onClose }) {
  if (!book) return null;

  const subjects = (book.subject || []).slice(0, 12);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ background: "rgba(31,36,33,0.55)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title display-font">{book.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              <div className="col-md-4">
                {book.cover_i ? (
                  <img
                    src={coverUrl(book.cover_i, "L")}
                    alt={`Cover of ${book.title}`}
                    className="img-fluid rounded shadow-sm"
                  />
                ) : (
                  <div className="book-cover-placeholder rounded">{book.title}</div>
                )}
              </div>
              <div className="col-md-8">
                <p className="mb-1">
                  <strong>Author:</strong>{" "}
                  {book.author_name ? book.author_name.join(", ") : "Unknown"}
                </p>
                <p className="mb-1">
                  <strong>First published:</strong> {book.first_publish_year || "Unknown"}
                </p>
                <p className="mb-1">
                  <strong>Editions:</strong> {book.edition_count || "Unknown"}
                </p>
                {book.ratings_average && (
                  <p className="mb-1">
                    <strong>Average rating:</strong> {book.ratings_average.toFixed(1)} / 5
                  </p>
                )}
                <hr />
                <p className="mb-2">
                  <strong>Subjects</strong>
                </p>
                {subjects.length ? (
                  <div className="d-flex flex-wrap gap-2">
                    {subjects.map((s, i) => (
                      <span key={i} className="badge badge-subject rounded-pill px-3 py-2">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted small">No subject data available for this book.</p>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a
              className="btn btn-outline-secondary"
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Open Library
            </a>
            <button className="btn btn-accent" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
