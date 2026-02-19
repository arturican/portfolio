import { projects } from "../entities/project/model/projects";
import { ProjectsGrid } from "../widgets/projects-grid/ProjectsGrid";

export const App = () => {
  return (
    <main className="page" aria-labelledby="title">
      <div className="container">
        <div className="header">
          <h1 id="title" className="title">
            @arturican
          </h1>
          <p className="subtitle">Welcome to my portfolio. Click any card to view the project.</p>
        </div>

        <section className="section" aria-label="Project links">
          <ProjectsGrid projects={projects} />
        </section>
      </div>
    </main>
  );
};
