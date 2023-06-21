import { FC } from 'react';

import './counter.scss';

interface Props {
  count: number;
  theme: string;
}

export const Counter: FC<Props> = ({ count, theme }) => {
  return (
    count > 0 ? (
      <span className={`counter counter--${theme}`}>
        {count}
      </span>
    ) : (
      <></>
    )
  );
};
