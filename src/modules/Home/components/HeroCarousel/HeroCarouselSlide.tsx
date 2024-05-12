import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Slide } from './types';
import classes from './heroCarousel.module.scss';

type Props = {
  slide: Slide;
};

const queries = ['640px', '1200px'];

export const HeroCarouselSlide: FC<Props> = ({
  slide: { to, images, alt },
}) => {
  const [baseImage, ...spareImages] = images;

  return (
    <Link to={to} className={classes.carousel__slide}>
      <picture>
        {spareImages.map(
          (image, index) =>
            Boolean(queries[index]) && (
              <source
                key={queries[index]}
                media={`(min-width: ${queries[index]})`}
                srcSet={image}
              />
            ),
        )}
        <img className={classes.carousel__slideImg} src={baseImage} alt={alt} />
      </picture>
    </Link>
  );
};
