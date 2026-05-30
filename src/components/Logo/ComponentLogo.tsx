import React from 'react';
import styles from './ComponentLogo.module.scss';

interface ComponentLogoProps {
  imgSrc: string;
}

export const ComponentLogo: React.FC<ComponentLogoProps> = ({ imgSrc }) => {
  return (
    <a href="#" className={styles.logo}>
      <img src={imgSrc} alt="NICE GADGETS" />
    </a>
  );
};
