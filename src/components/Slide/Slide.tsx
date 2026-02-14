import React from 'react';
import { Link } from 'react-router-dom';

import { Slide as SlideType } from '../../types/Slide';

import styles from './Slide.module.scss';
const { slide, slide__img } = styles;

export const Slide: React.FC<SlideType> = React.memo(({ image, link }) => {
  return (
    <Link to={link} className={slide}>
      <img
        src={image}
        alt="slide image"
        className={slide__img}
        loading="lazy"
      />
    </Link>
  );
});

Slide.displayName = 'Slide';
