/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import classNames from 'classnames';
import { BannerSliderDirection } from 'components/BannerSlider/BannerSlider';
import { Arrow } from '../Arrow';

import './SideButton.scss';

type Props = {
  side: BannerSliderDirection,
  handleSlide: (action: BannerSliderDirection) => void,
};

const HOVERED_ARROW_COLOR = '#000';
const ARROW_COLOR = '#89939A';

export const SideButton: React.FC<Props> = ({ side, handleSlide }) => {
  const [hover, setHover] = useState(false);

  const handleChangeSlide = () => {
    handleSlide(side);
  };

  return (
    <button
      type="button"
      className={classNames('side-button', {
        'side-button--left': side === BannerSliderDirection.Back,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleChangeSlide}
    >
      <Arrow
        fill={hover ? HOVERED_ARROW_COLOR : ARROW_COLOR}
      />
    </button>
  );
};
