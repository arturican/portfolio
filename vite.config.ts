import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import fs from "node:fs/promises";
import path from "node:path";
import type { PluginOption } from "vite";
import { getPrerenderSeoPaths, resolveSeoMeta } from "./src/shared/seo/seoConfig";

const SEO_TAG_PATTERNS: RegExp[] = [
  /<title>[\s\S]*?<\/title>\s*/i,
  /<meta\s+name=["']description["'][^>]*>\s*/gi,
  /<meta\s+name=["']robots["'][^>]*>\s*/gi,
  /<link[^>]*rel=["']canonical["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:title["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:description["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:site_name["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:image["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:image:secure_url["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:image:type["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:image:width["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:image:height["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:image:alt["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:url["'][^>]*>\s*/gi,
  /<meta[^>]*property=["']og:type["'][^>]*>\s*/gi,
  /<meta\s+name=["']twitter:card["'][^>]*>\s*/gi,
  /<meta\s+name=["']twitter:title["'][^>]*>\s*/gi,
  /<meta\s+name=["']twitter:description["'][^>]*>\s*/gi,
  /<meta\s+name=["']twitter:image["'][^>]*>\s*/gi,
  /<meta\s+name=["']twitter:image:alt["'][^>]*>\s*/gi,
];

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const buildSeoTags = (pathname: string): string => {
  const meta = resolveSeoMeta(pathname, process.env.VITE_SITE_URL);

  return [
    `    <title>${escapeHtml(meta.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(meta.description)}" />`,
    `    <meta name="robots" content="${meta.robots}" />`,
    `    <link rel="canonical" href="${meta.canonicalUrl}" />`,
    `    <meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `    <meta property="og:site_name" content="${escapeHtml(meta.siteName)}" />`,
    `    <meta property="og:image" content="${meta.imageUrl}" />`,
    `    <meta property="og:image:secure_url" content="${meta.imageSecureUrl}" />`,
    `    <meta property="og:image:type" content="${meta.imageType}" />`,
    `    <meta property="og:image:width" content="${meta.imageWidth}" />`,
    `    <meta property="og:image:height" content="${meta.imageHeight}" />`,
    `    <meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
    `    <meta property="og:url" content="${meta.canonicalUrl}" />`,
    `    <meta property="og:type" content="${meta.ogType}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `    <meta name="twitter:image" content="${meta.imageUrl}" />`,
    `    <meta name="twitter:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
  ].join("\n");
};

const injectSeoTags = (html: string, pathname: string): string => {
  let result = html;

  for (const pattern of SEO_TAG_PATTERNS) {
    result = result.replace(pattern, "");
  }

  return result.replace("</head>", `${buildSeoTags(pathname)}\n  </head>`);
};

const toOutputHtmlPath = (pathname: string): string => {
  if (pathname === "/") {
    return "index.html";
  }

  const folderPath = pathname.replace(/^\/+|\/+$/g, "");

  return path.join(folderPath, "index.html");
};

const prerenderSeoRoutes = (): PluginOption => ({
  name: "prerender-seo-routes",
  apply: "build",
  async closeBundle() {
    const distDir = path.resolve(process.cwd(), "dist");
    const indexHtmlPath = path.join(distDir, "index.html");
    const baseHtml = await fs.readFile(indexHtmlPath, "utf-8");
    const routes = getPrerenderSeoPaths();

    await Promise.all(
      routes.map(async (routePath) => {
        const outputHtmlPath = path.join(distDir, toOutputHtmlPath(routePath));
        const htmlWithSeo = injectSeoTags(baseHtml, routePath);

        await fs.mkdir(path.dirname(outputHtmlPath), { recursive: true });
        await fs.writeFile(outputHtmlPath, htmlWithSeo, "utf-8");
      }),
    );
  },
});

export default defineConfig({
  plugins: [react(), prerenderSeoRoutes()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
