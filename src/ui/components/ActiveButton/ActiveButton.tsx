/* eslint-disable react/require-default-props */
import clsx from 'clsx';
import React from 'react';

import './ActiveButton.scss';

type Props = {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  block?: string;
  className?: string;
  label?: string;
  onClickHandler: () => void;
  cypressParam?: string | null;
};

export const ActiveButton: React.FC<Props> = ({
  width,
  height,
  children,
  style,
  disabled,
  block,
  className,
  label,
  onClickHandler,
  cypressParam = null,
}) => {
  return (
    <button
      type="button"
      style={{
        width,
        height,
        ...style,
      }}
      disabled={disabled}
      onClick={onClickHandler}
      className={clsx('active-button', block && `${block}__button`, className)}
      aria-label={label}
      title={label}
      data-cy={cypressParam}
    >
      {children}
    </button>
  );
};
