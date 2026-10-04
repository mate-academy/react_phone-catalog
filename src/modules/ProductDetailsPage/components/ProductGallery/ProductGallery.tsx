import { useState } from 'react';
import cn from 'classnames';
import styles from './ProductGallery.module.scss';

const FALLBACK_IMAGE = 'img/product-not-found.png';

interface Props {
  images: string[];
  name: string;
}

export const ProductGallery = ({ images, name }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [brokenImages, setBrokenImages] = useState<string[]>([]);

  // some files are missing or repeated in the data: show only the valid ones
  const pictures = Array.from(new Set(images)).filter(
    image => !brokenImages.includes(image),
  );
  const current = pictures[Math.min(selectedIndex, pictures.length - 1)];

  const handleError = (image: string) => {
    setBrokenImages(prev => (prev.includes(image) ? prev : [...prev, image]));
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <img
          src={current ?? FALLBACK_IMAGE}
          alt={name}
          className={styles.mainImage}
          onError={() => current && handleError(current)}
        />
      </div>

      {pictures.length > 1 && (
        <ul className={styles.thumbs}>
          {pictures.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                className={cn(styles.thumb, {
                  [styles.selected]: image === current,
                })}
                aria-label={`Show picture ${index + 1}`}
                aria-current={image === current}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={image}
                  alt=""
                  className={styles.thumbImage}
                  onError={() => handleError(image)}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
