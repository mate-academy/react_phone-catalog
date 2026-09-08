import React from 'react';
import Icon, { IconProps } from './icon';

export const MoonIcon: React.FC<Omit<IconProps, 'children'>> = ({
  size = 18,
  title = null,
  className,
  ...rest
}) => (
  <Icon size={size} title={title} viewBox="0 0 24 24" className={className} {...rest}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
  </Icon>
);
