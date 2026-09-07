import React, { useEffect, useState } from 'react';
import styles from './ItemGallery.module.scss';

type Props = {
  images: string[] | undefined;
};

export const ItemGallery: React.FC<Props> = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState<string | undefined>(
    images?.[0],
  );

  useEffect(() => {
    setSelectedImg(images?.[0]);
  }, [images]);

  return (
    <div className={styles.container}>
      <ul>
        {images?.map(image => (
          <li
            key={image}
            className={
              image === selectedImg
                ? `${styles.activeImg} ${styles.list}`
                : styles.list
            }
          >
            <img
              src={image}
              alt="image"
              onClick={() => setSelectedImg(image)}
            />
          </li>
        ))}
      </ul>
      <div className={styles.selectedImg}>
        <img src={selectedImg} alt="image" />
      </div>
    </div>
  );
};
