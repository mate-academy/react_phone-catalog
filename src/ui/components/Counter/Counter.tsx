/* eslint-disable react/require-default-props */
import React from 'react';
import clsx from 'clsx';
import { Typography } from '../../base';

import './Counter.scss';

type Props = {
  qty: number;
  className?: string;
};

export const Counter: React.FC<Props> = ({ qty, className }) => {
  return (
    <div className={clsx('counter', className && className)}>
      <Typography type="text" weight="500" cypressParam="productQauntity">
        {qty === 1 ? '1 Item' : `${qty} Items`}
      </Typography>
    </div>
  );
};
