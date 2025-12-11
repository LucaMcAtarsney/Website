// app/projects/game-of-life/page.tsx
import Link from "next/link";
import { GameOfLife } from "@/components/GameOfLife";

export default function GameOfLifePage() {
  return (
    <main className="root">
      <div className="content-layer">
        <header className="hero" style={{ paddingTop: "1.5rem" }}>
          <div className="hero-label">EXPERIMENT / CELLULAR AUTOMATA</div>
          <h1 className="hero-title">
            <span className="hero-name">Conway&apos;s Game of Life</span>
            <span className="hero-sub">
              A minimalist implementation of Conway&apos;s cellular automaton,
              exploring how simple rules produce complex behaviour.
            </span>
          </h1>

          <div className="hero-meta">
            <span>Click cells to toggle them.</span>
            <span>Play, pause, step, randomise, or clear the grid.</span>
          </div>
        </header>

        <GameOfLife />

        <footer className="footer" style={{ marginTop: "2rem" }}>
          <Link href="/" className="footer-link">
            ← back to all projects
          </Link>
        </footer>
      </div>
    </main>
  );
}
