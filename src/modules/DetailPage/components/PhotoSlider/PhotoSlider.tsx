import { useState } from 'react';
import styles from './PhotoSlider.module.scss';

type Props = {
  photos: string[];
};

export const PhotoSlider: React.FC<Props> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.slider}>
      <div className={styles.mainPhoto}>
        <img src={`/${photos[activeIndex]}`} alt="product" />
      </div>

      <div className={styles.thumbnails}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`${styles.thumb} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={`/${photo}`} alt={`photo ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
