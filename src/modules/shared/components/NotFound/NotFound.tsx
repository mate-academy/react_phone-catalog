import React from 'react';
import { Back } from '../Back';
import styles from './NotFound.module.scss';

interface NotFoundProps {
  title: string;
  imageSrc: string;
  alt: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ title, imageSrc, alt }) => {
  return (
    <div className={styles['not-found']}>
      <Back />

      <div className={styles['not-found__container']}>
        <h2 className={styles['not-found__title']}>{title}</h2>

        <img className={styles['not-found__image']} src={imageSrc} alt={alt} />
      </div>
    </div>
  );
};
