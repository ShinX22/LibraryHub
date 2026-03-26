import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import collegeLogo from "@/assets/college-logo.png";
import UploadNotesModal from "@/components/UploadNotesModal";
import Footer from "@/components/Footer";

/**
 * HOME PAGE — matches Courses page design system.
 */
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <main style={{
        position: "relative",
        zIndex: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)",
        textAlign: "center",
      }}>

        {/* College logo */}
        <div style={{
          marginBottom: "1.25rem",
          animation: "fadeUp .5s ease both",
        }}>
          <img
            src={collegeLogo}
            alt="College Emblem"
            style={{
              height: "clamp(75px, 15vw, 105px)",
              width: "clamp(75px, 15vw, 105px)",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 16px rgba(42,107,107,.15)) opacity(0.85)",
            }}
          />
        </div>

        {/* Eyebrow */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: ".875rem",
          fontSize: ".72rem",
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "var(--teal)",
          fontWeight: 500,
          marginBottom: "1.25rem",
          animation: "fadeUp .5s .08s ease both",
        }}>
          <span style={{ width: "28px", height: "2px", background: "var(--teal)", borderRadius: "2px", display: "block" }} />
          <span>KCET Digital Library</span>
          <span style={{ width: "28px", height: "2px", background: "var(--teal)", borderRadius: "2px", display: "block" }} />
        </div>

        {/* Primary Headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.2rem, 6vw, 4rem)",
          fontWeight: 600,
          lineHeight: 1.1,
          color: "var(--ink)",
          margin: "0 0 .5rem",
          maxWidth: "800px",
          animation: "fadeUp .55s .12s ease both",
        }}>
          Find Notes &amp; PYQs for Your Course
        </h1>
        
        {/* College name (Secondary text) */}
        <div style={{
          fontSize: "clamp(.85rem, 1.5vw, 1rem)",
          color: "var(--teal)",
          fontWeight: 500,
          marginTop: "0.25rem",
          animation: "fadeUp .55s .14s ease both",
        }}>
          <a
            href="https://khalsaengineering.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Student Resource Platform
            {/* Official KCET Student Resource Platform */}
          </a>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "var(--ink-2)",
          marginTop: "1.25rem",
          lineHeight: 1.6,
          maxWidth: "500px",
          animation: "fadeUp .55s .18s ease both",
        }}>
          Access verified Notes &amp; PYQs — organized by course and semester.
        </p>

        {/* Stats row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          margin: "2rem 0",
          padding: "1.5rem 0",
          borderTop: "1px solid var(--sand-3)",
          borderBottom: "1px solid var(--sand-3)",
          width: "100%",
          maxWidth: "420px",
          justifyContent: "center",
          animation: "fadeUp .55s .22s ease both",
        }}>
          {[
            { val: "∞", label: "Resources" },
            { val: "Free", label: "Access" },
            { val: "13+", label: "Courses" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".25rem" }}>
              <strong style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                fontWeight: 600,
                color: "var(--teal)",
                lineHeight: 1,
              }}>{s.val}</strong>
              <span style={{
                fontSize: ".7rem",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--stone-dark)",
                fontWeight: 600,
              }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Action Area */}
        <div style={{ 
          animation: "fadeUp .55s .28s ease both",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          marginTop: "0.5rem"
        }}>
          {/* Main CTA */}
          <Link 
            to="/courses" 
            className="btn-teal"
            style={{
              padding: "1rem 2.5rem",
              fontSize: "1.05rem",
              fontWeight: 600,
            }}
          >
            <BookOpen size={20} />
            Browse Notes &amp; PYQs
          </Link>

          {/* Secondary Action */}
          <span 
            className="cta-link"
            onClick={() => setIsModalOpen(true)}
            style={{
              fontSize: "0.95rem",
              color: "var(--stone-dark)",
              fontWeight: 500,
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
          >
            Want to share your notes? <span style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}>Upload via Telegram &rarr;</span>
          </span>
        </div>
      </main>

      <UploadNotesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Footer />
    </div>
  );
};

export default Index;
