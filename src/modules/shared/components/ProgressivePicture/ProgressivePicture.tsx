import React, { useState } from 'react';
import styles from './ProgressivePicture.module.scss';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { getImageUrl } from '../../utils/getImageUrl';

interface Props {
  srcMobile: string;
  srcTablet: string;
  srcDesktop: string;
  alt: string;
  className?: string;
}

export const ProgressivePicture: React.FC<Props> = ({
  srcMobile,
  srcTablet,
  srcDesktop,
  alt,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={classNames(styles['image-container'], className)}>
      {isLoading && (
        <div className={styles['image-container__loader-wrapper']}>
          <Loader className={styles['image-container__spinner']} />
        </div>
      )}

      <picture>
        <source media="(min-width: 1200px)" srcSet={getImageUrl(srcDesktop)} />

        <source media="(min-width: 640px)" srcSet={getImageUrl(srcTablet)} />

        <img
          src={getImageUrl(srcMobile)}
          alt={alt}
          className={classNames(styles['image-container__image'], {
            [styles['image-container__image--loaded']]: !isLoading,
          })}
          onLoad={() => setIsLoading(false)}
        />
      </picture>
    </div>
  );
};
