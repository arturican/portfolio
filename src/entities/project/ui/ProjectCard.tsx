import type { Project } from "../model/projects";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <li className="item">
      <a
        className="card"
        href={project.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open project: ${project.title}`}
      >
        <div className="cardBody">
          <div className="cardMain">
            <div className="cardIcon" aria-hidden="true">
              {project.icon || "\u{1F517}"}
            </div>

            <div className="cardText">
              <span className="cardTitle">{project.title}</span>
              <span className="cardSubtitle">{project.subtitle}</span>

              <div className="cardBadges">
                {(project.stack || []).map((tech) => (
                  <span className="badge" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="cardMeta">
            <span className="cardCta">Open project</span>
            <span className="cardArrow" aria-hidden="true">
              {"\u2197"}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
};
