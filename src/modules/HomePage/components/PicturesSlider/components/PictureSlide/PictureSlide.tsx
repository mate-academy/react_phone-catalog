import React from 'react';
import { Link } from 'react-router-dom';

import { PictureSlideData } from '../../../../types';

import styles from './PictureSlide.module.scss';

type Props = {
  slide: PictureSlideData;
  className?: string;
};

export const PictureSlide: React.FC<Props> = ({ className = '', slide }) => {
  const { title, description, navigateTo, img, alt } = slide;

  return (
    <li className={`${className} ${styles['picture-slide']}`}>
      <div className={styles['picture-slide__content']}>
        <div className={styles['picture-slide__info']}>
          <h3 className={styles['picture-slide__title']}>{title}</h3>
          <p className={styles['picture-slide__description']}>{description}</p>
        </div>

        <Link
          to={navigateTo}
          className={styles['picture-slide__button']}
          draggable="false"
        >
          Order now
        </Link>
      </div>

      <div className={styles['picture-slide__img-container']}>
        <img
          className={styles['picture-slide__img']}
          src={img}
          alt={alt}
          draggable="false"
        />
      </div>
    </li>
  );
};
