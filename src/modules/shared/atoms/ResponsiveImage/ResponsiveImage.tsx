import React from 'react';
import styles from './ResponsiveImage.module.scss';

interface ResponsiveImageProps {
  alt: string;
  desktopSrc?: string;
  tabletSrc?: string;
  mobileSrc: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  alt,
  desktopSrc,
  tabletSrc,
  mobileSrc,
}) => {
  return (
    <picture className={styles.picture}>
      {desktopSrc && <source media="(min-width: 1200px)" srcSet={desktopSrc} />}
      {tabletSrc && <source media="(min-width: 640px)" srcSet={tabletSrc} />}
      <img src={mobileSrc} alt={alt} className={styles.picture__image} />
    </picture>
  );
};
