import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";

function DemoFrame({
  src,
  kind,
  title,
  tall,
}: {
  src: string;
  kind: "iframe" | "video";
  title: string;
  tall?: boolean;
}) {
  return (
    <div className="frame">
      <div className="frame-bar">
        <span>{kind === "iframe" ? "live demo" : "video"}</span>
        {kind === "iframe" && (
          <a href={src} target="_blank" rel="noreferrer">
            open fullscreen
          </a>
        )}
      </div>
      <div className={`frame-stage${tall ? " frame-stage--tall" : ""}`}>
        {kind === "iframe" ? (
          <iframe src={src} title={title} />
        ) : (
          <video src={src} title={title} controls playsInline />
        )}
      </div>
    </div>
  );
}

export function ProjectPage({
  id,
  children,
}: {
  id: string;
  /** Replaces the demo frame when the project renders its own component. */
  children?: React.ReactNode;
}) {
  const project = getProject(id);
  if (!project) notFound();

  return (
    <main className="wrap wrap--project">
      <div className="topbar">
        <span>luca mcatarsney</span>
        <Link href="/" className="back">
          ← back
        </Link>
      </div>

      <header className="detail-head">
        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-sum">{project.summary ?? project.tagline}</p>
        <div className="detail-tags">
          <span>{project.year}</span>
          <span>{project.roles.join(" / ")}</span>
          {project.status && <span>[{project.status}]</span>}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              source
            </a>
          )}
        </div>
      </header>

      {project.demo.kind === "component" ? (
        children
      ) : (
        <DemoFrame
          kind={project.demo.kind}
          src={project.demo.src}
          title={project.title}
          tall={project.demo.kind === "iframe" ? project.demo.tall : false}
        />
      )}

      {(project.meta.length > 0 || project.controls) && (
        <div className="detail-tags" style={{ marginTop: "1.1rem" }}>
          {project.controls && <span>{project.controls}</span>}
          {project.meta.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      )}
    </main>
  );
}
