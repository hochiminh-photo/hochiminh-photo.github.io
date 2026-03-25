import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import cloudinary from "cloudinary";

const outputPath = path.join(process.cwd(), "public", "photos-manifest.json");

async function writeManifest(images) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(images, null, 2), "utf8");
  console.log(`Wrote ${images.length} photos to ${outputPath}`);
}

async function main() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_FOLDER;

  if (!cloudName || !apiKey || !apiSecret || !folder) {
    console.warn(
      "Missing Cloudinary env vars. Writing an empty manifest. Required: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_FOLDER.",
    );
    await writeManifest([]);
    return;
  }

  cloudinary.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  const results = await cloudinary.v2.search
    .expression(`folder:${folder}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  const manifest = results.resources.map((result, id) => ({
    id,
    height: result.height,
    width: result.width,
    public_id: result.public_id,
    format: result.format,
  }));

  await writeManifest(manifest);
}

main().catch(async (error) => {
  console.error("Failed to generate photos manifest:", error);
  await writeManifest([]);
  process.exitCode = 1;
});
