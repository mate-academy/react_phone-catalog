import { FC } from 'react';

type Props = {
  width: string;
  height: string;
  direction: 'prev' | 'next';
  action: () => void;
};

export const SliderButton: FC<Props> = (
  {
    width,
    height,
    direction,
    action,
  },
) => {
  const styles = {
    display: 'block',
    width,
    height,
    cursor: 'pointer',
  };

  return (
    <button
      type="button"
      className="slider-button"
      aria-label="slider-button"
      style={styles}
      onClick={action}
    >
      <span className={
        `slider-button__icon
        ${(direction === 'prev')
      ? 'slider-button__icon--prev'
      : 'slider-button__icon--next'}`
      }
      />
    </button>
  );
};
