import React from 'react';
import classNames from 'classnames';

import { PhotoPreviewsSkeleton } from './components';

import styles from './PhotoGallery.module.scss';

type Props = {
  className?: string;
};

export const PhotoGallerySkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(styles.gallery, className)}>
      <div
        className={classNames(styles['photo-slider'], styles.gallery__slider)}
      >
        <div
          className={classNames(
            styles['photo-slider__wrapper'],
            styles['photo-slider__wrapper--loading'],
          )}
        >
          <ul className={styles['photo-slider__list']}>
            <li className={styles['photo-slider__item']}>
              <div
                className={classNames(
                  styles['photo-slider__img'],
                  styles['photo-slider__img--loading'],
                )}
              ></div>
            </li>
          </ul>
        </div>
      </div>
      <PhotoPreviewsSkeleton className={styles.gallery__previews} />
    </div>
  );
};
