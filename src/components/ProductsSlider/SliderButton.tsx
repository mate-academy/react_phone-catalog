import { Direction } from './utils';

import './ProductsSlider.scss';

type Props = {
  direction: Direction;
  handleClick: (direction: Direction) => void
  disabled?: boolean;
};

export const SliderButton: React.FC<Props> = ({
  direction,
  handleClick,
  disabled = false,
}) => (
  <button
    type="button"
    className={`SliderButton SliderButton--${direction}`}
    onClick={() => {
      handleClick(direction);
    }}
    disabled={disabled}
  >
    {' '}
  </button>
);
