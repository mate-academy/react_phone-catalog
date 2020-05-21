import React from 'react';
import cn from 'classnames';

import './Icon.scss';

type Props = {
  name: string;
  size: number;
  border: number;
  inActive: boolean;
};

export const Icon: React.FC<Props> = ({
  name,
  size,
  border,
  inActive,
}) => (
  <div
    className={`Icon Icon__Size${size} Icon__Border${border}`}
  >
    <div className={
      cn(
        'Icon__Image',
        `Icon__Image--${name}`,
        { 'Icon__Image--inactive': inActive },
      )
    }
    />
  </div>
);
