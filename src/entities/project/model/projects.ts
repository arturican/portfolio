export interface Project {
  title: string;
  subtitle: string;
  url: string;
  stack?: string[];
  icon?: string;
}

export const projects: Project[] = [
  {
    title: "Todolist",
    subtitle: "Todo list app",
    url: "https://arturican.ru",
    stack: ["React", "TypeScript"],
    icon: "\u{1F4DD}",
  },
  {
    title: "Title 2",
    subtitle: "Subtitle 2",
    url: "#",
    stack: ["Next.js", "Node.js"],
    icon: "\u{1F9E9}",
  },
  {
    title: "Title 3",
    subtitle: "Subtitle 3",
    url: "#",
    stack: ["Node.js", "PostgreSQL"],
    icon: "\u2699\uFE0F",
  },
];
