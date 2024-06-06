import React, { ComponentProps, FC } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import cn from 'classnames';

import { useCarouselButtons } from '../../../hooks/useCarouselButtons';
import { Text } from '../ui/Text';
import { RoundButton } from '../ui/RoundButton';
import { Icon } from '../ui/Icon';
import { Container } from '../Container';
import classes from './productsCarousel.module.scss';

type Props = ComponentProps<'div'> & {
  carouselTitle: string;
};

export const ProductsCarousel: FC<Props> = ({
  className,
  children,
  carouselTitle,
  ...props
}) => {
  const [ref, api] = useEmblaCarousel({
    align: 'center',
    duration: 20,
    skipSnaps: true,
    dragFree: true,
    breakpoints: {
      '(min-width: 1200px)': { align: 'start' },
    },
  });

  const { handleNextClick, handlePrevClick, isDisabled } =
    useCarouselButtons(api);

  return (
    <Container {...props} className={cn(classes.carousel, className)}>
      <div className={classes.carousel__header}>
        <Text.H2 className={classes.carousel__title} element="h2">
          {carouselTitle}
        </Text.H2>
        <div className={classes.carousel__controlls}>
          <RoundButton disabled={isDisabled.prev} onClick={handlePrevClick}>
            <Icon variant="arrow-left" />
          </RoundButton>
          <RoundButton disabled={isDisabled.next} onClick={handleNextClick}>
            <Icon variant="arrow-right" />
          </RoundButton>
        </div>
      </div>
      <div className={classes.carousel__wrapper} ref={ref}>
        <ul className={classes.carousel__container}>
          {React.Children.toArray(children).map((child, index) => (
            <li key={index} className={classes.carousel__card}>
              {child}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};
