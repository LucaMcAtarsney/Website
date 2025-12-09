import Link from "next/link";
import { projects } from "@/lib/projects";

export function ProjectList() {
  return (
    <section className="projects">
      <header className="projects-header">
        <h2>Modular Constructs</h2>
        <p>
          Small, focused experiments. Each one explores a single idea: movement,
          interaction, systems, or generative visuals.
        </p>
      </header>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-meta">
              <span className="project-year">{project.year}</span>
              <span className="project-dot">•</span>
              <span className="project-roles">
                {project.roles.join(" / ")}
              </span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-tagline">{project.tagline}</p>
            {project.link && (
              <Link
                href={project.link}
                className="project-link"
                target={project.link.startsWith("http") ? "_blank" : "_self"}
              >
                view demo →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
