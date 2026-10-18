import classNames from 'classnames';
import { useState } from 'react';
import styles from './Gallery.module.scss';

interface Props {
  images: string[];
  name: string;
}

export const Gallery = ({ images, name }: Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={styles.gallery}>
      <ul className={styles.gallery__thumbnails}>
        {images.map(image => (
          <li key={image}>
            <button
              type="button"
              className={classNames(styles.gallery__thumbnail, {
                [styles['gallery__thumbnail--active']]: image === selectedImage,
              })}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={name} className={styles.gallery__preview} />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.gallery__main}>
        <img src={selectedImage} alt={name} className={styles.gallery__image} />
      </div>
    </div>
  );
};
