import React, { FC } from 'react';
import cn from 'classnames';

import { Container } from '../../../shared/Container';
import { RoundButton } from '../../../shared/ui/RoundButton';
import { Icon } from '../../../shared/ui/Icon';
import { useCarousel } from './useCarousel';
import { HeroCarouselSlide } from './HeroCarouselSlide';
import { SLIDES } from './variables';
import classes from './heroCarousel.module.scss';

type Props = {};

export const HeroCarousel: FC<Props> = ({}) => {
  const {
    createSelectByIndex,
    selectNext,
    selectPrev,
    currentSlide,
    carouselRef,
  } = useCarousel();

  return (
    <Container.Grid className={classes.carousel}>
      <RoundButton onClick={selectPrev} className={classes.carousel__button}>
        <Icon variant="arrow-left" />
      </RoundButton>

      <div className={classes.carousel__wrapper} ref={carouselRef}>
        <div className={classes.carousel__container}>
          {SLIDES.map((slide, index) => (
            <HeroCarouselSlide slide={slide} key={index} />
          ))}
        </div>
      </div>

      <RoundButton onClick={selectNext} className={classes.carousel__button}>
        <Icon variant="arrow-right" />
      </RoundButton>

      <div className={classes.carousel__breadcrumbs}>
        {SLIDES.map((_i, index) => (
          <button
            key={index}
            className={cn(classes.carousel__breadcrumb, {
              [classes.carousel__breadcrumb_active]: index === currentSlide,
            })}
            onClick={createSelectByIndex(index)}
          />
        ))}
      </div>
    </Container.Grid>
  );
};
