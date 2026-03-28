import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const manifestPath = path.join(publicDir, "photos-manifest.json");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const siteUrl = (process.env.SITE_URL || "https://hochiminh-ai.pages.dev").replace(/\/$/, "");

/** @typedef {{ id?: number; src?: string }} ManifestImage */

/**
 * @param {string} value
 */
function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/**
 * @param {string} pathname
 */
function toAbsoluteUrl(pathname) {
  if (!pathname.startsWith("/")) {
    return `${siteUrl}/${pathname}`;
  }
  return `${siteUrl}${pathname}`;
}

/**
 * @param {string} url
 * @param {string} imageUrl
 */
function buildUrlEntry(url, imageUrl) {
  return [
    "  <url>",
    `    <loc>${escapeXml(url)}</loc>`,
    "    <image:image>",
    `      <image:loc>${escapeXml(imageUrl)}</image:loc>`,
    "    </image:image>",
    "  </url>",
  ].join("\n");
}

async function readManifest() {
  try {
    const fileContent = await readFile(manifestPath, "utf8");
    /** @type {unknown} */
    const parsed = JSON.parse(fileContent);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function main() {
  /** @type {ManifestImage[]} */
  const images = await readManifest();

  const staticUrls = [
    toAbsoluteUrl("/"),
    toAbsoluteUrl("/hochiminh/"),
    toAbsoluteUrl("/compare/"),
  ];

  const entries = [];

  for (const image of images) {
    const imageUrl = toAbsoluteUrl(image.src || "");
    const photoId = Number.isInteger(image.id) ? image.id : null;

    if (photoId !== null) {
      entries.push(buildUrlEntry(toAbsoluteUrl(`/p/${photoId}/`), imageUrl));
    }
  }

  // Add one representative image to key static pages for richer index coverage.
  if (images.length > 0) {
    const representativeImageUrl = toAbsoluteUrl(images[0].src || "");
    for (const staticUrl of staticUrls) {
      entries.push(buildUrlEntry(staticUrl, representativeImageUrl));
    }
  } else {
    for (const staticUrl of staticUrls) {
      entries.push(["  <url>", `    <loc>${escapeXml(staticUrl)}</loc>`, "  </url>"].join("\n"));
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");

  await mkdir(path.dirname(sitemapPath), { recursive: true });
  await writeFile(sitemapPath, xml, "utf8");

  console.log(`Wrote sitemap with ${entries.length} URL entries to ${sitemapPath}`);
}

main().catch(async (error) => {
  console.error("Failed to generate sitemap:", error);

  const fallbackXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    `  <url><loc>${escapeXml(toAbsoluteUrl("/"))}</loc></url>`,
    "</urlset>",
    "",
  ].join("\n");

  await mkdir(path.dirname(sitemapPath), { recursive: true });
  await writeFile(sitemapPath, fallbackXml, "utf8");
  process.exitCode = 1;
});
