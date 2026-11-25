import Link from "next/link";
import { visibleProjects, type Project } from "@/lib/projects";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function RowBody({ project }: { project: Project }) {
  return (
    <>
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
    </>
  );
}

export function ProjectList() {
  return (
    <section id="projects">
      <h2 className="section-label">~/projects</h2>

      <div className="list">
        {visibleProjects.map((project) =>
          isExternal(project.link) ? (
            <div key={project.id} className="row">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="row-link"
              >
                <RowBody project={project} />
              </a>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="row-repo"
                >
                  source ↗
                </a>
              )}
            </div>
          ) : (
            <Link key={project.id} href={project.link} className="row">
              <RowBody project={project} />
            </Link>
          )
        )}
      </div>
    </section>
  );
}
