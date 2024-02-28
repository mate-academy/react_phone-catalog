import React from 'react';
import clsx from 'clsx';

import './Button.scss';

type Props = {
  type: 'primary' | 'default';
  children: React.ReactNode;
  active?: boolean;
  borderless?: boolean;
  disabled?: boolean;
  className?: string;
  onClickHandler?: () => void;
};

const MemoButton: React.FC<Props> = ({
  type,
  active = false,
  borderless = false,
  disabled = false,
  className = null,
  onClickHandler = () => {},
  children,
}) => {
  return (
    <button
      className={clsx(
        'button',
        `button-${type}`,
        borderless && 'button-borderless',
        active && 'button.active',
        className && className,
      )}
      type="button"
      disabled={disabled}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export const Button = React.memo(MemoButton);
