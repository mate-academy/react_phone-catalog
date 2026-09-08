import React from 'react';
import Icon, { IconProps } from './icon';

export const SunIcon: React.FC<Omit<IconProps, 'children'>> = ({
  size = 18,
  title = null,
  className,
  ...rest
}) => (
  <Icon size={size} title={title} viewBox="0 0 24 24" className={className} {...rest}>
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.414 1.414" />
      <path d="M17.657 17.657l1.414 1.414" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.414-1.414" />
      <path d="M17.657 6.343L19.07 4.93" />
    </g>
  </Icon>
);
