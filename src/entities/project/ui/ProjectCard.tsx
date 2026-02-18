import type { Project } from "../model/projects";
import { safeExternalUrl } from "../../../shared/lib/safeExternalUrl";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const safeUrl = safeExternalUrl(project.url);
  const isClickable = project.status === "live" && safeUrl !== null;
  const icon = project.icon ?? "\u{1F517}";
  const stack = project.stack ?? [];
  const ctaText = isClickable ? "Open project" : "Coming soon";

  const cardBody = (
    <div className="cardBody">
      <div className="cardMain">
        <div className="cardIcon" aria-hidden="true">
          {icon}
        </div>

        <div className="cardText">
          <span className="cardTitle">{project.title}</span>
          <span className="cardSubtitle">{project.subtitle}</span>

          <div className="cardBadges">
            {stack.map((tech, index) => (
              <span className="badge" key={`${project.id}-${tech}-${index}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="cardMeta">
        <span className="cardCta">{ctaText}</span>
        <span className="cardArrow" aria-hidden="true">
          {isClickable ? "\u2197" : "\u23F3"}
        </span>
      </div>
    </div>
  );

  return (
    <li className="item">
      {isClickable ? (
        <a
          className="card"
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open project: ${project.title}`}
        >
          {cardBody}
        </a>
      ) : (
        <article
          className="card cardDisabled"
          aria-label={`Open project: ${project.title} (coming soon)`}
        >
          {cardBody}
        </article>
      )}
    </li>
  );
};
