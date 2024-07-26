import React from 'react';
import sprite from '../../assets/img/icons/icons.svg';

type IconProps = {
  iconName: string;
};

export const Icon: React.FC<IconProps> = ({ iconName }) => {
  return (
    <svg className="icon">
      <use xlinkHref={`${sprite}#icon-${iconName}`} />
    </svg>
  );
};
