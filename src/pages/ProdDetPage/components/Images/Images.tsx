import { useEffect, useState } from 'react';
import styles from './Images.module.scss';

type Props = {
  images: string[];
};

export const Images: React.FC<Props> = ({ images }) => {
  const [bigImage, setBigImage] = useState<string>(images[0]);

  useEffect(() => {
    setBigImage(images[0]);
  }, [images]);

  return (
    <ul
      className={styles.images}
      style={{ '--images-count': images.length } as React.CSSProperties}
    >
      {images.map(image => (
        <li
          key={image}
          className={`${styles.images__item} ${bigImage === image ? styles['images__item--active'] : ''}`}
        >
          <img
            src={image}
            alt="product image"
            className={styles.images__img}
            onClick={() => setBigImage(image)}
          />
        </li>
      ))}
      <li className={styles.images__bigItem}>
        <img src={bigImage} alt="" className={styles.images__bigImg} />
      </li>
    </ul>
  );
};
