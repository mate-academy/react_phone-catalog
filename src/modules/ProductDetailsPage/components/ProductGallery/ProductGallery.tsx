import { useState } from 'react';
import classNames from 'classnames';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[];
  name: string;
}

export const ProductGallery = ({ images, name }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <img
        src={images[selectedIndex]}
        alt={name}
        className={styles.mainImage}
      />

      <ul className={styles.thumbnails}>
        {images.map((image, index) => (
          <li key={image} className={styles.thumbnailItem}>
            <button
              type="button"
              className={classNames(styles.thumbnail, {
                [styles.thumbnailActive]: index === selectedIndex,
              })}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === selectedIndex}
            >
              <img src={image} alt="" className={styles.thumbnailImage} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
