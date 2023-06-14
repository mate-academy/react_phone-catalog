import { useState, FC } from 'react';

import './counter.scss';

interface Props {
  count: number;
}

export const Counter: FC<Props> = ({ count }) => {
  return (
    count > 0 ? (
      <div className="counter">
        {count}
      </div>
    ) : (
      <></>
    )
  );
};
