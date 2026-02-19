export interface Project {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
  status: "live" | "coming_soon";
  stack?: string[];
  icon?: string;
  seo: ProjectSeo;
}

export interface ProjectSeo {
  title: string;
  description: string;
  shareImagePath: string;
  canonicalPath: string;
  sharePathAliases?: string[];
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
    seo: {
      title: "Todolist | @arturican",
      description: "A React + TypeScript todo list app with a clean and focused UI.",
      shareImagePath: "/og-default.png",
      canonicalPath: "/projects/todolist",
      sharePathAliases: ["/todolist"],
    },
  },
  {
    id: "project-2",
    title: "Title 2",
    subtitle: "Subtitle 2",
    status: "coming_soon",
    stack: ["Next.js", "Node.js"],
    icon: "\u{1F9E9}",
    seo: {
      title: "Title 2 | @arturican",
      description: "Upcoming project built with Next.js and Node.js.",
      shareImagePath: "/og-default.png",
      canonicalPath: "/projects/project-2",
    },
  },
  {
    id: "project-3",
    title: "Title 3",
    subtitle: "Subtitle 3",
    status: "coming_soon",
    stack: ["Node.js", "PostgreSQL"],
    icon: "\u2699\uFE0F",
    seo: {
      title: "Title 3 | @arturican",
      description: "Upcoming Node.js and PostgreSQL project currently in development.",
      shareImagePath: "/og-default.png",
      canonicalPath: "/projects/project-3",
    },
  },
];
