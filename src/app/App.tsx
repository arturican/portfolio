import { useEffect, useMemo, useState } from "react";
import { projects } from "../entities/project/model/projects";
import { ProjectsGrid } from "../widgets/projects-grid/ProjectsGrid";
import { MetaTags } from "../shared/seo/MetaTags";
import { resolveSeoMeta } from "../shared/seo/seoConfig";

const getCurrentPathname = (): string => {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
};

export const App = () => {
  const [pathname, setPathname] = useState<string>(getCurrentPathname);
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
                Welcome to my portfolio. Click any card to view the project.
              </p>
            </div>

            <section className="section" aria-label="Project links">
              <ProjectsGrid projects={projects} />
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
                •
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
