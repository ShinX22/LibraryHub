import { useState, useEffect, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getNotes, getPyqs, STATIC_DEPARTMENTS } from "@/services/api";
import NoteCard from "@/components/NoteCard";
import Footer from "@/components/Footer";
import type { Note, PYQ } from "@/types/api";

/**
 * Semester counts per course — used to generate the filter tabs.
 * Fall back to 8 for unknown courses.
 */
const SEMESTER_MAP: Record<string, number> = {
  BTECH: 8,
  BCA: 6,
  MCA: 4,
  MBA: 4,
  DIPLOMA: 6,
  BCOM: 6,
  BBA: 6,
  BHMCT: 8,
  BSERIT: 6,
  BSEMLS: 6,
  BSECCT: 6,
  BSEOPT: 6,
  BSEMT: 6,
};

/**
 * NOTES VIEW PAGE — styled to match Courses design system.
 */
const Notes = () => {
  const { course } = useParams<{ course: string }>();

  const [items, setItems] = useState<(Note | PYQ)[]>([]);
  const [type, setType] = useState<"notes" | "pyqs">("notes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const validDepartments = course ? (STATIC_DEPARTMENTS[course.toUpperCase()] || []) : [];
  const semCount = course ? (SEMESTER_MAP[course.toUpperCase()] ?? 8) : 8;
  const semesterOptions = Array.from({ length: semCount }, (_, i) => String(i + 1));

  // Count of active (non-null) filters for the badge
  const activeFilterCount = (selectedDepartment ? 1 : 0) + (selectedSemester ? 1 : 0);

  const fetchItems = useCallback(() => {
    if (!course) return;
    setLoading(true);
    setError(null);
    const fetchFn = type === "notes" ? getNotes : getPyqs;
    fetchFn(course, selectedDepartment || undefined, selectedSemester)
      .then(setItems)
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [course, selectedDepartment, selectedSemester, type]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
    { label: course },
  ];

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

      <main className="page-main">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <header style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(1rem, 3vw, 1.75rem)",
          marginBottom: "clamp(1.25rem, 3vw, 2rem)",
          paddingBottom: "clamp(1rem, 2.5vw, 1.75rem)",
          borderBottom: "1px solid var(--sand-3)",
          animation: "fadeUp .5s .08s ease both",
        }}>
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              <span>{course.toUpperCase()} · Study Material</span>
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 7vw, 5rem)",
              fontWeight: 500,
              lineHeight: .95,
              color: "var(--ink)",
              margin: 0,
            }}>
              Browse <em style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{type === "notes" ? "Notes" : "PYQs"}</em>
            </h1>
            <p style={{
              marginTop: ".625rem",
              fontSize: "clamp(.82rem, 1.6vw, .95rem)",
              color: "var(--ink-3)",
              lineHeight: 1.7,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {items.length} {type === "notes" ? "note" : "PYQ"}{items.length !== 1 && "s"} available
              {selectedDepartment ? ` for ${selectedDepartment}` : ""}
              {selectedSemester ? ` · Semester ${selectedSemester}` : ""}
            </p>
          </div>
        </header>

        {/* Toggle notes / pyqs */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "clamp(1.25rem, 3vw, 2rem)",
          animation: "fadeUp .55s .10s ease both"
        }}>
          <button
            onClick={() => setType("notes")}
            style={{
              padding: "8px 20px",
              borderRadius: "100px",
              border: "1px solid",
              borderColor: type === "notes" ? "var(--teal)" : "var(--sand-3)",
              background: type === "notes" ? "var(--teal)" : "rgba(255,255,255,.6)",
              color: type === "notes" ? "#fff" : "var(--ink-2)",
              fontWeight: 500,
              fontSize: ".9rem",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "all .2s ease"
            }}
          >
            Notes
          </button>
          <button
            onClick={() => setType("pyqs")}
            style={{
              padding: "8px 20px",
              borderRadius: "100px",
              border: "1px solid",
              borderColor: type === "pyqs" ? "var(--teal)" : "var(--sand-3)",
              background: type === "pyqs" ? "var(--teal)" : "rgba(255,255,255,.6)",
              color: type === "pyqs" ? "#fff" : "var(--ink-2)",
              fontWeight: 500,
              fontSize: ".9rem",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "all .2s ease"
            }}
          >
            PYQs
          </button>
        </div>

        {/* ── Sticky Filter Bar ── */}
        <div className="filter-bar" style={{ animation: "fadeUp .55s .15s ease both" }}>

          {/* Mobile toggle button */}
          <button
            className="filter-toggle"
            onClick={() => setFiltersOpen((p) => !p)}
            aria-expanded={filtersOpen}
            aria-controls="filter-panel"
          >
            <span style={{ fontSize: "1rem" }}>⚙️</span>
            <span className="filter-toggle-label">Filters</span>
            {activeFilterCount > 0 && (
              <span className="filter-toggle-badge">{activeFilterCount}</span>
            )}
            <span className={`filter-toggle-chevron${filtersOpen ? " open" : ""}`}>▼</span>
          </button>

          {/* Collapsible / always-open panel */}
          <div
            id="filter-panel"
            className={`filter-panel${filtersOpen ? " open" : ""}`}
          >
            {/* Department row */}
            {validDepartments.length > 0 && (
              <div className="filter-row">
                <span className="filter-row-label">Dept</span>
                <button
                  onClick={() => setSelectedDepartment(null)}
                  className={`filter-btn${selectedDepartment === null ? " active" : ""}`}
                >
                  All
                </button>
                {validDepartments.map((dept) => (
                  <button
                    key={dept.key}
                    onClick={() => setSelectedDepartment(selectedDepartment === dept.key ? null : dept.key)}
                    className={`filter-btn${selectedDepartment === dept.key ? " active" : ""}`}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            )}

            {/* Semester row */}
            <div className="filter-row">
              <span className="filter-row-label">Sem</span>
              <button
                onClick={() => setSelectedSemester(null)}
                className={`filter-btn${selectedSemester === null ? " active" : ""}`}
              >
                All
              </button>
              {semesterOptions.map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(selectedSemester === sem ? null : sem)}
                  className={`filter-btn${selectedSemester === sem ? " active" : ""}`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Notes list ── */}
        <div style={{ animation: "fadeUp .55s .22s ease both" }}>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
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
              }}>⚠️</div>
              <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--ink-2)", fontFamily: "'DM Sans', sans-serif" }}>
                Failed to load {type === "notes" ? "notes" : "PYQs"}
              </p>
            </div>
          ) : items.length === 0 ? (
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
                No {type === "notes" ? "notes" : "PYQs"} available
                {selectedDepartment ? ` for ${selectedDepartment}` : ""}
                {selectedSemester ? ` (Semester ${selectedSemester})` : ""}
              </p>
              <p style={{ fontSize: ".85rem", color: "var(--ink-3)", fontFamily: "'DM Sans', sans-serif" }}>
                {selectedSemester ? "Try selecting a different semester or All." : "Check back later for updates."}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {items.map((item) => (
                <NoteCard key={item.id} item={item} itemType={type} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
