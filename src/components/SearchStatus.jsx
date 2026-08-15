/**
 * Renders the idle / loading / error placeholder states.
 * Props:
 *  - status: "idle" | "loading" | "error"
 *  - searchTerm: current search term (used in the loading message)
 *  - errorMsg: error text to display when status === "error"
 */
export default function SearchStatus({ status, searchTerm, errorMsg }) {
  if (status === "idle") {
    return (
      <div className="empty-state text-muted">
        <div className="display-6 mb-2">🔎</div>
        <p>Search for a title or author to get started.</p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="empty-state">
        <div className="spinner-border text-success mb-3" role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
        <p className="text-muted">Searching Open Library for "{searchTerm}"…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="error-state">
        <div className="display-6 mb-2">⚠️</div>
        <p className="text-danger fw-semibold mb-1">Couldn't load results.</p>
        <p className="text-muted small">{errorMsg}</p>
      </div>
    );
  }

  return null;
}
