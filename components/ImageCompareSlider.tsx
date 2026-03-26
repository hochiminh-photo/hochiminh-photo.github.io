import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useMemo, useRef, useState } from "react";

type ImageCompareSliderProps = {
  beforeImageSrc: string;
  afterImageSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
};

const ImageCompareSlider = ({
  beforeImageSrc,
  afterImageSrc,
  beforeLabel = "Black & White",
  afterLabel = "Colorized",
}: ImageCompareSliderProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const nextPosition = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, nextPosition)));
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      updatePositionFromClientX(event.clientX);
    },
    [updatePositionFromClientX],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      updatePositionFromClientX(event.clientX);
    },
    [updatePositionFromClientX],
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  const clipPath = useMemo(
    () => `inset(0 ${100 - position}% 0 0)`,
    [position],
  );

  return (
    <section className="w-full">
      <div
        ref={containerRef}
        className="relative aspect-4/3 w-full cursor-ew-resize overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-highlight"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Image
          src={beforeImageSrc}
          alt={`${beforeLabel} image`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 900px"
        />

        <div className="absolute inset-0" style={{ clipPath }}>
          <Image
            src={afterImageSrc}
            alt={`${afterLabel} image`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{ left: `${position}%` }}
        >
          <div className="h-full w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.3)]" />
          <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-black/60 backdrop-blur">
            <span className="absolute left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 border-b-2 border-l-2 border-white" />
            <span className="absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 border-b-2 border-r-2 border-white" />
          </div>
        </div>

        <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-xs font-semibold text-white">
          {beforeLabel}
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/55 px-2 py-1 text-xs font-semibold text-white">
          {afterLabel}
        </div>
      </div>
    </section>
  );
};

export default ImageCompareSlider;