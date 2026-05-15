import React from 'react';
import Icon, { IconProps } from './icon';

export const BurgerIcon: React.FC<Omit<IconProps, 'children'>> = ({
  size = 16,
  title = 'Menu',
  className,
  ...rest
}) => {
  return (
    <Icon size={size} title={title} viewBox="0 0 16 16" className={className} {...rest}>
      <path
        d="M2 4h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 8h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
