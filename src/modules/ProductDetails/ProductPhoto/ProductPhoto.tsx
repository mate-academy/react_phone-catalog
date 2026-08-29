import { useEffect, useState } from 'react';
import styles from './ProductPhoto.module.scss';
import cn from 'classnames';

interface Props {
  photos: string[];
}

export const ProductPhoto: React.FC<Props> = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(photos[0]);

  useEffect(() => {
    setCurrentImage(photos[0]);
  }, [photos]);

  return (
    <div className={styles['product-photo']}>
      <div className={styles['product-photo__count']}>
        <img
          src={currentImage}
          className={styles['product-photo__image']}
          alt="image"
        />
      </div>

      <ul className={styles['product-photo__list']}>
        {photos.map((img, index) => {
          return (
            <li
              className={styles['product-photo__item']}
              key={index}
              onClick={() => setCurrentImage(img)}
            >
              <button
                className={cn(styles['product-photo__button'], {
                  [styles['product-photo__button--active']]:
                    img === currentImage,
                })}
              >
                <img
                  src={img}
                  alt="image"
                  className={styles['product-photo__image']}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
