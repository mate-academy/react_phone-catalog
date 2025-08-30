// src/components/PicturesSlider/PicturesSlider.tsx - Image carousel component
import { useEffect, useMemo, useRef, useState } from 'react';
import s from './PicturesSlider.module.scss';

type Props = {
  images: string[];
  autoMs?: number; // default 5000
};

export const PicturesSlider: React.FC<Props> = ({ images, autoMs = 5000 }) => {
  const pics = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const len = pics.length || 1;

  useEffect(() => {
    if (len <= 1) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    timer.current && window.clearInterval(timer.current);

    timer.current = window.setInterval(() => {
      setIndex(i => (i + 1) % len);
    }, autoMs);

    return () => {
      if (timer.current) {
        window.clearInterval(timer.current);
      }
    };
  }, [len, autoMs]);

  const prev = () => setIndex(i => (i - 1 + len) % len);
  const next = () => setIndex(i => (i + 1) % len);

  return (
    <div className={s.frame}>
      <div className={`${s.track} ${s[`trackSlide${index}`]}`}>
        {pics.map((src, i) => (
          <div className={s.item} key={`${src}-${i}`}>
            <img src={src} alt={`slide-${i + 1}`} className={s.image} />
          </div>
        ))}
      </div>

      {len > 1 && (
        <>
          <div className={s.arrows}>
            <button className={s.btn} onClick={prev} aria-label="Prev">
              ‹
            </button>
            <button className={s.btn} onClick={next} aria-label="Next">
              ›
            </button>
          </div>

          <div className={s.dots}>
            {pics.map((_, i) => (
              <span
                key={i}
                className={`${s.dot} ${i === index ? s.dotActive : ''}`}
                onClick={() => setIndex(i)}
                role="button"
                aria-label={`Go to ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
