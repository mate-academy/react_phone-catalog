import React, { useState } from 'react';
import styles from './ProductGallery.module.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  name: string;
};

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <div className={styles.productGallery}>
      <img
        key={selectedImage}
        src={selectedImage}
        alt={name}
        className={styles.productGalleryMainFoto}
      />
      <ul className={styles.productGalleryList}>
        {images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              className={classNames(styles.productGalleryButton, {
                [styles.productGalleryButtonActive]: index === selectedIndex,
              })}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image}
                alt={name}
                className={styles.productGalleryFotos}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
