import React, { useState } from 'react';
import styles from './ImageSlider.module.scss';

type Props = {
  images: string[] | undefined;
};

export const ImageSlider: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleClick = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <section className={styles.image__slider}>
      <div className={styles.main__image__container}>
        <img
          src={images[selectedImage]}
          alt={`Image ${selectedImage}`}
          className={styles.main__image}
        />
      </div>

      <div className={styles.additional__image__container}>
        {images?.map((img, index) => (
          <div
            key={index}
            className={`${styles.container} ${selectedImage === index ? styles.container__active : ''}`}
            onClick={() => handleClick(index)}
          >
            <img
              src={img}
              alt="additional_image"
              key={index}
              className={styles.additional__image}
            ></img>
          </div>
        ))}
      </div>
    </section>
  );
};
