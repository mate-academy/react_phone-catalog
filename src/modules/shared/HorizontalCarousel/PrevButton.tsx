import React, { ComponentPropsWithoutRef, FC } from 'react';

import { useCarouselButtons } from '../../../hooks/useCarouselButtons';
import { Icon } from '../ui/Icon';
import { RoundButton } from '../ui/RoundButton';
import { useHorizontalCarousel } from './HorizontalCarouselContext';

type Props = Omit<ComponentPropsWithoutRef<typeof RoundButton>, 'children'>;

export const PrevButton: FC<Props> = ({
  disabled,
  onClick = () => {},
  ...props
}) => {
  const { carouselApi } = useHorizontalCarousel();
  const {
    isDisabled: { prev },
    handlePrevClick,
  } = useCarouselButtons(carouselApi[1]);

  const isDisabled = disabled ?? prev;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    onClick(e);
    handlePrevClick();
  };

  return (
    <RoundButton {...props} disabled={isDisabled} onClick={handleClick}>
      <Icon variant="arrow-left" />
    </RoundButton>
  );
};
