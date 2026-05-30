import { useState } from 'react';
import styles from './PicturesSlider.module.scss';

interface PicturesSliderProps {
  images: string[];
}

export const PicturesSlider = ({ images }: PicturesSliderProps) => {
  const [active, setActive] = useState(0);
  const total = images.length;

  const activeImage = images[active];

  return (
    <section className={styles.slider}>
      <img src={activeImage} alt={`Slide ${active + 1}`} />
      <div className={styles.navigation}>
        <button
          type="button"
          onClick={() => setActive(current => (current - 1 + total) % total)}
          aria-label="Previous slide"
        >
          <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setActive(current => (current + 1) % total)}
          aria-label="Next slide"
        >
          <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        </button>
      </div>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === active ? styles.active : ''}
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
