import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import ImageCompareSlider from "../components/ImageCompareSlider";

const ComparePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Black & White vs Colorized | Ho Chi Minh AI Gallery</title>
      </Head>

      <main className="mx-auto min-h-screen w-full max-w-5xl p-4 sm:p-6">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white shadow-highlight sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">
                Image Comparison
              </h1>
              <p className="mt-2 text-sm text-white/75 sm:text-base">
                Drag the slider to compare the black-white photo and the colorized result.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-lg border border-white/50 px-3 py-2 text-sm font-semibold transition hover:bg-white hover:text-black"
            >
              Back to Gallery
            </Link>
          </div>

          <ImageCompareSlider
            beforeImageSrc="/photo/Image_v5wppev5wppev5wp_blackwhite.png"
            afterImageSrc="/photo/Image_9meq1f9meq1f9meq_colorized.png"
            beforeLabel="Black & White"
            afterLabel="Colorized"
          />
        </div>
      </main>
    </>
  );
};

export default ComparePage;