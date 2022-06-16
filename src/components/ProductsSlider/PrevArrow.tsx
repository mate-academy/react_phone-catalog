import React from 'react';
import { ReactComponent as Arrow } from '../../icons/small-arrow.svg';

export const PrevArrow: React.FC = (props: any) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      className="prev-arrow"
      onClick={onClick}
    >
      <Arrow />
    </button>
  );
};
