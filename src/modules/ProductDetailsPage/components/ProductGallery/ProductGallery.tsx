import React, { useState } from 'react';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[];
  name: string;
}

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const [selectedImg, setSelectedImg] = useState(0);

  return (
    <div className={styles.productGallery}>
      <div className={styles.productGallery__thumbs}>
        {images.map((img, i) => (
          <button
            key={img + i}
            className={
              i === selectedImg
                ? styles['productGallery__thumb--active']
                : styles.productGallery__thumb
            }
            onClick={() => setSelectedImg(i)}
          >
            <img src={`./${img}`} alt={`${name} view ${i}`} />
          </button>
        ))}
      </div>

      <div className={styles.productGallery__bigImgWrap}>
        <img
          src={`./${images[selectedImg]}`}
          alt={name}
          className={styles.productGallery__bigImg}
        />
      </div>
    </div>
  );
};
