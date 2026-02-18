export const safeExternalUrl = (url?: string): string | null => {
  if (!url) {
    return null;
  }

  const normalizedUrl = url.trim();

  if (!normalizedUrl) {
    return null;
  }

  try {
    const parsed = new URL(normalizedUrl);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed.href;
  } catch {
    return null;
  }
};
