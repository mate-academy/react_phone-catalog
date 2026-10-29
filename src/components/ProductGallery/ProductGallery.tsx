import { useState } from 'react';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[];
  alt: string;
}

export const ProductGallery = ({ images, alt }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <img
          className={styles.mainImage}
          src={images[selectedIndex]}
          alt={alt}
        />
      </div>

      <div className={styles.thumbs}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={styles.thumb}
            aria-current={index === selectedIndex ? 'true' : undefined}
            aria-label={`Photo ${index + 1}`}
            onClick={() => setSelectedIndex(index)}
          >
            <img className={styles.thumbImage} src={image} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
};
