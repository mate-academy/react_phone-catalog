/* eslint-disable max-len */
import React from 'react';
import Icon, { IconProps } from './icon';

export type Direction = 'down' | 'up' | 'left' | 'right';

export type ChevronIconProps = Omit<IconProps, 'children'> & {
  direction?: Direction;
  color?: string;
  size?: number;
  rotateDeg?: number;
};

export const ChevronIcon: React.FC<ChevronIconProps> = ({
  size = 16,
  title = 'Chevron',
  className,
  direction = 'down',
  color = 'currentColor',
  rotateDeg = 0,
  ...rest
}) => {
  const d =
    'M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47145C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z';

  const dirToDeg: Record<Direction, number> = {
    down: 0,
    right: 90,
    up: 180,
    left: 270,
  };

  const deg = dirToDeg[direction] + rotateDeg;

  return (
    <Icon
      size={size}
      title={title}
      viewBox="0 0 16 16"
      className={className}
      style={
        {
          transform: `rotate(${deg}deg)`,
          transformOrigin: 'center',
        } as React.CSSProperties
      }
      {...rest}
    >
      <path d={d} fill={color} fillRule="evenodd" clipRule="evenodd" />
    </Icon>
  );
};
