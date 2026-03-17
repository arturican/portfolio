import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MetaTags } from "./MetaTags";
import type { SeoMeta } from "./seoConfig";

const initialHeadMarkup = document.head.innerHTML;

const baseMeta: SeoMeta = {
  title: "Portfolio | @arturican",
  description: "Frontend portfolio overview",
  canonicalUrl: "https://arturican.ru/",
  imageUrl: "https://arturican.ru/og-default.png",
  imageSecureUrl: "https://arturican.ru/og-default.png",
  imageAlt: "Portfolio preview image",
  imageWidth: 1200,
  imageHeight: 630,
  imageType: "image/png",
  siteName: "@arturican",
  ogType: "website",
  robots: "index, follow",
};

afterEach(() => {
  cleanup();
  document.head.innerHTML = initialHeadMarkup;
  document.title = "";
});

describe("MetaTags", () => {
  it("writes SEO fields into the document head", () => {
    render(<MetaTags meta={baseMeta} />);

    expect(document.title).toBe(baseMeta.title);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      baseMeta.description,
    );
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      baseMeta.robots,
    );
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      baseMeta.canonicalUrl,
    );
    expect(document.head.querySelector('meta[property="og:url"]')).toHaveAttribute(
      "content",
      baseMeta.canonicalUrl,
    );
    expect(document.head.querySelector('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      baseMeta.imageUrl,
    );
  });

  it("updates existing tags without duplicating them", () => {
    const { rerender } = render(<MetaTags meta={baseMeta} />);

    rerender(
      <MetaTags
        meta={{
          ...baseMeta,
          title: "Todolist | @arturican",
          description: "A React + TypeScript todo list app",
          canonicalUrl: "https://arturican.ru/projects/todolist",
          robots: "noindex, nofollow",
        }}
      />,
    );

    expect(document.title).toBe("Todolist | @arturican");
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[property="og:url"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://arturican.ru/projects/todolist",
    );
  });
});
