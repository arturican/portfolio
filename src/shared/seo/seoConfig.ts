import { projects } from "../../entities/project/model/projects";

export const DEFAULT_SITE_URL = "https://arturican.ru";

export interface SeoMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  ogType: "website";
  robots: "index, follow" | "noindex, nofollow";
}

interface BaseSeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  shareImagePath: string;
}

const HOME_SEO: BaseSeoMeta = {
  title: "@arturican | Portfolio",
  description:
    "Portfolio of frontend projects by @arturican. Explore live demos, stacks, and upcoming builds.",
  canonicalPath: "/",
  shareImagePath: "/og-default.png",
};

const normalizePathname = (pathname: string): string => {
  const trimmed = pathname.trim();

  if (!trimmed) {
    return "/";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const withoutTrailingSlash =
    withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;

  return withoutTrailingSlash || "/";
};

export const normalizeSiteUrl = (siteUrl?: string): string => {
  if (!siteUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    const parsed = new URL(siteUrl);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }

    const pathname = parsed.pathname.replace(/\/+$/, "");

    if (!pathname || pathname === "/") {
      return parsed.origin;
    }

    return `${parsed.origin}${pathname}`;
  } catch {
    return DEFAULT_SITE_URL;
  }
};

const toAbsoluteUrl = (siteUrl: string, pathOrUrl: string): string => {
  try {
    return new URL(pathOrUrl).toString();
  } catch {
    const baseUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
    const normalizedPath = pathOrUrl.replace(/^\/+/, "");

    return new URL(normalizedPath, baseUrl).toString();
  }
};

const projectSeoByPath = new Map(
  projects.map((project) => [
    normalizePathname(project.seo.canonicalPath),
    {
      title: project.seo.title,
      description: project.seo.description,
      canonicalPath: project.seo.canonicalPath,
      shareImagePath: project.seo.shareImagePath,
    } satisfies BaseSeoMeta,
  ]),
);

const getBaseSeoByPathname = (pathname: string): { seo: BaseSeoMeta; isKnownRoute: boolean } => {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === "/") {
    return {
      seo: HOME_SEO,
      isKnownRoute: true,
    };
  }

  const projectSeo = projectSeoByPath.get(normalizedPathname);

  if (projectSeo) {
    return {
      seo: projectSeo,
      isKnownRoute: true,
    };
  }

  return {
    seo: HOME_SEO,
    isKnownRoute: false,
  };
};

export const resolveSeoMeta = (pathname: string, siteUrl?: string): SeoMeta => {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
  const { seo, isKnownRoute } = getBaseSeoByPathname(pathname);

  return {
    title: seo.title,
    description: seo.description,
    canonicalUrl: toAbsoluteUrl(normalizedSiteUrl, seo.canonicalPath),
    imageUrl: toAbsoluteUrl(normalizedSiteUrl, seo.shareImagePath),
    ogType: "website",
    robots: isKnownRoute ? "index, follow" : "noindex, nofollow",
  };
};

export const getPrerenderSeoPaths = (): string[] => {
  const paths = [HOME_SEO.canonicalPath, ...projects.map((project) => project.seo.canonicalPath)];

  return [...new Set(paths.map((path) => normalizePathname(path)))];
};
