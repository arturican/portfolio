import { useEffect, useMemo, useState } from "react";
import { projects } from "../entities/project/model/projects";
import { ProjectsGrid } from "../widgets/projects-grid/ProjectsGrid";
import { MetaTags } from "../shared/seo/MetaTags";
import { resolveProjectByPathname, resolveSeoMeta } from "../shared/seo/seoConfig";

const REPOSITORY_URL = "https://github.com/arturican/portfolio/tree/dev";

const getCurrentPathname = (): string => {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
};

export const App = () => {
  const [pathname, setPathname] = useState<string>(getCurrentPathname);
  const activeProject = useMemo(() => resolveProjectByPathname(pathname), [pathname]);
  const seoMeta = useMemo(
    () => resolveSeoMeta(pathname, import.meta.env.VITE_SITE_URL),
    [pathname],
  );

  useEffect(() => {
    const handleHistoryChange = (): void => {
      setPathname(getCurrentPathname());
    };

    window.addEventListener("popstate", handleHistoryChange);

    return () => {
      window.removeEventListener("popstate", handleHistoryChange);
    };
  }, []);

  return (
    <>
      <MetaTags meta={seoMeta} />

      <div className="appShell">
        <main className="page" aria-labelledby="title">
          <div className="container">
            <div className="header">
              <h1 id="title" className="title">
                @arturican
              </h1>
              <p className="subtitle">
                {activeProject
                  ? `You opened the share route for ${activeProject.title}. The matching project is highlighted below.`
                  : "Welcome to my portfolio. Click any card to view the project."}
              </p>
              <p className="subtitleSource">
                <a
                  className="subtitleRepoLink"
                  href={REPOSITORY_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source on GitHub <span aria-hidden="true">{"\u2192"}</span>
                </a>
              </p>
              {activeProject ? (
                <p className="routeHint">
                  <span className="routeBadge">Project route</span>
                  {activeProject.status === "live" && activeProject.url ? (
                    <a
                      className="routeHintLink"
                      href={activeProject.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open live project <span aria-hidden="true">{"\u2197"}</span>
                    </a>
                  ) : (
                    <span className="routeHintText">Live demo coming soon.</span>
                  )}
                </p>
              ) : null}
            </div>

            <section className="section" aria-label="Project links">
              <ProjectsGrid
                projects={projects}
                featuredProjectId={activeProject?.id}
              />
            </section>
          </div>
        </main>

        <footer className="contactFooter" aria-label="Contact links">
          <div className="container">
            <p className="contactFooterInner">
              <span className="contactItem">
                Email:{" "}
                <a className="contactLink" href="mailto:arturican@gmail.com">
                  arturican@gmail.com
                </a>
              </span>
              <span className="contactSeparator" aria-hidden="true">
                {"\u2022"}
              </span>
              <span className="contactItem">
                Telegram:{" "}
                <a
                  className="contactLink"
                  href="https://t.me/m_arturican"
                  target="_blank"
                  rel="noreferrer"
                >
                  @m_arturican
                </a>
              </span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
