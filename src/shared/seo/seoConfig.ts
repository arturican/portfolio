import { projects } from "../../entities/project/model/projects";

export const DEFAULT_SITE_URL = "https://arturican.ru";
export const DEFAULT_SITE_NAME = "@arturican";
export const DEFAULT_IMAGE_WIDTH = 1200;
export const DEFAULT_IMAGE_HEIGHT = 630;
export const DEFAULT_IMAGE_TYPE = "image/png";

export interface SeoMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  imageSecureUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageType: string;
  siteName: string;
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
  projects.flatMap((project) => {
    const baseMeta = {
      title: project.seo.title,
      description: project.seo.description,
      canonicalPath: project.seo.canonicalPath,
      shareImagePath: project.seo.shareImagePath,
    } satisfies BaseSeoMeta;
    const routePaths = [project.seo.canonicalPath, ...(project.seo.sharePathAliases ?? [])];

    return routePaths.map((routePath) => [normalizePathname(routePath), baseMeta] as const);
  }),
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
  const imageUrl = toAbsoluteUrl(normalizedSiteUrl, seo.shareImagePath);
  const imageAlt = `${seo.title} preview image`;

  return {
    title: seo.title,
    description: seo.description,
    canonicalUrl: toAbsoluteUrl(normalizedSiteUrl, seo.canonicalPath),
    imageUrl,
    imageSecureUrl: imageUrl,
    imageAlt,
    imageWidth: DEFAULT_IMAGE_WIDTH,
    imageHeight: DEFAULT_IMAGE_HEIGHT,
    imageType: DEFAULT_IMAGE_TYPE,
    siteName: DEFAULT_SITE_NAME,
    ogType: "website",
    robots: isKnownRoute ? "index, follow" : "noindex, nofollow",
  };
};

export const getPrerenderSeoPaths = (): string[] => {
  const paths = [
    HOME_SEO.canonicalPath,
    ...projects.flatMap((project) => [
      project.seo.canonicalPath,
      ...(project.seo.sharePathAliases ?? []),
    ]),
  ];

  return [...new Set(paths.map((path) => normalizePathname(path)))];
};
