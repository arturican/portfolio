import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { projects } from "../entities/project/model/projects";
import { App } from "./App";

afterEach(() => {
  cleanup();
  window.history.pushState({}, "", "/");
});

describe("App", () => {
  it("renders the projects list", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /@arturican/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(projects.length);
  });

  it("renders project-specific context for a share route", () => {
    window.history.pushState({}, "", "/projects/todolist");

    const { container } = render(<App />);

    expect(screen.getByText(/you opened the share route for todolist/i)).toBeInTheDocument();
    expect(screen.getByText(/project route/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open live project/i })).toHaveAttribute(
      "href",
      "https://arturican.ru/todolist",
    );
    expect(container.querySelectorAll(".cardFeatured")).toHaveLength(1);
  });
});
