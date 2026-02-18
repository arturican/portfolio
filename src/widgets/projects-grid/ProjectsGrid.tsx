import { ProjectCard } from "../../entities/project/ui/ProjectCard";
import type { Project } from "../../entities/project/model/projects";

interface ProjectsGridProps {
  projects: Project[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    <ul className="grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ul>
  );
};
