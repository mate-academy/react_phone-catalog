import { FC } from 'react';
import arrowRight from '../../../img/icons/arrow-right.svg';
import arrowRightDisabled from '../../../img/icons/arrow-right-disabled.svg';
import './NavButton.scss';

type Props = {
  width: string;
  height: string;
  direction: 'prev' | 'next';
  action: () => void;
  isDisabled: boolean;
};

export const NavButton: FC<Props> = (
  {
    width,
    height,
    direction,
    action,
    isDisabled = false,
  },
) => {
  const styles = {
    display: 'block',
    width,
    height,
    cursor: 'pointer',
    transform: direction === 'prev' ? 'scaleX(-1)' : '',
  };

  const iconStyles = {
    backgroundImage: `url(${isDisabled ? arrowRightDisabled : arrowRight})`,
  };

  return (
    <button
      type="button"
      className="slider-button"
      aria-label="slider-button"
      style={styles}
      onClick={action}
      disabled={isDisabled}
    >
      <span
        style={iconStyles}
        className={
          `slider-button__icon
        ${(direction === 'prev')
      ? 'slider-button__icon--prev'
      : 'slider-button__icon--next'}`
        }
      />
    </button>
  );
};
