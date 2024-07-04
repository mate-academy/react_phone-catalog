import classNames from 'classnames';
import styles from './Gallery.module.scss';
import React, { useEffect, useState } from 'react';

type Props = {
  images: string[];
};

export const Gallery: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <section className={classNames(styles.gallery)}>
      <span
        className={classNames(
          styles.gallery__image,
          styles['gallery__image-main'],
        )}
        style={{ backgroundImage: `url(${selectedImage})` }}
      />
      <div className={styles.gallery__list}>
        {images.map(image => (
          <span
            key={image}
            className={classNames(
              styles.gallery__image,
              styles['gallery__image-secondary'],
              {
                [styles['gallery__image-selected']]: image === selectedImage,
              },
            )}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </section>
  );
};
