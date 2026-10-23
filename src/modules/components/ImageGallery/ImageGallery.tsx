import { useState } from 'react';
import styles from './ImageGallery.module.scss';
import { withBase } from '../../../utils/withBase';

type Props = {
  images: string[];
  alt: string;
};

export const ImageGallery = ({ images, alt }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={
              index === activeIndex
                ? `${styles.thumbnail} ${styles.thumbnailActive}`
                : styles.thumbnail
            }
            onClick={() => setActiveIndex(index)}
          >
            <img src={withBase(`/${image}`)} alt="" />
          </button>
        ))}
      </div>
      <div className={styles.mainImageWrap}>
        <img
          src={withBase(`/${images[activeIndex]}`)}
          alt={alt}
          className={styles.mainImage}
        />
      </div>
    </div>
  );
};
