import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import ImageCompareSlider from "./ImageCompareSlider";
import { variants } from "../utils/animationVariants";
import type { SharedModalProps } from "../utils/types";
import Twitter from "./Icons/Twitter";
import Facebook from "./Icons/Facebook";

export default function SharedModal({
    index,
    images,
    closeModal,
    currentPhoto,
    direction,
}: SharedModalProps) {
    const [isCompareMode, setIsCompareMode] = useState(true);
    const currentImage = images ? images[index] : currentPhoto;

    if (!currentImage) {
        return null;
    }

    const blackWhiteSrc = `/photo/old/${currentImage.name}`;

    const currentImageWidth = Number(currentImage.width) > 0 ? Number(currentImage.width) : 1920;
    const currentImageHeight = Number(currentImage.height) > 0 ? Number(currentImage.height) : 1280;
    const shareUrl = `https://hochiminh-ai.pages.dev/p/${index}`;
    const tweetHref =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent("Check out this pic from Ho Chi Minh AI Enhance Photo Gallery!") +
        "%0A%0A" +
        encodeURIComponent(shareUrl);
    const facebookHref =
        "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(shareUrl) +
        "&quote=" +
        encodeURIComponent("Check out this pic from Ho Chi Minh AI Enhance Photo Gallery!");

    return (
        <MotionConfig
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div className="relative z-50 flex min-h-dvh w-full max-w-7xl items-center justify-center px-2 sm:px-4">
                {isCompareMode ? (
                    <div className="flex min-h-dvh w-full items-center justify-center py-14 sm:py-16">
                        <div className="w-full max-w-6xl">
                            <ImageCompareSlider
                                beforeImageSrc={blackWhiteSrc}
                                afterImageSrc={currentImage.src}
                                beforeLabel="Black & White"
                                afterLabel="Colorized"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex min-h-dvh w-full items-center justify-center overflow-hidden py-14 sm:py-16">
                        <div className="relative flex h-full w-full items-center justify-center">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={index}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute flex h-full w-full items-center justify-center"
                                >
                                    <Zoom>
                                        <Image
                                            key={currentImage.src}
                                            src={currentImage.src}
                                            width={currentImageWidth}
                                            height={currentImageHeight}
                                            priority
                                            alt="Ho Chi Minh AI Image"
                                            className="h-auto max-h-[calc(100dvh-8rem)] w-auto max-w-full object-contain sm:max-h-[calc(100dvh-9rem)]"
                                        />
                                    </Zoom>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                <div className="pointer-events-none fixed inset-x-0 top-0 z-80 flex items-start justify-between p-2 text-white sm:p-3" style={{ paddingTop: "max(env(safe-area-inset-top), 0.75rem)" }}>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsCompareMode((prev) => !prev)}
                            className="pointer-events-auto rounded-full border border-white/80 bg-black/70 px-2.5 py-1.5 text-[11px] font-semibold text-white/95 backdrop-blur-lg transition hover:bg-black/85 hover:text-white cursor-pointer sm:px-3 sm:py-2 sm:text-xs"
                            title={isCompareMode ? "Show single image" : "Compare black-white and colorized"}
                            aria-label={isCompareMode ? "Show single image" : "Compare black-white and colorized"}
                        >
                            {isCompareMode ? "Single view" : "Compare view"}
                        </button>
                        <a
                            href={tweetHref}
                            className="pointer-events-auto rounded-full border border-white/60 bg-black/70 p-1.5 text-white/90 backdrop-blur-lg transition hover:bg-black/85 hover:text-white cursor-pointer sm:p-2"
                            target="_blank"
                            title="Share on Twitter"
                            rel="noreferrer"
                            aria-label="Share on Twitter"
                        >
                            <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                        <a
                            href={facebookHref}
                            className="pointer-events-auto rounded-full border border-white/60 bg-black/70 p-1.5 text-white/90 backdrop-blur-lg transition hover:bg-black/85 hover:text-white cursor-pointer sm:p-2"
                            target="_blank"
                            title="Share on Facebook"
                            rel="noreferrer"
                            aria-label="Share on Facebook"
                        >
                            <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                    </div>
                    <div className="text-white">
                        <button
                            onClick={closeModal}
                            className="pointer-events-auto rounded-full border border-white/60 bg-black/70 p-1.5 text-white/90 backdrop-blur-lg transition hover:bg-black/85 hover:text-white cursor-pointer sm:p-2"
                            title="Close"
                            aria-label="Close image"
                        >
                            <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </MotionConfig>
    );
}
