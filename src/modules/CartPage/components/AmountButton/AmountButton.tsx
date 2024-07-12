import React, { ReactNode } from 'react';
import classes from './AmountButton.module.scss';

type Props = {
  active?: boolean;
  big?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export const AmountButton: React.FC<Props> = ({
  children,
  active = true,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classes.AmountButton}
      disabled={!active}
    >
      {children}
    </button>
  );
};
