import { ProjectCard } from "../../entities/project/ui/ProjectCard";
import type { Project } from "../../entities/project/model/projects";

interface ProjectsGridProps {
  projects: Project[];
  featuredProjectId?: string;
}

export const ProjectsGrid = ({ projects, featuredProjectId }: ProjectsGridProps) => {
  return (
    <ul className="grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isFeatured={project.id === featuredProjectId}
        />
      ))}
    </ul>
  );
};
