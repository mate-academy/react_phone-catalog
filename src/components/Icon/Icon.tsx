import React from 'react';
import { publicPath } from '../../utils/publicPath';

export type IconName =
  | 'heart'
  | 'heart-filled'
  | 'cart'
  | 'burger'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'home'
  | 'minus'
  | 'plus';

interface Props {
  name: IconName;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Icon: React.FC<Props> = ({
  name,
  className,
  width = 16,
  height = 16,
}) => {
  return (
    <img
      src={publicPath(`/icons/${name}.svg`)}
      alt={name}
      className={className}
      width={width}
      height={height}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  );
};
