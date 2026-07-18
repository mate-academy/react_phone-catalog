import React from 'react';
import './Button.scss';
import { Icon } from '../../Icon';
import { Icons } from '../../Icon/IconsMap';

type Props = {
  className: string;
  onClick: () => void;
  name: Icons;
};

export const Button: React.FC<Props> = ({ className, onClick, name }) => {
  return (
    <button className={`button ${className}`} onClick={() => onClick()}>
      <Icon className="button__icon" name={name} />
    </button>
  );
};
