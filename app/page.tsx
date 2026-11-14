import { AsciiStarfield } from "@/components/AsciiStarfield";
import { ProjectList } from "@/components/ProjectList";
import { Profile } from "@/components/Profile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <main>
      <div className="toggle-fixed">
        <ThemeToggle />
      </div>

      <section className="hero-full">
        <AsciiStarfield />
        <div className="hero-center">
          <h1 className="hero-name">Pentgon</h1>
          <p className="hero-role">a programming portfolio</p>
          <p className="hero-byline">Luca McAtarsney</p>
        </div>
        <a href="#projects" className="scroll-cue">
          scroll<span>↓</span>
        </a>
      </section>

      <div className="wrap">
        <ProjectList />
        <Profile />
        <SiteFooter />
      </div>
    </main>
  );
}
