import Link from "next/link";
import { visibleProjects } from "@/lib/projects";

export function ProjectList() {
  return (
    <section id="projects">
      <h2 className="section-label">~/projects</h2>

      <div className="list">
        {visibleProjects.map((project) => (
          <Link key={project.id} href={project.link} className="row">
            <span className="row-head">
              <span>
                <span className="row-name">{project.title}</span>
                {project.status && (
                  <span className="row-status">[{project.status}]</span>
                )}
              </span>
              <span className="row-year">{project.year}</span>
            </span>
            <p className="row-tag">{project.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
