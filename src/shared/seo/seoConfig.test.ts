import { describe, expect, it } from "vitest";
import { getPrerenderSeoPaths, resolveSeoMeta } from "./seoConfig";

describe("seoConfig", () => {
  it("resolves project seo metadata for known project route", () => {
    const meta = resolveSeoMeta("/projects/todolist", "https://arturican.ru");

    expect(meta.title).toBe("Todolist | @arturican");
    expect(meta.robots).toBe("index, follow");
    expect(meta.canonicalUrl).toBe("https://arturican.ru/projects/todolist");
    expect(meta.imageUrl).toBe("https://arturican.ru/og-default.png");
    expect(meta.imageSecureUrl).toBe("https://arturican.ru/og-default.png");
    expect(meta.imageWidth).toBe(1200);
    expect(meta.imageHeight).toBe(630);
    expect(meta.imageType).toBe("image/png");
    expect(meta.siteName).toBe("@arturican");
  });

  it("marks unknown routes as noindex", () => {
    const meta = resolveSeoMeta("/unknown-route", "https://arturican.ru");

    expect(meta.robots).toBe("noindex, nofollow");
    expect(meta.title).toBe("@arturican | Portfolio");
  });

  it("collects root and project routes for prerendering", () => {
    const paths = getPrerenderSeoPaths();

    expect(paths).toContain("/");
    expect(paths).toContain("/projects/todolist");
    expect(paths).toContain("/todolist");
  });
});
