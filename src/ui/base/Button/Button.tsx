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
  cypressParam?: string;
};

const MemoButton: React.FC<Props> = ({
  type,
  active = false,
  borderless = false,
  disabled = false,
  className = '',
  cypressParam,
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
        className,
      )}
      type="button"
      disabled={disabled}
      onClick={onClickHandler}
      data-cy={cypressParam}
    >
      {children}
    </button>
  );
};

export const Button = React.memo(MemoButton);
