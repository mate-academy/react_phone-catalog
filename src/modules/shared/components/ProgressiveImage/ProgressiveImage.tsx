import React, { useState } from 'react';
import styles from './ProgressiveImage.module.scss';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { getImageUrl } from '../../utils/getImageUrl';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export const ProgressiveImage: React.FC<Props> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={classNames(styles['image-container'], className)}>
      {isLoading && (
        <div className={styles['image-container__loader-wrapper']}>
          <Loader className={styles['image-container__spinner']} />
        </div>
      )}

      <img
        src={getImageUrl(src)}
        alt={alt}
        className={classNames(styles['image-container__image'], {
          [styles['image-container__image--loaded']]: !isLoading,
        })}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
