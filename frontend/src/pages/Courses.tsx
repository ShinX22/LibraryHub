import { STATIC_COURSES } from "@/services/api";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";

/**
 * COURSE SELECTION PAGE
 * Step 1 of the flow: browse all available courses.
 */
const Courses = () => {
  return (
    <div className="courses-root">

      {/* ── decorative background layers ── */}
      <div className="courses-bg" aria-hidden="true">
        <div className="bg-mesh" />
        <div className="bg-dots" />
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-blob blob-3" />
        <svg className="geo geo-ring" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 10"/>
        </svg>
        <svg className="geo geo-cross" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        <svg className="geo geo-square" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="52" height="52" stroke="currentColor" strokeWidth="1.5" transform="rotate(15 30 30)"/>
        </svg>
      </div>

      <Header />

      <main className="courses-main">

        {/* breadcrumb */}
        <div className="courses-breadcrumb-row">
          <Breadcrumbs
            items={[{ label: "Home", to: "/" }, { label: "Courses" }]}
          />
        </div>

        {/* split hero */}
        <header className="courses-hero">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-line" />
              <span>Curriculum Library</span>
            </div>
            <h1 className="hero-title">
              Browse<br />
              <em>Courses</em>
            </h1>
          </div>

          <div className="hero-right">
            <p className="hero-sub">
              Explore our curated collection of courses. Pick a subject, dive
              into resources, and start learning at your own pace.
            </p>
            <div className="hero-stats">
              <div className="hstat">
                <strong>{STATIC_COURSES.length}</strong>
                <span>Courses</span>
              </div>
              <div className="hstat-div" />
              <div className="hstat">
                <strong>Free</strong>
                <span>Access</span>
              </div>
              <div className="hstat-div" />
              <div className="hstat">
                <strong>∞</strong>
                <span>Resources</span>
              </div>
            </div>
          </div>
        </header>

        {/* subtle section label */}
        <div className="section-meta">
          <span className="section-tag">All courses</span>
          <span className="section-count">{STATIC_COURSES.length} available</span>
        </div>

        {/* card grid */}
        <section className="courses-grid-section">
          <div className="courses-grid">
            {STATIC_COURSES.map((course, i) => (
              <div
                key={course.key}
                className="card-wrap"
                style={{ "--i": i } as React.CSSProperties}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600&display=swap');

        .courses-root {
          --sand:        #faf7f2;
          --sand-2:      #f2ede4;
          --sand-3:      #e8e0d2;
          --stone:       #c4b89a;
          --stone-dark:  #8a7a62;
          --teal:        #2a6b6b;
          --teal-light:  #3d8f8f;
          --teal-pale:   #e8f4f4;
          --ink:         #1c1a17;
          --ink-2:       #3d3930;
          --ink-3:       #6b6456;
          --card-hover:  0 8px 30px rgba(42,107,107,.12), 0 2px 8px rgba(0,0,0,.04);

          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 100dvh;
          background: var(--sand);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* BG */
        .courses-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .bg-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 70% -10%, rgba(42,107,107,.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at -10% 80%, rgba(196,184,154,.12) 0%, transparent 50%),
            linear-gradient(165deg, #faf7f2 0%, #f8f4ec 50%, #faf7f2 100%);
        }
        .bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(42,107,107,.08) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%);
        }
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.6;
        }
        .blob-1 {
          width: 600px; height: 600px;
          background: rgba(42,107,107,.05);
          top: -150px; right: -150px;
          animation: blobFloat 25s ease-in-out infinite alternate;
        }
        .blob-2 {
          width: 500px; height: 500px;
          background: rgba(196,184,154,.12);
          bottom: 5%; left: -100px;
          animation: blobFloat 30s ease-in-out infinite alternate-reverse;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: rgba(42,107,107,.04);
          top: 45%; left: 50%;
          animation: blobFloat 35s ease-in-out infinite alternate;
        }
        @keyframes blobFloat {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(20px,15px) scale(1.04); }
        }

        /* FLOATING GEO */
        .geo { position: absolute; color: var(--teal); opacity: 0.06; }
        .geo-ring {
          width: 280px; height: 280px;
          top: -60px; right: 10%;
          animation: geoSpin 80s linear infinite;
        }
        .geo-cross {
          width: 36px; height: 36px;
          top: 40%; left: 5%;
          animation: geoSpin 40s linear infinite reverse;
        }
        .geo-square {
          width: 70px; height: 70px;
          bottom: 20%; right: 8%;
          animation: geoSpin 55s linear infinite;
        }
        @keyframes geoSpin { to { transform: rotate(360deg); } }

        /* MAIN */
        .courses-main {
          position: relative;
          z-index: 1;
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          max-width: 1340px;
          margin: 0 auto;
          padding: clamp(1.75rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem) 7rem;
        }

        /* BREADCRUMB */
        .courses-breadcrumb-row {
          margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
          animation: fadeUp .5s ease both;
        }

        /* HERO */
        .courses-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 5vw, 3rem);
          margin-bottom: clamp(3rem, 6vw, 4.5rem);
          padding-bottom: clamp(2.5rem, 5vw, 3.5rem);
          border-bottom: 1px solid var(--sand-3);
        }
        @media (min-width: 760px) {
          .courses-hero { grid-template-columns: 1fr 1fr; align-items: end; }
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: .875rem;
          font-size: clamp(.68rem, 1.4vw, .75rem);
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--teal);
          font-weight: 500;
          margin-bottom: clamp(1rem, 2vw, 1.5rem);
          animation: fadeUp .5s .05s ease both;
        }
        .eyebrow-line {
          display: block;
          width: 32px; height: 2px;
          background: var(--teal);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          font-size: clamp(3.5rem, 10vw, 8rem);
          line-height: .92;
          letter-spacing: -.01em;
          color: var(--ink);
          margin: 0;
          animation: fadeUp .55s .1s ease both;
        }
        .hero-title em {
          font-style: italic;
          font-weight: 500;
          background: linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-right { animation: fadeUp .55s .18s ease both; }

        .hero-sub {
          font-size: clamp(.95rem, 1.8vw, 1.05rem);
          color: var(--ink-2);
          line-height: 1.8;
          margin: 0 0 clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 400;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 2.5vw, 2rem);
          padding: clamp(1rem, 2vw, 1.25rem) 0;
          border-top: 1px solid var(--sand-3);
        }
        .hstat { display: flex; flex-direction: column; gap: .2rem; }
        .hstat strong {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3.5vw, 2rem);
          font-weight: 500;
          color: var(--teal);
          line-height: 1;
        }
        .hstat span {
          font-size: clamp(.65rem, 1.2vw, .72rem);
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--stone-dark);
          font-weight: 500;
        }
        .hstat-div {
          width: 1px; height: 2.25rem;
          background: var(--sand-3);
          flex-shrink: 0;
        }

        /* SECTION META */
        .section-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: clamp(1.5rem, 3vw, 2rem);
          animation: fadeUp .55s .25s ease both;
        }
        .section-tag {
          display: inline-flex;
          align-items: center;
          font-size: .7rem;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--teal);
          font-weight: 500;
          padding: .4rem 1rem;
          background: var(--teal-pale);
          border: 1px solid rgba(42,107,107,.12);
          border-radius: 100px;
        }
        .section-count {
          font-size: .82rem;
          color: var(--stone-dark);
          font-weight: 400;
        }

        /* GRID */
        .courses-grid-section { animation: fadeUp .55s .3s ease both; }
        .courses-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        @media (min-width: 500px)  { .courses-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 860px)  { .courses-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1160px) { .courses-grid { grid-template-columns: repeat(4, 1fr); } }

        .card-wrap {
          animation: cardIn .5s calc(var(--i) * 60ms) ease both;
          border-radius: 16px;
          transition: transform .3s cubic-bezier(.34,1.2,.64,1), box-shadow .3s ease;
        }
        .card-wrap:hover {
          transform: translateY(-4px);
        }

        /* KEYFRAMES */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* SCROLLBAR */
        .courses-root ::-webkit-scrollbar { width: 6px; }
        .courses-root ::-webkit-scrollbar-track { background: var(--sand-2); }
        .courses-root ::-webkit-scrollbar-thumb { background: var(--stone); border-radius: 4px; }

        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .courses-breadcrumb-row, .hero-left, .hero-right,
          .section-meta, .courses-grid-section,
          .card-wrap, .bg-blob, .geo { animation: none !important; }
          .card-wrap:hover { transform: none; }
        }
      `}</style>
    </div>
  );
};

export default Courses;