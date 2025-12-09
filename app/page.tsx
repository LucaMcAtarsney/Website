// app/page.tsx
import { ThreeBackground } from "@/components/ThreeBackground";
import { ProjectList } from "@/components/ProjectList";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="root">
      <ThreeBackground />

      <div className="content-layer">

        <header className="hero">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1.6rem",
              gap: "1rem",
            }}
          >
            <div className="hero-label">INTERACTIVE SYSTEMS</div>
            <ThemeToggle />
          </div>

          <h1 className="hero-title">
            <span className="hero-name">Luca McAtarsney</span>
            <span className="hero-sub">
              I design and build modular game systems and experiences.
            </span>
          </h1>

          <div className="hero-meta">
            <span>Based on the web.</span>
            <span>Focused on play, systems, and feel.</span>
          </div>
        </header>

        <ProjectList />

        <footer className="footer">
          <span>© {new Date().getFullYear()} Luca McAtarsney</span>
          <span className="footer-dot">•</span>
          <a href="mailto:lucamc1604@gmail.com" className="footer-link">
            contact
          </a>
          <span className="footer-dot">•</span>
          <a
            href="https://github.com/LucaMcAtarsney"
            target="_blank"
            className="footer-link"
          >
            github
          </a>
        </footer>

      </div>
    </main>
  );
}
