import React from 'react';
import './IconButton.scss';
import classNames from 'classnames';
import { Icon } from '../../Icon';
import { Icons } from '../../Icon/IconsMap';

type Props = {
  className: string;
  onClick: () => void;
  name: Icons;
  disabled?: boolean;
};

export const IconButton: React.FC<Props> = ({
  className,
  onClick,
  name,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames(`icon-button ${className}`, {
        'icon-button--disabled': disabled,
      })}
      onClick={() => onClick()}
    >
      <Icon className="icon-button__icon" name={name} disabled={disabled} />
    </button>
  );
};
