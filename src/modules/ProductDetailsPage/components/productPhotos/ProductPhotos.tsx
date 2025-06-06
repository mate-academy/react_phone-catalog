import React, { useEffect, useState } from 'react';

import styles from './ProductPhotos.module.scss';
import classNames from 'classnames';

type Props = {
  photos: string[];
};

export const ProductPhotos: React.FC<Props> = ({ photos }) => {
  const [currentImg, setCurrentImg] = useState('');

  useEffect(() => {
    setCurrentImg(photos[0]);
  }, [photos]);

  return (
    <>
      <img className={styles.bigPhoto} src={currentImg} alt="product photo" />

      <div className={styles.photos}>
        {photos.map(photo => (
          <img
            key={photo}
            src={photo}
            alt="product photo"
            className={classNames(styles.smallPhoto, {
              [styles.activePhoto]: photo === currentImg,
            })}
            onClick={() => setCurrentImg(photo)}
          />
        ))}
      </div>
    </>
  );
};
