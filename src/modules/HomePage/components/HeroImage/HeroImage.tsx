import { Link } from 'react-router-dom';
import React from 'react';

import styles from './HeroImage.module.scss';

type Props = {
  src: string;
  tip: string;
  link: string;
};

export const HeroImage: React.FC<Props> = ({ src, tip, link }) => {
  return (
    <div className={styles['hero-image']}>
      <div className={styles['hero-image__wrapper']}>
        <img src={src} alt={tip} className={styles['hero-image__image']} />
        <Link to={link} className={styles['hero-image__btn']} />
      </div>
    </div>
  );
};
