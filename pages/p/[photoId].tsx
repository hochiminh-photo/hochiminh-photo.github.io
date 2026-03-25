import { readFile } from "node:fs/promises";
import path from "node:path";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Carousel from "../../components/Carousel";
import { loadPhotosManifest } from "../../utils/photosManifest";
import type { ImageProps } from "../../utils/types";

const Home: NextPage = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const index = useMemo(() => Number(photoId), [photoId]);
  const currentPhoto = useMemo(
    () => images.find((img) => img.id === index),
    [images, index],
  );

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const manifestImages = await loadPhotosManifest();
        if (isMounted) {
          setImages(manifestImages);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentPhotoUrl = currentPhoto
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`
    : "https://hochiminh-ai.vercel.app/og-image.png";

  return (
    <>
      <Head>
        <title>Tấm gương rạng ngời dân tộc, sự kết hợp giữa khôn khéo chiến lược và đạo đức bền vững qua nhiều thập kỷ thử thách là minh chứng cho tài năng mọi thời đại.</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {isLoading && <div className="text-center text-white/70">Loading photo...</div>}
        {!isLoading && currentPhoto && <Carousel currentPhoto={currentPhoto} index={index} />}
        {!isLoading && !currentPhoto && (
          <div className="text-center text-white/70">Photo not found.</div>
        )}
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const manifestPath = path.join(process.cwd(), "public", "photos-manifest.json");

  let images: ImageProps[] = [];
  try {
    const fileContent = await readFile(manifestPath, "utf8");
    images = JSON.parse(fileContent) as ImageProps[];
  } catch {
    images = [];
  }

  return {
    paths: images.map((_, i) => ({ params: { photoId: i.toString() } })),
    fallback: false,
  };
};
