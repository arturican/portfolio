export interface Project {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
  status: "live" | "coming_soon";
  stack?: string[];
  icon?: string;
}

export const projects: Project[] = [
  {
    id: "todolist",
    title: "Todolist",
    subtitle: "Todo list app",
    status: "live",
    url: "https://arturican.ru/todolist",
    stack: ["React", "TypeScript"],
    icon: "\u{1F4DD}",
  },
  {
    id: "project-2",
    title: "Title 2",
    subtitle: "Subtitle 2",
    status: "coming_soon",
    stack: ["Next.js", "Node.js"],
    icon: "\u{1F9E9}",
  },
  {
    id: "project-3",
    title: "Title 3",
    subtitle: "Subtitle 3",
    status: "coming_soon",
    stack: ["Node.js", "PostgreSQL"],
    icon: "\u2699\uFE0F",
  },
];
