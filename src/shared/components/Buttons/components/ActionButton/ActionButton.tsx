import React from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import './ActionButton.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  to?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const ActionButton: React.FC<Props> = ({
  children,
  className,
  isActive = false,
  to,
  variant = 'primary', // for Link or <a>
  ...props
}) => {
  const combinedClassName = cn(
    'action-button',
    `action-button--${variant}`,
    className,
    {
      'action-button--active': isActive,
    },
  );

  if (to) {
    return (
      <Link
        to={to}
        className={combinedClassName}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={combinedClassName}
      disabled={isActive || props.disabled}
      {...props}
    >
      {children}
    </button>
  );
};
