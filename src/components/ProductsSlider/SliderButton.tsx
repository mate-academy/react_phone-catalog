type Direction = 'prev' | 'next';

type Props = {
  disabled?: boolean,
  direction: Direction,
  handleClick: (direction: Direction) => void,
};

export const SliderButton:React.FC<Props> = ({
  direction,
  disabled = false,
  handleClick,
}) => {
  return (
    <button
      type="button"
      className={`
        button
        products-slider__button
        products-slider__button--${direction}
      `}
      onClick={() => {
        handleClick(direction);
      }}
      disabled={disabled}
    >
      {' '}
    </button>
  );
};
