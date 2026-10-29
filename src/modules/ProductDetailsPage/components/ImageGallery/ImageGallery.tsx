import React, { useState } from 'react';
import styles from './ImageGallery.module.scss';

type Props = {
  images: string[];
  name: string;
};

export const ImageGallery = ({ images, name }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState('center');

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomOrigin(`${x}% ${y}%`);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainWrapper}>
        <img
          src={images[selectedIndex]}
          alt={name}
          className={styles.mainImage}
          style={{ transformOrigin: zoomOrigin }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomOrigin('center')}
        />
      </div>

      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={
              index === selectedIndex
                ? `${styles.thumb} ${styles.active}`
                : styles.thumb
            }
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image}
              alt={`${name} ${index + 1}`}
              className={styles.thumbImage}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
