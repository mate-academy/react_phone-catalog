/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { ReactComponent as Arrow } from '../../icons/small-arrow.svg';

export const NextArrow: React.FC = (props: any) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      className="next-arrow"
      onClick={onClick}
    >
      <Arrow />
    </button>
  );
};
