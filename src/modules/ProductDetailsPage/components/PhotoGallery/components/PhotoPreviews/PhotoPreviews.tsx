import React from 'react';
import classNames from 'classnames';

import styles from './PhotoPreviews.module.scss';

type Props = {
  productName: string;
  images: string[];
  currentIndex: number;
  onClick: (newIndex: number) => void;
  className?: string;
};

export const PhotoPreviews: React.FC<Props> = ({
  productName,
  images,
  currentIndex,
  onClick,
  className,
}) => {
  return (
    <div className={classNames(styles['photo-previews'], className)}>
      <ul className={styles['photo-previews__list']}>
        {images.map((image, index) => (
          <li
            key={image + index}
            className={classNames(styles['photo-previews__item'], {
              [styles['photo-previews__item--active']]: currentIndex === index,
            })}
            onClick={() => onClick(index)}
          >
            <img
              src={image}
              alt={`${productName} preview - ${index + 1}`}
              className={styles['photo-previews__img']}
              draggable={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
