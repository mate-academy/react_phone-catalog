import { useEffect, useRef, useState, useCallback } from 'react';
import s from './PictureSlider.module.scss';
import ArrowLeft from '../../../assets/Chevron (Arrow Left).svg';
import ArrowRight from '../../../assets/Chevron (Arrow Right).svg';

type Props = {
  images: string[];
  intervalMs?: number;
};

export const PictureSlider: React.FC<Props> = ({
  images,
  intervalMs = 5000,
}) => {
  const [idx, setIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const timer = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const lastX = useRef<number | null>(null);
  const hasPointer = useRef(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const n = images.length;
  const thresholdPx = 50;

  const goto = useCallback((i: number) => setIdx((i + n) % n), [n]);
  const prev = useCallback(() => goto(idx - 1), [goto, idx]);
  const next = useCallback(() => goto(idx + 1), [goto, idx]);

  useEffect(() => {
    if (n <= 1 || isDragging) {
      return;
    }

    if (timer.current) {
      window.clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => next(), intervalMs);

    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
  }, [idx, intervalMs, n, next, isDragging]);

  if (!n) {
    return null;
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!viewportRef.current) {
      return;
    }

    hasPointer.current = true;
    setIsDragging(true);
    startX.current = e.clientX;
    lastX.current = e.clientX;
    setDragX(0);
    viewportRef.current.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!hasPointer.current || startX.current == null) {
      return;
    }

    lastX.current = e.clientX;
    const dx = e.clientX - startX.current;

    setDragX(dx);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!hasPointer.current) {
      return;
    }

    hasPointer.current = false;

    const dx = (lastX.current ?? e.clientX) - (startX.current ?? e.clientX);

    setIsDragging(false);
    setDragX(0);
    startX.current = null;
    lastX.current = null;

    if (Math.abs(dx) > thresholdPx) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }
  };

  const onPointerCancel = () => {
    hasPointer.current = false;
    setIsDragging(false);
    setDragX(0);
    startX.current = null;
    lastX.current = null;
  };

  const basePercent = -(idx * 100);
  const dragTransform =
    isDragging && dragX !== 0
      ? `calc(${basePercent}% + ${dragX}px)`
      : `${basePercent}%`;

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h2 className={s.title}>Welcome to Nice Gadgets store!</h2>
      </div>

      <div className={s.sliderRow}>
        <button className={s.nav} onClick={prev} aria-label="Previous slide">
          <img src={ArrowLeft} alt="Prev" />
        </button>

        <div
          className={`${s.viewport} ${isDragging ? s.dragging : ''}`}
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <div
            className={s.track}
            style={{ transform: `translate3d(${dragTransform}, 0, 0)` }}
          >
            {images.map((src, i) => (
              <div className={s.slide} key={src + i}>
                <img src={src} alt="" draggable={false} />
              </div>
            ))}
          </div>
        </div>

        <button className={s.nav} onClick={next} aria-label="Next slide">
          <img src={ArrowRight} alt="Next" />
        </button>
      </div>

      <div className={s.dots} role="tablist" aria-label="Choose slide">
        {images.map((_, i) => (
          <button
            key={i}
            className={`${s.dot} ${i === idx ? s.active : ''}`}
            aria-pressed={i === idx}
            onClick={() => goto(i)}
          />
        ))}
      </div>
    </div>
  );
};
