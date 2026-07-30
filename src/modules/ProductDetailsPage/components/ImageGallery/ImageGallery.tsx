import { useState } from 'react';
import { getImageUrl } from '@/utils/getImageUrl';
import styles from './ImageGallery.module.scss';

type Props = {
  images: string[];
  alt: string;
};

export const ImageGallery = ({ images, alt }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <ul className={styles.thumbnails}>
        {images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              className={[
                styles.thumbnailButton,
                index === activeIndex ? styles.thumbnailButtonActive : '',
              ].join(' ')}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <img
                src={getImageUrl(image)}
                alt=""
                className={styles.thumbnailImage}
              />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.mainImageWrapper}>
        <img
          src={getImageUrl(images[activeIndex])}
          alt={alt}
          className={styles.mainImage}
        />
      </div>
    </div>
  );
};
