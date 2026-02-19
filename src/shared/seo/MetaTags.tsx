import { useEffect } from "react";
import type { SeoMeta } from "./seoConfig";

interface MetaTagsProps {
  meta: SeoMeta;
}

const setMetaByName = (name: string, content: string): void => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.append(element);
  }

  element.setAttribute("content", content);
};

const setMetaByProperty = (property: string, content: string): void => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.append(element);
  }

  element.setAttribute("content", content);
};

const setCanonicalLink = (href: string): void => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.append(element);
  }

  element.setAttribute("href", href);
};

export const MetaTags = ({ meta }: MetaTagsProps) => {
  useEffect(() => {
    document.title = meta.title;

    setMetaByName("description", meta.description);
    setMetaByName("robots", meta.robots);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", meta.title);
    setMetaByName("twitter:description", meta.description);
    setMetaByName("twitter:image", meta.imageUrl);
    setMetaByName("twitter:image:alt", meta.imageAlt);

    setMetaByProperty("og:title", meta.title);
    setMetaByProperty("og:description", meta.description);
    setMetaByProperty("og:site_name", meta.siteName);
    setMetaByProperty("og:image", meta.imageUrl);
    setMetaByProperty("og:image:secure_url", meta.imageSecureUrl);
    setMetaByProperty("og:image:type", meta.imageType);
    setMetaByProperty("og:image:width", String(meta.imageWidth));
    setMetaByProperty("og:image:height", String(meta.imageHeight));
    setMetaByProperty("og:image:alt", meta.imageAlt);
    setMetaByProperty("og:url", meta.canonicalUrl);
    setMetaByProperty("og:type", meta.ogType);

    setCanonicalLink(meta.canonicalUrl);
  }, [meta]);

  return null;
};
