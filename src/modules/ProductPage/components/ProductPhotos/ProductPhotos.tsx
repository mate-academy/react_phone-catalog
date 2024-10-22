import { useState } from 'react';
import styles from './ProductPhotos.module.scss';
import cn from 'classnames';

interface Props {
  photos: string[];
  className?: string;
}

export const ProductPhotos: React.FC<Props> = ({ photos, className }) => {
  const [cuurrentImage, setCurrentImage] = useState(photos[0]);

  return (
    <div className={cn(styles['product-photos'], className)}>
      <div className={styles['product-photos__current']}>
        <img
          className={styles['product-photos__img']}
          src={cuurrentImage}
          alt=""
        />
      </div>
      <ul className={styles['product-photos__list']}>
        {photos.map(img => {
          return (
            <li
              className={styles['product-photos__item']}
              key={img}
              onClick={() => setCurrentImage(img)}
            >
              <button className={styles['product-photos__btn']}>
                <img
                  className={styles['product-photos__img']}
                  src={img}
                  alt=""
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
