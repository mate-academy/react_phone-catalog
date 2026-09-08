import React, { useEffect, useState } from 'react';
import styles from './ProductImages.module.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
};

export const ProductImages: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className={styles.slider}>
      <ul className={styles.slider__list}>
        {images.map((image, index) => (
          <li
            key={index}
            onClick={() => setSelectedImage(image)}
            className={classNames(styles['slider__list-item'], {
              [styles.selected]: selectedImage === image,
            })}
          >
            <img
              className={styles['slider__list-img']}
              src={image}
              alt={`Thumbnail ${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <div className={styles.slider__content}>
        <img src={selectedImage} alt="Selected product" />
      </div>
    </div>
  );
};
