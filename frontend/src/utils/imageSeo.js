export function getImageAlt(imageMeta) {
  // Backend altText is intentionally not rendered yet.
  void imageMeta;
  return "";
}

export function getSeoFileName(label, fallback = "image") {
  const raw = String(label || fallback).trim().toLowerCase();
  const slug = raw
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${slug || fallback}.webp`;
}
