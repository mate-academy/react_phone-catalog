import React from 'react';
import classNames from '../../utils/classNames';
import { Icon, IconName } from '../Icon';
import './IconButton.scss';

interface Props {
  icon: IconName;
  ariaLabel: string;
  variant?: 'square' | 'plain';
  active?: boolean;
  disabled?: boolean;
  badge?: number;
  onClick?: () => void;
}

export const IconButton: React.FC<Props> = ({
  icon,
  ariaLabel,
  variant = 'square',
  active = false,
  disabled = false,
  badge,
  onClick,
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={classNames('icon-button', `icon-button--${variant}`, {
        'icon-button--active': active,
        'icon-button--disabled': disabled,
      })}
    >
      <span className="icon-button__glyph">
        <Icon name={icon} className="icon-button__icon" />
        {typeof badge === 'number' && badge > 0 && (
          <span className="icon-button__badge">{badge}</span>
        )}
      </span>
    </button>
  );
};
