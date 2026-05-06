import Icon, { IconProps } from './icon';
import React from 'react';

export const CloseIcon: React.FC<Omit<IconProps, 'children'>> = ({
  size = 16,
  title = 'Close menu',
  className,
  ...rest
}) => {
  return (
    <Icon
      size={size}
      title={title}
      viewBox="0 0 26 26"
      className={className}
      {...rest}
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
