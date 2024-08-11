import React, { ComponentPropsWithoutRef, FC } from 'react';

import { useCarouselButtons } from '../../../hooks/useCarouselButtons';
import { RoundButton } from '../ui/RoundButton';
import { Icon } from '../ui/Icon';
import { useHorizontalCarousel } from './HorizontalCarouselContext';

type Props = Omit<ComponentPropsWithoutRef<typeof RoundButton>, 'children'>;

export const NextButton: FC<Props> = ({
  disabled,
  onClick = () => {},
  ...props
}) => {
  const { carouselApi } = useHorizontalCarousel();
  const {
    isDisabled: { next },
    handleNextClick,
  } = useCarouselButtons(carouselApi[1]);

  const isDisabled = disabled ?? next;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    onClick(e);
    handleNextClick();
  };

  return (
    <RoundButton {...props} disabled={isDisabled} onClick={handleClick}>
      <Icon variant="arrow-right" />
    </RoundButton>
  );
};
