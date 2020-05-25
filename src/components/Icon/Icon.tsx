import React from 'react';
import cn from 'classnames';

import './Icon.scss';

interface Props {
  name: string;
  tag?: number;
  size?: number;
  border: boolean;
  inActive: boolean;
}

export const Icon: React.FC<Props> = ({
  name,
  tag,
  size = 0,
  border,
  inActive,
}) => (
  <div
    className={cn(`Icon Icon__Size${size}`, {
      Icon__Border: border,
    })}
  >
    <div className={
      cn(
        'Icon__Image',
        `Icon__Image--${name}`,
        { 'Icon__Image--inactive': inActive },
      )
    }
    />
    {tag && <div className="Icon__tag">{tag}</div>}
  </div>
);
