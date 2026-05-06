import React from 'react';
import Icon, { IconProps } from './icon';

export const SearchIcon: React.FC<Omit<IconProps, 'children'>> = ({
  size = 16,
  title = 'Search',
  className,
  ...rest
}) => {
  return (
    <Icon
      size={size}
      title={title}
      viewBox="0 0 16 16"
      className={className}
      {...rest}
    >
      <path
        d="M7.25 12.5a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m11 11 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
};
