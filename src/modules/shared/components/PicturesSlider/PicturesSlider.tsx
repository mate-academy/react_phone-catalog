import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

interface Slide {
  src: string;
  title: string;
  description?: string;
}

interface Props {
  slides: Slide[];
}

export const PicturesSlider: React.FC<Props> = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const timer = setInterval(() => setIndex(prev => (prev + 1) % total), 5000);

    return () => clearInterval(timer);
  }, [total]);

  const showSlide = (nextIndex: number) => {
    setIndex((nextIndex + total) % total);
  };

  if (!slides.length) {
    return null;
  }

  const current = slides[index];

  return (
    <div className={styles.slider}>
      <div className={styles.previewWithButtons}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => showSlide(index - 1)}
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className={styles.preview}>
          <img src={current.src} alt={current.title} />
          <div className={styles.overlay}>
            <div>
              <p className={styles.subtitle}>Find your style</p>
              <h2 className={styles.title}>{current.title}</h2>
              {current.description && (
                <p className={styles.description}>{current.description}</p>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => showSlide(index + 1)}
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((slide, dotIndex) => (
          <button
            key={slide.title}
            type="button"
            className={styles.dot}
            data-active={dotIndex === index}
            aria-label={`Show slide ${dotIndex + 1}`}
            onClick={() => showSlide(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
};
