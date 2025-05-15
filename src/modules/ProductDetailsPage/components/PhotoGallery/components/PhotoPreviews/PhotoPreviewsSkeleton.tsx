import React from 'react';
import classNames from 'classnames';

import styles from './PhotoPreviews.module.scss';

type Props = {
  className?: string;
};

export const PhotoPreviewsSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(styles['photo-previews'], className)}>
      <ul className={styles['photo-previews__list']}>
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className={classNames(
              styles['photo-previews__item'],
              styles['photo-previews__item--loading'],
            )}
          >
            <div className={styles['photo-previews__img']}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
