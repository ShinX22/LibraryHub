import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingSpinner from "@/components/LoadingSpinner";
import NoteCard from "@/components/NoteCard";
import Footer from "@/components/Footer";
import { searchNotes } from "@/services/api";
import type { Note } from "@/types/api";

// Custom hook to debounce search query
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

/**
 * SEARCH PAGE — styled to match Courses design system.
 */
const SearchPage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    searchNotes(q)
      .then(setResults)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <div className="page-root">

      {/* Decorative background */}
      <div className="page-bg" aria-hidden="true">
        <div className="page-bg-mesh" />
        <div className="page-bg-dots" />
        <div className="page-bg-blob blob-1" />
        <div className="page-bg-blob blob-2" />
        <div className="page-bg-blob blob-3" />
      </div>

      <Header />

      <main className="page-main" style={{ flex: 1, width: "100%" }}>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />

        {/* Hero */}
        <header style={{
          marginBottom: "clamp(2rem, 4vw, 3rem)",
          paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          borderBottom: "1px solid var(--sand-3)",
          animation: "fadeUp .5s .08s ease both",
        }}>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>
            <span className="eyebrow-line" />
            <span>Resource Search</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
            fontWeight: 500,
            lineHeight: .95,
            color: "var(--ink)",
            margin: 0,
          }}>
            Find <em style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Resources</em>
          </h1>
          <p style={{
            marginTop: ".875rem",
            fontSize: "clamp(.875rem, 1.8vw, 1rem)",
            color: "var(--ink-3)",
            lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Search by subject name, course code, or department.
          </p>
        </header>

        {/* Search input */}
        <div style={{
          position: "relative",
          maxWidth: "600px",
          marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          animation: "fadeUp .55s .15s ease both",
        }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--stone-dark)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Data Structures, BTECH, CSE…"
            style={{
              width: "100%",
              borderRadius: "100px",
              border: "1px solid var(--sand-3)",
              background: "rgba(255,255,255,.75)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: ".875rem 1.25rem .875rem 48px",
              fontSize: ".9rem",
              color: "var(--ink)",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
              boxShadow: "0 2px 12px rgba(42,107,107,.06)",
              transition: "all .2s ease",
            }}
            onFocus={e => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "var(--teal)";
              (e.currentTarget as HTMLInputElement).style.boxShadow = "0 4px 20px rgba(42,107,107,.12)";
            }}
            onBlur={e => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "var(--sand-3)";
              (e.currentTarget as HTMLInputElement).style.boxShadow = "0 2px 12px rgba(42,107,107,.06)";
            }}
          />
        </div>

        {/* Results count */}
        {!loading && !error && debouncedQuery.trim() && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.25rem",
            animation: "fadeUp .3s ease both",
          }}>
            <span className="section-tag">
              {results.length} result{results.length !== 1 && "s"} found
            </span>
          </div>
        )}

        {/* States */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1rem",
            textAlign: "center",
            gap: "1rem",
          }}>
            <div style={{
              width: "64px", height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,.7)",
              border: "1px solid var(--sand-3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
            }}>⚠️</div>
            <p style={{ fontSize: ".95rem", fontWeight: 500, color: "var(--ink-2)", fontFamily: "'DM Sans', sans-serif" }}>
              Search failed: {error}
            </p>
          </div>
        ) : null}

        {/* Results */}
        {!loading && !error && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", animation: "fadeUp .4s .1s ease both" }}>
            {results.map((note) => (
              <NoteCard key={note.id} item={note} itemType="notes" />
            ))}
          </div>
        )}

        {/* Empty results */}
        {!loading && debouncedQuery.trim() && results.length === 0 && !error && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 1rem",
            textAlign: "center",
            gap: "1rem",
          }}>
            <div style={{
              width: "64px", height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,.7)",
              border: "1px solid var(--sand-3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              boxShadow: "0 2px 12px rgba(42,107,107,.06)",
            }}>📭</div>
            <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--ink-2)", fontFamily: "'DM Sans', sans-serif" }}>
              No results found for "{debouncedQuery}"
            </p>
            <p style={{ fontSize: ".85rem", color: "var(--ink-3)", fontFamily: "'DM Sans', sans-serif" }}>
              Try a different search term
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
