import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { projects } from "../entities/project/model/projects";
import { App } from "./App";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the projects list", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(projects.length);
  });
});
