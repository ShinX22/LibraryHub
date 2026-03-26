import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BookOpen, Search, Menu, X } from "lucide-react";
import collegeLogo from "@/assets/college-logo.png";

/**
 * Shared header — glassmorphism floating navbar matching Courses design system.
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="header-glass"
        style={{
          position: "sticky",
          top: "10px",
          zIndex: 100,
          minWidth: "90vw",
          maxWidth: "95vw",
          margin: "0 auto",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,.35)",
          boxShadow: "0 4px 24px rgba(42,107,107,.08), 0 1px 4px rgba(0,0,0,.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 20px" }}>
          {/* Brand */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", minWidth: 0 }}>
            <img
              src={collegeLogo}
              alt="College Logo"
              style={{ height: "40px", width: "40px", borderRadius: "10px", objectFit: "contain", flexShrink: 0 }}
            />
            <div style={{ lineHeight: "1.25", minWidth: 0 }}>
              <span style={{
                display: "block",
                fontSize: "clamp(.78rem, 1.6vw, .92rem)",
                fontWeight: 500,
                color: "var(--ink)",
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textWrap: "wrap",
              }}>
                Khalsa College Of Engineering &amp; Technology
              </span>
              <span style={{
                display: "block",
                fontSize: ".72rem",
                color: "var(--stone-dark)",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                KCET Digital Library
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }} className="desktop-nav">
            <NavLink to="/courses" style={({ isActive }) => navStyle(isActive)}>Browse</NavLink>
            <NavLink to="/search" style={({ isActive }) => navStyle(isActive)}>Search</NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-menu-btn"
            style={{
              marginLeft: "auto",
              padding: "8px",
              borderRadius: "10px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--ink-3)",
              display: "none",
              transition: "background .2s ease",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav style={{
            borderTop: "1px solid var(--sand-3)",
            padding: "8px 16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}>
            <NavLink
              to="/courses"
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => mobileNavStyle(isActive)}
            >
              <BookOpen size={16} />
              Browse Courses
            </NavLink>
            <NavLink
              to="/search"
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => mobileNavStyle(isActive)}
            >
              <Search size={16} />
              Search Resources
            </NavLink>
          </nav>
        )}
      </header>

      <style>{`
        @media (max-width: 600px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

const navStyle = (isActive: boolean): React.CSSProperties => ({
  fontSize: ".82rem",
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  padding: "6px 16px",
  borderRadius: "100px",
  textDecoration: "none",
  transition: "all .2s ease",
  color: isActive ? "var(--teal)" : "var(--ink-3)",
  background: isActive ? "var(--teal-pale)" : "transparent",
  border: isActive ? "1px solid rgba(42,107,107,.15)" : "1px solid transparent",
});

const mobileNavStyle = (isActive: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "10px",
  textDecoration: "none",
  fontSize: ".875rem",
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  transition: "all .2s ease",
  color: isActive ? "var(--teal)" : "var(--ink-3)",
  background: isActive ? "var(--teal-pale)" : "transparent",
});

export default Header;
