import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './SliderCardImages.module.scss';

type TProps = {
  images?: string[];
};

export const SliderCardImages: FC<TProps> = ({ images = [] }) => {
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (!images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  return (
    <div className={styles.images}>
      <div className={styles.currentImage}>
        <img src={currentImage} alt="Selected image" />
      </div>
      {images.map((image, index) => (
        <div
          className={cn(
            styles.imagesList,
            currentImage === image && styles.active,
          )}
          key={image}
          onClick={() => setCurrentImage(image)}
        >
          <img
            src={image}
            alt={`Image ${index + 1}`}
            width={80}
            height={80}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};
