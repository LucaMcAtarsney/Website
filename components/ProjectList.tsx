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

function RepoLink({ repo }: { repo: string }) {
  return (
    <a href={repo} target="_blank" rel="noreferrer" className="row-repo">
      source ↗
    </a>
  );
}

export function ProjectList() {
  return (
    <section id="projects">
      <h2 className="section-label">~/projects</h2>

      <div className="list">
        {visibleProjects.map((project) => {
          // Plain internal rows stay a single Link; rows with a repo need a
          // wrapper so the source link isn't nested inside another anchor.
          if (!project.repo && !isExternal(project.link)) {
            return (
              <Link key={project.id} href={project.link} className="row">
                <RowBody project={project} />
              </Link>
            );
          }

          return (
            <div key={project.id} className="row">
              {isExternal(project.link) ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="row-link"
                >
                  <RowBody project={project} />
                </a>
              ) : (
                <Link href={project.link} className="row-link">
                  <RowBody project={project} />
                </Link>
              )}
              {project.repo && <RepoLink repo={project.repo} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
