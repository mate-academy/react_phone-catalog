import React from 'react';
import clsx from 'clsx';
import { Loader } from '../Loader';

import './Button.scss';

type Props = {
  type: 'primary' | 'default';
  children: React.ReactNode;
  isLoading?: boolean;
  active?: boolean;
  borderless?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClickHandler?: () => void;
  cypressParam?: string;
};

const MemoButton: React.FC<Props> = ({
  type,
  isLoading = false,
  active = false,
  borderless = false,
  disabled = false,
  fullWidth = false,
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
        fullWidth && 'button-w100',
        className,
      )}
      type="button"
      disabled={disabled || isLoading}
      onClick={onClickHandler}
      data-cy={cypressParam}
    >
      {isLoading && <Loader />}
      {!isLoading && children}
    </button>
  );
};

export const Button = React.memo(MemoButton);
