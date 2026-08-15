# Book Finder — setup

These files are meant to replace/add to the `src/` folder in your existing
Vite + React project (the one shown in your screenshot).

## 1. Install Bootstrap

```bash
npm install bootstrap
```

## 2. Copy files into place

```
src/
  App.jsx              → replaces your existing App.jsx
  App.css              → replaces your existing App.css
  main.jsx             → replaces your existing main.jsx
  components/
    SearchBar.jsx
    BookCard.jsx
    BookList.jsx
    BookDetailsModal.jsx
    SearchStatus.jsx
  hooks/
    useBookSearch.js
```

Your `index.css` can stay as-is (or be emptied out) — Bootstrap now
supplies the base styles, and `App.css` holds the custom theme on top of it.

## 3. Run it

```bash
npm run dev
```

## Structure at a glance

- `hooks/useBookSearch.js` — all search state + the `fetch`/`useEffect` logic, exposed as one hook
- `components/SearchBar.jsx` — controlled text input, calls `onSearch(term)` on submit
- `components/SearchStatus.jsx` — idle / loading / error placeholders
- `components/BookList.jsx` — results grid + "No books found." empty state
- `components/BookCard.jsx` — single book card (cover, title, author, year), click → select
- `components/BookDetailsModal.jsx` — subjects, edition count, rating for the selected book
- `App.jsx` — wires the hook and components together, owns `selectedBook` state
