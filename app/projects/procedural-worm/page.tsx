// app/projects/procedural-worm/page.tsx
import Link from "next/link";

export default function ProceduralWormPage() {
  return (
    <main className="root">
      <div className="content-layer">
        <header className="hero" style={{ paddingTop: "1.5rem" }}>
          <div className="hero-label">EXPERIMENT / PROCEDURAL</div>
          <h1 className="hero-title">
            <span className="hero-name">Procedural Worm</span>
            <span className="hero-sub">
              A simple procedural animation experiment.
            </span>
          </h1>

          <div className="hero-meta">
            <span>Built as a focused micro–experiment in Godot.</span>
            <span>Runs directly in the browser.</span>
          </div>
        </header>

        <section style={{ marginTop: "1.5rem" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              borderRadius: "1rem",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.5)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                padding: "0.6rem 0.9rem",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span>Live demo</span>
              <span style={{ opacity: 0.7 }}>Best on desktop browser</span>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                background: "black",
              }}
            >
              <iframe
                src="/ProceduralWorm/index.html"
                title="Procedural Worm"
                style={{
                  border: "none",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </section>

        <footer className="footer" style={{ marginTop: "2rem" }}>
          <Link href="/" className="footer-link">
            ← back to all projects
          </Link>
        </footer>
      </div>
    </main>
  );
}
