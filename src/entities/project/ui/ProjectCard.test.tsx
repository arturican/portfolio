import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Project } from "../model/projects";
import { ProjectCard } from "./ProjectCard";

afterEach(() => {
  cleanup();
});

const baseProject: Project = {
  id: "test-project",
  title: "Live Project",
  subtitle: "Project subtitle",
  status: "live",
  stack: ["React"],
};

describe("ProjectCard", () => {
  it("renders a link when project is live and URL is valid", () => {
    render(
      <ul>
        <ProjectCard project={{ ...baseProject, url: "https://example.com/project" }} />
      </ul>,
    );

    const link = screen.getByRole("link", { name: /open project: live project/i });

    expect(link).toHaveAttribute("href", "https://example.com/project");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a disabled card when project is coming soon", () => {
    render(
      <ul>
        <ProjectCard project={{ ...baseProject, status: "coming_soon", url: undefined }} />
      </ul>,
    );

    expect(screen.queryByRole("link", { name: /open project:/i })).not.toBeInTheDocument();
    expect(screen.getByLabelText(/coming soon/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/open project:/i)).not.toBeInTheDocument();
  });

  it("renders a disabled card when URL is invalid", () => {
    render(
      <ul>
        <ProjectCard project={{ ...baseProject, url: "javascript:alert('xss')" }} />
      </ul>,
    );

    expect(screen.queryByRole("link", { name: /open project:/i })).not.toBeInTheDocument();
    expect(screen.getByLabelText(/coming soon/i)).toBeInTheDocument();
  });
});
