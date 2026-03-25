import type { ImageProps } from "./types";

export function getCloudinaryUrl(
  image: Pick<ImageProps, "public_id" | "format">,
  transformation: string,
) {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${image.public_id}.${image.format}`;
}

export function getCloudinaryBlurUrl(image: Pick<ImageProps, "public_id" | "format">) {
  return getCloudinaryUrl(image, "e_blur:1000,w_120,q_10");
}

export async function loadPhotosManifest(): Promise<ImageProps[]> {
  const response = await fetch("/photos-manifest.json", { cache: "no-store" });
  if (!response.ok) {
    return [];
  }

  const raw = (await response.json()) as ImageProps[];
  return raw.map((item, id) => ({
    ...item,
    id,
  }));
}
