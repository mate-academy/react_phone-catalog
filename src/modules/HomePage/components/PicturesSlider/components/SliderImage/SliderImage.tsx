import React from 'react';
import styles from './SliderImage.module.scss';

type Props = {
  src: string;
  alt: string;
};

export const SliderImage: React.FC<Props> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.image} />;
};
